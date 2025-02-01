import React from "react";

import Link from "next/link";

const ActionBanner = () => {
  return (
    <section className="col-span-full bg-white shadow-sm p-3 min-h-28 rounded xl:grid xl:grid-cols-12 xl:items-center">
      <div className="xl:col-span-9">
        <h1 className="text-5xl font-bold text-evening-sea-500">
          Hello, Alex!
        </h1>
      </div>
      <div className="xl:col-span-3 flex justify-end gap-2">
        <button>
          <Link
            className="block bg-evening-sea-500 text-evening-sea-50 font-semibold py-3 px-2 rounded shadow hover:shadow-md hover:-translate-y-0.5 transition-all"
            href="/symptom-logs"
          >
            New Symptom
          </Link>
        </button>
        <button>
          <Link
            className="block bg-evening-sea-500 text-evening-sea-50 font-semibold py-3 px-2 rounded shadow hover:shadow-md hover:-translate-y-0.5 transition-all"
            href="/meal-logs"
          >
            New Meal
          </Link>
        </button>
      </div>
    </section>
  );
};

export default ActionBanner;
