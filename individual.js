var userSketch = function(sketch){
  let firework;
  let gravity;
  let col = true;
  let start_x; let start_y; let burst_height;

  sketch.setup =function() {
    sketch.createCanvas(250, 250, sketch.WEBGL);
    sketch.colorMode(sketch.HSB);
    sketch.background(0);
    gravity = sketch.createVector(0, 0.2, 0);

    easycam = sketch.createEasyCam();
    easycam.zoom(-200);
    document.oncontextmenu = function(){ return false; }
  }

  sketch.draw =function () {
  	sketch.background('grey');
  	sketch.smooth()

    sketch.renderFirework(current_user);
  }

  sketch.nameProcessing = function (name){
  	let namelength = sketch.str(name).length;
    return namelength || 0;
  }

  sketch.renderFirework = function(location){
    if(!location.name){
      return;
    }

    if(location.added == true){
      location.firework.update();
      location.firework.show();
      return;
    }
    
    let {name, long, lat, time} = location;
    let user_time = new Date(time);
    let current_time = new Date();
    let last_time = new Date();
    last_time.setDate(last_time.getDate() - 1);

    let name_value = sketch.nameProcessing(name);
    start_x = sketch.map(long, LONG_MIN, LONG_MAX, -MAP_WIDTH/2, MAP_WIDTH/2);
    start_y = sketch.map(lat, LAT_MAX, LAT_MIN, -MAP_HEIGHT/2, MAP_HEIGHT/2);
    burst_height = sketch.map(user_time.getTime(), last_time.getTime(), current_time.getTime(), TIME_MIN, TIME_MAX);
   // console.log(burst_height);
    let hu1 = sketch.map(long, LONG_MIN, LONG_MAX, HUE_MIN, HUE_MAX);
    let hu2 = sketch.map(lat, LAT_MIN, LAT_MAX, HUE_MIN, HUE_MAX);
    let nl = sketch.nameProcessing(name);
    console.log("namelength "+nl);

    location.firework = new Firework(sketch, start_x, start_y, burst_height, gravity, hu1, hu2, nl, true);
    location.added = true;
  }
}

new p5(userSketch, 'user-sketch-container');
