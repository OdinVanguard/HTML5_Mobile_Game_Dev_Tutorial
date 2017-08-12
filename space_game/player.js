goog.provide('space_game.Player');

goog.require('lime.Sprite');
goog.require('space_game.Bullet');
goog.require('space_game.State_Machine');
goog.require('space_game.Signal');

space_game.Player = function(parent_state_machine) {
	
	//call the parent constructor
	goog.base(this);
        
        this.state_machine = new space_game.State_Machine();
        this.parent_state_machine = parent_state_machine;
        
        this.state_machine.name = "Player_State_Machine";
        this.state_machine.setStateList(["warpingIn","warpingOut",
            "idle","movingLeft","movingRight","gettingHit",
            "poweringUp","exploding"
        ])
        
        
        this.min_x=0;
	this.max_x=480;
	this.min_y=0;
	this.max_y=320;
        
        this.setPosition(240,280);
        
	this.setFill("img/rocket.png").setSize(40,70);
	
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
    
    var current_x = this.getPosition().x;
    var current_y = this.getPosition().y;
    
    if (this.moveTo_x != current_x || this.moveTo_y != current_y) {
        //compute movement vector and normalize to player's max speed
        moveVec_x = this.moveTo_x - current_x;
        moveVec_y = this.moveTo_y - current_y;
        moveVec_norm = Math.sqrt(Math.pow(moveVec_x,2) + Math.pow(moveVec_y,2));
        if (moveVec_norm > 0){
            
            moveVec_x = moveVec_x / moveVec_norm * 
                    goog.math.clamp(this.max_speed * dt,0,
                        Math.abs(moveVec_x));
            moveVec_y = moveVec_y / moveVec_norm * 
                    goog.math.clamp(this.max_speed * dt,0,
                        Math.abs(moveVec_y));
            //console.log('moveVec = ('+moveVec_x+","+moveVec_y+")");
        }
        
        //update animation
        /* */
        
        this.setPosition(
            goog.math.clamp(current_x+moveVec_x,this.min_x,this.max_x),
            goog.math.clamp(current_y+moveVec_y,this.min_y,this.max_y));
    }
    
}

//Process the signals that have been passed to the player
//since the last update.
space_game.Player.prototype.processSignals = function() {
    while(this.state_machine.signal_queue.length > 0) {
        signal = this.state_machine.getNextSignal();
        if (signal.name == "moveTo") {
            if (("new_x" in signal.data) && ("new_y" in signal.data)){
                this.moveTo_x = signal.data["new_x"];
                this.moveTo_y = signal.data["new_y"];
            } else {
                console.log("PLAYER_WARNING: player recieved an improperly "+
                        "formatted 'moveTo' signal!");
                console.log("-signal.name = "+signal.name);
                for (i in signal.data) {
                    console.log("-signal.data["+i+"] = "+signal.data[i]);
                }
            }
        } else if (signal.name == "slide") {
            if ("direction" in signal.data) {
                if (signal.data["direction"] == "left") {
                    /*this.moveTo_x = goog.math.clamp(
                            this.getPosition().x - this.max_speed,
                            this.min_x,this.max_x);*/
                } else if (signal.data["direction"] == "right") {
                    /*this.moveTo_x = goog.math.clamp(
                            this.getPosition().x + this.max_speed,
                            this.min_x,this.max_x);*/
                } else {
                    console.log("PLAYER_WARNING: player recieved a 'slide' "+
                            "signal with an unrecognized direction. "+
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
        } else {
            console.log("PLAYER_WARNING: player recieved an unrecognized "+
                    "signal. Signal name = '"+signal.name+"'!");
        }
    }
}