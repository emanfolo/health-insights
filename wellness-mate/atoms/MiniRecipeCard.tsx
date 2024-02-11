import Link from "next/link";
import { MiniRecipeTileProps } from "../interfaces";

export const MiniRecipeCard = ({
  name,
  image,
  headline,
  id,
  kcal,
  description,
  nutriScore,
  proteinScore,
}: MiniRecipeTileProps) => {
  return (
    <Link
      href={`/recipe/${id}`}
      className=" card w-80 bg-base-100 shadow-xl text-black hover:no-underline hover:shadow-lg"
    >
      <figure>
        <img src={image} alt={`image of ${name}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-xs">{description}</p>
        <div className="card-actions justify-end">
          {nutriScore && nutriScore > 90 && (
            <div className="badge badge-primary p-3">Low calorie</div>
          )}
          {proteinScore && proteinScore > 90 && (
            <div className="badge badge-secondary p-3">High protein</div>
          )}
        </div>
      </div>
    </Link>
  );
};
