import { calendar } from "./data.js";

var text = "<p class='day'>M<br>1</p>";

// I used Carlos POC_002 adding backticks (``) and $ signs 
// to attribute each element an unique class using its index.

calendar.forEach(function (category, index) {

    text += `

    <h1 class="c-${index}">
    ${category.categoryName}<br>(class="c-${index}")
    </h1>
    `
    

  category.activityTypes.forEach(function (activityType, j) {

    text += `

    <h2 class="a-${index}-${j}">
    ${activityType.activityName}<br>
    (class="a-${index}-${j}")
    </h2>`

    activityType.Tasks.forEach(function (task, k) {

        text += `

        <h4 class="td-${index}-${j}-${k}">
        ${task.days}
        </h4>`

        text += `

        <h3 class="tn-${index}-${j}-${k}">
        Task Name: ${task.taskName}<br><br>
        (class="tn-${index}-${j}-${k}")
        </h3>
        <input class="cb-${index}-${j}-${k}" type="checkbox">`
        
    });
  });
});

document.getElementById("test_div").innerHTML = text

// Next steps : 
// * how to count all elements? map?
// * how to atribute each element a CSS property dynamically?
