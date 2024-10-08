import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";

const Page = () => {
  return (
    <>
      <h1>Meal Logs</h1>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Meal Logs | Digestitrack</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};
