import Head from "next/head";
import Layout from "@/components/Layout/Layout";

import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";

import SymptomsTable from "@/components/SymptomsTable/SymptomsTable";

export const Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getSymptomLogs = async () => {
      let { data: Symptoms, error } = await supabase
        .from("Symptom Logs")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        setError(`ERROR: ${error}`);
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

Page.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Symptoms | DigestiTrak</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};
