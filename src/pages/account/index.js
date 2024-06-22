import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout/Layout";
import AccountLayout from "@/components/AccountLayout/AccountLayout";

export default function Page() {
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout>
        <AccountLayout />
      </Layout>
    </>
  );
}
