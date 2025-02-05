import { BarChart, Card, Divider, Switch } from "@tremor/react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { useStore } from "@/store";

export default function SymptomOverview() {
  const supabase = createClient();
  const user = useStore((state) => state.user);

  const [episodeCount, setEpisodeCount] = useState(0);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const getEpisodeCount = async () => {
      const { count, error } = await supabase
        .from("Symptom Logs")
        .select("*", { count: "exact", head: true }) // 'head: true' returns only the count, not data
        .eq("user_id", user.id)
        .gte("date", sevenDaysAgo.toISOString()); // Filter for the last 7 days

      if (error) {
        console.error("Error fetching row count:", error);
        return null;
      }

      setEpisodeCount(count);
    };

    const getEpisodes = async () => {
      const { data, error } = await supabase
        .from("Symptom Logs")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", sevenDaysAgo.toISOString()) // Filter for the last 7 days
        .order("date", { ascending: true });

      if (error) {
        return null;
      }

      // setup empty array. This will store the data in a formatted way so I can have the bar chart read this instead of the actual data from the database.
      const groupedData = [];

      for (let i = 0; i < data.length; i++) {
        const dataEntry = data[i];

        // format the date from ISO to locale string containign the fully spelled out month and day only.
        const timeInLocale = new Date(dataEntry.date).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
        });

        // PUSH THE FIRST ITEM TO THE GROUPED DATA ARRAY
        if (groupedData.length === 0) {
          groupedData.push({
            date: timeInLocale,
            count: 1,
          });
        } else if (groupedData.find((item) => item.date === timeInLocale)) {
          //IF the grouped data array contains an object with the date property matching the current time in locale then just up the count by one.
          const index = groupedData.findIndex(
            (item) => item.date === timeInLocale
          );

          groupedData[index].count += 1;
        } else {
          // Else push a new object with the current locale string to the array and set the count to an initial number of 1.
          groupedData.push({
            date: timeInLocale,
            count: 1,
          });
        }
      }

      console.log(groupedData);

      setEpisodes([...groupedData]);
    };

    getEpisodeCount();
    getEpisodes();
  }, []);

  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded border bg-white">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`flex w-1 flex-col bg-evening-sea-500 rounded`} />
            <div className="space-y-1">
              {/* <p className="text-tremor-content">{category.payload.date}</p> */}
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} episodes
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const totalEpisodesForTheWeek = data.reduce((a, b) => {
    return a + b.today;
  }, 0);

  return (
    <section className="col-span-6 bg-white shadow-sm">
      <Card className="p-3 ring-0 shadow-none">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-evening-sea-500 text-lg">
            Symptoms overview
          </h3>
          <div className="bg-gray-50 w-fit px-2 py-4 rounded-md">
            <p className="text-evening-sea-500">
              <span className="mr-1 font-bold">{episodeCount}</span>
              <span className="text-evening-sea-950">
                episodes in the last 7 days
              </span>
            </p>
          </div>
        </div>
        <BarChart
          data={episodes}
          index="date"
          categories={["count"]}
          colors={["evening-sea-500"]}
          allowDecimals={false}
          className="mt-6 hidden h-60 sm:block"
          showGridLines={false}
          showLegend={false}
          customTooltip={customTooltip}
        />
        {/* MOBILE DISPLAY BAR CHART */}
        <BarChart
          data={data}
          index="date"
          categories={["This Year"]}
          colors={["evening-sea-500"]}
          showYAxis={false}
          className="mt-4 h-56 sm:hidden"
        />
      </Card>
    </section>
  );
}
