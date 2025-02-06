import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout/Layout";
import AccountLayout from "@/components/AccountLayout/AccountLayout";
import Card from "@/components/Card/Card";

import { createClient } from "@/utils/supabase/server-props";

export async function getServerSideProps(context) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let { data: user_data } = await supabase
    .from("user_data")
    .select()
    .eq("id", data.user.id);

  return {
    props: {
      user: data.user,
      userData: user_data[0],
    },
  };
}

export default function Page({ user, userData }) {
  return (
    <>
      <Head>
        <title>My Profile | Digestitrak</title>
      </Head>
      <Layout user={user} userData={userData}>
        <Card>
          <AccountLayout user={user} userData={userData} />
        </Card>
      </Layout>
    </>
  );
}
