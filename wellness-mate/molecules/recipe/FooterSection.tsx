import { TextDropdown } from "../../atoms";

export const FooterSection = ({ steps, ingredients }) => {
  return (
    <>
      {/* Ingredients and instructions */}
      <div className="h-2/5 flex flex-col w-full p-6">
        <div className="flex flex-col gap-5">
          <TextDropdown title={"Ingredients"}>
            <div className="flex flex-col">
              {ingredients.map((value) => (
                <text>{value}</text>
              ))}
            </div>
          </TextDropdown>
          <TextDropdown title={"Steps"}>
            {steps.map((value) => (
              <text className="flex flex-col pt-2">{value}</text>
            ))}
          </TextDropdown>
        </div>
      </div>
    </>
  );
};
