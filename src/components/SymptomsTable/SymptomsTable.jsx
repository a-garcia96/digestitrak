import React from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Catalyst/table";

import SeverityPill from "../SeverityPill/SeverityPill";

import { PlusCircleIcon } from "@heroicons/react/20/solid";

const SymptomsTable = ({ symptomsData }) => {
  return (
    <>
      <div className="shadow-md p-4 rounded bg-white space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold uppercase">All Symptom Logs</h1>
          <div>
            <Link
              href="/symptom-logs/new"
              className="bg-green-500 px-2 py-1 rounded text-white font-medium flex items-center gap-2"
            >
              <span>New</span>
              <PlusCircleIcon className="w-5 h-5" />
            </Link>
          </div>
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
            {symptomsData.length > 0 ? (
              symptomsData.map((log) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <p className="text-gray-500 font-bold text-center w-full">
                    No Entries
                  </p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SymptomsTable;
