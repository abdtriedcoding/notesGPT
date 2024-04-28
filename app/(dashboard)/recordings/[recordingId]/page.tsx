"use client";

import { toast } from "sonner";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NoteWithActionItem {
  note: Doc<"notes">;
  actionItems: Doc<"actionItems">[];
}

export default function RecordingIdPage() {
  const params = useParams();
  const { recordingId } = params;
  const [input, setInput] = useState("");
  const createAction = useMutation(api.notes.createAction);

  const noteWithActionItems = useQuery(api.notes.getNoteById, {
    id: recordingId as Id<"notes">,
  });

  if (!noteWithActionItems?.note) {
    return null;
  }

  const { note, actionItems }: NoteWithActionItem = noteWithActionItems;

  const handleCreateAction = () => {
    if (!input.trim()) {
      return toast.error("Input is empty");
    }

    const promise = createAction({
      noteId: note?._id as Id<"notes">,
      action: input.trim(),
    });
    toast.promise(promise, {
      loading: "Creating Action...",
      success: "Action Created",
      error: " Failed to create action.",
    });
    setInput("");
  };

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
          <div className="flex w-full items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add action for this note..."
            />
            <Button onClick={handleCreateAction}>Add Action</Button>
          </div>
          {actionItems.map((item) => (
            <Card key={item._id}>
              <CardContent className="flex space-x-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox />
                  <p>{item.action}</p>
                </div>
                <p className="ml-auto">{formatDate(item._creationTime)}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}
