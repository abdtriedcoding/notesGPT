import { formatDate } from "@/lib/utils";
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

export default function NoteCard({ _creationTime, action }: ActionItemProps) {
  return (
    <Card>
      <CardContent className="flex space-x-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox />
          <p>{action}</p>
        </div>
        <p>{formatDate(_creationTime)}</p>
      </CardContent>
    </Card>
  );
}
