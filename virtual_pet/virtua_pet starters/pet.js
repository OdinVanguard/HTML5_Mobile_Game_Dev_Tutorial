goog.provide('virtual_pet.Pet');
goog.require('lime.Circle');

virtual_pet.Pet = function(gameObj, gameLayer) {
    goog.base(this);
    
    this.gameObj = gameObj;
    this.gameLayer = gameLayer;
    this.happiness = 100;
    this.health = 100;
        
    this.setPosition(this.gameObj.width/2, this.gameObj.height/2);
    this.updateLook();
           
};

goog.inherits(virtual_pet.Pet,lime.Circle);

/**
 * update the pet's look according to it's happiness and health
 */
virtual_pet.Pet.prototype.updateLook = function() {

};

