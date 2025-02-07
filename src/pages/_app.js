import "@/styles/globals.css";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <NextNProgress color="#10BAA9" />
      <Component {...pageProps} />
    </>,
    pageProps
  );
}
