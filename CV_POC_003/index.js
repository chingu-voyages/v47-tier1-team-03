import { calendar } from "./data.js";

let text = "<p class='day'>M <br>1</p>";

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
        <p class="task-name">${task.taskName}</p>
        
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">` 
    });
  });
});

document.getElementById("test_div").innerHTML = text;
