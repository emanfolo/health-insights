import { GaugeChart, NutritionLabel, PieChart } from "../../atoms";
import { NutritionalSummary } from "../../interfaces";

export const MacrosBreakdownTile = ({
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
}: NutritionalSummary) => {
  const data = [
    { name: "Protein", value: totalProtein },
    { name: "Carbs", value: totalCarbs },
    { name: "Fats", value: totalFat },
  ];
  return (
    <div className=" border rounded-lg  h-full  w-full shadow-md flex flex-col p-4 bg-white">
      <div className="flex flex-col justify-between items-center p-5 gap-8 md:flex-row">
        <div className="flex flex-col  w-3/4">
          <text className="font-medium text-sm">Nutritional breakdown</text>
          <div className=" text-sm">
            <text>Macros split</text>

            <PieChart data={data} />
          </div>
          {/* <div className="flex justify-around sm:justify-between md:justify-around gap-3">
            <div className="flex flex-col justify-center items-center gap-2">
              <text className="font-medium text-sm">Nutri score</text>
              <GaugeChart value={averageNutritionalScore} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <text className="font-medium text-sm">Protein score</text>
              <GaugeChart value={averageProteinScore} />
            </div>

          </div> */}
        </div>
        <div className="gap-3 flex flex-col self-center">
          <text className="font-medium text-sm">
            Nutritional label for mealplan
          </text>
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
        </div>
      </div>
    </div>
  );
};
