import moment, { Duration } from 'moment';
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
    return '';
  }
  const futureDate = moment(futureDateStr);

  const now = moment();

  const duration: Duration = moment.duration(futureDate.diff(now));

  if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} days`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hours`;
  } else if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())} minutes`;
  } else {
    return `${Math.floor(duration.asSeconds())} seconds`;
  }
}
