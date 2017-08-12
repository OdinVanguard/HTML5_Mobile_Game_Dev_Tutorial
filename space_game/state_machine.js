goog.provide('space_game.State_Machine');

goog.require('goog.math');
goog.require('lime.Node');
goog.require('space_game.Signal');

//A (relatively) light-weight state machine
//Allows for keeping track of a state.
//And basic signal passing facilities.
//Contains checks to make sure that the signals sent
//are of type 'Signal' and makes sure that
//its state can only be set to specified values (as contained in state_list)
space_game.State_Machine = function() {
    
    goog.base(this);
    
    this.name = "Anonymous_State_Machine";
    //initialize state_list and state with a default value
    this.state_list = ["base_state"];
    this.state = "base_state";
    
    //safe-guards to control which states can be set from a given current state
    //These are checked when the setState function is called.
    //They will only have an effect if they are non-empty.
    //disallowed transitions takes priority over allowed transitions.
    //E.g. if both are non-empty, allowed_transitions is checked first.
    //if the transition is there, then it is checked against
    //disallowed_tranisitions. If it passes both checks, then the state
    //is updated.
    //To allow ease of search, transitions are should all be text entries
    //and should follow the form "_currentState__TO__newSate_"
    this.allowedTransitions=[];
    this.disallowedTransitions=[];
    
    this.signal_queue = [];
    
};

goog.inherits(space_game.State_Machine,lime.Node);

space_game.State_Machine.prototype.printLog = function(){
    console.log("----------------STATE_MACHINE_LOG-----------------");
    console.log("name = "+this.name);
    console.log("state_list = "+this.state_list);
    console.log("state = "+this.state);
    console.log("allowedTransitions = "+this.allowedTransitions);
    console.log("disallowedTransitions = "+this.disallowedTransitions);
    console.log("signal_queue = "+this.signal_queue);
    console.log("--------------------------------------------------");
}

//State machine interface methods.
//State machine should be interacted with through these methods
//rather than setting its internal properties directly.
//This provides a means to check for valid interactions.

//Send a signal to the state machine
//This will add the signal to the signal queue.
//THere is a check to make sure that the type of the parameter given
//is of type space_game.Signal.
//If the parameter is of the wrong type, a warning will be displayed
//and the signal will not be added to the queue.
space_game.State_Machine.prototype.sendSignal = 
        function(signal) {
            if (typeof signal == typeof new space_game.Signal() ) {
                this.signal_queue.push(signal);
                console.log(this.name+" recieved a signal");
                console.log("-signal.name = "+signal.name);
                for (i in signal.data) {
                    console.log("-signal.data["+i+"] = "+signal.data[i]);
                }
            } else {
                var signalType = typeof signal;
                var correct_type = typeof new space_game.Signal()
                console.log("STATE_MACHINE_WARNING: "+this.name+
                        " was sent a signal that was not of the correct"+
                        " object type. The type was "+signalType+
                        " expected type is "+correct_type)
            }
}

//Returns the next signal on the signal_queue.
//Will return "_EMPTY_" if there are no signals left
//Signals will be objects with 2 entries
//signal.signal_name - the name of the signal
//signal.signal_data - any assosciated data
space_game.State_Machine.prototype.getNextSignal = function() {
    if (this.signal_queue.length > 0) {
        return(this.signal_queue.shift());
    } else {
        return("_EMPTY_");
    }
}

space_game.State_Machine.prototype.setStateList = function(state_list){
    this.state_list = state_list;
}

//prefered interface for updating the current state of the state machine
//includes checks to make sure the new state is different from the current one
//and also that the new state is registered in the state list.
space_game.State_Machine.prototype.setState = function(state) {
    if (!(this.state === state)) {
        if (this.state_list.includes(state)) {
           this.state = state; 
        } else {
            console.log("STATE_MACHINE_WARNING: "+this.name+
                    ": Tried to set state to "+state+
                    ", but that state was not found in the state list!")
        }
    } else {
        console.log("STATE_MACHINE_WARNING: "+this.name+
                ": Tried to set state to "+state+
                ", but was in that state already!");
    }
}

space_game.State_Machine.prototype.addStateToStateList = function(state) {
    if (!(this.state_list.includes(state))) {
        this.state_list.push(state);
    } else {
        console.log("STATE_MACHINE_WARNING: "+this.name+
                " tried to push state "+state+" to its list of allowed states,"+
                " but that state was already found within the list!");
    }
}

space_game.State_Machine.prototype.getStateList = function() {
    return(this.state_list);
}
space_game.State_Machine.prototype.getState = function() {
    return(this.state);
}

space_game.State_Machine.prototype.formTransition = 
    function(from_state,to_state){
    return("_"+from_state+"__TO__"+to_state+"_");
}

space_game.State_Machine.prototype.addAllowedTransition = function(transition) {
    if (!this.allowedTransitions.includes(transition)) {
        this.allowedTransitions.push(transition);
    } else {
        console.log("STATE_MACHINE_WARNING: "+this.name+": attempted to "+
                "add transition "+transition+" to its list of allowed "+
                "transitions, but that transition was already there!")
    }
}

space_game.State_Machine.prototype.addDisallowedTransition = 
    function(transition) {
    if (!this.disallowedTransitions.includes(transition)) {
        this.disallowedTransitions.push(transition);
    } else {
        console.log("STATE_MACHINE_WARNING: "+this.name+": attempted to "+
                "add transition "+transition+" to its list of disallowed "+
                "transitions, but that transition was already there!")
    }
}

space_game.State_Machine.prototype.canTransitionTo = function(state) {
    canTransition=true;
    transition="_"+this.state+"__TO__"+state+"_"
    if (this.allowedTransitions.length > 0) {
        if (!(this.allowedTransitions.includes(transition))) {
            canTransition=false;
        }
    }
    if (this.disallowedTransitions.length > 0) {
        if (this.disallowedTransitions.includes(transition)) {
            canTransition=false;
        }
    }
    return(canTransition);
}

