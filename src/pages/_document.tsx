import { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default function Document() {
  const [theme, setTheme] = useState(true);

  return (
    <Html lang="en" theme-data={theme ? "light" : "dark"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
