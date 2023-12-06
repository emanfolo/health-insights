from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore
from flask import jsonify
import google.cloud.firestore
import random


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

    collection_ref = firestore_client.collection("recipes")

    # User Details
    user_details = {
        "weight": 80,
        "height": 190,
        "age": 23,
        "gender": "male",
        "activity_level": "moderately active",
        "food_preferences": ["oats", "smoothies", "chicken breast"],
        "allergies": ["nuts"],
        "mealplan_length": 1,  # in days
        "protein": "high",
        "goals": "lose weight",
        "excluded_foods": ["pork", "bacon"],
        "eating_frequency": {"meals": 3, "snacks": 2},
    }

    # Revised Harris-Benedict Equation
    def calculate_bmr(details):
        if details["gender"].lower() == "male":
            return (
                13.397 * details["weight"]
                + 4.799 * details["height"]
                - 5.677 * details["age"]
                + 88.362
            )
        elif details["gender"].lower() == "female":
            return (
                9.247 * details["weight"]
                + 3.098 * details["height"]
                - 4.330 * details["age"]
                + 447.593
            )
        else:
            raise ValueError("Invalid gender")

    # Calculate Target Calories
    target_calories = calculate_bmr(user_details)

    # Example retrieve a meal plan
    # Retrieve candidate recipes from Firestore based on user preferences

    protein_requirements = {"normal": 7, "high": 10, "very high": 15}


    ### WE ARE HERE 

    breakfast_query = (
        collection_ref.where(
            "nutrients.kcal", "<", 600
        )  # Adjust based on meal plan length and distribution
        .where(
            "nutrients.protein", ">", protein_requirements[user_details["protein"]]
        )  # Adjust based on high protein
        .where("ingredients", "not-in", user_details["excluded_foods"])
        .where("ratings", ">", 3)
        .where("subcategory", "=", "breakfast")
    )

    query = (
        collection_ref.where(
            "nutrients.kcal", "<", target_calories / 2
        )  # Adjust based on meal plan length and distribution
        .where(
            "nutrients.protein", ">", protein_requirements[user_details["protein"]]
        )  # Adjust based on high protein
        .where("ingredients", "not-in", user_details["excluded_foods"])
        .where("ratings", ">", 3)
    )
    # think about getting breakfast, lunch dinner and 2 snacks.

    # think about food_preferences increasing the weighting of those options instead of it only being those
    # .where('ingredients', 'array-contains-any', user_details["food_preferences"])

    # think about adding target macros

    candidate_recipes = [doc.to_dict() for doc in query.stream()]

    # Shuffle candidate recipes for variety
    random.shuffle(candidate_recipes)

    # Accumulate Recipes until Total kcal > target_calories
    total_kcal = 0
    filtered_recipes = []

    for recipe in candidate_recipes:
        recipe_kcal = recipe.get("nutrients", {}).get("kcal", 0)
        total_kcal += recipe_kcal
        filtered_recipes.append(recipe)

        if total_kcal > target_calories and len(filtered_recipes) >= (
            user_details["eating_frequency"]["meals"]
            + user_details["eating_frequency"]["snacks"]
        ):
            break

    # Check if Accumulated Recipes Meet the Criteria
    if total_kcal > target_calories and len(filtered_recipes) >= (
        user_details["eating_frequency"]["meals"]
        + user_details["eating_frequency"]["snacks"]
    ):
        print(
            f"Found enough recipes for a day with total kcal > {target_calories}. Total kcal: {total_kcal}"
        )
        for i, recipe in enumerate(filtered_recipes):
            print(
                f"Recipe {i + 1}: {recipe['name']} - kcal: {recipe.get('nutrients', {}).get('kcal', 0)}"
            )
    else:
        print("Not enough recipes meet the conditions.")

    parsed_response = jsonify(filtered_recipes)

    return parsed_response
