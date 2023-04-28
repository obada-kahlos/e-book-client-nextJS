import { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default function Document() {
  return (
    <Html lang="en" className="">
      <Head></Head>
      <body className="dark:bg-gray-800 bg-blue-100 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
