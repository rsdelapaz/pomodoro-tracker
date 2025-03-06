import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Formats a number as a two-digit string (adds leading zero if needed)
 */
export function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}
