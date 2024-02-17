// Global Variables for Undo/Redo
var interactionsLog = []; // stack with all "User Interactions" since last Page Load
var undoLog = []; // stack with "Undo Interactions" (only when Undo was the last interaction)

// Add a new User Interaction to Log
export function logInteraction(interaction) {
  interactionsLog.push(interaction);
  undoLog = [];
}

// Undo last User Interaction
export function undoInteraction() {
    var checkbox = document.getElementById(getLastInteraction());
    if (checkbox) {
      logUndo(checkbox.id);
      checkbox.checked = !checkbox.checked;
      
    }
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


function redoInteraction() {
  var checkbox = document.getElementById(getLastUndo());
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    
  }
}



