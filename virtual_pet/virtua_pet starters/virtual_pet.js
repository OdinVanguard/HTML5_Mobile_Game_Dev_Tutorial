//set main namespace
goog.provide('virtual_pet');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('virtual_pet.Pet');
goog.require('virtual_pet.Item');

// entrypoint
virtual_pet.start = function(){
    //object to store game-level properties
    var gameObj = {
        width: 320,
        height: 480,
        renderer: lime.Renderer.CANVAS,
        maxPetSize: 200,
        
    };
    
    var director = new lime.Director(document.body,gameObj.width,gameObj.height);
    var gameScene = new lime.Scene().setRenderer(gameObj.renderer)
    var gameLayer = new lime.Layer();
    
    var background = new lime.Sprite().setSize(gameObj.width,gameObj.height*4/5).
        setFill('#F3E2A9').setAnchorPoint(0,0).setPosition(0,0);
    
    var menuArea = new lime.Sprite().setSize(gameObj.width,gameObj.height/5).
        setFill('#8B5A00').setPosition(gameObj.width/2,gameObj.height*9/10)
    
    
    gameLayer.appendChild(background);    
    gameLayer.appendChild(menuArea);        
    gameScene.appendChild(gameLayer);
    
    
    director.makeMobileWebAppCapable();
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('virtual_pet.start', virtual_pet.start);
