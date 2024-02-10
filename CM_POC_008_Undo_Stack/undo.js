var interactionsLog = []; // stack with all User Interactions since last Page Load

// Add a new User Interaction to Log
function logInteraction(interaction){
    interactionsLog.push(interaction);
}

// Retrieve last User Interaction, and delete from Log
function undoInteraction(){
    return (interactionsLog.pop());
}

// Returns all the User Interactions
function getInteractionLog(){
    return (interactionsLog);
}
