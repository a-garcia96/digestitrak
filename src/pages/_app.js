import "@/styles/globals.css";

import { SidebarLayout } from "@/components/Catalyst/sidebar-layout";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />, pageProps);
}
