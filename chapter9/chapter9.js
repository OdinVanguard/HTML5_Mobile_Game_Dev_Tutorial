//set main namespace
goog.provide('chapter9');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.fill.LinearGradient');

goog.require("box2d.Vec2");
goog.require("box2d.AABB");
goog.require("box2d.World");

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
    
    //setup physics
    //define gravity vector
    var gravity = new box2d.Vec2(0,100);
    
    //AABB means "axis alighend bounding box", limits of physics world
    var bounds = new box2d.AABB();
    bounds.minVertex.Set(0,0);
    bounds.maxVertex.Set(480,320);
    
    //create a world
    var world = new box2d.World(bounds,gravity,false);
    
    //create ground////////////////////////////////////////////
    var floor = new lime.Sprite();
    floor.setSize(480,40);
    floor.setFill("#009000");
    layer1.appendChild(floor);
    
    var bodyDef = new box2d.BodyDef();
    bodyDef.position.Set(240,300); // position of object center
    
    //shape definition
    var shapeDef = new box2d.BoxDef;
    shapeDef.restitution = 0;
    shapeDef.density = 0;
    shapeDef.friction = 1;
    shapeDef.extents.Set(240,20); //extension in x and y from center
    
    bodyDef.AddShape(shapeDef);
    
    //create the body in the world
    var body = world.CreateBody(bodyDef);
    floor._body = body;
    
    //link limejs object to body
    //source: https://gist.github.com/1758226
    function updateFromBody(shape){
        var pos = shape._body.GetCenterPosition();
        var rot = shape._body.GetRotation();
        shape.setRotation(-rot/Math.PI*180);
        shape.setPosition(pos);
    }
    
    dt = 25;
    lime.scheduleManager.scheduleWithDelay(function(){
        this.Step(dt/1000,3);
        updateFromBody(floor);
    },world,dt)
    
    ////////////////////////////////////////////
    
    director.replaceScene(scene1);
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter9.start', chapter9.start);
