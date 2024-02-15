import { Layout, LikedRecipesDisplay } from "../../../components";

const IndexPage = () => (
  <Layout title="WellnessMate - Homepage">
    <div>
      <div className=" ">
        <main className="flex justify-center w-screen">
            <LikedRecipesDisplay />
        </main>
      </div>
    </div>
  </Layout>
);

export default IndexPage;