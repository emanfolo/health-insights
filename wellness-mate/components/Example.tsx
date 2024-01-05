import { TargetNutrientsTile } from "../molecules";

export const Example = ({ mealplan }) => {
  return (
    <div className=" lg:w-1/2 flex flex-col justify-center items-center gap-5">
      <text className="text-xl font-semibold">Example mealplan analysis</text>
      <div className=" h-[350px]">
        <TargetNutrientsTile mealplan={mealplan} />
      </div>
    </div>
  );
};
