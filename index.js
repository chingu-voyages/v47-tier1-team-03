import { calendar } from "./data.js";

let text = ``;

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

renderCalendar();

renderTasks();

function renderCalendar() {
  let datesHtml = "";
  let daysHtml = "";

  const daysEl = document.getElementById("weekdays");
  const datesEl = document.getElementById("month-dates");

  for (let i = 1; i <= daysInMonth; i++) {
    let currentDate = new Date(year, month, i);

    let currentDayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(currentDate);
    if (currentDayOfWeek === "Sat") {
      currentDayOfWeek = "Sa";
    } else {
      currentDayOfWeek = currentDayOfWeek[0];
    }

    daysHtml += `<p class=''>${currentDayOfWeek}</p>`;
    datesHtml += `<p class=''>${i}</p>`;
  }

  daysEl.innerHTML = daysHtml;
  datesEl.innerHTML = datesHtml;
}

function renderTasks() {
  // I used Carlos POC_002 adding backticks (``) and $ signs
  // to attribute each element a class to each item.

  calendar.forEach((category) => {
    text += `
    <p class="categories">${category.categoryName}</p>`;

    category.activityTypes.forEach((activity) => {
      text += `
    <p class="activities">${activity.activityName}</p>`;

      activity.Tasks.forEach((task) => {
        text += `
        <p class="task-days">${task.days}</p>`;

        text += `
        <p class="task-name">${task.taskName}</p>`;

        for (let i = 1; i <= daysInMonth; i++) {
          text += `
                    <input type="checkbox">`;
        }
      });
    });
  });

  document.getElementById("test_div").innerHTML = text;
}

/*Local storage Implementation

1.get the data you want which is in js object and turn into JSON
2.store the data in local storage 
3. remove piece of data from local storage when requested
4.clear all items you stored : storing data for one session, deletes when browser is refreshed?

checkbox.addEventListener("click", (task) => {
  //1.get the data you want which is in js object and turn into JSON

  const string = JSON.stringify(task);

  //2.store the data in local storage
  localStorage.setItem("task", string);

  //3.clear all items you stored
  localStorage.clear();
});

//fetch API test?

const getData = async () => {
  try {
    const response = await fetch(calendar);
    if (response.ok) {
      const data = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};*/
