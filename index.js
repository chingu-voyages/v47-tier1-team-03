

import { loadCalendarData, sendChkBxStateToLocalStorage, saveCalendarData } from "./local-storage.js";
import { undoInteraction} from "./undo-redo.js"

let text = ``;

// load calendar data from local storage
// if doesn't exist, load from hardcoded JSON file
var calendar = loadCalendarData();

// Date variables
let SelectedMonth = new Date();
let now = new Date();

const weeklyBtnInAddModal = document.getElementById('weekly-btn-add-modal')
const monthlyBtnInAddModal = document.getElementById('monthly-btn-add-modal')

//Event listener for 'changing months' and expading tasks 
document.addEventListener('click', (e) => {
    if (e.target.id === 'previous-month') {
        SelectedMonth.setMonth(SelectedMonth.getMonth() - 1);
        renderSelectedMonth()
    } 
    else if (e.target.id === 'next-month') {
        SelectedMonth.setMonth(SelectedMonth.getMonth() + 1);
        renderSelectedMonth()
    }
    else if (e.target.dataset.type === "task") {
        //Hiding description if task has no description
        let hide = ''
        if (!e.target.dataset.desc) {
            hide = 'hide'
        }
        //Expanding on click
        document.getElementById(`expanded-task-extra-space-${e.target.id}`).classList.toggle('hide')
        document.getElementById(`expanded-task-extra-space-${e.target.id}`).innerHTML = `
        <div class="expand-grid">
            <div  
            id="expanded-${e.target.dataset.name.split(" ").join('-').toLowerCase()}" 
            class="expand-task">
                <p class="expand-task-title">Task</p>
                <p class="expand-task-info">${e.target.dataset.name}</p>
            </div>
            <div class="expand-due">
                <p class="expand-task-title">Due</p>
                <p class="expand-task-days">${e.target.dataset.days}</p>
            </div>
            <div class="expand-btns-container">
                <button class="expand-btns">
                    <img src="./assets/pen.svg">
                </button>
                <button class="expand-btns">
                    <img src="./assets/trash.svg">
                </button>
            </div>
            <div class="expand-desc ${hide}">
                <p class="expand-task-title">Description</p>
                <p class="expand-task-info">${e.target.dataset.desc}</p>
            </div>
        </div>`

        document.getElementById(e.target.id).classList.toggle('transparent')
        document.getElementById(`days-${e.target.id}`).classList.toggle('transparent')
    }
    else if (e.target.id === "add-btn") {
        
        modalCircleAnimation()
        getCategories()
    }

    else if (e.target.id === "weekly-btn-add-modal") {

        weeklyBtnInAddModal.classList.add('add-modal-btn-primary')
        weeklyBtnInAddModal.classList.remove('add-modal-btn-secondary')
        monthlyBtnInAddModal.classList.remove('add-modal-btn-primary')
        monthlyBtnInAddModal.classList.add('add-modal-btn-secondary')

        document.getElementById('weekly-option').classList.remove('hide')
        document.getElementById('monthly-option').classList.add('hide')
    }

    else if (e.target.id === "monthly-btn-add-modal") {

        monthlyBtnInAddModal.classList.add('add-modal-btn-primary')
        monthlyBtnInAddModal.classList.remove('add-modal-btn-secondary')
        weeklyBtnInAddModal.classList.remove('add-modal-btn-primary')
        weeklyBtnInAddModal.classList.add('add-modal-btn-secondary')

        document.getElementById('monthly-option').classList.remove('hide')
        document.getElementById('weekly-option').classList.add('hide')
    }

    else if (e.target.id === "cancel-btn-add-modal") {

        confirmCancelInModal()
    }

    else if (e.target.id === "save-btn-add-modal") {
        e.preventDefault();
        modalCircleAnimation()
        document.getElementById('new-task-saved').classList.remove('fade')
        setTimeout(() => {
            document.getElementById('new-task-saved').classList.add('fade')
        }, 2000);
        saveNewTask();

    }

    else if (e.target.id === "undo-btn") {
        undoInteraction()
        saveCalendarData(calendar)
    }

})

document.getElementById('categories').addEventListener('change', getSubcategories)

function saveNewTask() {
    const modalForm = document.getElementById('add-btn-modal');
    const selectedCategory = document.getElementById('categories');
    const selectedActivity = document.getElementById('activities');
    const newSelectedCategory = document.getElementById('activities');
    const newSelectedActivity = document.getElementById('activities');
    const taskName = document.getElementById('create-new-task');
    const description = document.getElementById('new-task-desc');
    const isWeekly = document.getElementById('weekly-btn-add-modal');
    const isMonthly = document.getElementById('monthly-btn-add-modal');
    const checkedDaysEl = document.querySelectorAll('input[type="checkbox"]:checked')
    let checkedDays = []
    checkedDaysEl.forEach(day => checkedDays.push(day.value))

    let task ={
        taskName: taskName.value,
        taskDescription: description.value,
        days: checkedDays,
        checkedCb: []
    }

    calendar[0].activityTypes[0].Tasks.push(task)
    saveCalendarData()
    renderSelectedMonth()
}
function getCategories() {
    const categoryEl = document.getElementById('categories');
    let categoriesHtml = '<option selected value=""> -- select an option -- </option>';
    calendar.forEach((category) => {
        categoriesHtml += `<option value="${category.categoryName}">${category.categoryName}</option>`
    });
    categoryEl.innerHTML = categoriesHtml;
    categoryEl.selectedIndex = -1;
}

