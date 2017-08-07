goog.provide("chapter6.Bug");

goog.require("lime.Sprite");
goog.require("lime.audio.Audio");

chapter6.Bug = function(minX=20,maxX=440,minY=50,maxY=200) {
	goog.base(this);
	
	this.minX=minX;
	this.maxX=maxX;
	this.minY=minY;
	this.maxY=maxY;
	
	this.caughtSound = new lime.audio.Audio("sound/bug_sound.mp3");
	
	this.setAnchorPoint(0,0).setPosition(390,230).setFill('img/bug.png').setSize(80,70);
	
	
	var x = goog.math.uniformRandom(this.minX,this.maxX);
	var y = goog.math.uniformRandom(this.minY,this.maxY);
	
	this.setPosition(x,y)
}

goog.inherits(chapter6.Bug, lime.Sprite);