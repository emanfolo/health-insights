import { GaugeChart, MiniRecipeTile, NutritionLabel } from "../../atoms";
import { MealplanSummaryTileProps } from "../../interfaces";

export const MealplanSummaryTile = ({
  breakfastItem,
  mealItems,
  snackItems,
  nutritionalSummary,
}: MealplanSummaryTileProps) => {
  const {
    averageNutritionalScore,
    averageProteinScore,
    totalCalories,
    totalCarbs,
    totalFibre,
    totalFat,
    totalProtein,
    totalSalt,
    totalSaturates,
    totalSugars,
  } = nutritionalSummary;
  return (
    <div className=" border rounded-lg w-full  shadow-md flex flex-col justify-between p-4 bg-white ">
      <div className=" text-xs self-end mb-2 cursor-pointe font-semibold">
        <text>PDF Summary and Instructions </text>
      </div>
      <div className="flex justify-start items-center  overflow-y-hidden overflow-x-scroll no-scrollbar gap-4">
        {breakfastItem !== undefined && (
          <MiniRecipeTile
            name={breakfastItem.name}
            image={breakfastItem.image}
            headline="Breakfast"
            id={breakfastItem.id}
            kcal={breakfastItem.kcal}
          />
        )}

        {mealItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Meals" : undefined}
            id={value.id}
            kcal={value.kcal}
          />
        ))}
        {snackItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Snacks" : undefined}
            id={value.id}
            kcal={value.kcal}
          />
        ))}

        <div className="flex flex-col gap-3  ml-auto">
          <text className="text-xs flex flex-col justify-center items-center font-bold">
            Average scores
          </text>
          <div className="flex flex-col justify-center items-center gap-2">
            <text className="font-medium text-sm"> Nutri score</text>
            <GaugeChart value={averageNutritionalScore} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <text className="font-medium text-sm"> Protein score</text>
            <GaugeChart value={averageProteinScore} />
          </div>
        </div>

        {/* <div>
        <NutritionLabel
            kcal={totalCalories}
            sugars={totalSugars}
            carbs={totalCarbs}
            fibre={totalFibre}
            fat={totalFat}
            protein={totalProtein}
            salt={totalSalt}
            saturates={totalSaturates}
          />
        </div> */}

        {/* Some sort of stats. maybe a nutritional label. 
Think about what can be taken from other tiles */}
      </div>
    </div>
  );
};
