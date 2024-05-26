import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomId = function (length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
