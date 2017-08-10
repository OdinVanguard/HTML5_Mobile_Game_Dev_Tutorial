goog.provide('space_game.Player');

goog.require('lime.Sprite');
goog.require('space_game.Bullet');

space_game.Player = function() {
	
	//call the parent constructor
	goog.base(this);
	
	this.setFill("img/rocket.png").setSize(40,70);
	
	this.max_bullets=3;
	
	this.bullets = [];
	
}

goog.inherits(space_game.Player, lime.Sprite);