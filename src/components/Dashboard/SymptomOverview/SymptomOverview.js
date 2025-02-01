import { BarChart, Card, Divider, Switch } from "@tremor/react";
import { useState } from "react";

const data = [
  {
    date: "Feb 1",
    today: 2,
  },
  {
    date: "Feb 2",
    today: 4,
  },
  {
    date: "Feb 3",
    today: 1,
  },
  {
    date: "Feb 4",
    today: 8,
  },
  {
    date: "Feb 5",
    today: 10,
  },
  {
    date: "Feb 6",
    today: 3,
  },
  {
    date: "Feb 7",
    today: 0,
  },
];

function valueFormatter(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
}

export default function SymptomOverview() {
  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded border bg-white">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`flex w-1 flex-col bg-evening-sea-500 rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.payload.date}</p>
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
              <span className="mr-1 font-bold">{totalEpisodesForTheWeek}</span>
              <span className="text-evening-sea-950">episodes this week</span>
            </p>
          </div>
        </div>
        <BarChart
          data={data}
          index="date"
          categories={["today"]}
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
          valueFormatter={valueFormatter}
          showYAxis={false}
          className="mt-4 h-56 sm:hidden"
        />
      </Card>
    </section>
  );
}
