import { Mealplan, Recipe } from "../interfaces";
export * from "./schema";

export const parseJSONFields = (data: Recipe, fields: string[]): Recipe => {
  const parsedData = { ...data }; // Create a copy of the original data object

  fields.forEach((fieldName) => {
    if (parsedData[fieldName]) {
      try {
        parsedData[fieldName] = JSON.parse(parsedData[fieldName]);
      } catch (error) {
        // Handle JSON parsing errors if needed
        console.error(`Error parsing ${fieldName}: ${error}`);
      }
    }
  });

  return parsedData;
};

export const GoalOptions = ["improve_health", "lose_weight", "gain_muscle"];

export const calculatePercentage = (
  partialValue: number,
  totalValue: number,
): number => {
  if (totalValue === 0) {
    return 0;
  }
  return Math.round((partialValue / totalValue) * 100);
};

export const DailyRecommended: Record<string, number> = {
  kcal: 2250,
  fat: 97,
  saturates: 31,
  carbs: 333,
  sugars: 33,
  protein: 75,
  fibre: 30,
  salt: 6,
};

export const colorScheme = {
  breakfast: "#AEC6CF", // Pastel Blue
  meals: "#FFD1DC", // Pastel Pink
  snacks: "#B39EB5", // Pastel Purple
};

export const extractStats = (mealplan: Mealplan) => {
  let highestNutritionalScoreObj: Recipe | null = null;
  let totalNutritionalScore = 0;
  let totalProteinScore = 0;
  let totalCount = 0;
  let totalProtein = 0;
  let totalCalories = 0;
  let totalFibre = 0;
  let totalSugars = 0;
  let totalCarbs = 0;
  let totalSaturates = 0;
  let totalFat = 0;
  let totalSalt = 0;

  // A helper function to process each recipe
  const processRecipe = (recipe: Recipe) => {
    totalCalories += recipe.kcal;
    totalProtein += recipe.protein;
    totalFat += recipe.fat;
    totalFibre += recipe.fibre;
    totalSaturates += recipe.saturates;
    totalSugars += recipe.sugars;
    totalCarbs += recipe.carbs;
    totalSalt += recipe.salt;
    totalNutritionalScore += recipe.nutritional_score;
    totalProteinScore += recipe.protein_score;
    totalCount++;

    if (
      !highestNutritionalScoreObj ||
      recipe.nutritional_score > highestNutritionalScoreObj.nutritional_score
    ) {
      highestNutritionalScoreObj = recipe;
    }
  };

  // Iterate over each meal type and process each recipe
  Object.values(mealplan).forEach((mealType) => {
    mealType.forEach(processRecipe);
  });

  // Calculate averages
  const averageNutritionalScore =
    totalCount > 0 ? Math.round(totalNutritionalScore / totalCount) : 0;
  const averageProteinScore =
    totalCount > 0 ? Math.round(totalProteinScore / totalCount) : 0;

  return {
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
  };
};

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://206.189.122.226:80"
    : "http://127.0.0.1:5000";
