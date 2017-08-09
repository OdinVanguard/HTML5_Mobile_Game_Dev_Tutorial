goog.provide('chapter8.Bullet');

goog.require('lime.Circle');
goog.require('goog.math');

chapter8.Bullet = function() {
	
	//call parent constructor
	goog.base(this);
	
	this.setFill("#C6F022").setSize(5,7);
	
	this.speed = 0.1
	this.speed_y = goog.math.angleDy(270,this.speed);
	
}

//chapter8.Star inherits from Circle
goog.inherits(chapter8.Bullet, lime.Circle);