//set main namespace
goog.provide('space_game');


//get requirements
//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.animation.MoveTo');


goog.require('space_game.Star');
goog.require('space_game.Player');
goog.require('space_game.Bullet');
goog.require('space_game.Enemy');
goog.require('space_game.Wave');


// entrypoint
space_game.start = function(){

	var director = new lime.Director(document.body,640,480);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);
	
        var wave_number = 1;
        
        var wave = new space_game.Wave(wave_number);
        
        director.replaceScene(wave.wave_scene);
	
	/*var enemy_goal_y = 280;
	
	//add stars to sky layer
	num_stars = goog.math.uniformRandom(150,300);
	
	for(i=0;i<num_stars;i++) {
		var star = new space_game.Star();
		layer_sky.appendChild(star);
	}
	
	//add player spaceship
	var player = new space_game.Player();
	player.setPosition(240,280);
	
	//add player movement
	goog.events.listen(layer_sky,['mousedown','touchstart'],
            function(e){
		var rocket_movement = new lime.animation.MoveTo(e.position.x,
                        player.getPosition().y);
		rocket_movement.setDuration(1);
		player.runAction(rocket_movement);})
	
	lime.scheduleManager.scheduleWithDelay(function() { // 500=500ms=.5sec
		if (this.bullets.length < this.max_bullets) {
			var bullet = new space_game.Bullet()
			bullet.setPosition(this.getPosition().x,245);
		
			this.bullets.push(bullet);
										   
			scene1.appendChild(bullet);
		}
	},player,500)
	
	var wave_number = 1;
	var wave_count = goog.math.safeFloor(goog.math.uniformRandom(10,20));
	var num_enemies = wave_count
	enemies = [];
	
	for(i=0;i<num_enemies;i++){
		var enemy = new space_game.Enemy();
		//enemy.max_speed_x = enemy.max_speed_x*Math.pow(2,wave_number/4);
		enemy.speed_y_target = enemy.speed_y_target*
                        Math.pow(2,wave_number/4);
		enemies.push(enemy);
		layer_sky.appendChild(enemy);
	}
	console.log("starting wave "+wave_number+"; enemy count="+
                enemies.length);
	
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
				if(goog.math.Box.intersects(
                                        this.bullets[i].getBoundingBox(),
					enemies[j].getBoundingBox())) {
					enemies[j].setHidden(true)
                                        enemies[j].removeDomElement();
					delete enemies[j];
					enemies.splice(j,1);
					num_enemies=goog.math.safeFloor(
                                                num_enemies-1);
					remove_current_bullet=true;
					console.log("enemy hit,"+
                                                num_enemies+"remain");
				}
			}
			
			if(remove_current_bullet) {
				current_bullet.setHidden(true)
                                current_bullet.removeDomElement();
				delete this.bullets[i];
				this.bullets.splice(i,1);
			}
			
		}
		
		if(num_enemies <= 0) {
			wave_number++;
			wave_count = wave_count + 
                                goog.math.safeFloor(
                                goog.math.uniformRandom(1,5));
			num_enemies = wave_count;
			enemies = [];
	
			for(i=0;i<num_enemies;i++){
				var enemy = new space_game.Enemy();
				//enemy.max_speed_x = enemy.max_speed_x*
                                //  Math.pow(2,wave_number/4);
				enemy.speed_y_target = enemy.speed_y_target*
                                        Math.pow(2,wave_number/4);
				enemies.push(enemy);
				layer_sky.appendChild(enemy);
			}
			console.log("starting wave "+wave_number+
                                "; enemy count="+enemies.length);
		} else {
			reset_game = false;
			if (enemies.length > 0) {
				for (i=0; i<enemies.length;i++){
					enemy=enemies[i];
					if (enemy.getPosition().y > 
                                                enemy_goal_y) {
						alert("An enemy got by you!..."+
                                                        "you lost at wave "+
                                                        wave_number);
						enemy.setPosition(
                                                        enemy.getPosition().x,
                                                0);
						wave_number=1;
					}
					enemy_x=enemy.getPosition().x;
					player_x=player.getPosition().x;
					repel_force=enemy.player_repel_coefficient*
                                                (enemy_x-player_x);
					enemy.accel_x+=repel_force;
				}
			}
			
		}
								  
	},player)
	
	scene1.appendChild(layer_sky);
	scene1.appendChild(player);
	
	// set current scene active
	director.replaceScene(scene1);*/

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('space_game.start', space_game.start);
