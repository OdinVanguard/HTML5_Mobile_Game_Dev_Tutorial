goog.provide('space_game.Wave');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.animation.MoveTo');


goog.require('space_game.Star');
goog.require('space_game.Player');
goog.require('space_game.Bullet');
goog.require('space_game.Enemy');

space_game.Wave = function(wave_number) {
   
    goog.base(this);
   
    this.wave_number=wave_number;
    
    this.wave_scene=new lime.Scene();
   
    //build sky layer
    this.layer_sky = new lime.Layer();
    this.layer_sky.setAnchorPoint(0,0).setPosition(0,0);

    sky_gradient = new lime.fill.LinearGradient();
    sky_gradient.setDirection(0,0,1,-1);
    sky_gradient.addColorStop(0,"#11111F").addColorStop(0.5,"#282828");

    this.sky = new lime.Sprite();
    this.sky.setSize(480,320).setPosition(0,0).setAnchorPoint(0,0)
    this.sky.setFill(sky_gradient);
    
    this.layer_sky.appendChild(this.sky);
    
    this.wave_scene.appendChild(this.layer_sky);
    //

}

goog.inherits(space_game.Wave, lime.Node);