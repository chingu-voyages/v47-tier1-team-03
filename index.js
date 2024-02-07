import { loadCalendarData, saveCalendarData } from "./local-storage.js";

// for test purpose only
import { taskTracking } from "./taskTracking.js";

let text = ``;
// Date variables
let SelectedMonth = new Date();
let now = new Date();

//Event listener for 'changing months' buttons
document.addEventListener("click", (e) => {
  if (e.target.id === "previous-month") {
    SelectedMonth.setMonth(SelectedMonth.getMonth() - 1);
    renderSelectedMonth();
  } else if (e.target.id === "next-month") {
    SelectedMonth.setMonth(SelectedMonth.getMonth() + 1);
    renderSelectedMonth();
  }
});

// load calendar data from local storage
// if doesn't exist, load from hardcoded JSON file
var calendar = loadCalendarData();

// calling functions
renderCalendar();
renderTasks();
adaptCheckboxClass();
renderTaskExecution();

function renderCalendar() {
  let datesHtml = "";
  let daysHtml = "";

  const daysEl = document.getElementById("weekdays");
  const datesEl = document.getElementById("month-dates");
  const daysInMonth = new Date(
    SelectedMonth.getFullYear(),
    SelectedMonth.getMonth() + 1,
    0
  ).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    let currentDate = new Date(
      SelectedMonth.getFullYear(),
      SelectedMonth.getMonth(),
      i
    );

    let currentDayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(currentDate);

    if (currentDayOfWeek === "Sat") {
      currentDayOfWeek = "Sa";
    } else {
      currentDayOfWeek = currentDayOfWeek[0];
    }
    if (i === now.getDate() && now.getTime() === SelectedMonth.getTime()) {
      daysHtml += `
              <div class='todays-date'>
                <p>${currentDayOfWeek}</p>
              </div>`;
      datesHtml += `
            <div class='todays-date'>
              <p>${i}</p>
            </div>`;
    } else {
      daysHtml += `
            <div>
              <p class=''>${currentDayOfWeek}</p>
            </div>`;
      datesHtml += `
            <div>
              <p class=''>${i}</p>
            </div>`;
    }
  }
  daysEl.innerHTML = daysHtml;
  datesEl.innerHTML = datesHtml;
}
// Rendering JSON and checkboxes
function renderTasks() {
  const daysInMonth = new Date(
    SelectedMonth.getFullYear(),
    SelectedMonth.getMonth() + 1,
    0
  ).getDate();

  calendar.forEach((category) => {
    text += `
  <p class="categories">${category.categoryName}</p>`;

    category.activityTypes.forEach((activity) => {
      text += `
      <p class="activities">${activity.activityName}</p>`;

      activity.Tasks.forEach((task) => {
        text += `
          <p class="task-days task-style">${task.days}</p>`;

        text += `
            <p class="task-name task-style">${task.taskName}</p>`;

        for (let i = 1; i <= daysInMonth; i++) {
          // Converting i (current month day) to week day and testing i to determine if i is today
          let weekday = convertDayToWeekDay(i);
          let todayClass = "";
          if (
            i === now.getDate() &&
            now.getTime() === SelectedMonth.getTime()
          ) {
            todayClass = "todays-checkbox-container";
          }

          text += `
                      <div class="checkbox-container ${todayClass}">        
                        <input
                        type="checkbox"
                        id = "${task.taskId}.2024.2.${i}"
                        data-day="${i}" 
                        data-weekday="${weekday}"
                        data-assigned-day="${task.days}"
                        <span class="checkbox"></span>
                      </div>`;
        }
      });
    });
  });

  document.getElementById("main-grid").innerHTML = text;
}
// Making checkboxes bold
function adaptCheckboxClass() {
  for (let checkbox of document.getElementsByTagName("input")) {
    if (checkbox.dataset.assignedDay.includes(checkbox.dataset.weekday)) {
      checkbox.classList.add("bold-checkbox");
    }
    if (checkbox.dataset.assignedDay === checkbox.dataset.day) {
      checkbox.classList.add("bold-checkbox");
    }
  }
}

function convertDayToWeekDay(i) {
  let currentDate = new Date(
    SelectedMonth.getFullYear(),
    SelectedMonth.getMonth(),
    i
  );
  let weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    currentDate
  );

  return weekday.toLowerCase();
}

function renderSelectedMonth() {
  const monthEl = document.getElementById("month");
  monthEl.textContent = `${SelectedMonth.toLocaleString("default", {
    month: "long",
  })} ${SelectedMonth.getFullYear()}`;
  text = ``;
  renderCalendar();
  renderTasks();
  adaptCheckboxClass();

  renderTaskExecution();
}

function renderTaskExecution() {

  taskTracking.forEach((taskTrack) => {
    console.log(taskTrack.taskId);
    taskTrack.executionDates.forEach((executionDateStr) => {
      var executionDate = new Date(Date.parse(executionDateStr));
      var htmlElementID = `${taskTrack.taskId}.${executionDate.getFullYear()}.${
        executionDate.getMonth() + 1
      }.${executionDate.getDate()}`;
      document.getElementById(htmlElementID).checked = true;
    });
  });
}

/*Local storage implementation : targeting/selecting checkboxes first
 */
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const selectedTask = checkbox.getAttribute("data-task-name");
    const selectedDay = checkbox.getAttribute("data-day");
    console.log(`You have selected ${selectedTask} on ${selectedDay}`); //turn into an alert

    saveCalendarData(calendar);
  });
});
