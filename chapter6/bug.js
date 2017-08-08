goog.provide("chapter6.Bug");

goog.require("lime.Sprite");
goog.require("lime.audio.Audio");
goog.require("goog.math");
goog.require("lime.animation.RotateBy");
//goog.require("lime.scheduleManager");

chapter6.Bug = function(speed,sizeScale,minX=20,maxX=440,minY=50,maxY=200) {
	goog.base(this);
	
	this.speed=speed;
	this.sizeX=80*sizeScale;
	this.sizeY=70*sizeScale;
	
	this.minX=minX+this.sizeX/2;
	this.maxX=maxX-this.sizeX/2;
	this.minY=minY+this.sizeY/2;
	this.maxY=maxY-this.sizeY/2;
	
	
	//console.log("speed parameter is "+speed);
	//console.log("created a bug with speed "+this.speed);
	this.speed_x=0;
	this.speed_y=this.speed;
	
	this.caughtSound = new lime.audio.Audio("sound/bug_sound.mp3");
	
	this.setAnchorPoint(0,0).setPosition(390,230).setFill('img/bug.png')
	this.setSize(this.sizeX,this.sizeY);
	this.setAnchorPoint(.5,.5);
	
	var x = goog.math.uniformRandom(this.minX,this.maxX);
	var y = goog.math.uniformRandom(this.minY,this.maxY);
	
	this.setPosition(x,y);
	
	this.moving = false;
	this.moveAngle = 0;
	this.beingDragged = false;
	
	lime.scheduleManager.schedule(function(dt) {
								  if(this.is_moving && !this.beingDragged) {
								  //update position
								  current_x = this.getPosition().x;
								  current_y = this.getPosition().y;
								  
								  if ( current_x + this.speed_x * dt > this.maxX ||
									  current_x + this.speed_x * dt < this.minX ){
								  this.moveAngle += 90 + goog.math.uniformRandom(0,45);
								  this.setCrawlVector(this.moveAngle,this.speed);
								  }
								  if ( current_y + this.speed_y * dt > this.maxY ||
									  current_y + this.speed_y * dt < this.minY){
								  this.moveAngle += 90 + goog.math.uniformRandom(0,45);
								  this.setCrawlVector(this.moveAngle,this.speed);
								  }
								  
								  var new_x = current_x + this.speed_x * dt;
								  var new_y = current_y + this.speed_y * dt;
								  
								  new_x=goog.math.clamp(new_x,this.minX,this.maxX);
								  new_y=goog.math.clamp(new_y,this.minY,this.maxY);
								  
								  this.setPosition(new_x,new_y)
								  }
								  },this);
}

goog.inherits(chapter6.Bug, lime.Sprite);

chapter6.Bug.prototype.crawl = function() {
	this.is_moving = true;
	
	this.moveAngle = goog.math.uniformRandom(0,360);
	
	this.setCrawlVector(this.moveAngle,this.speed);
	
}

chapter6.Bug.prototype.setCrawlVector = function(angle,speed) {
	this.moveAngle = angle;
	this.speed = speed;
	var old_speed_x=this.speed_x;
	var old_speed_y=this.speed_y;
	this.speed_x = goog.math.angleDx(this.moveAngle,this.speed);
	this.speed_y = goog.math.angleDy(this.moveAngle,this.speed);
	/*var rotate_angle_1=goog.math.angle(0,this.speed,old_speed_x,old_speed_y);
	var rotate_angle_2=goog.math.angle(0,this.speed,this.speed_x,this.speed_y);
	var rotate_angle=goog.math.angleDifference(rotate_angle_1,rotate_angle_2);
	
	var rotation = new lime.animation.RotateBy(rotate_angle);
	rotation.setDuration(.1);
	this.runAction(rotation);*/
	
}