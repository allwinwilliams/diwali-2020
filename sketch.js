
const LAT_MIN = 8;
const LAT_MAX = 37;
const LONG_MIN = 69;
const LONG_MAX = 97;
const TIME_MIN = 0;
const TIME_MAX = 30;
const HUE_MIN = 0;
const HUE_MAX = 255;

const CANVAS_WIDTH = 0;
const CANVAS_HEIGHT = 0;

const MAP_WIDTH = 10 * (LONG_MAX - LONG_MIN);
const MAP_HEIGHT = 10 * (LAT_MAX - LAT_MIN);

let fireworks = [];
let gravity;
let col = true;
let start_x; let start_y; let burst_height;

function nameProcessing(name){
	let namelength = str(name).length;
  return namelength || 0;
}

function renderFirework({name, long, lat, time}){

  let user_time = new Date(time);
  let current_time = new Date();
  let last_time = new Date();
  last_time.setDate(last_time.getDate() - 1);

  let name_value = nameProcessing(name);
  start_x = map(long, LONG_MIN, LONG_MAX, -MAP_WIDTH/2, MAP_WIDTH/2);
  start_y = map(lat, LAT_MAX, LAT_MIN, -MAP_HEIGHT/2, MAP_HEIGHT/2);
  burst_height = map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);
 // console.log(burst_height);
  let hu1 = map(long, LONG_MIN, LONG_MAX, HUE_MIN, HUE_MAX);
  let hu2 = map(lat, LAT_MIN, LAT_MAX, HUE_MIN, HUE_MAX);
  let nl = nameProcessing(name);
  console.log("namelength "+nl);


  fireworks.push(new Firework(start_x, start_y, burst_height, hu1, hu2, nl, true));
}


function renderFireworks(location_store){
  //take the store and call renderFirework() for each
    _.mapValues(location_store, user => {
      if(user.added == false){
        renderFirework({...user});
        user.added = true;
      }
    });
}


function preload() {
  img = loadImage('indiamap.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  background(0);
  gravity = createVector(0, 0.2, 0);

  easycam = createEasyCam();
  easycam.zoom(-200);
  document.oncontextmenu = function() { return false; }
}

function draw() {
	background(0);
	smooth() 

	noFill();
	noStroke();
 	strokeWeight(2);
 	texture(img);
 	textureMode(NORMAL);

    push();
    angleMode(DEGREES);
    rotateX(70);
    rotateZ(-10);
    rotateY(5);
    plane(MAP_WIDTH, MAP_HEIGHT);
    pop();
 

  renderFireworks(store);

  for (let i = fireworks.length - 1; i >= 0; i--) {
	    fireworks[i].update();
	    fireworks[i].show();
    }
}
