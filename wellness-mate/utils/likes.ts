import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "./firebase";

export const likeRecipe = async (recipeId: string) => {
  try {
    const createLike = httpsCallable(functions, "likeRecipe");
    const result = await createLike({ recipeId });
    return result;
  } catch (error) {
    console.error("Error calling saveLike function:", error);
    if (error.code === "unauthenticated") {
      // Handle unauthenticated error
      console.error("User must be logged in to like a recipe.");
    } else if (error.code === "invalid-argument") {
      // Handle invalid argument error
      console.error("Missing userId or recipeId.");
    } else {
      // Handle other errors
      console.error("An error occurred while saving the like.");
    }
    throw error;
  }
};

export const unlikeRecipe = async (recipeId: string) => {
  try {
    const deleteLike = httpsCallable(functions, "unlikeRecipe");
    const result = await deleteLike({ recipeId });
    return result;
  } catch (error) {
    console.error("Error calling deleteLike function:", error);
    if (error.code === "unauthenticated") {
      console.error("User must be logged in to delete a like.");
    } else if (error.code === "permission-denied") {
      console.error("User does not have permission to delete this like.");
    } else if (error.code === "not-found") {
      console.error("Like not found.");
    } else {
      console.error("An error occurred while deleting the like.");
    }
    throw error;
  }
};

interface IsLikedData {
  recipeId: string;
}

interface IsLikedResponse {
  isLiked: boolean;
}

export const recipeIsLiked = async (recipeId: string) => {
  const isLikedCallable = httpsCallable<IsLikedData, IsLikedResponse>(
    functions,
    "recipeIsLiked",
  );
  try {
    const result: HttpsCallableResult<IsLikedResponse> = await isLikedCallable({
      recipeId,
    });
    return result.data.isLiked;
  } catch (error) {
    console.error("Error checking like status:", error);
  }
};

export const fetchUserLikedRecipes = async () => {
  const getUserLikedRecipes = httpsCallable(functions, "getUserLikedRecipes");

  try {
    const result = await getUserLikedRecipes();
    return result.data;
  } catch (error) {
    console.error("Error fetching liked recipes:", error);
    throw new Error("Failed to fetch liked recipes");
  }
};
