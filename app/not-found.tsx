import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="font-display text-3xl">404</h1>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Go back home
      </Link>
    </div>
  );
}
