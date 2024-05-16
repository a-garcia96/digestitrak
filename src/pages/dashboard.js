import Head from "next/head";

import Layout from "@/components/Layout/Layout";
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

  const { data: userData } = await supabase
    .from("user_data")
    .select()
    .eq("user_id", data.user.id);

  return {
    props: {
      user: data.user,
      userData: userData,
    },
  };
}

export default function Page({ user, userData }) {
  return (
    <>
      <Head>
        <title>Dashboard | Digestitrak | GERD Symptom Tracker</title>
      </Head>
      <Layout pageTitle={"Dashboard"} user={user} userData={userData}>
        <h1>Dashboard</h1>
      </Layout>
    </>
  );
}
