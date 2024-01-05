import Link from "next/link";
import { Button } from "../atoms";
import Image from "next/image";

const Build = () => {
  return (
    <>
      I am the basket/add to basket cta page
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <Image
          alt="Recipe 1"
          className="object-cover w-full h-64"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="font-bold text-xl">Spaghetti Bolognese</h3>
          <Button className="mt-2" text="remove" onClick={() => null} />
        </div>
      </div>
    </>
  );
};

export default Build;
