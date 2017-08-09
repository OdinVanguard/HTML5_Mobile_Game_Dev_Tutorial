goog.provide('chapter8.Player');

goog.require('lime.Sprite');
goog.require('chapter8.Bullet');

chapter8.Player = function() {
	
	//call the parent constructor
	goog.base(this);
	
	this.setFill("img/rocket.png").setSize(40,70);
	
	this.max_bullets=3;
	
	this.bullets = [];
	
}

goog.inherits(chapter8.Player, lime.Sprite);