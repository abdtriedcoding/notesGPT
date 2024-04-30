import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface ActionItemProps {
  _id: Id<"actionItems">;
  _creationTime: number;
  userId: string;
  noteId: Id<"notes">;
  action: string;
}

export default function NoteCard({
  _creationTime,
  action,
  _id,
}: ActionItemProps) {
  const removeActionItem = useMutation(api.notes.removeActionItem);

  const handleremoveActionItem = () => {
    const promise = removeActionItem({
      id: _id,
    });
    toast.promise(promise, {
      loading: "Deleting Action Item...",
      success: "Action Item Deleted",
      error: " Failed to delete action item.",
    });
  };

  return (
    <Card>
      <CardContent className="flex space-x-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox onClick={handleremoveActionItem} />
          <p>{action}</p>
        </div>
        <p>{formatDate(_creationTime)}</p>
      </CardContent>
    </Card>
  );
}
