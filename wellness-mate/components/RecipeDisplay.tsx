import { RecipeDisplayProps } from "../interfaces";
import {
  ImageSection,
  InfoSection,
  RecommendedSection,
  FooterSection,
} from "../molecules";

export const RecipeDisplay = ({ recipe, recommended }: RecipeDisplayProps) => {
  const {
    nutritional_score,
    protein_score,
    kcal,
    protein,
    sugars,
    saturates,
    salt,
    carbs,
    fat,
    fibre,
    image,
    name,
    ingredients,
    steps,
    ratings,
    vote_count,
    dish_type,
    difficult,
    times,
    description,
    url,
  } = recipe;

  return (
    <div className="flex flex-col py-10 px-10  w-screen min-h-screen items-center">
      <text className="font-bold text-2xl p-3">{name}</text>

      <div className="w-full  h-full  flex flex-col justify-between gap-7 ">
        <div className=" flex flex-col md:flex-row border rounded-lg p-5 md:p-7 lg:justify-evenly  gap-7 shadow-lg bg-white">
          <ImageSection
            name={name}
            description={description}
            image={image}
            rating={ratings}
            voteCount={vote_count}
            url={url}
          />
          <InfoSection
            difficulty={difficult}
            dishType={dish_type}
            prepTime={times.Preparation}
            cookTime={times.Cooking}
            kcal={kcal}
            fibre={fibre}
            sugars={sugars}
            carbs={carbs}
            fat={fat}
            protein={protein}
            salt={salt}
            saturates={saturates}
            nutritionalScore={nutritional_score}
            proteinScore={protein_score}
          />
        </div>
      </div>
      <FooterSection steps={steps} ingredients={ingredients} />
      <div className=" ">
        <RecommendedSection recommended={recommended} />
      </div>
    </div>
  );
};
