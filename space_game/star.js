goog.provide('space_game.Star');

goog.require('lime.Circle');
goog.require('goog.math');
goog.require('space_game.State_Machine');
goog.require('space_game.Signal');

space_game.Star = function() {
	
	//call parent constructor
	goog.base(this);
	
	this.setAnchorPoint(0,0).setFill("#DFDFF0").setSize(4,4);
	
	this.min_x=0;
	this.max_x=480;
	this.min_y=0;
	this.max_y=320;
	
	var x = goog.math.uniformRandom(this.min_x,this.max_x);
	var y = goog.math.uniformRandom(this.min_y,this.max_y);
	
	this.setPosition(x,y);
	
	this.max_speed_y = .25;
	this.max_speed_x = 0;
	
	this.minDepthFactor=1;
	this.maxDepthFactor=8;
	
	this.size_x=4;
	this.size_y=4;
	
	this.applyRandomDepth();
	
	//uniform star velocity with periodic boundary
	lime.scheduleManager.schedule(function(dt){
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
		
	},this)
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