// 'use client';
import { RiBarChartFill } from "@remixicon/react";
import { Card } from "@tremor/react";

export default function Example() {
  return (
    <>
      <Card className="h-full">
        <h3 className="font-bold text-evening-sea-500 text-lg">
          Total Symptoms
        </h3>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          0
        </p>
        <div className="mt-4 flex h-44 items-center justify-center rounded-tremor-small border border-dashed border-tremor-border p-4 dark:border-dark-tremor-border">
          <div className="text-center">
            <RiBarChartFill
              className="mx-auto h-7 w-7 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
              aria-hidden={true}
            />
            <p className="mt-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              No data to show
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
