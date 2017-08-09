//set main namespace
goog.provide('chapter11');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.parser.TMX');
goog.require('lime.animation.MoveTo');


// entrypoint
chapter11.start = function(){

    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var gameScene = new lime.Scene;
    layer = new lime.Layer()
    layer.setRenderer(lime.Renderer.CANVAS);
    gameScene.appendChild(layer);
    
    
    
    var tmx = new lime.parser.TMX("assets/lesson11_map.tmx");
    for(var j = 0;j < tmx.layers.length;j++){
        for(var i = 0; i < tmx.layers[j].tiles.length; i++){
            tile = tmx.layers[j].tiles[i];
            sprite = new lime.Sprite();
            sprite.setPosition(tile.px,tile.py);
            sprite.setFill(tile.tile.frame);
            layer.appendChild(sprite);
        }
    }
    
    //player
    var player = new lime.Sprite();
    player.setPosition(100,100).setFill("assets/player.png");
    
    layer.appendChild(player);
    
    //move player
    goog.events.listen(layer,['mousedown','touchstart'],
        function(e){
            movement = new lime.animation.MoveTo(e.position.x,e.position.y);
            console.log("click at"+e.position);
            movement.setDuration(1);
            player.runAction(movement);
        });
    
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter11.start', chapter11.start);
