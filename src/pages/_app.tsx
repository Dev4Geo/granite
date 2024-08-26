// _app.tsx

import { AppProps } from "next/app";
import "../app/globals.css";
import MyHeader from "@/components/shared/myHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center bg-white h-full text-gray-600 ">
      <MyHeader />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
