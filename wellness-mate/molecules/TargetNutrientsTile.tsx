import { StackedBarChart } from "../atoms";
import {
  Mealplan,
  MealplanDisplayProps,
  NutrientPercentages,
} from "../interfaces";
import { calculatePercentage, DailyRecommended } from "../utils";

export const TargetNutrientsTile = ({ mealplan }: MealplanDisplayProps) => {
  const transformData = (data: Mealplan): NutrientPercentages[] => {
    const nutrientCategories = [
      "kcal",
      "fat",
      "saturates",
      "salt",
      "carbs",
      "fibre",
      "protein",
      "sugars",
    ];

    return nutrientCategories.map((nutrient) => {
      const nutrientData: NutrientPercentages = { name: nutrient };
      // Initialize total values for each category
      nutrientData.breakfast = 0;
      nutrientData.meals = 0;
      nutrientData.snacks = 0;

      // Traverse each meal category
      Object.entries(data).forEach(([categoryName, recipes]) => {
        // categoryName is 'breakfast', 'meal', or 'snack'
        recipes?.forEach((meal) => {
          //   const mealKey = `${categoryName}${index + 1}`; // e.g., 'breakfast1'
          nutrientData[categoryName] += calculatePercentage(
            meal[nutrient],
            DailyRecommended[nutrient],
          ); // Directly assign the nutrient value
        });
      });

      return nutrientData;
    });
  };
  const transformedData = transformData(mealplan);
  const keys = Object.keys(transformedData[0]).filter((key) => key !== "name");

  return (
    <div className=" border rounded-lg  h-full  shadow-md flex flex-col justify-between p-4">
      <text className="font-medium text-sm">
        Nutritional breakdown as a % of target daily nutrients at 2000 kcal
      </text>

      <StackedBarChart keys={keys} data={transformedData} />
    </div>
  );
};
