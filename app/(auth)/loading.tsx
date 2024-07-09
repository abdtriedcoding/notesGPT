import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="w-5 h-5" />
    </div>
  );
}
