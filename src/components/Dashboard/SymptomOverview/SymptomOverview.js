import { BarChart, Card, Divider, Switch } from "@tremor/react";
import { useState } from "react";

const data = [
  {
    date: "Jan 23",
    "This Year": 68560,
    "Last Year": 28560,
  },
  {
    date: "Feb 23",
    "This Year": 70320,
    "Last Year": 30320,
  },
  {
    date: "Mar 23",
    "This Year": 80233,
    "Last Year": 70233,
  },
  {
    date: "Apr 23",
    "This Year": 55123,
    "Last Year": 45123,
  },
  {
    date: "May 23",
    "This Year": 56000,
    "Last Year": 80600,
  },
  {
    date: "Jun 23",
    "This Year": 100000,
    "Last Year": 85390,
  },
  {
    date: "Jul 23",
    "This Year": 85390,
    "Last Year": 45340,
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
  const [showComparison, setShowComparison] = useState(false);

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
                {category.value} bpm
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="col-span-6 bg-white shadow-sm">
      <Card className="p-3 ring-0 shadow-none">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-evening-sea-500 text-lg">
            Symptoms overview
          </h3>
          <div className="bg-gray-50 w-fit px-2 py-4 rounded-md">
            <p className="text-evening-sea-500">
              <span className="mr-1 font-bold">{data.length}</span>
              <span className="text-evening-sea-950">Symptoms This Week</span>
            </p>
          </div>
        </div>
        <BarChart
          data={data}
          index="date"
          categories={["This Year"]}
          colors={["evening-sea-500"]}
          valueFormatter={valueFormatter}
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
