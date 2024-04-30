"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ActionItemsPage() {
  const userNotes = useQuery(api.notes.getActionItems);
  console.log(userNotes);

  return <div>ActionItemsPage</div>;
}
