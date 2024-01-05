import "../app/global.css";
import { ExploreDisplay, Layout } from "../components";
import { Recipe } from "../interfaces";

const Explore = ({ recipes }) => {
  return (
    <Layout title="WellnessMate - View Recipes">
      <div className="flex justify-center text-xl ">Explore Recipes</div>
      <ExploreDisplay recipes={recipes} />
    </Layout>
  );
};

export default Explore;

export const getServerSideProps = async (context) => {
  const requestUrl = "http://127.0.0.1:5000/explore";
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const recipes: Recipe[] = await res.json();
    return { props: { recipes: recipes } };
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
