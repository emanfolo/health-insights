import { MealplanDisplayProps } from "../interfaces";
import {
  TopRecipeTile,
  MealplanSummaryTile,
  TargetNutrientsTile,
  MacrosBreakdownTile,
} from "../molecules";
import { extractStats } from "../utils";

export const MealplanDisplay = ({ mealplan }: MealplanDisplayProps) => {
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

  return (
    <div>
      <div className="w-screen h-full">
        <div className="   h-3/5 flex pt-10">
          <div className=" p-4   w-6/12 h-[430px] ">
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

          <div className="p-4 w-6/12 h-[430px] ">
            <TargetNutrientsTile mealplan={mealplan} />
          </div>
        </div>

        <div className=" h-2/5  flex">
          <div className=" p-4 pt-0  w-3/5 h-full ">
            <MealplanSummaryTile
              breakfastItem={breakfastItem}
              mealItems={mealItems}
              snackItems={snackItems}
            />
          </div>
          <div className=" p-4 pt-0 w-2/5 h-full ">
            {highestNutritionalScoreObj && (
              <TopRecipeTile
                highestNutritionalScoreObj={highestNutritionalScoreObj}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
