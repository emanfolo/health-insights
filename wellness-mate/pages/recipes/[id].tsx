import { RecipeDisplay } from "../../components";
import Layout from "../../components/Layout";
import { MiniRecipeTileProps, Recipe } from "../../interfaces";
import recipe from "../../utils/recipe.json";
import "../../app/global.css";
import rec from "../../utils/rec.json";

const RecipePage = () => {
  const recipeData: Recipe = recipe;
  const recommended: MiniRecipeTileProps[] = rec;
  console.log(recipeData);

  return (
    <Layout>
      <div>
        {/* <h1>Recipe Details</h1> */}
        {/* Render your recipe details here */}
        {/* More recipe details */}
        <RecipeDisplay recipe={recipeData} recommended={recommended} />
      </div>
    </Layout>
  );
};

export default RecipePage;

// export const getServerSideProps = async (context) => {
//     const requestUrl = "http://127.0.0.1:5001/wellness-mate-72778/us-central1/get_recipe"
//     const { id } = context.params; // Access the dynamic route parameter

//     try {
//             const res = await fetch(requestUrl, {
//             method: "POST",
//             headers: {
//               'Content-Type': "application/json"
//             },
//             body: JSON.stringify({id: id})
//           })
//           if (!res.ok) {
//             throw new Error(`Error: ${res.status}`);
//           }
//           const recipe = await res.json()
//           console.log(recipe)
//           return {props: recipe}

//     } catch (error) {
//               console.error("Error calling firebase function:", error);
//               const errorMessage = "error"
//               console.log("ERROR", error)

//               return {
//                 redirect: {
//                   destination: "/error",
//                   permanent: false
//                 }
//               }
// }
// }
