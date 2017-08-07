//set main namespace
goog.provide('chapter6');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.audio.Audio');
goog.require('chapter6.Bug');

var min_bugs=1
var max_bugs=10;
var round=1;
var delta_bugs=5;



// entrypoint
chapter6.start = function(){
	
	var director = new lime.Director(document.body,1024,768);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);
	
	//declare and initialize scenes
	var initialScene = new lime.Scene();
	initialScene.setRenderer(lime.Renderer.CANVAS);
	
	var gameScene = new lime.Scene();
	gameScene.setRenderer(lime.Renderer.CANVAS);
	
	var blankScene = new lime.Scene();
	blankScene.setRenderer(lime.Renderer.CANVAS);
	
	// build blank scene
	
	var blackbox = new lime.Sprite();
	blackbox.setSize(802,642).setPosition(-1,-1).setAnchorPoint(0,0).setFill("#000000");
	
	blankScene.appendChild(blackbox);
	
	// build initial scene //////////////////////////////
	var initialLayer = new lime.Layer();
	initialLayer.setPosition(30,30);
	
	var initialContainer = new lime.Sprite();
	initialContainer.setPosition(0,0).setSize(420,260).setFill("#EEE0E5").setAnchorPoint(0,0);
	
	var initialTitle = new lime.Label();
	initialTitle.setText("WELCOME TO ROUND "+round);
	initialTitle.setFontFamily("Arial").setFontColor("#FF9999").setFontSize(20);
	initialTitle.setAnchorPoint(0,0).setPosition(80,60);
	
	var startButton = new lime.GlossyButton()
	startButton.setSize(200,60).setPosition(200,150)
	startButton.setText("Start").setColor("#00CD00")
	
	initialLayer.appendChild(initialContainer);
	initialLayer.appendChild(initialTitle);
	initialLayer.appendChild(startButton);
	
	initialScene.appendChild(initialLayer);
	
	goog.events.listen(startButton,["mousedown","touchstart"],
					   function(e){
					   director.pushScene(gameScene);
					   })
	
	// build game scene ////////////////////////////////
	
	
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
	
	//sound
	var bugSound = new lime.audio.Audio("sound/bug_sound.mp3");
	
	//number of bugs to spawn
	var num_bugs = goog.math.randomInt(max_bugs)+min_bugs;
	console.log("num_bugs= "+num_bugs);
	
	var bugsArray = [];
	
	for (var i=0;i<num_bugs;i++) {
		
		bug = new chapter6.Bug();
		
		
		goog.events.listen(bug,['mousedown','touchstart'],
						   function(e){
						   var drag = e.startDrag();
						   
						   var that = this;
						   
						   e.event.stopPropagation();
						   
						   drag.addDropTarget(box);
						   
						   current_bug = this;
						   goog.events.listen(drag,lime.events.Drag.Event.DROP,
											  function(e){
											  
											  bugSound.stop();
											  bugSound.play();
											  
											  current_bug.setHidden(true);
											  delete current_bug;
											  //update bug count
											  num_bugs_caught++;
											  bug_count.setText("Bug count: "+num_bugs_caught);
											  
											  if (num_bugs_caught == num_bugs) {
											  min_bugs+=delta_bugs;
											  max_bugs+=delta_bugs;
											  alert("All bugs caught");
											  director.pushScene(blankScene);
											  round++;
											  chapter6.start();
											  }
											  });
						   })
		
		bugsArray.push(bug);
	}
	
	gameScene.appendChild(grass);
	gameScene.appendChild(bug_count);
	
	
	for (i in bugsArray) {
		gameScene.appendChild(bugsArray[i]);
	}
	
	gameScene.appendChild(box);
	
	// set current scene active
	director.replaceScene(initialScene);
	
}
