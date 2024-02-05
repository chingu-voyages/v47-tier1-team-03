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

/*Local storage implementation : targeting/selecting checkboxes first
 */
export function renderCheckboxesInfoToLS(){
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        const checked = checkbox.checked;
        const selectedDay = checkbox.getAttribute("data-day");
        const task = checkbox.getAttribute('data-task')
        calendarDefault[0].activityTypes[0].Tasks[0].checkedCb.selectedDay.includes selectedDay ? "" : calendarDefault[0].activityTypes[0].Tasks[0].checkedCb.push(selectedDay)
         
        console.log(`You have selected ${checked} on ${selectedDay} on ${task}`);
        console.log(calendarDefault[0].activityTypes[0].Tasks[0].checkedCb)
        saveCalendarData(calendarDefault)
    });
  });
}
