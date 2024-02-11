import { HalfPageForm, Layout } from "../components";

const IndexPage = () => (
  <Layout title="WellnessMate - Homepage">
    <div>
      <div className=" ">
        <main className="flex justify-center">
          <HalfPageForm />
        </main>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
