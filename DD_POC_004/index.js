import { calendar } from "./data.js";

let text = ``;

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

renderCalendar();

renderTasks();

function renderCalendar() {
    // array to store days of week starting from sunday at index 0 which as the same as JS Date.getDay()
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    let datesHtml = '';
    let daysHtml = '';

    const daysEl = document.getElementById('weekdays')
    const datesEl = document.getElementById('month-dates')

    //a loop for the number of days in the month
    for (let i = 1; i <= daysInMonth; i++) {
        //this gives us the day of the week on a specific date of the month
        let dayOfWeekIndex = (i + firstDay - 1) % 7;
        daysHtml += `<p class=''>${daysOfWeek[dayOfWeekIndex]}</p>`;
        datesHtml += `<p class=''>${i}</p>`;
    }

    daysEl.innerHTML = daysHtml;
    datesEl.innerHTML = datesHtml;
}

function renderTasks() {
    // I used Carlos POC_002 adding backticks (``) and $ signs
    // to attribute each element a class to each item.

    calendar.forEach( category => {

        text += `
    <p class="categories">${category.categoryName}</p>`

        category.activityTypes.forEach( activity => {

            text += `
    <p class="activities">${activity.activityName}</p>`

            activity.Tasks.forEach( task => {

                text += `
        <p class="task-days">${task.days}</p>`

                text += `
        <p class="task-name">${task.taskName}</p>`

                for (let i=1; i<= daysInMonth; i++) {
                    text += `
                    <input type="checkbox">`
                }
            });
        });
    });

    document.getElementById("test_div").innerHTML = text;
}
