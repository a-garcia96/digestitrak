import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { createClient } from "@/utils/supabase/component";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Catalyst/table";

import SeverityPill from "../SeverityPill/SeverityPill";
import Card from "../Card/Card";

import { PlusCircleIcon } from "@heroicons/react/20/solid";

const SymptomsTable = ({ symptomsData }) => {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (e) => {
    const id = e.target.dataset.id;

    console.log(id);

    const { error } = await supabase.from("Symptom Logs").delete().eq("id", id);

    if (!error) {
      router.reload();
    }
  };

  return (
    <>
      <Card>
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
                    {new Date(log.date).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-5 gap-y-2 flex-wrap">
                      {log.symptoms.map((symptom) => (
                        <SeverityPill severity={"moderate"}>
                          {symptom}
                        </SeverityPill>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{log.comments}</TableCell>
                  <TableCell className="flex gap-2">
                    <button>
                      <Link
                        href={`symptom-logs/edit?id=${log.id}`}
                        className="bg-green-100 px-1 py-2 rounded shadow-sm text-green-500 font-medium"
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      data-id={log.id}
                      className="bg-red-100 px-1 py-2 rounded shadow-sm text-red-500 font-medium"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </TableCell>
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
      </Card>
    </>
  );
};

export default SymptomsTable;
