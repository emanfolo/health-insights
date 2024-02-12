import { ExploreDisplay, Layout } from "../components";
import { Recipe } from "../interfaces";
import { recipeApiUrl } from "../utils";

const Explore = () => {
  return (
    <Layout title="WellnessMate - View Recipes">
      <div className=" flex justify-center text-xl font-semibold md:text-3xl ">
        Explore Recipes
      </div>
      <ExploreDisplay />
    </Layout>
  );
};

export default Explore;
