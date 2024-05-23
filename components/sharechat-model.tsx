import { toast } from "sonner";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ShareChatModelProp {
  children: React.ReactNode;
  id: string;
}

export function ShareChatModel({ children, id }: ShareChatModelProp) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/share/${id}`);
    setCopied(true);
    toast.success("Url Copied");

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <Input
            value={id}
            disabled
            className="h-8 rounded-r-none border-2 truncate"
          />
          <Button
            onClick={onCopy}
            disabled={copied}
            className="h-8 rounded-l-none"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
