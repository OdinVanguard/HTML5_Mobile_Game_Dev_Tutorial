goog.provide('space_game.Star');

goog.require('lime.Circle');
goog.require('goog.math');
/*goog.require('space_game.State_Machine');
goog.require('space_game.Signal');*/

space_game.Star = function() {
	
	//call parent constructor
	goog.base(this);
	
        console.log("creating new Star object")
        
        /*this.state_machine=new space_game.State_Machine();
        this.state_machine.name = "Star_State_Machine";*/
        
	this.setAnchorPoint(0,0).setFill("#DFDFF0").setSize(4,4);
	
	this.min_x=0;
	this.max_x=480;
	this.min_y=0;
	this.max_y=320;
	
	var x = goog.math.uniformRandom(this.min_x,this.max_x);
	var y = goog.math.uniformRandom(this.min_y,this.max_y);
	
	this.setPosition(x,y);
	
	/*this.max_speed_y = .25;
	this.max_speed_x = 0;*/
	
	this.minDepthFactor=1;
	this.maxDepthFactor=4;
	
	this.size_x=4;
	this.size_y=4;
	
	this.applyRandomDepth();
	
}

//space_game.Star inherits from Circle
goog.inherits(space_game.Star, lime.Circle);

space_game.Star.prototype.applyRandomDepth = function() {
	this.depth = goog.math.uniformRandom(this.minDepthFactor,
                        this.maxDepthFactor);
	
	this.setSize(this.size_x/this.depth,this.size_y/this.depth);
	
	this.speed_y = this.max_speed_y / this.depth / this.depth;
	this.speed_x = this.max_speed_x / this.depth / this.depth;
}

space_game.Star.prototype.applyDepth = function() {
    this.setSize(this.size_x/this.depth,this.size_y/this.depth);
    
    this.speed_y = this.max_speed_y / this.depth / this.depth;
    this.speed_x = this.max_speed_x / this.depth / this.depth;
}

/*space_game.Star.prototype.update = function(dt) {
    
    //this.processSignals(dt);
    
    current_x=this.getPosition().x
    current_y=this.getPosition().y

    new_x = current_x+this.speed_x*dt;
    new_x = goog.math.modulo(new_x,this.max_x-this.min_x)+
            this.min_x;

    new_y = current_y + this.speed_y*dt;
    if (new_y > this.max_y) {
            new_y = this.min_y;
            new_x = goog.math.uniformRandom(this.min_x,
                        this.max_x);
            this.applyRandomDepth();
    }

    this.setPosition(new_x,new_y);
}*/

/*space_game.Star.prototype.processSignals = function(dt) {
    while (this.state_machine.signal_queue.length > 0){
        signal = this.state_machine.getNextSignal();
        if (signal.name === "set_velocity") {
            if (!(signal.data.length === 2)) {
                console.log("STAR_WARNING: star recieved a 'set_velocity'"+
                        "signal with incorrectly formated data")
                if (!(signal.data.length > 0)) {
                    console.log("-signal.data was empty!")
                } else {
                    console.log("-signal.data:")
                    for(i in signal.data) {
                        console.log("entry "+i+" = "+signal.data[i]);
                    }
                }
            }
            this.max_speed_x=signal.data["vx"] / this.depth;
            this.max_speed_y=signal.data["vy"] / this.depth;
            this.applyDepth();
        } else {
            console.log("STAR_WARNING: star recieved an unrecognized signal '"+
                    signal.name+"'")
        }
    }
}*/