function getSubcategories() {
    const categoryEl = document.getElementById('categories');
    const subCategoriesEl = document.getElementById('activities');
    subCategoriesEl.disabled = false;
    let selectedCategory = []
    let subCategoriesHtml = '';

    if (categoryEl.value) {
        selectedCategory = calendar.filter((category) => {
            return category.categoryName === categoryEl.value
        })[0]
    }
    selectedCategory.activityTypes.forEach((activity) => {
        subCategoriesHtml += `<option value="${activity.activityName}">${activity.activityName}</option>`
    })
    subCategoriesEl.innerHTML = subCategoriesHtml;
    console.log(selectedCategory);
}

function renderSelectedMonth() {
    const monthEl = document.getElementById('month')
    const month = SelectedMonth.toLocaleString('default', { month: 'long' })
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    
    monthEl.textContent = `
    ${capitalizedMonth} 
    ${SelectedMonth.getFullYear()}`
    text = ``;

    renderCalendar()
    renderTasks()
    adaptCheckboxClass()
    //Need to figure out why page is not rendering from local storage when changing months
    sendChkBxStateToLocalStorage()
    loadCalendarData();
    //LOOK IN HERE - need to figure out the way data takes
    saveCalendarData(calendar)
}

function renderCalendar() {
    let datesHtml = "";
    let daysHtml = "";
    const daysEl = document.getElementById("weekdays");
    const datesEl = document.getElementById("month-dates");
    const daysInMonth = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        let currentDate = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i);

        let currentDayOfWeek = new Intl.DateTimeFormat(undefined, {
            weekday: "short",
        }).format(currentDate)[0].toUpperCase();

        if (i === now.getDate() && now.getTime() === SelectedMonth.getTime()) {
            daysHtml += `
              <div class='todays-date'>
                <p>${currentDayOfWeek}</p>
              </div>`;
            datesHtml += `
            <div class='todays-date'>
              <p>${i}</p>
            </div>`;
        } 
        else {
            daysHtml += `
            <div>
              <p>${currentDayOfWeek}</p>
            </div>`;
            datesHtml += `
            <div>
              <p>${i}</p>
            </div>`
        }
    }
    daysEl.innerHTML = daysHtml;
    datesEl.innerHTML = datesHtml;
}
// Rendering Local Storage data and checkboxes
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
                <p 
                id="days-${task.taskName.split(" ").join('-').toLowerCase()}"
                class="task-days task-style">${task.days}
                </p>`;

                text += `
                <p 
                id="${task.taskName.split(" ").join('-').toLowerCase()}" 
                class="task-name task-style"
                data-type="task"
                data-name="${task.taskName}"
                data-days="${task.days}"
                data-desc="${task.taskDescription}"
                >${task.taskName}
                </p>`;

                for (let i = 1; i <= daysInMonth; i++) {
                    // testing i to determine if i is today
                    let todayClass = '';
                    
                    if (i === now.getDate() && now.getTime() === SelectedMonth.getTime()) {
                        todayClass = "todays-checkbox-container"
                    }
                    //Checkboxes initial state changed to 'checked'
                    //when data from Local Storage determines so
                    let isChecked = ''
                    let day = new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i)
                    for (let date of task.checkedCb){
                        if (date == day) {
                            isChecked = "checked"
                        }
                    }
                    
                    //Rendering chkbx with all needed data: 
                    //(date, assigned task and day and if it's initially checked)
                    text += `
                    
                    <div class="checkbox-container ${todayClass}">        
                        <input
                        class="checkbox"
                        type="checkbox"
                        id= ${Math.random().toString(36).substr(2, 32)}
                        data-task="${task.taskName}"
                        data-day="${new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i)}" 
                        data-weekday="${new Date(SelectedMonth.getFullYear(), SelectedMonth.getMonth(), i)
                            .toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()}"
                        data-assigned-day="${task.days}"
                        ${isChecked}>
                    </div>
                    
                    `   
                }
                //hidden div for expanding tasks
                text += `
                <div class="expanded-task-extra-space hide"
                id="expanded-task-extra-space-${task.taskName.split(" ").join('-').toLowerCase()}">
                </div>`
            });
        });
    });

    document.getElementById("main-grid").innerHTML = text;
}
// Making checkboxes bold
function adaptCheckboxClass() {

    for (let checkbox of document.getElementsByClassName('checkbox')) {

        //For every chbx testing if it's assigned day matches current day
        //For month days and week days
        if (checkbox.dataset.assignedDay.includes(checkbox.dataset.weekday)||
        Number(checkbox.dataset.assignedDay) === Number(checkbox.dataset.day.slice(7, 10))) {
            //Testing to know if task is past due date
            if (compareDates(checkbox.dataset.day, now)){
                checkbox.classList.add('bold-checkbox', 'future')
            }
            else {
                checkbox.classList.add('bold-checkbox', 'past')
            }
        }
    }
}

// calling functions
renderCalendar();
renderTasks();
adaptCheckboxClass();
sendChkBxStateToLocalStorage();
loadCalendarData();
renderSelectedMonth();

function compareDates (chbx, today) {
    let currentChbx = new Date(chbx).getTime();
    let todaysDate = new Date(today).getTime();
  
    if (currentChbx >= todaysDate) {
        return true
    }
  };

function modalCircleAnimation() {
    const modal = document.getElementById('add-btn-modal')
    const modalStyles = window.getComputedStyle(modal);
    if (modalStyles.getPropertyValue('clip-path') === 'circle(0% at 0% 0%)') {
        modal.style.clipPath = 'circle(200% at 10% 10%)'
    }

    else {
        modal.style.clipPath = 'circle(0% at 0% 0%)'
    }
}

function confirmCancelInModal() {
    let text = "Are you sure you want to cancel?";
    if (confirm(text) == true) {
        modalCircleAnimation()
    } 
  }