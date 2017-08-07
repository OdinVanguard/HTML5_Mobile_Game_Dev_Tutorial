//set main namespace
goog.provide('chapter4');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Polygon');
goog.require('lime.animation.MoveTo');

// entrypoint
chapter4.start = function(){

    var director = new lime.Director(document.body,800,640);

    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);

    var scene1 = new lime.Scene();
    
    //sky
    var sky_gradient = new lime.fill.LinearGradient()
    sky_gradient.setDirection(0,0,1,1).addColorStop(0,'#B2DFEE').addColorStop(1,"#0000CD");
    
    var sky = new lime.Sprite()
    sky.setSize(800,640).setPosition(0,0).setAnchorPoint(0,0).setFill(sky_gradient);
    
    //grass
    var grass = new lime.Sprite()
    grass.setSize(800,40).setPosition(0,600).setAnchorPoint(0,0).setFill(0,128,0);
    
    //launch platform
    var platform = new lime.Polygon()
    platform.setPosition(100,560).setAnchorPoint(0,0).setFill("#888883")
    platform.addPoints(-40,40,0,0,600,0,640,40,-40,40);
    
    //rocket
    var rocket1 = new lime.Sprite()
    rocket1.setSize(80,140).setFill("img/rocket.png").setPosition(360,420).setAnchorPoint(0,0);
    
    goog.events.listen(rocket1,['mousedown','touchstart'],
                       function(e) {
                            var rocket1_movement = new lime.animation.MoveTo(360,-200)
                            rocket1_movement.setDuration(1);
                            this.runAction(rocket1_movement);
                       });
    
    scene1.appendChild(sky);
    scene1.appendChild(grass);
    scene1.appendChild(platform);
    scene1.appendChild(rocket1);
    
	// set current scene active
	director.replaceScene(scene1);

}
