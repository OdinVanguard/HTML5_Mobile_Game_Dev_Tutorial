//set main namespace
goog.provide('chapter9');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.fill.LinearGradient');


// entrypoint
chapter9.start = function(){

    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var scene1 = new lime.Scene();
    scene1.setRenderer(lime.Renderer.CANVAS);
    
    var layer1 = new lime.Layer();
    layer1.setAnchorPoint(0,0).setPosition(0,0);
    
    scene1.appendChild(layer1);
    
    //sky
    var sky_gradient = new lime.fill.LinearGradient();
    sky_gradient.setDirection(0,0,1,1);
    sky_gradient.addColorStop(0,"#B2DFEE").addColorStop(1,"#0000CD");
    
    var sky = new lime.Sprite();
    sky.setSize(800,640).setPosition(0,0).setAnchorPoint(0,0)
    sky.setFill(sky_gradient);
    
    layer1.appendChild(sky);
    
    director.replaceScene(scene1);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter9.start', chapter9.start);
