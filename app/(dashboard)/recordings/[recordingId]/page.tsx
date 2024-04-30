"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

import NoteCard from "./_components/note-card";
import ActionForm from "./_components/action-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NoteWithActionItem {
  note: Doc<"notes">;
  actionItems: Doc<"actionItems">[];
}

export default function RecordingIdPage() {
  const params = useParams();
  const { recordingId } = params;

  const noteWithActionItems = useQuery(api.notes.getNoteById, {
    id: recordingId as Id<"notes">,
  });

  if (noteWithActionItems === undefined) {
    return <p>Loading...</p>;
  }

  const { note, actionItems }: NoteWithActionItem = noteWithActionItems;

  return (
    <>
      <Tabs defaultValue="transcript" className="max-w-xl mx-auto text-center">
        <TabsList className="mb-4">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="actionItem">Action Items</TabsTrigger>
        </TabsList>
        <TabsContent value="transcript">{note?.title}</TabsContent>
        <TabsContent value="summary">{note?.summary}</TabsContent>
        <TabsContent className="space-y-4" value="actionItem">
          <ActionForm id={note._id} />
          {actionItems.map((item) => (
            <NoteCard key={item._id} {...item} />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}
