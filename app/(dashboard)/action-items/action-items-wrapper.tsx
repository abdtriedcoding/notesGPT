"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Preloaded, usePreloadedQuery } from "convex/react";
import NoteCard from "../recordings/[recordingId]/_components/note-card";

export default function ActionItemsWrapper(props: {
  preloadedActionItems: Preloaded<typeof api.notes.getActionItems>;
}) {
  const [search, setSearch] = useState("");
  const userActionItems = usePreloadedQuery(props.preloadedActionItems);

  if (userActionItems.length === 0) return <EmptyState />;

  const actionItems = userActionItems.filter(
    (e) =>
      e.action.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      (e.title &&
        e?.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  );

  return (
    <>
      <div className="space-y-4 max-w-xl mx-auto">
        <h1 className="text-center text-2xl font-medium">Action Items</h1>
        <h3 className="text-gray-600 dark:text-gray-300 text-center">
          {userActionItems?.length ?? 0} tasks
        </h3>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search through action items..."
        />
        {actionItems.length === 0 ? (
          <p className="text-center">No Result Found</p>
        ) : (
          actionItems.map((item) => <NoteCard key={item._id} {...item} />)
        )}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center space-y-4 min-h-screen justify-center items-center flex flex-col">
      <p className="text-2xl">You currently have no action items.</p>
      <Button asChild size={"lg"}>
        <Link href={"/record"}>Record your first voice note</Link>
      </Button>
    </div>
  );
}
