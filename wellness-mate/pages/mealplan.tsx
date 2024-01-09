import "../app/global.css";
import { MealplanDisplay, Layout } from "../components";
import { useEffect, useState } from "react";
import Link from "next/link";
const Mealplan = () => {
  const [mealplan, setMealplan] = useState(null);

  useEffect(() => {
    // Get data from local storage
    const localStorageData = localStorage.getItem("generatedMealplan");

    if (localStorageData) {
      // Data exists in local storage, parse and set it
      const parsedMealplan = JSON.parse(localStorageData);
      setMealplan(parsedMealplan);
    }
  }, []);

  return (
    <Layout title="WellnessMate - View a mealplan">
      <div>
        {mealplan ? (
          <MealplanDisplay mealplan={mealplan} />
        ) : (
          <div className="flex w-screen justify-center h-[calc(100vh-63px)] items-center">
            <p>
              No mealplan has been created, please go to{" "}
              <Link href={"/create"}>generate</Link> to create a mealplan
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Mealplan;
