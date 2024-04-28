"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecordingIdPage() {
  const params = useParams();
  const { recordingId } = params;

  const note = useQuery(api.notes.getNoteById, {
    id: recordingId as Id<"notes">,
  });

  if (note === null) {
    return null;
  }

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
        <TabsContent value="actionItem">
          <Card>
            <CardContent className="flex space-x-4 items-center">
              <Checkbox />
              <p>TODO: Work in progress in this part!!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
