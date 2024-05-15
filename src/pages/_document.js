import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-evening-sea-50 text-evening-sea-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
