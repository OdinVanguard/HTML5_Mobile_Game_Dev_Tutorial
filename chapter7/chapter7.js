//set main namespace
goog.provide('chapter7');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');


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
	
	scene1.appendChild(layer_sky);
	// set current scene active
	director.replaceScene(scene1);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter7.start', chapter7.start);
