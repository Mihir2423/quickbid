import moment, { Duration } from "moment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const getTimeLeft = (futureDateStr: string): string => {
  if (!futureDateStr) {
    return "";
  }

  const futureDate = moment(futureDateStr);
  const now = moment();

  const duration: Duration = moment.duration(futureDate.diff(now));

  // If the time has passed, return "Ended"
  if (duration.asMilliseconds() <= 0) {
    return "Ended";
  }

  if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} days`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hours`;
  } else if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())} minutes`;
  } else {
    return `${Math.floor(duration.asSeconds())} seconds`;
  }
};

export const getTimeAgo = (pastDateStr: string): string => {
  if (!pastDateStr) {
    return "";
  }
  const pastDate = moment(pastDateStr);

  const now = moment();

  const duration: Duration = moment.duration(now.diff(pastDate));

  if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else {
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  }
};

export function formatToDollar(cents: number) {
  return `${Math.floor(cents / 100).toFixed(2)}`;
}
