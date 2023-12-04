from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore
from flask import jsonify
import google.cloud.firestore


app = initialize_app()


@https_fn.on_request()
def get_recipes(req: https_fn.Request) -> https_fn.Response:

    firestore_client: google.cloud.firestore.Client = firestore.client()

    collection_ref = firestore_client.collection('recipes')

    # Query the collection and limit the result to the first 20 documents
    query = collection_ref.limit(20)
    documents = query.stream()

    # Convert the documents to a list of dictionaries
    data = [doc.to_dict() for doc in documents]
    parsed_response = jsonify(data)

    return parsed_response





# Example retrieve a mealplan 

# # 1. Retrieve candidate recipes from Firestore
# query = (
#     db.collection('recipes')
#     .where('nutrients.kcal', '<', 400)
#     .where('nutrients.protein', '>', 10)
#     .where('ingredients', 'array-contains', 'banana')
# )

# candidate_recipes = [doc.to_dict() for doc in query.stream()]

# # 2. Accumulate Recipes until Total kcal > 2000
# total_kcal = 0
# filtered_recipes = []

# for recipe in candidate_recipes:
#     recipe_kcal = recipe.get('nutrients', {}).get('kcal', 0)
#     total_kcal += recipe_kcal
#     filtered_recipes.append(recipe)

#     if total_kcal > 2000 and len(filtered_recipes) >= 3:
#         break

# # 3. Check if Accumulated Recipes Meet the Criteria
# if total_kcal > 2000 and len(filtered_recipes) >= 3:
#     print(f"Found at least 3 recipes with total kcal > 2000. Total kcal: {total_kcal}")
#     for i, recipe in enumerate(filtered_recipes):
#         print(f"Recipe {i + 1}: {recipe['name']} - kcal: {recipe.get('nutrients', {}).get('kcal', 0)}")
# else:
#     print("Not enough recipes meet the conditions.")
