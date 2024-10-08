import React from "react";
import Head from "next/head";

import Layout from "@/components/Layout/Layout";

const Page = () => {
  return <div>new entry</div>;
};

export default Page;

Page.getLayout = function getLayout({ page }) {
  return (
    <>
      <Head>
        <title>New Symptom Entry</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};
