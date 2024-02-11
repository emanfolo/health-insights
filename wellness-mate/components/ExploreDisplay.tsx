import { useEffect, useState } from "react";
import {
  LoadingSpinner,
  MiniRecipeCard,
  MiniRecipeTile,
  Pagination,
  RangeInput,
} from "../atoms";
import { ExploreDisplayProps, Recipe } from "../interfaces";
import { debounce } from "lodash";
import { recipeApiUrl } from "../utils";

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
    const requestUrl = `${recipeApiUrl}/search`;

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
        <div className=" mt-5 flex flex-col items-center">
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
                className="range range-xs"
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
                className="range range-xs"
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
                className="text-xs range range-xs"
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
                className=" range range-xs"
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
                className=" range range-xs"
                suffix={"mins"}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-center items-center">
              <div className=" w-fit flex flex-wrap justify-center gap-4 py-4">
                {data.map((recipe) => (
                  <MiniRecipeCard
                    name={recipe.name}
                    image={recipe.image}
                    key={recipe.name}
                    id={recipe.id}
                    kcal={recipe.kcal}
                    description={recipe.description}
                    nutriScore={recipe.nutritional_score}
                    proteinScore={recipe.protein_score}
                  />
                ))}
                {data.length === 0 && (
                  <text className="flex justify-center items-center text-3xl font-light my-32">
                    No results found
                  </text>
                )}
              </div>
            </div>
            {/* <Pagination /> */}
          </div>
        </div>
      )}
    </>
  );
};
