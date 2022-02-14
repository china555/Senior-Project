import moment from "moment-timezone";

export const getMomentDateMonthYearFormat = (dateTime: Date) =>
  moment.tz(dateTime, "Asia/Bangkok").format("DD/MM/YYYY");

export const getMomentHourFormat = (dateTime: Date) =>
  moment.tz(dateTime, "Asia/Bangkok").format("HH:mm");

export const getMomentNextHourFormat = (dateTime: Date) =>
  moment.tz(dateTime, "Asia/Bangkok").add(1, "hour").format("HH:mm");

export const getDateTimeFormat = (dateTime: Date) =>
  moment.tz(dateTime, "Asia/Bangkok").format();
