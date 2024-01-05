import Link from "next/link";
import { MiniRecipeTileProps } from "../interfaces";
import Image from "next/image";

export const MiniRecipeTile = ({
  name,
  image,
  headline,
  id,
}: MiniRecipeTileProps) => {
  console.log(id);
  return (
    <Link href={`/recipe/${id}`} target="_blank">
      <div className="flex flex-col h-[230px] ">
        <text className="font-bold h-[30px]"> {headline}</text>
        <div className=" h-[200px] w-[200px] cursor-pointer border rounded-lg shadow-lg flex flex-col p-3 items-center justify-center hover:shadow-md gap-3  ">
          <text className="  text-xs  text-center text-black">{name}</text>
          <div>
            <Image
              src={image}
              height={150}
              width={150}
              alt={`image of ${name}`}
              className="border rounded-lg"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
