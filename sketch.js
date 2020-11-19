
let listRender = false;
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

function nameProcessing(name){
  return name.length || 0;
}

function renderFirework({name, lat, long, time}){
  let user_time = new Date(time);
  let current_time= new Date();
  let last_time= new Date();
  last_time.setDate(last_time.getDate() - 1);

  let name_value = nameProcessing(name);
  let x = map(long, LONG_MIN, LONG_MAX, 0, width);
  let y = map(lat, LAT_MAX, LAT_MIN, 0, height);

  let z = map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);
  // console.log(x, y);
  console.log(x, y, z);
  noStroke();
  fill('red');
  circle(x, y, 10);
  text(name, x + 10, y);

  let firework = new Firework(x, y, z, name_value, 1);
  firework.update();
  firework.show();
}

function renderFireworks(){
  //take the store and call renderFirework() for each
  if(listRender == true) return;
  _.mapValues(store, user => {
    renderFirework({...user});
    listRender = true;
  });
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  colorMode(HSB);
  background('green');
  gravity = createVector(0, 0.2, 0);
}

function draw() {
  // text(current_user.name, 100, 100);
  // text(current_user.lat, 100, 150);
  // text(current_user.long, 100, 200);
  renderFireworks();
}
