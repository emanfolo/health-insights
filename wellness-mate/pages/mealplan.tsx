import Layout from "../components/Layout";
import "../app/global.css";
import { Mealplan, MealplanCreationParams, Recipe } from "../interfaces";
import { httpsCallable } from "firebase/functions";
import { init, functions } from "../firebase";
import seedData1 from "../utils/seed1.json";
import { MealplanDisplay } from "../components";
const Mealplan = () => {
  const mealplan: Mealplan = seedData1;
  return (
    <Layout title="WellnessMate - Create a mealplan">
      <div>
        <MealplanDisplay mealplan={mealplan} />
      </div>
    </Layout>
  );
};

export default Mealplan;

// export const getServerSideProps = async (context) => {
//   // const {req} = context
//   // const {cookies} = req
//   // const rawData = cookies.mealPlanCreationParams
//   // const data: MealplanCreationParams = rawData ? JSON.parse(rawData) : null
//   // const requestData = httpsCallable<MealplanCreationParams, {responseData: any}>(functions, "generate_meal_plan")
//     try {
//       // init()
//       // console.log("FUNCTIONS", functions)
//       // const response = await requestData(data)
//       // const url = process.env.NEXT_PUBLIC_MEALPLAN_FUNCTION_URL || ""
//       // const res = await fetch(url, {
//       //   method: "POST",
//       //   headers: {
//       //     'Content-Type': "application/json"
//       //   },
//       //   body: JSON.stringify(data)
//       // })
//       // if (!res.ok) {
//       //   throw new Error(`Error: ${res.status}`);
//       // }

//       // const json = await res.json()
//       // console.log("RESPONSE", response)
//       // const json = JSON.stringify(response.data)
//       return {props: json}
//     }
//     catch (error) {
//       console.error("Error calling firebase function:", error);
//       const errorMessage = "error"
//       console.log("ERROR", error)

//       // return {
//       //   redirect: {
//       //     destination: "/error",
//       //     permanent: false
//       //   }
//       // }
//       return {props: {errorMessage}}
//       // setError("There's been an issue with our server, please try again.");
//     }

// }
