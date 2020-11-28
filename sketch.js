const LAT_MIN = 8.066667;
const LAT_MAX = 37.1;
const LONG_MIN = 68.11667;
const LONG_MAX = 97.41667;
const TIME_MIN = 0;
const TIME_MAX = 20;

const CANVAS_WIDTH = 0;
const CANVAS_HEIGHT = 0;

const MAP_WIDTH = 20 * (LONG_MAX - LONG_MIN);
const MAP_HEIGHT = 20 * (LAT_MAX - LAT_MIN);

var indiaSketch = function(sketch){
  let gravity;
  let start_x, start_y, burst_height;

  sketch.preload = function() {
    img = sketch.loadImage('indiamap.png');
  }

  sketch.setup = function() {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
    sketch.colorMode(sketch.HSB);
    sketch.background(0);
    gravity = sketch.createVector(0, 0.2, 0);

    easycam = sketch.createEasyCam();
    easycam.zoom(-200);
    document.oncontextmenu = function(){ return false; }
  }

  sketch.draw = function () {
  	sketch.background(0);
  	sketch.smooth()

  	sketch.noFill();
  	sketch.noStroke();
   	sketch.strokeWeight(2);
   	sketch.texture(img);
   	sketch.textureMode(sketch.NORMAL);

    sketch.push();
    sketch.angleMode(sketch.DEGREES);
    sketch.rotateX(70);
    sketch.rotateZ(-10);
    sketch.rotateY(5);
    sketch.plane(MAP_WIDTH, MAP_HEIGHT);
    sketch.pop();

    sketch.renderFireworks(store);
  }

  sketch.nameProcessing = function (name){
  	let namelength = sketch.str(name).length;
    return namelength || 0;
  }

  sketch.renderFirework = function (location){
    if(location.added == true) {
      location.firework.update();
      location.firework.show();
      return;
    }

    let {name, long, lat, time} = {...location};

    let user_time = new Date(time);
    let current_time = new Date();
    let last_time = new Date();
    last_time.setDate(last_time.getDate() - 0.125);
    burst_height = sketch.map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);

    if(burst_height < 0){
     return;
    }

    let name_value = sketch.nameProcessing(name);
    start_x = sketch.map(long, LONG_MIN, LONG_MAX, -MAP_WIDTH/2, MAP_WIDTH/2) + 25;
    start_y = sketch.map(lat, LAT_MAX, LAT_MIN, -MAP_HEIGHT/2, MAP_HEIGHT/2) + 15;

    location.firework = new Firework(sketch, start_x, start_y, burst_height, gravity, name_value, true);
    location.added = true;
  }

  sketch.renderFireworks = function (location_store){
    //take the store and call renderFirework() for each
      _.mapValues(location_store, location => {
        sketch.renderFirework(location, {...location});
      });
  }
}


new p5(indiaSketch, 'india-sketch-container');
