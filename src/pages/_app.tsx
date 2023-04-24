import React, { useEffect } from "react";
import AOS from "aos";
import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer />
      </Provider>
    </React.StrictMode>
  );
}
