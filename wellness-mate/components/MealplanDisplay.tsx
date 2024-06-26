import { MealplanDisplayProps } from "../interfaces";
import {
  MealplanSummaryTile,
  TargetNutrientsTile,
  MacrosBreakdownTile,
} from "../molecules";
import { extractStats } from "../utils";

export const MealplanDisplay = ({ mealplan }: MealplanDisplayProps) => {
  const {
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

  return (
    <div className="lg:flex lg:justify-center lg:items-center">
      <div className=" h-full w-full lg:max-w-7xl xl:max-w-8xl">
        <text className=" text-2xl flex justify-center md:text-3xl font-semibold">
          Mealplan Breakdown
        </text>
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
