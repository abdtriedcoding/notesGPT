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
  title?: string;
}

export default function NoteCard({
  _creationTime,
  action,
  title,
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
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox onClick={handleremoveActionItem} />
            <p>{action}</p>
          </div>
          <p>{formatDate(_creationTime)}</p>
        </div>
        <p className="truncate text-[15px] pt-2 font-[300] dark:text-gray-300 text-gray-600 leading-[249%] tracking-[-0.6px] md:text-xl lg:text-xl">
          From: {title}
        </p>
      </CardContent>
    </Card>
  );
}
