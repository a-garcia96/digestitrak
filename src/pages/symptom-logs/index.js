import Head from "next/head";
import Layout from "@/components/Layout/Layout";

import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";

import SymptomsTable from "@/components/SymptomsTable/SymptomsTable";

import { createClient as createServerClient } from "@/utils/supabase/server-props";

export async function getServerSideProps(context) {
  const supabase = createServerClient(context);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
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
    .eq("id", user.id);

  return {
    props: {
      user: user,
      userData: user_data[0],
    },
  };
}

export const Page = (user, userData) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getSymptomLogs = async () => {
      let { data: Symptoms, error } = await supabase
        .from("Symptom Logs")
        .select("*")
        .eq("user_id", user.user.id)
        .order("date", { ascending: false });

      if (error) {
        setError(`ERROR: ${JSON.stringify(error)} ${JSON.stringify(user)}`);
        return error;
      }

      setData(Symptoms);
    };

    getSymptomLogs();
  }, []);

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {data && (
          <div>
            <SymptomsTable symptomsData={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page, { user, userData }) {
  return (
    <>
      <Head>
        <title>Symptoms | DigestiTrak</title>
      </Head>
      <Layout user={user} userData={userData}>
        {page}
      </Layout>
    </>
  );
};
