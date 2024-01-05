import Image from "next/image";
import { ExternalLink, PDFLink } from "../../icons";
import { StarRating } from "../../atoms";
import { ImageSectionProps } from "../../interfaces";
import Link from "next/link";
export const ImageSection = ({
  image,
  name,
  description,
  rating,
  voteCount,
  url,
}: ImageSectionProps) => {
  return (
    <>
      {/* //Image section */}
      <div className=" max-w-[500px]">
        <text className="font-bold">{name}</text>

        <div className="rounded-lg overflow-hidden mt-1">
          <Image
            src={image}
            height={500}
            width={500}
            alt={`image of ${name}`}
          />
        </div>
        <div className="text-sm mt-1">
          <text>{description}</text>
        </div>
        <div className="flex mt-4 gap-3 items-center">
          <PDFLink />
          <Link href={url} target="_blank">
            <ExternalLink size={16} />
          </Link>
          <StarRating rating={rating} voteCount={voteCount} />
        </div>
      </div>
    </>
  );
};
