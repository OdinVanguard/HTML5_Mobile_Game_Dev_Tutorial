//set main namespace
goog.provide('chapter7');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.animation.MoveTo');


goog.require('chapter7.Star');
goog.require('chapter7.Player');
goog.require('chapter7.Bullet');
goog.require('chapter7.Enemy');


// entrypoint
chapter7.start = function(){

	var director = new lime.Director(document.body,480,320);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);
	
	var scene1 = new lime.Scene();
	scene1.setRenderer();
	
	//build sky layer
	var layer_sky = new lime.Layer();
	layer_sky.setAnchorPoint(0,0).setPosition(0,0);
	
	var sky_gradient = new lime.fill.LinearGradient();
	sky_gradient.setDirection(0,0,1,-1);
	sky_gradient.addColorStop(0,"#11111F").addColorStop(0.5,"#282828");
	
	var sky = new lime.Sprite();
	sky.setSize(480,320).setPosition(0,0).setAnchorPoint(0,0).setFill(sky_gradient);
	
	layer_sky.appendChild(sky);
	
	//add stars to sky layer
	num_stars = goog.math.uniformRandom(150,300);
	
	for(i=0;i<num_stars;i++) {
		var star = new chapter7.Star();
		layer_sky.appendChild(star);
	}
	
	//add player spaceship
	var player = new chapter7.Player();
	player.setPosition(240,280);
	
	//add player movement
	goog.events.listen(layer_sky,['mousedown','touchstart'],
					  function(e){
						var rocket_movement = new lime.animation.MoveTo(e.position.x,
																		player.getPosition().y);
						rocket_movement.setDuration(1);
					  
						player.runAction(rocket_movement);
					  })
	
	lime.scheduleManager.scheduleWithDelay(function() { // 500=500ms=.5sec
		if (this.bullets.length < this.max_bullets) {
			var bullet = new chapter7.Bullet()
			bullet.setPosition(this.getPosition().x,245);
		
			this.bullets.push(bullet);
										   
			scene1.appendChild(bullet);
		}
	},player,500)
	
	num_enemies = goog.math.uniformRandom(10,20);
	enemies = [];
	
	for(i=0;i<num_enemies;i++){
		var enemy = new chapter7.Enemy();
		enemies.push(enemy);
		layer_sky.appendChild(enemy);
	}
	
	lime.scheduleManager.schedule(function(dt){
		for(i in this.bullets){
			current_bullet = this.bullets[i];
			remove_current_bullet=false;
			current_x = current_bullet.getPosition().x;
			current_y = current_bullet.getPosition().y;
			
			new_y = current_y+current_bullet.speed_y*dt;
			
			current_bullet.setPosition(current_x,new_y);
				
			if (new_y < 0) {
				remove_current_bullet=true;
			}
			
			for(j in enemies) {
				if(goog.math.Box.intersects(this.bullets[i].getBoundingBox(),
					enemies[j].getBoundingBox())) {
					enemies[j].setHidden(true).removeDomElement();
					delete enemies[j];
					enemies.splice(j,1);
					num_enemies--;
					remove_current_bullet=true;
				}
			}
			
			if(remove_current_bullet) {
				current_bullet.setHidden(true).removeDomElement();
				delete this.bullets[i];
				this.bullets.splice(i,1);
			}
			
		}
		
		//collision detection
		for(j in enemies){
		}
								  
	},player)
	
	scene1.appendChild(layer_sky);
	scene1.appendChild(player);
	
	// set current scene active
	director.replaceScene(scene1);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter7.start', chapter7.start);
