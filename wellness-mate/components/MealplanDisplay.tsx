import { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Mealplan, MealplanDisplayProps } from "../interfaces";
import {
  TopRecipeTile,
  MealplanSummaryTile,
  TargetNutrientsTile,
  MacrosBreakdownTile,
} from "../molecules";
import { extractStats } from "../utils";
import { SaveButton } from "../atoms";
import { saveMealplan, unsaveMealplan } from "../utils/saves";

export const MealplanDisplay = ({ mealplan }: MealplanDisplayProps) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [mealplanSaved, setMealplanSaved] = useState(false);
  const {
    highestNutritionalScoreObj,
    averageNutritionalScore,
    averageProteinScore,
    totalCalories,
    totalCarbs,
    totalFat,
    totalFibre,
    totalProtein,
    totalSalt,
    totalSugars,
    totalSaturates,
  } = extractStats(mealplan);

  const breakfastItem = mealplan.breakfast[0];
  const mealItems = mealplan.meals;
  const snackItems = mealplan.snacks;

  const myData = [
    { name: "Protein", value: totalProtein },
    { name: "Carbs", value: totalCarbs },
    { name: "Fats", value: totalFat },
  ];
  const nutritionalSummary = {
    totalCalories: totalCalories,
    totalSugars: totalSugars,
    totalCarbs: totalCarbs,
    totalFibre: totalFibre,
    totalFat: totalFat,
    totalProtein: totalProtein,
    totalSalt: totalSalt,
    totalSaturates: totalSaturates,
    averageNutritionalScore: averageNutritionalScore,
    averageProteinScore: averageProteinScore,
  };

  const { user, loggedIn } = useAuth();

  const handleSave = async () => {
    if (loggedIn) {
      if (!mealplanSaved) {
        try {
          await saveMealplan(mealplan);
          setMealplanSaved(true);
          console.log("Mealplan saved successfully");
        } catch (error) {
          console.error(error);
        }
      } else {
        // Handle already saved state, if needed
      }
    } else {
      setSignInModalOpen(true);
    }
  };

  // Save button disappears after you save it
  // Then when you view mealplans from 'saved'/logged in section,
  // it opens with save toggle. Show a loading state as well

  return (
    <div className="lg:flex lg:justify-center lg:items-center">
      <div className=" h-full w-full lg:max-w-7xl xl:max-w-8xl">
        <text className=" text-2xl flex justify-center md:text-3xl font-semibold">
          Mealplan Breakdown
        </text>
        {/* <div className="flex justify-end pr-4">
          {loggedIn && (
            <SaveButton
              saved={mealplanSaved}
              onClick={handleSave}
              context="generated"
            />
          )}
        </div> */}

        <div className="    flex-col flex  lg:flex-row">
          <div className=" w-full p-4    ">
            <MealplanSummaryTile
              breakfastItem={breakfastItem}
              mealItems={mealItems}
              snackItems={snackItems}
              nutritionalSummary={nutritionalSummary}
            />
          </div>
        </div>

        <div className="   h-3/5 flex  flex-col lg:flex-row">
          <div className=" p-4   min-h-[630px]  md:min-h-[430px] ">
            <MacrosBreakdownTile
              totalCalories={totalCalories}
              totalSugars={totalSugars}
              totalCarbs={totalCarbs}
              totalFibre={totalFibre}
              totalFat={totalFat}
              totalProtein={totalProtein}
              totalSalt={totalSalt}
              totalSaturates={totalSaturates}
              averageNutritionalScore={averageNutritionalScore}
              averageProteinScore={averageProteinScore}
            />
          </div>

          <div className="p-4 h-[430px] md:h-[465px] lg:w-6/12  ">
            <TargetNutrientsTile mealplan={mealplan} />
          </div>
        </div>
      </div>
    </div>
  );
};
