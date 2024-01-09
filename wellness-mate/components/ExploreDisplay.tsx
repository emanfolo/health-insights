import { useEffect, useState } from "react";
import { LoadingSpinner, MiniRecipeTile, RangeInput } from "../atoms";
import { ExploreDisplayProps, Recipe } from "../interfaces";
import { debounce } from "lodash";

export const ExploreDisplay = ({ recipes }: ExploreDisplayProps) => {
  const [data, setData] = useState(recipes);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [prepTimeBoundary, setPrepTimeBoundary] = useState(100);
  const [cookTimeBoundary, setCookTimeBoundary] = useState(100);
  const [calorieBoundary, setCalorieBoundary] = useState(800);
  const [proteinBoundary, setProteinBoundary] = useState(10);
  const [nutriScoreBoundary, setNutriScoreBoundary] = useState(70);

  const fetchData = async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.API_URL
        : "http://127.0.0.1:5000";
    const requestUrl = `${apiUrl}/search`;

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        proteinBoundary: proteinBoundary,
        prepBoundary: prepTimeBoundary,
        cookingBoundary: cookTimeBoundary,
        calorieBoundary: calorieBoundary,
        nutriScoreBoundary: nutriScoreBoundary,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const recipes: Recipe[] = await res.json();
    console.log(data);
    setData(recipes);
  };

  const debouncedFetchData = debounce(fetchData, 2000);

  useEffect(() => {
    setLoading(true);
    debouncedFetchData(
      searchTerm,
      proteinBoundary,
      prepTimeBoundary,
      cookTimeBoundary,
      calorieBoundary,
      nutriScoreBoundary,
    );
    setLoading(false);
  }, [
    searchTerm,
    proteinBoundary,
    prepTimeBoundary,
    cookTimeBoundary,
    calorieBoundary,
    nutriScoreBoundary,
  ]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-[200px] mt-5 flex flex-col items-center">
          <div className="flex gap-3">
            <input
              className=" w-[300px] md:w-[500px] border rounded-lg h-[30px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
          <div className="flex flex-col md:flex-row p-4">
            <div className="flex flex-col w-[300px] md:w-[180px]">
              <text className="text-xs">Max Calories</text>
              <RangeInput
                name="calorieBoundary"
                minValue={0}
                maxValue={800}
                value={calorieBoundary}
                setValue={setCalorieBoundary}
                className=""
                suffix={""}
              />
            </div>
            <div className="flex flex-col">
              <text className="text-xs">Min Protein</text>
              <RangeInput
                name="proteinBoundary"
                minValue={0}
                maxValue={50}
                value={proteinBoundary}
                setValue={setProteinBoundary}
                className=""
                suffix={"g"}
              />
            </div>
            <div className="flex flex-col">
              <text className="text-xs">Min Nutri Score</text>
              <RangeInput
                name="proteinBoundary"
                minValue={0}
                maxValue={100}
                value={nutriScoreBoundary}
                setValue={setNutriScoreBoundary}
                className="text-xs"
                suffix={""}
              />
            </div>
            <div className="flex flex-col">
              <text className="text-xs">Max Cook Time</text>
              <RangeInput
                name="proteinBoundary"
                minValue={0}
                maxValue={100}
                value={cookTimeBoundary}
                setValue={setCookTimeBoundary}
                className=""
                suffix={"mins"}
              />
            </div>
            <div className="flex flex-col">
              <text className="text-xs">Max Prep Time</text>{" "}
              <RangeInput
                name="proteinBoundary"
                minValue={0}
                maxValue={100}
                value={prepTimeBoundary}
                setValue={setPrepTimeBoundary}
                className=""
                suffix={"mins"}
              />
            </div>
          </div>

          <div>
            <text className="flex justify-center text-xl font-semibold">
              Results
            </text>
            <div className="flex justify-center items-center">
              <div className=" w-fit flex flex-wrap justify-center gap-4 pb-4">
                {data.map((recipe) => (
                  <MiniRecipeTile
                    name={recipe.name}
                    image={recipe.image}
                    key={recipe.name}
                    id={recipe.id}
                  />
                ))}
                {data.length === 0 && (
                  <text className="flex justify-center items-center text-3xl font-light my-32">
                    No results found
                  </text>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
