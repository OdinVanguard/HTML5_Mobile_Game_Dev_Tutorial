goog.provide('space_game.Player');

goog.require('lime.Sprite');
goog.require('space_game.Bullet');
goog.require('space_game.State_Machine');
goog.require('space_game.Signal');
goog.require('goog.math');

space_game.Player = function(parent_state_machine) {
	
	//call the parent constructor
	goog.base(this);
        
        this.parent_state_machine = parent_state_machine;
        
        //signals to player should be sent to this state machine
        //It will forward them to other player state machines as needed.
        this.state_machine = new space_game.State_Machine();
        this.state_machine.name = "Player_State_Machine";
        this.state_machine.setStateList(["warping","idle","exploding"]);
        
        this.engine_state= new space_game.State_Machine();
        this.engine_state.name = "Player_Engine_State";
        this.engine_state.setStateList(["idle","moveTo","slide",
            "warping","disabled"]);
        this.engine_state.setState("idle");
        this.engine_state.data["max_speed"] = .2;
        this.engine_state.data["x"] = 0;
        this.engine_state.data["y"] = 0;
        
        /*this.weapon_state= new space_game.State_Machine();
        this.weapon_state.setStateList(["idle","poweringUp","firing",
            "recharging"])*/
        
        this.min_x=0;
	this.max_x=480;
	this.min_y=0;
	this.max_y=320;
        
        this.setPosition(240,280);
        
	this.setFill("img/rocket.png").setSize(40,70);
        
        this.setAnchorPoint(.5,.5);
        
        this.min_x = this.min_x + this.getSize().width/2;
        this.max_x = this.max_x - this.getSize().width/2;
        this.min_y = this.min_y + this.getSize().height/2;
        this.max_y = this.max_y - this.getSize().height/2;
	
	this.max_bullets=3;
	
	this.bullets = [];
        
        this.state_machine.setState("idle");
        
        this.moveTo_x = this.getPosition().x;
        
        this.moveTo_y = this.getPosition().y;
        
        this.max_speed = .2;
	
}

goog.inherits(space_game.Player, lime.Sprite);

space_game.Player.prototype.updateSelf = function(dt){
    
    this.processSignals();
    
    this.updatePosition(dt);
    
    //this.checkCollisions();
}

space_game.Player.prototype.updatePosition = function(dt) {
    //will need to reframe this in terms of velocity and acceleration
    //when / if motion is refactored to use box2d.
    var current_position = new goog.math.Vec2(this.getPosition().x,
            this.getPosition().y);
    var new_position = new goog.math.Vec2(current_position.x,
            current_position.y);
    
    if (this.engine_state.state == "moveTo") {
        //console.log("PLAYER: updating position using 'moveTo'.")
        if ("x" in this.engine_state.data && "y" in this.engine_state.data) {
            var target_position = new goog.math.Vec2(this.engine_state.data["x"],
                    this.engine_state.data["y"]);
            
            target_distance = goog.math.Vec2.distance(current_position,
                target_position);
            if ( target_distance == 0 ) {
                this.engine_state.transitionTo("idle");
            } else if (target_distance < 
                        this.engine_state.data["max_speed"]*dt) {
                new_position = target_position;
            } else {
                var move_vec = goog.math.Vec2.difference(target_position,
                    current_position);
            
                move_vec = move_vec.normalize();

                move_vec.scale(this.engine_state.data["max_speed"]*dt);

                new_position = goog.math.Vec2.sum(current_position,move_vec);
            }
        } else {
            console.log("PLAYER_WARNING: engine_state appears to be corrupted"+
                    "; state is set to "+this.engine_state.state+
                    " but this.engine_state.data does not contain entries for"+
                    " 'x' an 'y'!");
        }
    } else if (this.engine_state.state == "slide" ) {
        if ("x" in this.engine_state.data && "y" in this.engine_state.data) {
            move_vec = new goog.math.Vec2(this.engine_state.data["x"],
                            this.engine_state.data["y"]);
            
            move_vec.normalize();
            move_vec.scale(this.engine_state.data["max_speed"]*dt);
            
            new_position = goog.math.Vec2.sum(current_position,move_vec);
            
            new_position.x = goog.math.clamp(new_position.x,
                this.min_x,this.max_x);
            new_position.y = goog.math.clamp(new_position.y,
                this.min_y,this.max_y);
            //console.log("PLAYER: updating position using 'slide'.")
        } else {
            console.log("PLAYER_WARNING: engine_state appears to be corruped"+
                    "; state is set to "+this.engine_state.state+
                    " but this.engine_state.data does not contain entries for"+
                    " 'x' and 'y'!");
        }
    } else if (this.engine_state.state == "idle") {
        //nothing to do here for now
    } else {
        console.log("PLAYER_WARNING: engine appears to be in an unrecognized"+
                " state: "+this.engine_state.state+"!");
    }
    
    //make sure that the new position is within the player's x / y bounds
    new_position.x = goog.math.clamp(new_position.x,
                    this.min_x,this.max_x);
    new_position.y = goog.math.clamp(new_position.y,
                    this.min_y,this.max_y);
    
    //update player position to the new position
    this.setPosition(new_position.x,new_position.y);
}

