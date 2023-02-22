import React, { useEffect } from "react";
import AOS from "aos";
import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app";

import "@/styles/globals.css";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </Provider>
    </React.StrictMode>
  );
}
