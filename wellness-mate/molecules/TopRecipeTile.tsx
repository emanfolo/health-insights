import { GaugeChart, NutritionLabel } from "../atoms";
import { TopRecipeTileProps } from "../interfaces";

export const TopRecipeTile = ({
  highestNutritionalScoreObj,
}: TopRecipeTileProps) => {
  const { kcal, protein, salt, saturates, carbs, sugars, fat, fibre } =
    highestNutritionalScoreObj;
  return (
    <div className=" border rounded-lg  w-full   shadow-md h-[300px] ">
      <div className="flex justify-between p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <text className=" font-medium text-sm">Top Recipe</text>
            <text className=" text-xs">
              {highestNutritionalScoreObj.name}
              {/* Make this a link to recipe page in new tab */}
            </text>
          </div>
          <div className=" flex flex-col gap-2 items-start justify-between w-1/2">
            {highestNutritionalScoreObj && (
              <>
                {/* Make this change color based on score */}
                <div className="flex flex-col items-center">
                  <text className="font-medium text-sm">Nutri score</text>

                  <GaugeChart
                    value={highestNutritionalScoreObj["nutritional_score"]}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <text className="text-sm font-medium">Protein score</text>

                  <GaugeChart
                    value={Math.round(
                      highestNutritionalScoreObj["protein_score"],
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="">
          <NutritionLabel
            {...{ salt, kcal, protein, saturates, sugars, carbs, fat, fibre }}
          />
        </div>
      </div>
    </div>
  );
};
