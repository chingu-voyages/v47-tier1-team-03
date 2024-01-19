import { calendar } from "./data.js";

var text = "";

calendar.forEach(function (category) {
  text += "<h1>" + category.categoryName + "</h1>";

  category.activityTypes.forEach(function (activityType) {
    text += "<h2>" + activityType.activityName + "</h2>";
    activityType.Tasks.forEach(function (task) {
      text += "<h3>" + "Task Name: " + task.taskName + "</h3>";
      text += "<h4>" + "Task Description: " + task.taskDescription + "</h4>";

      text += "<h4>Task Days: ";
      task.days.forEach((day) => {
        text += day + " ";
        
      });
      text += "</h4>";

    });
  });
});

document.getElementById("test_div").innerHTML = text;
