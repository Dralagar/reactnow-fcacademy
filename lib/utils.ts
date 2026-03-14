// lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn()
 * Combines conditional class names and safely merges Tailwind classes.
 *
 * Example:
 * cn("p-4", condition && "bg-blue-500", "p-6")
 * Result:
 * "bg-blue-500 p-6"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}