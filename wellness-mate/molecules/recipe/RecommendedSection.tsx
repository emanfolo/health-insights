import { MiniRecipeTile } from "../../atoms";
import { RecommendedSectionProps } from "../../interfaces";

export const RecommendedSection = ({
  recommended,
}: RecommendedSectionProps) => {
  return (
    <>
      {/* // Similar recipes */}
      <div className="w-1/4   flex-col flex items-center ">
        <text className=" font-bold">Similar recipes</text>
        {recommended.map((value, index) => (
          <MiniRecipeTile
            key={`${value.name}-${index}`}
            name={value.name}
            image={value.image}
          />
        ))}
      </div>
    </>
  );
};
