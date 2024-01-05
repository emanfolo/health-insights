import { NutritionalLabelProps } from "../interfaces";
import { DailyRecommended, calculatePercentage } from "../utils";

export const NutritionLabel = ({
  kcal,
  fat,
  saturates,
  salt,
  carbs,
  fibre,
  protein,
  sugars,
}: NutritionalLabelProps) => {
  return (
    <div className="bg-white p-4 w-57 sm:w-96 md:w-72 border rounded-lg  text-xs flex flex-col min-w-fit">
      <div className="flex justify-between mb-2">
        <p className="font-bold">Calories</p>
        <p className="font-bold">{kcal}</p>
      </div>
      <hr className="border-black mb-2" />
      <div className="flex justify-between mb-2">
        <p className="font-bold">Total Fat</p>
        <p className="font-bold">{fat}g</p>
        <p className="font-bold">
          {calculatePercentage(fat, DailyRecommended["fat"])}%
        </p>
      </div>
      <p className="ml-4 mb-2">Saturated Fat {saturates}g</p>
      <hr className="border-black mb-2" />
      <div className="flex justify-between mb-2">
        <p className="font-bold">Salt</p>
        <p className="font-bold">{Math.round(salt)}g</p>
        <p className="font-bold">
          {calculatePercentage(salt, DailyRecommended["salt"])}%
        </p>
      </div>
      <hr className="border-black mb-2" />
      <div className="flex justify-between mb-2">
        <p className="font-bold">Total Carbs</p>
        <p className="font-bold">{carbs}g</p>
        <p className="font-bold">
          {calculatePercentage(carbs, DailyRecommended["carbs"])}%
        </p>
      </div>
      <text className="ml-4 mb-2 text-xs">Dietary Fibre {fibre}g</text>
      <p className="ml-4 mb-2 text-xs">Sugars {sugars}g</p>
      <hr className="border-black mb-2" />
      <div className="flex justify-between">
        <p className="font-bold">Protein</p>
        <p className="font-bold">{protein}g</p>
      </div>
    </div>
  );
};
