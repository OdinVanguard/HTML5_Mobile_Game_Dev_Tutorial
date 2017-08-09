goog.provide('chapter7.Player');

goog.require('lime.Sprite');
goog.require('chapter7.Bullet');

chapter7.Player = function() {
	
	//call the parent constructor
	goog.base(this);
	
	this.setFill("img/rocket.png").setSize(40,70);
	
	this.max_bullets=3;
	
	this.bullets = [];
	
}

goog.inherits(chapter7.Player, lime.Sprite);