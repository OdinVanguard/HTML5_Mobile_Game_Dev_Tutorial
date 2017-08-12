goog.provide('space_game.Wave');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.animation.MoveTo');
goog.require('lime.Sprite');
goog.require('lime.Circle');

goog.require('space_game.Star');
goog.require('space_game.Player');
goog.require('space_game.Bullet');
goog.require('space_game.Enemy');
goog.require('space_game.State_Machine');
goog.require('space_game.Signal');

space_game.Wave = function(wave_number,parent_state_machine) {
    goog.base(this);

    this.that = this;
    
    this.parent_state_machine = parent_state_machine;
    
    this.state_machine = new space_game.State_Machine();
    
    this.state_machine.name = "Wave_State_Machine";
    
    this.state_machine.state_list=["Startup","Running","Paused",
        "WinTransition","LossTransition","Done"];
    
    this.state_machine.state="Startup";
    
    //this.state_machine.printLog();
    
    this.wave_number=wave_number;
    
    this.wave_scene=new lime.Scene();

    this.layer_sky = new lime.Layer();
    this.sky = new lime.Sprite();
    this.stars=[];
    this.buildSky();
    
    this.wave_scene.appendChild(this.layer_sky);
    
    this.state_machine.setState("Running");
}

goog.inherits(space_game.Wave, lime.Node);

space_game.Wave.prototype.buildSky = function() {
    //build sky layer
    this.layer_sky.setAnchorPoint(0,0).setPosition(0,0);

    sky_gradient = new lime.fill.LinearGradient();
    sky_gradient.setDirection(0,0,1,-1);
    sky_gradient.addColorStop(0,"#11111F").addColorStop(0.5,"#282828");

    this.sky = new lime.Sprite();
    this.sky.setSize(480,320).setPosition(0,0).setAnchorPoint(0,0)
    this.sky.setFill(sky_gradient);
    
    this.layer_sky.appendChild(this.sky);
    
    this.addStars();
    
}

space_game.Wave.prototype.addStars = function() {
   	//add stars to sky layer
	//num_stars = goog.math.uniformRandom(1,10);
        num_stars=5;
        
	for(i=0;i<num_stars;i++) {
                //console.log("adding star to sky");
                this.stars.push(new space_game.Star());
		this.layer_sky.appendChild(this.stars[i]);
	}
        console.log("added "+this.stars.length+" stars")
}

/*space_game.Wave.prototype.update = function(dt) {
    //console.log("wave: running update with timestep "+dt);
    this.processSignals(dt);
    
    //tell stars to update
    for (i in this.stars) {
        this.stars[i].update(dt);
    }
    
}

space_game.Wave.prototype.processSignals = function(dt){
    
}*/