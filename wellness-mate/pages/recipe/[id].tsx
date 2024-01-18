import { RecipeDisplay, Layout } from "../../components";
import {
  MiniRecipeTileProps,
  Recipe,
  RecipeRecommendationProps,
} from "../../interfaces";
import "../../app/global.css";
import { apiUrl } from "../../utils";

const RecipePage = ({ recipeRecommendation }) => {
  const recommended: MiniRecipeTileProps[] =
    recipeRecommendation.recommendations;
  const recipe: Recipe = recipeRecommendation.recipe;

  return (
    <Layout title="WellnessMate - Explore Recipes">
      <div>
        <RecipeDisplay recipe={recipe} recommended={recommended} />
      </div>
    </Layout>
  );
};

export default RecipePage;

export const getServerSideProps = async (context) => {
  const requestUrl = `${apiUrl}/recipe`;
  const { id } = context.params;

  try {
    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const recipeData: RecipeRecommendationProps = await res.json();
    return { props: { recipeRecommendation: recipeData } };
  } catch (error) {
    console.error("Error calling API:", error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
