//set main namespace
goog.provide('chapter6');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');


// entrypoint
chapter6.start = function(){
	
	var director = new lime.Director(document.body,1024,768);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);
	
	var scene1 = new lime.Scene();
	scene1.setRenderer(lime.Renderer.CANVAS);
	
	var grass_gradient = new lime.fill.LinearGradient();
	grass_gradient.setDirection(0,0,1,-1);
	grass_gradient.addColorStop(0,"#7CCD7C");
	grass_gradient.addColorStop(0.5,"#00FF00");
	
	var grass = new lime.Sprite();
	grass.setSize(800,640).setPosition(0,0).setAnchorPoint(0,0).setFill(grass_gradient);
	
	//bug count
	var num_bugs_caught = 0;
	var bug_count = new lime.Label()
	bug_count.setText('Bug_count: '+num_bugs_caught);
	bug_count.setFontFamily('Arial').setFontColor("#000000").setFontSize(20);
	bug_count.setPosition(100,300);
	
	//box
	var box = new lime.Sprite()
	box.setAnchorPoint(0,0).setPosition(390,230).setFill("img/box.png").setSize(150,150);
	
	//number of bugs to spawn
	var num_bugs = goog.math.randomInt(10)+1;
	console.log("num_bugs= "+num_bugs);
	
	var bugsArray = [];
	
	for (var i=0;i<num_bugs;i++) {
		var x = goog.math.uniformRandom(20,440);
		var y = goog.math.uniformRandom(50,200);
		bug = new lime.Sprite();
		bug.setAnchorPoint(0,0).setPosition(390,230).setFill('img/bug.png')
		bug.setPosition(x,y).setSize(80,70);
		
		goog.events.listen(bug,['mousedown','touchstart'],
						   function(e){
						   var drag = e.startDrag();
						   
						   var that = this;
						   
						   e.event.stopPropagation();
						   
						   drag.addDropTarget(box);
						   
						   current_bug = this;
						   goog.events.listen(drag,lime.events.Drag.Event.DROP,
											  function(e){
											  current_bug.setFill('');
											  delete current_bug;
											  //update bug count
											  num_bugs_caught++;
											  bug_count.setText("Bug count: "+num_bugs_caught);
											  });
						   })
		
		bugsArray.push(bug);
	}
	
	scene1.appendChild(grass);
	scene1.appendChild(bug_count);
	
	
	for (i in bugsArray) {
		scene1.appendChild(bugsArray[i]);
	}
	
	scene1.appendChild(box);
	
	// set current scene active
	director.replaceScene(scene1);
	
}
