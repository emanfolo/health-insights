import { GaugeChart, NutritionLabel } from "../../atoms";
import { ExternalLink } from "../../icons";
import { TopRecipeTileProps } from "../../interfaces";
import Link from "next/link";

export const TopRecipeTile = ({
  highestNutritionalScoreObj,
}: TopRecipeTileProps) => {
  const { kcal, protein, salt, saturates, carbs, sugars, fat, fibre, url } =
    highestNutritionalScoreObj;
  return (
    <div className=" border rounded-lg  w-full   shadow-md min-h-[320px] ">
      <div className="flex justify-around items-center p-4 gap-3 flex-col sm:flex-row">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <text className=" font-medium text-sm">Top Recipe</text>
            <Link
              href={url}
              target="_blank"
              className="text-black flex items-center gap-1"
            >
              <ExternalLink size={10} />

              <text className=" text-xs">
                {highestNutritionalScoreObj.name}
              </text>
            </Link>
          </div>
          <div className=" flex sm:flex-col gap-2 items-start justify-between w-1/2">
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
