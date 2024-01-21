import { calendar } from "./data.js";

var text = "<p class='day'>M <br>1</p>";

// I used Carlos POC_002 adding backticks (``) and $ signs 
// to attribute each element a class to each item.

calendar.forEach(function (category) {

    text += `
    <p class="categories">${category.categoryName}</p>`
    

  category.activityTypes.forEach(function (activityType) {

    text += `
    <p class="activities">${activityType.activityName}</p>`

    activityType.Tasks.forEach(function (task) {

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

document.getElementById("test_div").innerHTML = text
