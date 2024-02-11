import { Layout } from "../components";

const Error = () => {
  return (
    <Layout title="WellnessMate - Error">
      <div className="flex h-[calc(100vh-63px)] w-screen justify-center items-center font-semibold text-3xl">
        We've encountered an error, please try again later
      </div>
    </Layout>
  );
};

export default Error;
