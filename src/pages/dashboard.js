import Head from "next/head";

import { useStore } from "@/store";

import Layout from "@/components/Layout/Layout";
import ActionBanner from "@/components/Dashboard/ActionBanner/ActionBanner";
import SymptomOverview from "@/components/Dashboard/SymptomOverview/SymptomOverview";

export default function Page() {
  const user = useStore((state) => state.user);
  const userData = useStore((state) => state.userData);

  return (
    <>
      <div className="md:grid md:grid-cols-12 md:gap-5">
        {/* COMPONENTS MUST SPECIFIY HOW MANY COLUMNS TO USE */}
        <ActionBanner data={user} />
        <SymptomOverview />
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
