goog.provide("space_game.Signal");

space_game.Signal = function(signal_name,signal_data) {
    goog.base(this);
    this.name=signal_name;
    this.data=signal_data;
}

goog.inherits(space_game.Signal,lime.Node);