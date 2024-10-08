import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Catalyst/table";

import SeverityPill from "../SeverityPill/SeverityPill";

const SymptomsTable = ({ symptomsData }) => {
  return (
    <>
      <div className="shadow-md p-4 rounded bg-white space-y-2">
        <div>
          <h1 className="text-lg font-bold uppercase">All Symptom Logs</h1>
        </div>
        <Table>
          <TableHead>
            <TableRow className="[&>*]:font-bold text-evening-sea-950">
              <TableHeader>Date</TableHeader>
              <TableHeader>Symptoms</TableHeader>
              <TableHeader>Notes</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {symptomsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  {new Date(log.created_at)
                    .toLocaleString("en-US")
                    .split(", ")
                    .map((date) => (
                      <p>{date}</p>
                    ))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-5 gap-y-2">
                    {log.symptoms.map((symptom) => (
                      <SeverityPill severity={"high"}>{symptom}</SeverityPill>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{log.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SymptomsTable;
