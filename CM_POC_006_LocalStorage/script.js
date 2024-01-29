import { calendarDefault } from "./data.js";


var calendarData = loadCalendarData();

// If do not exist on Local Storage, use the default JSON data  
if (calendarData == null) {
    calendarData = calendarDefault
}

renderCalendarData(calendarData);

document.getElementById("saveButton").addEventListener("click", onSaveHandler);
document.getElementById("loadButton").addEventListener("click", onLoadHandler);
document
  .getElementById("clearButton")
  .addEventListener("click", onClearHandler);

// ------ Event Handlers  ------  
function onLoadHandler() {
  var calendarData = loadCalendarData();
  renderCalendarData(calendarData);
}

function onSaveHandler() {
  saveCalendarData(calendarData);
}

function onClearHandler() {
  clearCalendarData();
}
// ---------------------------

// Render a Sample of Calendar Data 
function renderCalendarData(calendarData) {
  var text = "";
  calendarData.forEach((category) => {
    text += `<h1>${category.categoryName}</h1>`;

    category.activityTypes.forEach((activity) => {
      text += `<h2>${activity.activityName}</h2>`;

      activity.Tasks.forEach((task) => {
        text += `<h3>${task.taskName}</h3>`;
      });
    });
  });

  document.getElementById("calendarDiv").innerHTML = text;
}

// Clear HTML page, for test Load
function clearCalendarData() {
  document.getElementById("calendarDiv").innerHTML = "";
}

// Load Calendar Data from Local Storage
function loadCalendarData() {
  const savedCalendarData = localStorage.getItem("calendarData");
  const parsedCalendarData = JSON.parse(savedCalendarData);

  return parsedCalendarData;
}

// Save Calendar Data to Local Storage
function saveCalendarData(calendarData) {
  const stringifiedCalendarData = JSON.stringify(calendarData);
  localStorage.setItem("calendarData", stringifiedCalendarData);
}