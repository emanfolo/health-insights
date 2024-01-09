import { NutritionLabel, GaugeChart } from "../../atoms";
import { InfoSectionProps } from "../../interfaces";

export const InfoSection = ({
  difficulty,
  dishType,
  prepTime,
  cookTime,
  kcal,
  sugars,
  carbs,
  fibre,
  fat,
  protein,
  salt,
  saturates,
  nutritionalScore,
  proteinScore,
}: InfoSectionProps) => {
  return (
    <>
      {/* // Info section */}
      <div className="md:p-5 gap-5 flex flex-col">
        <div className="text-xs flex flex-col gap-3 ">
          <text>Difficulty: {difficulty}</text>
          <text>Category: {dishType}</text>
          <text>Prep Time: {prepTime} mins</text>
          <text>Cook Time: {cookTime} mins</text>
        </div>

        {/* // Nutrition section */}
        <div className="flex flex-col gap-5">
          <div className=" flex flex-col justify-between gap-3">
            <text className="font-medium text-sm">Nutritional label</text>
            <NutritionLabel
              kcal={kcal}
              sugars={sugars}
              carbs={carbs}
              fibre={fibre}
              fat={fat}
              protein={protein}
              salt={salt}
              saturates={saturates}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-col justify-center items-center gap-2">
              <text className="font-medium text-sm">Nutri score</text>
              <GaugeChart value={nutritionalScore} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <text className="font-medium text-sm">Protein score</text>
              <GaugeChart value={proteinScore} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
