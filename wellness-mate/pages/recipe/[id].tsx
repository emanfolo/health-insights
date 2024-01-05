import { RecipeDisplay, Layout } from "../../components";
import {
  MiniRecipeTileProps,
  Recipe,
  RecipeRecommendationProps,
} from "../../interfaces";
import "../../app/global.css";

const RecipePage = ({ recipeRecommendation }) => {
  const recommended: MiniRecipeTileProps[] =
    recipeRecommendation.recommendations;
  const recipe: Recipe = recipeRecommendation.recipe;
  console.log(recommended);

  return (
    <Layout>
      <div>
        <RecipeDisplay recipe={recipe} recommended={recommended} />
      </div>
    </Layout>
  );
};

export default RecipePage;

export const getServerSideProps = async (context) => {
  const requestUrl = "http://127.0.0.1:5000/recipe";
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
    console.log(recipeData);
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
