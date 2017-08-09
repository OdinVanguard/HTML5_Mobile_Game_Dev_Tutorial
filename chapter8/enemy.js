goog.provide('chapter8.Enemy');

goog.require('lime.Sprite');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('chapter8.Bullet');
goog.require('goog.math');

chapter8.Enemy = function() {
	
	//call the parent constructor
	goog.base(this);
	
        this.max_x=480;
	this.min_x=0;
	this.max_y=320;
	this.min_y=0;
        
        //animated enemy
        //lime.fill.Frame signature:
        // (spriteSheetPath,start_x,start_y,width,height)
	var frame1 = new lime.fill.Frame("img/enemy_anim.png",0,0,60,30);
	var frame2 = new lime.fill.Frame("img/enemy_anim.png",60,0,60,30);
	var frame3 = new lime.fill.Frame("img/enemy_anim.png",120,0,60,30);
	var frame4 = new lime.fill.Frame("img/enemy_anim.png",180,0,60,30);
        
        var animated_sprite = new lime.animation.KeyframeAnimation();
        animated_sprite.setDelay(0.5);
        animated_sprite.addFrame(frame1);
        animated_sprite.addFrame(frame2);
        animated_sprite.addFrame(frame3);
        animated_sprite.addFrame(frame4);
        
        this.runAction(animated_sprite);
        
        this.setSize(60,30);
        this.max_x-=this.getSize().width/2;
        //this.min_x+=this.getSize().width/2;
        this.max_y-=this.getSize().height/2;
        //this.min_y+=this.getSize().height/2;
        
        //this.setAnchorPoint(.5,.5);
        	
        console.log("enemy size:"+this.getSize().width+
                " x "+this.getSize().height);
        
	var x = goog.math.uniformRandom(0,480);
	var y = goog.math.uniformRandom(30,60);
        
	this.setPosition(x,y);
	this.max_speed_x=.25;
	this.accel_x=0;
	this.friction=.01;
	this.speed_x=goog.math.uniformRandom(-this.max_speed_x,
            this.max_speed_x);
	this.speed_y=0;
	this.speed_y_target=.0025;
	this.speed_y_delta=.125;
	this.player_repel_coefficient=.5
        
	//make it move
	lime.scheduleManager.schedule(function(dt){
		current_x = this.getPosition().x;
		current_y = this.getPosition().y;
		
		this.accel_x += goog.math.uniformRandom(-this.max_speed_x/32,
					this.max_speed_x/32);
					
		this.accel_x -= this.speed_x*this.friction;
		this.accel_x = goog.math.clamp(this.accel_x,
                    -this.max_speed_x*.0625,
                    this.max_speed_x*.0625);
		
		this.speed_x=this.speed_x+this.accel_x;
		this.speed_x=goog.math.clamp(this.speed_x,
                    -this.max_speed_x,this.max_speed_x);
		
		this.speed_y = this.speed_y_target+
			goog.math.uniformRandom(-this.speed_y_delta,
                            this.speed_y_delta);
		
		new_pos_x = current_x+this.speed_x*dt;//+this.accel_x*dt*dt/2;
		new_pos_y = current_y+this.speed_y*dt;
		
		new_pos_x=goog.math.modulo(new_pos_x,this.max_x-this.min_x)+
                            this.min_x;
		new_pos_y=goog.math.clamp(new_pos_y,this.min_y,this.max_y);
		
		this.setPosition(new_pos_x,new_pos_y);
		
	},this)
	
	this.bullets = [];
	
}

goog.inherits(chapter8.Enemy, lime.Sprite);