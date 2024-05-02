import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { auth } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "NotesGPT",
  description = "NotesGPT seamlessly converts your voice notes into organized summaries and clear action items using AI.",
  image = "/thumbnail.png",
}: {
  title?: string;
  description?: string;
  image?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@abdtriedcoding",
    },
    metadataBase: new URL("https://notessgpt.vercel.app"),
  };
}

export function getCurrentFormattedDate(): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(currentDate);
}

export function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

export async function getAuthToken() {
  return (await auth().getToken({ template: "convex" })) ?? undefined;
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
