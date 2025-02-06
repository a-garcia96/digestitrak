import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <Head>
        <meta charset="UTF-8" />
      </Head>
      <body className="h-full bg-gray-50 text-evening-sea-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
