import { NutritionLabel, PieChart, TextDropdown } from "../../atoms";

export const FooterSection = ({
  steps,
  ingredients,
  kcal,
  sugars,
  carbs,
  fibre,
  fat,
  protein,
  salt,
  saturates,
}) => {
  const data = [
    { name: "Protein", value: protein },
    { name: "Carbs", value: carbs },
    { name: "Fats", value: fat },
  ];
  return (
    <>
      {/* Ingredients and instructions */}
      <div className="h-2/5 flex flex-col w-full p-6">
        <div className="flex flex-col gap-5">
          <TextDropdown className="z-10  " title={"Nutritional Information"}>
            <div className=" flex justify-around">
              <NutritionLabel
                kcal={kcal}
                sugars={sugars}
                carbs={carbs}
                fibre={fibre}
                fat={fat}
                protein={protein}
                salt={salt}
                saturates={saturates}
              />{" "}
              <div className="  2xl:flex  flex-col text-sm pl-5 hidden ">
                <text className="font-bold">Macros Split</text>

                <PieChart data={data} />
              </div>
            </div>
          </TextDropdown>
          <TextDropdown className="z-10  " title={"Ingredients"}>
            <div className="flex flex-col">
              {ingredients.map((value: string, index: number) => (
                <text key={`ingredient-${index}`}>{value}</text>
              ))}
            </div>
          </TextDropdown>
          <TextDropdown className="z-10" title={"Steps"}>
            {steps.map((value: string, index: number) => (
              <text
                key={`ingredient-${index}`}
                className="flex flex-col pt-2 z-10"
              >
                {value}
              </text>
            ))}
          </TextDropdown>
        </div>
      </div>
    </>
  );
};
