goog.provide('chapter7.Star');

goog.require('lime.Circle');
goog.require('goog.math');

chapter7.Star = function() {
	
	//call parent constructor
	goog.base(this);
	
	this.setAnchorPoint(0,0).setFill("#DFDFF0").setSize(2,2);
	
	var x = goog.math.uniformRandom(0,480);
	var y = goog.math.uniformRandom(0,320);
	
	this.setPosition(x,y);
	
}

//chapter7.Star inherits from Circle
goog.inherits(chapter7.Star, lime.Circle);