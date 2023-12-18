import { MiniRecipeTileProps } from "../interfaces";
import Image from "next/image";

export const MiniRecipeTile = ({
  name,
  image,
  headline,
}: MiniRecipeTileProps) => {
  return (
    <div className="flex flex-col h-[230px] ">
      <text className="font-bold h-[30px]"> {headline}</text>
      <div className=" h-[200px] w-[200px] cursor-pointer border rounded-lg flex flex-col p-3 items-center justify-center hover:shadow-md  ">
        <text className=" text-xs font-semibold">{name}</text>
        <div>
          <Image
            src={image}
            height={150}
            width={150}
            alt={`image of ${name}`}
          />
        </div>
      </div>
    </div>
  );
};
