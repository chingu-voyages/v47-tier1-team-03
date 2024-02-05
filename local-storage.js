import { calendarDefault } from "./data.js";

// Load Calendar Data from Local Storage
export function loadCalendarData() {
  var savedCalendarData = localStorage.getItem("calendarData");
  if (savedCalendarData === null || savedCalendarData === "undefined") {
    var parsedCalendarData = calendarDefault;
  } else {
    var parsedCalendarData = JSON.parse(savedCalendarData);
  }

  return parsedCalendarData;
}

// Save Calendar Data to Local Storage
export function saveCalendarData(calendarData) {
  const stringifiedCalendarData = JSON.stringify(calendarData);
  localStorage.setItem("calendarData", stringifiedCalendarData);
}
