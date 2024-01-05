import "../app/global.css";
import { MealplanCreationParams, Recipe } from "../interfaces";
import { MealplanDisplay, Layout } from "../components";
const Mealplan = ({ mealplan }) => {
  return (
    <Layout title="WellnessMate - Create a mealplan">
      <div>
        <MealplanDisplay mealplan={mealplan} />
      </div>
    </Layout>
  );
};

export default Mealplan;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { cookies } = req;
  const rawData = cookies.mealPlanCreationParams;
  console.log("RAW DATA=", rawData);
  const data: MealplanCreationParams = rawData ? JSON.parse(rawData) : null;
  const requestUrl = "http://127.0.0.1:5000/mealplan";
  console.log(JSON.stringify({ userDetails: data }));
  try {
    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails: data }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const json = await res.json();
    console.log(json);
    return { props: { mealplan: json } };
  } catch (error) {
    console.error("Error calling API:", error);
    const errorMessage = "error";
    console.log("ERROR", error);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
