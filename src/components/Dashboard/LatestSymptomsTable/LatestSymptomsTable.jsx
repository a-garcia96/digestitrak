import React, { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/component";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Card from "@/components/Card/Card";
import Link from "next/link";

const LatestSymptomsTable = ({ userId }) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLatestSymptoms = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("Symptom Logs")
        .select("*")
        .eq("user_id", userId)
        .gte("date", sevenDaysAgo.toISOString()) // Filter for the last 7 days
        .order("date", { ascending: false });

      if (!error) {
        setLogs(data);
        setLoading(false);
      }
    };

    getLatestSymptoms();
  }, []);

  return (
    <section className="col-span-6">
      <Card>
        {loading && <LoadingSpinner />}
        {!loading && (
          <div className="overflow-y-scroll h-[600px] flex flex-col">
            <div>
              <h2 className="font-bold text-evening-sea-500 text-lg mb-4">
                Logs from the last 7 days
              </h2>
            </div>
            <div className="grow">
              {logs.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="font-bold text-gray-500 text-center w-full mb-2">
                    No Logs
                  </p>
                  <p className="text-sm text-gray-500 w-1/2">
                    There are no logs for the last 7 days of activity. Please
                    add new logs in the symptom logs page.
                  </p>
                </div>
              ) : (
                <ol className="space-y-2 divide-y">
                  {logs.map((log, i) => (
                    <li key={log.id} className="px-1 py-2">
                      <dl className="space-y-4">
                        <dt className="text-sm font-medium">
                          {new Date(log.date).toLocaleTimeString("en-US", {
                            day: "numeric",
                            weekday: "long",
                            hour: "numeric",
                            minute: "numeric",
                            year: "numeric",
                            month: "long",
                          })}
                        </dt>
                        <dd className="text-xs min-h-5vh bg-gray-100 px-2 py-2 text-gray-700">
                          {log.comments}
                        </dd>
                        <ul className="flex space-x-3 text-xs">
                          {log.symptoms.map((symptom, i) => (
                            <li
                              className="bg-yellow-200 rounded-full text-yellow-950 px-4 py-1"
                              key={i}
                            >
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </dl>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div>
              <Link
                href={"/symptom-logs"}
                className="block font-semibold bg-evening-sea-500 text-center p-2 rounded mt-4 text-evening-sea-50 hover:bg-evening-sea-600 transition-all"
              >
                See all logs
              </Link>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};

export default LatestSymptomsTable;
