import Link from "next/link";
import { MiniRecipeTileProps } from "../interfaces";
import Image from "next/image";
export const MiniRecipeTile = ({
  name,
  image,
  headline,
  id,
  kcal,
}: MiniRecipeTileProps) => {
  return (
    <Link href={`/recipe/${id}`} target="_blank" className="hover:no-underline">
      <div className="flex flex-col  ">
        <div className="font-bold text-black min-h-[30px]"> {headline}</div>
        <div className=" h-[250px] w-[250px] cursor-pointer border rounded-lg shadow-lg flex flex-col p-3 items-center justify-center hover:shadow-md gap-3  ">
          <text className="h-[30px] font-semibold  text-xs  text-center text-black">
            {name}
          </text>
          <div className="">
            <Image
              src={image}
              height={180}
              width={180}
              alt={`image of ${name}`}
              className="border rounded-lg"
            />
          </div>
          <div className="text-xs text-black flex flex-col">
            <text className="font-semibold">{kcal} kcal</text>
          </div>
        </div>
      </div>
    </Link>
  );
};
