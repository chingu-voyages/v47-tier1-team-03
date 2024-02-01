import { calendar } from "./data.js";

let text = ``;

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();


renderCalendar();

renderTasks();

adaptCheckboxClass();

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
        <p class="task-days task-style">${task.days}</p>`;

        text += `
        <p class="task-name task-style">${task.taskName}</p>`;

        for (let i = 1; i <= daysInMonth; i++) {
            let weekday = convertDayToWeekDay(i);
            text += `
            <input 
            type="checkbox"
            data-day="${i}" 
            data-weekday="${weekday}" 
            data-assigned-day="${task.days}"
            <span class="checkbox"></span>`
        }
      });
    });
  });

  document.getElementById("test_div").innerHTML = text;
}

function adaptCheckboxClass(){
  
    for (let checkbox of document.getElementsByTagName('input')) {
      // for (let weekday of checkbox.dataset.weekday.split(','))
        if(checkbox.dataset.assignedDay.includes(checkbox.dataset.weekday) ){
          checkbox.classList.add('bold-checkbox')
          
        }
        if(checkbox.dataset.assignedDay === checkbox.dataset.day){
          checkbox.classList.add('bold-checkbox')
          // if(now.getDate() === checkbox.dataset.day){
          //   checkbox.classList.add('red')
          // }

        }
        
    }
}

function convertDayToWeekDay(i){
    let currentDate = new Date(year, month, i);
    let weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);

    return weekday.toLowerCase()
}