import { RecipeDisplayProps } from "../interfaces";
import {
  RecommendedSection,
  FooterSection,
  RecipeCard,
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
      <div className=" flex flex-col lg:flex-row p-3 justify-center">
        <div className=" flex flex-col items-center gap-4">
          <text className="font-bold text-2xl ">{name}</text>

          <RecipeCard
            name={name}
            description={description}
            image={image}
            rating={ratings}
            voteCount={vote_count}
            url={url}
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
        <div className="lg:w-1/2 pt-6">
          <FooterSection
            steps={steps}
            ingredients={ingredients}
            kcal={kcal}
            fibre={fibre}
            sugars={sugars}
            carbs={carbs}
            fat={fat}
            protein={protein}
            salt={salt}
            saturates={saturates}
          />
        </div>
      </div>
      <RecommendedSection recommended={recommended} />
    </div>
  );
};
