import { MiniRecipeTile } from "../../atoms";
import { MealplanSummaryTileProps } from "../../interfaces";

export const MealplanSummaryTile = ({
  breakfastItem,
  mealItems,
  snackItems,
}: MealplanSummaryTileProps) => {
  return (
    <div className=" border rounded-lg  h-[300px] w-full  shadow-md flex flex-col justify-between p-4  ">
      <div className=" text-xs self-end mb-2 cursor-pointer hover:text-blue-500">
        <text>Ingredients and instructions </text>
      </div>
      <div className="flex justify-between items-center overflow-scroll no-scrollbar gap-4">
        {breakfastItem !== undefined && (
          <MiniRecipeTile
            name={breakfastItem.name}
            image={breakfastItem.image}
            headline="Breakfast"
          />
        )}

        {mealItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Meals" : undefined}
          />
        ))}
        {snackItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Snacks" : undefined}
          />
        ))}
      </div>
    </div>
  );
};
