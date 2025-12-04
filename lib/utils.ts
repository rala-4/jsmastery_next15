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
