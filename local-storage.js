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

/*Local storage implementation : targeting/selecting checkboxes first*/
export function renderCheckboxesInfoToLS(){
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      //Data necessary for locating CB (Axis X (tasks) and Y (days))
        checkbox.checked = true;
        const selectedDay = checkbox.getAttribute("data-day");
        const taskAssignedToCb = checkbox.getAttribute('data-task')
        //looping through all content
        calendarDefault.forEach(category => 
          category.activityTypes
          .forEach(activity => 
            activity.Tasks
            .forEach(task => {
        //verifying where CB belongs
          if(task.taskName === taskAssignedToCb 
            && !task.checkedCb.includes(selectedDay)){
            task.checkedCb.push(selectedDay)
          } 
        })))
        //Logging CB data on click (msg can be seen on dev tools console every time a CB is checked)
        console.log(`You have selected ${checkbox.checked} on ${selectedDay} on ${taskAssignedToCb}`);

        saveCalendarData(calendarDefault)
    });
  });
}
