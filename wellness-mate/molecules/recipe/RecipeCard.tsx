import Link from "next/link";
import { ExternalLink } from "../../icons";
import { RecipeCardProps } from "../../interfaces";
import Image from "next/image";
import { GaugeChart, StarRating } from "../../atoms";

export const RecipeCard = ({
  image,
  description,
  url,
  rating,
  voteCount,
  difficulty,
  dishType,
  prepTime,
  cookTime,
  nutritionalScore,
  proteinScore,
}: RecipeCardProps) => {
  const parseTimeCopy = (time: number) =>
    time === 0 ? "Instant" : `${time} mins`;

  return (
    <div className=" card  bg-base-100 shadow-xl  lg:w-11/12 xl:w-full ">
      <figure>
        <Image height={700} width={700} src={image} alt="Album" />
      </figure>
      <div className="card-body p-5 ">
        <div className="text-sm mt-1 max-w-xl">
          <text>{description}</text>
        </div>
        <div className="flex mt-4 gap-3 items-center">
          {/* <PDFLink /> */}
          <Link href={url} target="_blank">
            <ExternalLink size={16} />
          </Link>
          <StarRating rating={rating} voteCount={voteCount} />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            {/* // Info section */}
            <div className="md:p-2 gap-5 flex flex-col">
              <div className="text-xs flex flex-col gap-3 font-semibold ">
                <text>Difficulty: {difficulty}</text>
                <text>Category: {dishType}</text>
                <text>Prep Time: {parseTimeCopy(prepTime)}</text>
                <text>Cook Time: {parseTimeCopy(cookTime)}</text>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-evenly gap-3 pt-3">
              <div className="flex flex-col justify-center items-center gap-2">
                <text className="font-medium text-sm">Nutri score</text>
                <GaugeChart value={nutritionalScore} />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <text className="font-medium text-sm">Protein score</text>
                <GaugeChart value={proteinScore} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
