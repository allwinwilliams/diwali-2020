const LAT_MIN = 8;
const LAT_MAX = 37;
const LONG_MIN = 69;
const LONG_MAX = 97;
const TIME_MIN = 0;
const TIME_MAX = 100;
const HUE_MIN = 0;
const HUE_MAX = 255;

const CANVAS_WIDTH = 0;
const CANVAS_HEIGHT = 0;

const MAP_WIDTH = 10 * (LONG_MAX - LONG_MIN);
const MAP_HEIGHT = 10 * (LAT_MAX - LAT_MIN);

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
  x = map(long, LONG_MIN, LONG_MAX, -MAP_WIDTH/2, MAP_WIDTH/2);
  y = map(lat, LAT_MAX, LAT_MIN, -MAP_HEIGHT/2, MAP_HEIGHT/2);
  let z = map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);
  //console.log(x, y, z);

  fireworks.push(new Firework(x,y,z, 30, true));
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


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
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
  // plane(100, 60);

  noFill();
  plane(MAP_WIDTH, MAP_HEIGHT);

	noStroke();
	//placeholder, centre box:
  fill('white');
	push();
	// translate(width/2, height/2);
	box(30);
  pop();

  // text(current_user.name, 100, 100);
  // text(current_user.lat, 100, 150);
  // text(current_user.long, 100, 200);

  renderFireworks(store);

  // for (let i = fireworks.length - 1; i >= 0; i--) {
	//     fireworks[i].update();
	//     fireworks[i].show();
  //
	//      // if (fireworks[i].done()) {
	//      // 	fireworks.splice(i, 1);
	//      // break;
	//   	// }
	//   // console.log("i "+i);
	//   // console.log("length " + fireworks.length);
  //   }

  _.map(fireworks, firework => {
    firework.update();
    firework.show();
  });

}
