"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { DeleteModel } from "@/components/delete-model";

export function DataTableRowActions({ id }: { id: Id<"notes"> }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => router.push(`/recordings/${id}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteModel>
          <Button
            variant={"destructive"}
            className="w-full text-start justify-start"
          >
            Delete
          </Button>
        </DeleteModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