//Process the signals that have been passed to the player
//since the last update.
space_game.Player.prototype.processSignals = function() {
    while(this.state_machine.signal_queue.length > 0) {
        signal = this.state_machine.getNextSignal();
        signalName = signal.name;
        if (signalName == "moveTo" || signalName == "slide"){
            /*if (signalName == "slide") {
                console.log("PLAYER LOG: Processing "+signalName+" signal;")
                console.log("-signal_data['direction']:")
                for (i in signal.data["direction"]) {
                    console.log("--signal.data['direction']["+i+"] ="+
                            signal.data["direction"][i]);
                }
            }*/
            this.processMovementSignal(signal);
        } else {
            console.log("PLAYER_WARNING: player recieved an unrecognized "+
                    "signal. Signal name = '"+signal.name+"'!");
        }
    }
}

space_game.Player.prototype.processMovementSignal = function(signal) {
    if (signal.name == "moveTo") {
        if (this.engine_state.state == "moveTo" || 
            this.engine_state.canTransitionTo(signal.name)) {
            if (("new_x" in signal.data) && ("new_y" in signal.data)){
                if (! (this.engine_state.state == "moveTo")) {
                    this.engine_state.transitionTo(signal.name);
                }
                this.engine_state.data["x"] = signal.data["new_x"];
                this.engine_state.data["y"] = signal.data["new_y"];
            } else {
                console.log("PLAYER_WARNING: player recieved an improperly "+
                        "formatted 'moveTo' signal!");
                console.log("-signal.name = "+signal.name);
                for (i in signal.data) {
                    console.log("-signal.data["+i+"] = "+signal.data[i]);
                }
            }
        } /*else {
            //place holder for now
        }*/
    } else if (signal.name == "slide") {
        if (this.engine_state.state == "slide" ||
            this.engine_state.canTransitionTo(signal.name)) {
            if (! (this.engine_state.state == "slide")) {
                //engine was not in slide state, so need
                //to zero out "x" and "y" terms of engine_state.data
                this.engine_state.data["x"] = 0;
                this.engine_state.data["y"] = 0;
                this.engine_state.transitionTo(signal.name);
            } 
            if ("direction" in signal.data) {
                if ("x" in signal.data["direction"]) {
                    this.engine_state.data["x"] = signal.data["direction"]["x"];
                    //this.engine_state.data["y"] = 0;
                    if (this.engine_state.data["x"] == 0 &&
                        this.engine_state.data["y"] == 0 &&
                        this.engine_state.canTransitionTo("idle")){
                        this.engine_state.transitionTo("idle");
                    }
                } else if ("y" in signal.data["direction"]) {
                    //this.engine_state.data["x"] = 0;
                    this.engine_state.data["y"] = signal.data["direction"]["y"];
                    if (this.engine_state.data["x"] == 0 &&
                        this.engine_state.data["y"] == 0 &&
                        this.engine_state.canTransitionTo("idle")){
                        this.engine_state.transitionTo("idle");
                    }
                } else {
                    console.log("PLAYER_WARNING: player recieved a 'slide' "+
                            "signal with an improperly formatted direction. "+
                            "'Direction = '"+signal.data["direction"]+"'");
                }
            } else {
                console.log("PLAYER_WARNING: player recieved an improperly "+
                        "formatted 'slide' signal!");
                console.log("-signal.name = "+signal.name);
                for (i in signal.data) {
                    console.log("-signal.data["+i+"] = "+signal.data[i]);
                }
            }
        } /*else {
            //place holder for now
        }*/
    } else {
        //this shouldn't be possible unless processSignals is not working right.
        console.log("PLAYER_WARNING: player recieved an unrecognized movement"+
                " signal: "+signal.name);
    }
    /*console.log("Processed "+signal.name+" signal") //debug log
        console.log("Eninge_State = "+this.engine_state.state);
        console.log("Engine_State.data: ")
                for (i in this.engine_state.data){
                    console.log("-Engine_State.data['"+i+"'] = "+
                            this.engine_state.data[i])
                }*/
}