import { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext"; // Adjust the import path based on your actual file location
import "../app/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
