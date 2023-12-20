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
    <div className="flex flex-col py-20 px-10  w-screen min-h-screen items-center">
      <div className="w-full  h-full  flex justify-between gap-7 ">
        <div className="w-3/4 flex border rounded-lg p-7  gap-7">
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
        <RecommendedSection recommended={recommended} />
      </div>
      <FooterSection steps={steps} ingredients={ingredients} />
    </div>
  );
};
