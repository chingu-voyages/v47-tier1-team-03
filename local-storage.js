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
export function sendChkBxStateToLocalStorage() {
  const calendar = loadCalendarData();

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      //Data necessary for locating CB (Axis X (tasks) and Y (days))
      const selectedDay = checkbox.getAttribute("data-day");
      const taskAssignedToCb = checkbox.getAttribute("data-task");

      //looping through all content
      calendar.forEach((category) =>
        category.activityTypes.forEach((activity) =>
          activity.Tasks.forEach((task) => {
            //When the user checks a CB
            //Verifying where CB belongs and pushing to checkedCb array when clicked
            if (
              checkbox.checked === true &&
              task.taskName === taskAssignedToCb
            ) {
              task.checkedCb.push(selectedDay);
            }
            //When CB gets unchecked
            else if (checkbox.checked === false) {
              //Verifies if checked CB is present in the array and so has a positive index (>=0)
              if (task.checkedCb.indexOf(selectedDay) >= 0) {
                //If it does delete from the array based on index
                task.checkedCb.splice(task.checkedCb.indexOf(selectedDay), 1);
              }
            }
          })
        )
      );
      //Logging CB data on click (msg can be seen on dev tools console every time a CB is checked)
      console.log(
        `You have selected ${checkbox.checked} on ${selectedDay} on ${taskAssignedToCb}`
      );
      //Saves to local storage on every CB click
      saveCalendarData(calendar);
    });
  });
}
/* Removing 'checked' task when UNDO button selected*/

//undo button event listener

const undoButton = document.getElementById("UNDO");
undoButton.addEventListener("click", () => {
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        //maybe use the array Pop() method here?
      }
    });
  });
});
