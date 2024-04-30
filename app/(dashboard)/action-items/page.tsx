"use client";

import { useQuery } from "convex/react";
import { formatDate } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function ActionItemsPage() {
  const userActionItems = useQuery(api.notes.getActionItems);

  if (userActionItems === undefined) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {userActionItems.map((item) => (
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
    </div>
  );
}
