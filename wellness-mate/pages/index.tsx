import { Example, HalfPageForm, Layout } from "../components";
import "../app/global.css";
import mealplan from "../utils/mealplanExample.json";
import { apiUrl } from "../utils";

const IndexPage = () => (
  <Layout title="WellnessMate - Homepage">
    <div>
      <div className=" flex flex-col pb-4 md:p-0">
        <main className=" flex flex-col lg:flex-row">
          <HalfPageForm />
          <Example mealplan={mealplan} />
        </main>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
