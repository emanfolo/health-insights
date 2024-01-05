import { MealplanDisplay, Layout } from "../components";
import mealplan from "../utils/mealplanExample.json";
import "../app/global.css";

const Example = () => {
  return (
    <>
      <Layout title="WellnessMate - Create a mealplan">
        <div>
          <MealplanDisplay mealplan={mealplan} />
        </div>
      </Layout>
    </>
  );
};

export default Example;
