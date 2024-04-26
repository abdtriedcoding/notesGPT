"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function RecordingPage() {
  const userNotes = useQuery(api.notes.getUserNotes);

  return (
    <>
      <div className="flex flex-col pb-8 items-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your notes!
        </p>
      </div>
      <DataTable data={userNotes ?? []} columns={columns} />
    </>
  );
}
