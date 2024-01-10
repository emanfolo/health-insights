import { MiniRecipeTile } from "../../atoms";
import { RecommendedSectionProps } from "../../interfaces";

export const RecommendedSection = ({
  recommended,
}: RecommendedSectionProps) => {
  return (
    <>
      {/* // Similar recipes */}
      <div className="lg:p-6 pt-0 flex-col flex items-center ">
        <text className=" font-bold">Similar recipes</text>
        <div className="flex flex-col md:flex-row lg:flex-col gap-3">
          {recommended.map((value, index) => (
            <MiniRecipeTile
              key={`${value.name}-${index}`}
              name={value.name}
              image={value.image}
              id={value.id}
              kcal={value.kcal}
            />
          ))}
        </div>
      </div>
    </>
  );
};
