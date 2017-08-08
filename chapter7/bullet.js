goog.provide('chapter7.Bullet');

goog.require('lime.Circle');
goog.require('goog.math');

chapter7.Bullet = function() {
	
	//call parent constructor
	goog.base(this);
	
	this.setFill("#C6F022").setSize(5,7);
	
	this.speed = 0.2
	this.speed_y = goog.math.angleDy(270,this.speed);
	
}

//chapter7.Star inherits from Circle
goog.inherits(chapter7.Bullet, lime.Circle);