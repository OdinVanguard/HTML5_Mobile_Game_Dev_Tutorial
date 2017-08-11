goog.provide('space_game.Bullet');

goog.require('lime.Circle');
goog.require('goog.math');
goog.require('space_game.State_Machine');
goog.require('space_game.Signal');

space_game.Bullet = function() {
	
	//call parent constructor
	goog.base(this);
	
	this.setFill("#C6F022").setSize(5,7);
	
	this.speed = 0.1
	this.speed_y = goog.math.angleDy(270,this.speed);
	
}

//space_game.Star inherits from Circle
goog.inherits(space_game.Bullet, lime.Circle);