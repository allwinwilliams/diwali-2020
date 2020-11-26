
let listRender;

const LAT_MIN = 5;
const LAT_MAX = 40;
const LONG_MIN = 65;
const LONG_MAX = 100;
const TIME_MIN = 0;
const TIME_MAX = 100;
const HUE_MIN = 0;
const HUE_MAX = 255;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

let fireworks = [];
let gravity;
let col; 

function nameProcessing(name){
  return name.length || 0;
}

function renderFirework({name, long, lat, time}){
  
  let user_time = new Date(time);
  let current_time = new Date();
  let last_time = new Date();
  last_time.setDate(last_time.getDate() - 1);

  let name_value = nameProcessing(name);
  x = map(long, LONG_MIN, LONG_MAX, 0, width);
  y = map(lat, LAT_MAX, LAT_MIN, 0, height);
  let z = map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);
  //console.log(x, y, z);
  
		
  fireworks.push(new Firework(x,y,z, 30, true));
 	


}


function renderFireworks(){
  //take the store and call renderFirework() for each
  if(listRender == false) {
  _.mapValues(store, user => {
    renderFirework({...user});
    listRender = true;
  }); }
}


function setup() {
  listRender = false;
  createCanvas(windowWidth, CANVAS_HEIGHT, WEBGL);
  colorMode(HSB);
  background(0);
  gravity = createVector(0, 0.2, 0);

  easycam = createEasyCam();
  //easycam.zoom(-250);
  document.oncontextmenu = function() { return false; }


}

function draw() {
	//colorMode(RGB);
  	background(0);
  	// rotateY(millis()/10000);
  	// rotateX(millis()/10000);
  
   translate (-width/2, -height/2);
  	
  	noStroke();

  	//placeholder, top left box:

  	fill('white');
  	push();
  	translate (-width/2, -height/2);
  	box(30);
  	pop();

  	//placeholder, centre box:
  
  	fill('green');
  	push();
  	translate (width/2, height/2);
  	box(30);
  	pop();

  // text(current_user.name, 100, 100);
  // text(current_user.lat, 100, 150);
  // text(current_user.long, 100, 200);

 	renderFireworks();



 for (let i = fireworks.length - 1; i >= 0; i--) {

	    fireworks[i].update();
	    fireworks[i].show();

	     // if (fireworks[i].done()) {
	     // 	fireworks.splice(i, 1);
	     // break;
	  	// }

	  console.log("i "+i);
	  console.log("length " + fireworks.length);
		
    }


}

