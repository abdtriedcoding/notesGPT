"use client";

import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "@/convex/_generated/api";
import { Mic, PencilLine } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Preloaded, usePreloadedQuery } from "convex/react";

export function NotesWrapper(props: {
  preloadedNotes: Preloaded<typeof api.notes.getUserNotes>;
}) {
  const userNotes = usePreloadedQuery(props.preloadedNotes);

  return (
    <>
      <div className="flex flex-col pb-8 items-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your notes!
        </p>
      </div>
      {userNotes.length === 0 ? (
        <EmptyState />
      ) : (
        <DataTable data={userNotes} columns={columns} />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-4">
        <Link
          href="/record"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          <span>Record a New Voice Note</span>
          <Mic className="ml-2 h-4 w-4" />
        </Link>
        <Link
          href="/action-items"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <span>View Action Items</span>
          <PencilLine className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
