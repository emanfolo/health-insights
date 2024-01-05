import { MiniRecipeTile } from "../../atoms";
import { MealplanSummaryTileProps } from "../../interfaces";

export const MealplanSummaryTile = ({
  breakfastItem,
  mealItems,
  snackItems,
}: MealplanSummaryTileProps) => {
  return (
    <div className="h-[320px] border rounded-lg w-full  shadow-md flex flex-col justify-between p-4  ">
      <div className=" text-xs self-end mb-2 cursor-pointe font-semibold">
        <text>Summary </text>
      </div>
      <div className="flex justify-between items-center overflow-scroll no-scrollbar gap-4">
        {breakfastItem !== undefined && (
          <MiniRecipeTile
            name={breakfastItem.name}
            image={breakfastItem.image}
            headline="Breakfast"
            id={breakfastItem.id}
          />
        )}

        {mealItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Meals" : undefined}
            id={value.id}
          />
        ))}
        {snackItems.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
            headline={index === 0 ? "Snacks" : undefined}
            id={value.id}
          />
        ))}
      </div>
    </div>
  );
};
