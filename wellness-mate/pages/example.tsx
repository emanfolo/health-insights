import { MealplanDisplay, Layout } from "../components";
import mealplan from "../utils/mealplanExample.json";
import "../app/global.css";

const Example = () => {
  return (
    <>
      <Layout title="WellnessMate - Example mealplan">
        <div>
          <MealplanDisplay mealplan={mealplan} />
        </div>
      </Layout>
    </>
  );
};

export default Example;
