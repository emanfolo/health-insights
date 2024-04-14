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

export const ExploreDisplay = () => {
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(21); // or any other default value
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [prepTimeBoundary, setPrepTimeBoundary] = useState(100);
  const [cookTimeBoundary, setCookTimeBoundary] = useState(100);
  const [calorieBoundary, setCalorieBoundary] = useState(800);
  const [proteinBoundary, setProteinBoundary] = useState(10);
  const [nutriScoreBoundary, setNutriScoreBoundary] = useState(70);

  const fetchData = async () => {
    const requestUrl = `${recipeApiUrl}/search?page=${currentPage}&limit=${itemsPerPage}`;
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
    const response = await res.json();
    const recipes: Recipe[] = response.recipes;
    setData(recipes);
    setTotalPages(response.totalPages);
    setTotalResults(response.totalResults);
    setLoading(false);
  };

  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    debouncedFetchData();
  }, [
    searchTerm,
    proteinBoundary,
    prepTimeBoundary,
    cookTimeBoundary,
    calorieBoundary,
    nutriScoreBoundary,
    currentPage,
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

          <div className="p-4 grid md:grid-cols-5">
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
            <div className="p-4">
              <div className=" w-fit grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 justify-center gap-5 py-4">
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
              </div>
              {data.length === 0 && !loading && (
                <text className="flex justify-center items-center text-3xl font-light my-32">
                  No results found
                </text>
              )}
            </div>
            <div className="flex justify-center pb-4">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
