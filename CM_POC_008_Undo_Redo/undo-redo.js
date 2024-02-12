// Global Variables for Undo/Redo
var interactionsLog = []; // stack with all "User Interactions" since last Page Load
var undoLog = []; // stack with "Undo Interactions" (only when Undo was the last interaction)

// Add a new User Interaction to Log
function logInteraction(interaction) {
  interactionsLog.push(interaction);
  undoLog = [];
}

// Retrieve last User Interaction, and delete from Log
function getLastInteraction() {
  return interactionsLog.pop();
}

// Returns all the User Interactions
function getInteractionLog() {
  return interactionsLog;
}

function logUndo(undo) {
  undoLog.push(undo);
}

function getLastUndo() {
  return undoLog.pop();
}

// Add Event Listener to Checkboxes
const checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    logInteraction(checkbox.id);
    console.log(`Checkbox Clicked:  ${checkbox.id}`, event);
    displayInteractionLog();
    displayUndoLog();
  });
});

function displayInteractionLog() {
  htmlText = "<h1>This is the User Interaction Log / History: </h1>";

  interactionsLog.forEach((entry) => {
    htmlText += entry + "<br>";
  });
  document.getElementById("interactionLog").innerHTML = htmlText;
}

function displayUndoLog() {
  htmlText = "<h1>This is the Undo Log / History: </h1>";

  undoLog.forEach((entry) => {
    htmlText += entry + "<br>";
  });
  document.getElementById("undoLog").innerHTML = htmlText;
}

function undoInteraction() {
  var checkbox = document.getElementById(getLastInteraction());
  if (checkbox) {
    logUndo(checkbox.id);
    checkbox.checked = !checkbox.checked;
    // checkbox.click();
    displayInteractionLog();
    displayUndoLog();
  }
}
function redoInteraction() {
  var checkbox = document.getElementById(getLastUndo());
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    // checkbox.click();
    displayInteractionLog();
    displayUndoLog();
  }
}



