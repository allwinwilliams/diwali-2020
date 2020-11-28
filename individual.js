var userSketch = function(sketch){
  let gravity;
  let start_x, start_y, burst_height;

  sketch.setup = function() {
    sketch.createCanvas(500, 500, sketch.WEBGL);
    sketch.colorMode(sketch.HSB);
    sketch.background(0);
    gravity = sketch.createVector(0, 0.2, 0);

    easycam = sketch.createEasyCam();
    easycam.zoom(0);
    document.oncontextmenu = function(){ return false; }
  }

  sketch.draw = function () {
  	sketch.background(0);
  	sketch.smooth();
    sketch.renderFirework(current_user);
  }

  sketch.nameProcessing1 = function (name){
  	let namelength = sketch.str(name).length;
    return namelength || 0;
  }

  sketch.nameProcessing2 = function(name){
  	let nl = avg(sketch.unchar(sketch.split(name, '')));
  	// console.log(name + " " + nl); // nl has range of 0 - 122
  	return nl || 0;
  }

  function avg(t) {
    let sum = 0;
    for (let item of t) {
      sum += item;
    }
    return sum / 20;
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

    let {name, long, lat, time} = {...location};

    let user_time = new Date(time);
    let current_time = new Date();
    let last_time = new Date();
    last_time.setDate(last_time.getDate() - 0.125);
    //last_time.setDate(last_time.getDate() -2);

    let name_val_1 = sketch.nameProcessing1(name);
    let name_val_2 = sketch.nameProcessing2(name);
    console.log(user_time, name_val_1, name_val_2);
    location.firework = new Firework(sketch, 0, 0, 10, gravity, name_val_1, name_val_2, true);
    location.added = true;
  }
}

let userCanvas = new p5(userSketch, 'user-sketch-container');
