import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { createClient } from "@/utils/supabase/component";

import SymptomOverview from "@/components/Dashboard/SymptomOverview/SymptomOverview";
import SymptomOverviewEmptyState from "@/components/Dashboard/SymptomOverviewEmptyState/SymptomOverviewEmptyState";

import Layout from "@/components/Layout/Layout";

export default function Page() {
  return (
    <>
      <div className="md:grid md:grid-cols-12 md:gap-5">
        <section className="col-span-6">
          <SymptomOverview />
        </section>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Dashboard | Digestitrak | GERD Symptom Tracker</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};
