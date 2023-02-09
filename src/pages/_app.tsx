import React from "react";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Provider>
    </React.StrictMode>
  );
}
