import { calendar } from "./data.js";

let text = ``;
// Date variables
let SelectedMonth = new Date();
let now = new Date();

//Event listener for 'changing months' buttons
document.addEventListener('click', (e) => {
    if (e.target.id === 'previous-month') {
        SelectedMonth.setMonth(SelectedMonth.getMonth() - 1);
        renderSelectedMonth()
    } else if (e.target.id === 'next-month') {
        SelectedMonth.setMonth(SelectedMonth.getMonth() + 1);
        renderSelectedMonth()
    }
})

// calling functions
renderCalendar();

renderTasks();

adaptCheckboxClass();

function renderCalendar() {
    let datesHtml = "";
    let daysHtml = "";

    const daysEl = document.getElementById("weekdays");
    const datesEl = document.getElementById("month-dates");
    const daysInMonth = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        let currentDate = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i);

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
            </div>`
        }
    }
    daysEl.innerHTML = daysHtml;
    datesEl.innerHTML = datesHtml;
}
// Rendering JSON and checkboxes
function renderTasks() {
    const daysInMonth = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth() + 1, 0).getDate();

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
                    let todayClass = '';
                    if (i === now.getDate() && now.getTime() === SelectedMonth.getTime()) {
                        todayClass = "todays-checkbox-container"
                    }

                    text += `
                      <div class="checkbox-container ${todayClass}">        
                        <input
                        type="checkbox"
                        data-day="${new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i)}" 
                        data-weekday="${weekday}" 
                        data-new-weekday="${new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i)
                            .toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()}"
                        data-assigned-day="${task.days}"
                        <span class="checkbox"></span>
                      </div>`
                }
            });
        });
    });

    document.getElementById("main-grid").innerHTML = text;
}
// Making checkboxes bold
function adaptCheckboxClass() {
    const checkboxes = document.getElementById('main-grid').getElementsByTagName('input')
    for (let checkbox of checkboxes) {
        if (checkbox.dataset.assignedDay.includes(checkbox.dataset.weekday)) {
            checkbox.classList.add('bold-checkbox')
        }
        if (checkbox.dataset.assignedDay === checkbox.dataset.day) {
            checkbox.classList.add('bold-checkbox')
        }
        if (checkbox.dataset.day.getDate < now.getDate){
            checkbox.classList.add('bold-checkbox-past-due-date')
        }
        if(checkbox.dataset.day.getDate >= now.getDate)
            checkbox.classList.add('bold-checkbox-due')
        
            checkbox.classList.remove('bold-checkbox-past-due-date')

    }
}

function convertDayToWeekDay(i) {
    let currentDate = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i);
    let weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);

    return weekday.toLowerCase()
}

function renderSelectedMonth() {
    const monthEl = document.getElementById('month')
    monthEl.textContent = `${SelectedMonth.toLocaleString('default', { month: 'long' })} ${SelectedMonth.getFullYear()}`
    text = ``;
    renderCalendar()
    renderTasks()
    adaptCheckboxClass()
}

/*Local storage implementation : targeting/selecting checkboxes first
 */
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        const checked = checkbox.checked;
        const selectedDay = checkbox.getAttribute("data-day");
        console.log(`You have selected ${checked} on ${selectedDay}`); //turn into an alert
    });
});