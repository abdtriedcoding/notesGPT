"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NoteCard from "@/app/(dashboard)/recordings/[recordingId]/_components/note-card";

export default function ActionItemsPage() {
  const userActionItems = useQuery(api.notes.getActionItems);

  if (userActionItems === undefined) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {userActionItems.map((item) => (
        <NoteCard key={item._id} {...item} />
      ))}
    </div>
  );
}
