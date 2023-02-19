import { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head></Head>
      <body className="dark:bg-dark-bgColor bg-light-bgColor">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
