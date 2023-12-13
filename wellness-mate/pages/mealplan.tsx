import Layout from "../components/Layout";
import "../app/global.css";

const Mealplan = () => {
  return (
    <Layout title="WellnessMate - Create a mealplan">
      <div>
        {/* 
 // import { httpsCallable } from "firebase/functions";
// import { init, functions } from "../firebase";
// import { MealplanCreationParams } from "../interfaces";
 
 // const requestData = httpsCallable<MealplanCreationParams, {responseData: any}>(functions, "generate_meal_plan")
  // const handleSubmit = async (values: MealplanCreationParams) => {
  //   console.log(values)
  //   try {
  //     const response = await requestData(values)
  //     const json = JSON.stringify(response.data)
  //     console.log("Success:", json)
  //   } 
  //   catch (error) {
  //     console.error("Error calling firebase function:", error);
  //     setError("There's been an issue with our server, please try again.");
  //   }
  // } */}
      </div>
    </Layout>
  );
};

export default Mealplan;
