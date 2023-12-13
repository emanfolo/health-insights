import Link from "next/link";
import Layout from "../components/Layout";
import { Example, HalfPageForm } from "../components";
import "../app/global.css";

const IndexPage = () => (
  <Layout title="WellnessMate - Homepage">
    <div>
      <div className=" flex flex-col min-h-screen">
        <main className="flex">
          <HalfPageForm />
          <Example />
        </main>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
