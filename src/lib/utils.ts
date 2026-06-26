import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines tailwind-merge and clsx for conditional class resolution.
 * Prevents styles collisions when merging classNames dynamically.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
