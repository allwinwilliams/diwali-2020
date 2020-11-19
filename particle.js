// from Polar Fireworks by D_Snyder

function rose(theta, gamma, n=5, d=8){
  let k = n/d
  let r = cos(k*theta)
  let x = r*cos(theta) // rotation of each particle
  let y = r*sin(theta)
  // let z = r*sin(gamma*k); // gamma var contrib by Archit
  // return createVector(x, y, z);
  return createVector(x, y);
}

// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI


class Particle {
  constructor(x, y, z, stroke_weight, hu, firework, index, n, d) {
    // this.pos = createVector(x, y, z);
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0, 0);
    this.stroke_weight = stroke_weight;
    if (this.firework) {
      this.vel = createVector(0, -12,0); // height of burst
    } else {
     this.vel = rose(map(index, 0, 120, 0, PI*4), map(index, 0,120, -2*PI, 2*PI), n, d);
      this.vel.mult(10); // explode form
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      //this.lifespan -= 4; //stay on screen
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show(givencolor) {  // render each dot
    colorMode(HSB);
    let radius;
    // console.log(givencolor);
    // alternate colours:
    // if (col === true) {this.hu = lat ; col = false} else { this.hu = lng ; col = true}
    // this.hu = givencolor;
    console.log('hu', this.hu);
    if (!this.firework) {  // for the burst
      strokeWeight(5);
      // stroke(this.hu);

      stroke(this.hu, map(this.stroke_weight, 0,100, 20, 255), 255, this.lifespan); //[HSB, Alpha]
    } else {  // for the rocket
      strokeWeight(5);
      // stroke(this.hu);
      stroke(this.hu, map(this.stroke_weight, 0,100, 0, 255), 255);
    }
   // point(this.pos.x, this.pos.y, this.pos.z);
   point(this.pos.x, this.pos.y);
  }
}
