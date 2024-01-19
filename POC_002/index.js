import { calendar } from "./data.js";

var text = "";

calendar.forEach(function (category) {
  text += "<h1>" + category.categoryName + "</h1>";

  category.activityTypes.forEach(function (activityType) {
    text += "<h2>--" + activityType.activityName + "</h2>";
    activityType.Tasks.forEach(function (task) {
      text += "<h3>----" + "Task Name: " + task.taskName + "</h3>";
      text +=
        "<p>--------" + "Task Description: " + task.taskDescription + "</p>";

      task.days.forEach((day) => {
text += day + " ,"

      });
    });
  });
});

document.getElementById("test_div").innerHTML = text;
