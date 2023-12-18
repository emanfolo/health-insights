from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore
from flask import jsonify
import google.cloud.firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from utils.calculations import (
    calculate_bmr,
    calculate_normalized_protein_score,
    calculate_nutrition_score,
)
import numpy as np


app = initialize_app()


@https_fn.on_request()
def get_recipes(req: https_fn.Request) -> https_fn.Response:
    firestore_client: google.cloud.firestore.Client = firestore.client()

    collection_ref = firestore_client.collection("recipes")

    # Query the collection and limit the result to the first 20 documents
    query = collection_ref.limit(20)
    documents = query.stream()

    # Convert the documents to a list of dictionaries
    data = [doc.to_dict() for doc in documents]
    parsed_response = jsonify(data)

    return parsed_response


@https_fn.on_request()
def generate_meal_plan(req: https_fn.Request) -> https_fn.Response:
    firestore_client: google.cloud.firestore.Client = firestore.client()
    print(req.data)
    details = req.data
    collection_ref = firestore_client.collection("recipes")

    # User Details
    user_details = {
        "weight": 80,
        "height": 190,
        "age": 23,
        "gender": "male",
        "activity_level": "moderately_active",
        "food_preferences": ["oats", "smoothies", "chicken breast"],
        "allergies": ["nuts"],
        "mealplan_length": 1,  # in days
        # "protein": "high",
        "goals": "lose_weight",
        "excluded_foods": ["pork", "bacon"],
        "eating_frequency": {"meals": 3, "snacks": 2},
    }

    activity_multiplier = {
        "sedentary": 1.2,
        "lightly_active": 1.375,
        "moderately_active": 1.55,
        "very_active": 1.725,
        "extremely_active": 1.9,
    }

    # Calculate Target Calories
    target_calories = calculate_bmr(
        user_details["gender"],
        user_details["weight"],
        user_details["height"],
        user_details["age"],
    ) * (activity_multiplier[user_details["activity_level"]] or 1.375)
    target_breakfast_calories = target_calories * 0.2 or 500
    target_meal_calories = target_calories * 0.3 or 750
    target_snack_calories = target_calories * 0.1 or 250

    breakfast_query = (
        collection_ref.where(
            filter=FieldFilter("kcal", ">", target_breakfast_calories * 0.8)
        )
        .where(filter=FieldFilter("kcal", "<", target_breakfast_calories))
        .where(
            filter=FieldFilter("subcategory", "in", ["Breakfast", "Breakfast recipes"])
        )
    )

    meal_query = collection_ref.where(
        filter=FieldFilter("kcal", ">", target_meal_calories * 0.8)
    ).where(filter=FieldFilter("kcal", "<", target_meal_calories))

    snack_query = collection_ref.where(
        filter=FieldFilter("kcal", ">", target_snack_calories * 0.3)
    ).where(filter=FieldFilter("kcal", "<", target_snack_calories))

    breakfast_documents = breakfast_query.stream()
    meal_documents = meal_query.stream()
    snack_documents = snack_query.stream()

    breakfast_pool = [doc.to_dict() for doc in breakfast_documents]
    meal_pool = [doc.to_dict() for doc in meal_documents]
    snack_pool = [doc.to_dict() for doc in snack_documents]

    breakfast_choice = weighted_random_choice(
        breakfast_pool,
        "rating",
        user_details["food_preferences"],
        user_details["allergies"],
        user_details["excluded_foods"],
        user_details["goals"],
        1,
    )
    meal_choices = weighted_random_choice(
        meal_pool,
        "rating",
        user_details["food_preferences"],
        user_details["allergies"],
        user_details["excluded_foods"],
        user_details["goals"],
        2,
    )
    snack_choices = weighted_random_choice(
        snack_pool,
        "rating",
        user_details["food_preferences"],
        user_details["allergies"],
        user_details["excluded_foods"],
        user_details["goals"],
        2,
    )

    # Combine all recipe lists into one
    all_recipes = (
        breakfast_choice.tolist() + meal_choices.tolist() + snack_choices.tolist()
    )

    ## Change this to an object with keys breakfast, meal, snack

    # Calculate the total kcal
    total_kcal = sum(recipe.get("kcal", 0) for recipe in all_recipes)

    print(
        f"The combined kcal number of all recipes is: {total_kcal}. Your goal calories was {target_calories}"
    )

    return all_recipes


def weighted_random_choice(
    objects,
    weight_key,
    food_preferences,
    allergies,
    excluded_foods,
    goals,
    maxResults=3,
):
    try:
        # Convert food_preferences and allergies to lowercase sets for case-insensitive matching
        food_preferences_set = {preference.lower() for preference in food_preferences}
        allergies_set = {allergy.lower() for allergy in allergies}
        excluded_foods_set = {excluded_food.lower() for excluded_food in excluded_foods}

        # Calculate weights and adjust based on the condition
        weights = []
        recipes = []

        for obj in objects:
            weight = obj.get(weight_key, 1)

            # Check if any food_preference is a substring of obj.get("description")
            description = obj.get("description", "")
            if any(
                preference in description.lower() for preference in food_preferences_set
            ):
                print("I've found a match to one of your preferences")
                weight += 3  # Add 3 to the weight if a match is found

            # Normalize protein score, and add it to the weight
            if goals == "gain_muscle":
                normalized_nutrition_score = obj.get("protein_score", 0) / 20
                weight += normalized_nutrition_score

            # Check the NutriScore, normalize it and add it to the weight
            normalized_nutrition_score = obj.get("nutrition_score", 0) / 20
            weight += normalized_nutrition_score

            ingredients = obj.get("ingredients", [])
            # Check if any ingredient includes any allergy as a substring
            if any(
                allergy in ingredient.lower()
                for allergy in allergies_set
                for ingredient in ingredients
            ):
                continue

            # Check if any ingredient includes any excluded foods as a substring
            if any(
                excluded_food in ingredient.lower()
                for excluded_food in excluded_foods_set
                for ingredient in ingredients
            ):
                continue

            recipes.append(obj)
            weights.append(weight)

        # Normalize weights to make sure they sum up to 1
        weights_normalized = np.array(weights) / np.sum(weights)
        # Perform weighted random choice
        weighted_selected_item = np.random.choice(
            recipes, size=maxResults, replace=False, p=weights_normalized
        )

        return weighted_selected_item

    except Exception as e:
        # Handle the specific exception types you expect, log the error, or perform other actions
        print(f"An error occurred: {str(e)}")
        # You might want to return a default or handle the error in an appropriate way
        return None
