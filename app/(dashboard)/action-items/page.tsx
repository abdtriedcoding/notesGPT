"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CardSkelton } from "@/components/skeltons";
import NoteCard from "../recordings/[recordingId]/_components/note-card";

export default function ActionItemsPage() {
  const userActionItems = useQuery(api.notes.getActionItems);

  if (userActionItems === undefined) {
    return <CardSkelton />;
  }

  if (userActionItems.length === 0)
    return (
      <div className="text-center space-y-4 min-h-screen justify-center items-center flex flex-col">
        <p className="text-2xl">You currently have no action items.</p>
        <Button asChild size={"lg"}>
          <Link href={"/record"}>Record your first voice note</Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-center text-2xl font-medium">
        Action Items
      </h1>
      <h3 className="text-gray-600 text-center">
        {userActionItems?.length ?? 0} tasks
      </h3>
      {userActionItems.map((item) => (
        <NoteCard key={item._id} {...item} />
      ))}
    </div>
  );
}
