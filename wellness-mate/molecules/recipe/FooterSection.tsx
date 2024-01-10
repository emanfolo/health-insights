import { TextDropdown } from "../../atoms";

export const FooterSection = ({ steps, ingredients }) => {
  return (
    <>
      {/* Ingredients and instructions */}
      <div className="h-2/5 flex flex-col w-full p-6">
        <div className="flex flex-col gap-5">
          <TextDropdown
            className="z-10 bg-white max-w-xl"
            title={"Ingredients"}
          >
            <div className="flex flex-col">
              {ingredients.map((value: string) => (
                <text>{value}</text>
              ))}
            </div>
          </TextDropdown>
          <TextDropdown className="z-10 bg-white max-w-xl" title={"Steps"}>
            {steps.map((value: string) => (
              <text className="flex flex-col pt-2 z-10">{value}</text>
            ))}
          </TextDropdown>
        </div>
      </div>
    </>
  );
};
