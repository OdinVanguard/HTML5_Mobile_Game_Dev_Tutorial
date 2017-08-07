//set main namespace
goog.provide('chapter5');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');


// entrypoint
chapter5.start = function(){

    var director = new lime.Director(document.body,1024,768);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var scene1 = new lime.Scene();
    
    var grass_gradient = new lime.fill.LinearGradient();
    grass_gradient.setDirection(0,0,1,-1);
    grass_gradient.addColorStop(0,"#7CCD7C");
    grass_gradient.addColorStop(0.5,"#00FF00");
    
    var grass = new lime.Sprite();
    grass.setSize(800,640).setPosition(0,0).setAnchorPoint(0,0).setFill(grass_gradient);
    
    scene1.appendChild(grass);
    
	// set current scene active
	director.replaceScene(scene1);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter5.start', chapter5.start);
