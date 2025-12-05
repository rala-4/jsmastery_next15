import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeviconClassName(techName: string) {
  const normalizeTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techMap[normalizeTechName]
    ? `${techMap[normalizeTechName]} colored`
    : "devicon-devicon-plain";
}

export function getTimeStamp(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";

  const intervals = [
    { unit: "year", secs: 31536000 },
    { unit: "month", secs: 2592000 },
    { unit: "day", secs: 86400 },
    { unit: "hour", secs: 3600 },
    { unit: "minute", secs: 60 },
    { unit: "second", secs: 1 },
  ];

  for (const { unit, secs } of intervals) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) {
      const label = value === 1 ? unit : `${unit}s`;
      return `${value} ${label} ago`;
    }
  }

  return "just now";
}
