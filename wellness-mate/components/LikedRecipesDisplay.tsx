import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserLikedRecipes } from "../utils/likes";
import { Recipe } from "../interfaces";
import { LoadingSpinner, MiniRecipeCard } from "../atoms";

export const LikedRecipesDisplay = () => {
  const { user, loggedIn } = useAuth();
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      // Redirect the user to /explore if not logged in
      router.push("/explore");
    } else {
      // Fetch liked recipes if the user is logged in
      setLoading(true);
      fetchUserLikedRecipes()
        .then((recipes) => {
          setLikedRecipes(recipes as Recipe[]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching liked recipes:", error);
          setLoading(false);
        });
    }
  }, [loggedIn, user?.uid, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="font-bold text-2xl flex justify-center">Your Recipes</div>
      <div className=" w-fit grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 justify-center gap-5 py-10">
        {likedRecipes.map((recipe) => (
          <MiniRecipeCard
            name={recipe.name}
            image={recipe.image}
            key={recipe.name}
            id={recipe.id}
            kcal={recipe.kcal}
            description={recipe.description}
            nutriScore={recipe.nutritional_score}
            proteinScore={recipe.protein_score}
          />
        ))}
      </div>
      {likedRecipes.length === 0 && !loading && (
        <text className="flex justify-center items-center text-3xl font-light my-32">
          No liked recipes
        </text>
      )}
    </div>
  );
};
