//set main namespace
goog.provide('chapter3');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.Circle');

// entrypoint
chapter3.start = function(){
    var director = new lime.Director(document.body,800,640);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var scene1 = new lime.Scene();
    
    var rectangle = new lime.Sprite().setSize(800,640).setFill('#EE82EE').setPosition(0,0).setAnchorPoint(0,0);
    
    var circle = new lime.Circle().setSize(40,40).setFill('#000088').setPosition(100,100);
    
    scene1.appendChild(rectangle);
    
    scene1.appendChild(circle);
    
    var  scene2 = new lime.Scene();
    var rectangle2 = new lime.Sprite().setSize(800,640).setFill("#76EE00").setPosition(0,0).setAnchorPoint(0,0);
    var rectangle3 = new lime.Sprite().setSize(50,140).setFill("img/monster.jpg").setPosition(100,200).setAnchorPoint(0,0);
    
    scene2.appendChild(rectangle2);
    scene2.appendChild(rectangle3);
    
    director.replaceScene(scene1);
    
    director.replaceScene(scene2);
    
}

