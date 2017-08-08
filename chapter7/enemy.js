goog.provide('chapter7.Enemy');

goog.require('lime.Sprite');
goog.require('chapter7.Bullet');
goog.require('goog.math');

chapter7.Enemy = function() {
	
	//call the parent constructor
	goog.base(this);
	
	this.setFill("img/enemy.png");
	
	var x = goog.math.uniformRandom(0,480);
	var y = goog.math.uniformRandom(30,60);
	
	this.setPosition(x,y);
	this.max_speed_x=.5;
	this.accel_x=0;
	this.friction=.01;
	this.speed_x=goog.math.uniformRandom(-this.max_speed_x,this.max_speed_x);
	this.speed_y=0;
	this.speed_y_target=.0025;
	this.speed_y_delta=.125;
	
	this.max_x=480;
	this.min_x=0;
	this.max_y=320;
	this.min_y=0;
	
	//make it move
	lime.scheduleManager.schedule(function(dt){
		current_x = this.getPosition().x;
		current_y = this.getPosition().y;
		
		this.accel_x += goog.math.uniformRandom(-this.max_speed_x/32,
					this.max_speed_x/32);
					
		this.accel_x -= this.speed_x*this.friction;
		this.accel_x = goog.math.clamp(this.accel_x,-this.max_speed_x*.0625,
			this.max_speed_x*.0625);
		
		this.speed_x=this.speed_x+this.accel_x;
		this.speed_x=goog.math.clamp(this.speed_x,-this.max_speed_x,this.max_speed_x);
		
		this.speed_y = this.speed_y_target+
			goog.math.uniformRandom(-this.speed_y_delta,this.speed_y_delta);
		
		new_pos_x = current_x+this.speed_x*dt;//+this.accel_x*dt*dt/2;
		new_pos_y = current_y+this.speed_y*dt;
		
		new_pos_x=goog.math.modulo(new_pos_x,this.max_x-this.min_x)+this.min_x;
		new_pos_y=goog.math.clamp(new_pos_y,this.min_y,this.max_y);
		
		this.setPosition(new_pos_x,new_pos_y);
		
	},this)
	
	this.bullets = [];
	
}

goog.inherits(chapter7.Enemy, lime.Sprite);