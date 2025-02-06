import Head from "next/head";

import { useStore } from "@/store";

import Layout from "@/components/Layout/Layout";
import ActionBanner from "@/components/Dashboard/ActionBanner/ActionBanner";
import SymptomOverview from "@/components/Dashboard/SymptomOverview/SymptomOverview";

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

  console.log(user_data);

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
      <div className="md:grid md:grid-cols-12 md:gap-5">
        {/* COMPONENTS MUST SPECIFIY HOW MANY COLUMNS TO USE */}
        <ActionBanner name={userData.name || user.email} />
        <SymptomOverview />
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page, { user, userData }) {
  return (
    <>
      <Head>
        <title>Dashboard | Digestitrak | GERD Symptom Tracker</title>
      </Head>
      <Layout user={user} userData={userData}>
        {page}
      </Layout>
    </>
  );
};
