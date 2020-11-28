// from Polar Fireworks by D_Snyder

function rose(sketch, theta, gamma, n=5, d=8){
  let k = n/d;
  // console.log("n " +n);
  // console.log("d " +d);
  // console.log("k " +k);
  let r = sketch.cos(k*theta);
  let x = r*sketch.cos(theta); // rotation of each particle
  let y = r*sketch.sin(theta);
  let z = r*sketch.sin(gamma*k); // gamma var contrib by Archit
  return sketch.createVector(x, y, z);
}
// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI



class Particle {
  constructor(sketch, mult, burst_height, x, y, z, firework, index, n, d) {
    this.sketch = sketch;
    this.pos = this.sketch.createVector(x, y, z);
    this.firework = firework;
    this.lifespan = 255;
    this.acc = sketch.createVector(0, 0, 0);
    this.mult = mult;
    if (this.firework == true) {
      this.vel = this.sketch.createVector(0, -3*burst_height/8, 0); // height of burst
    } else {
      this.sketch.angleMode(this.sketch.RADIANS);
      this.vel = rose(this.sketch, this.sketch.map(index, 0, 120, 0, this.sketch.PI*4), this.sketch.map(index, 0,120, -2*this.sketch.PI, 2*this.sketch.PI), n, d);
      this.vel.mult(this.mult + 1); // explode form
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      // this.lifespan -= 4; //rate of removal from screen
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

  show(col) {  // render each dot
    this.sketch.colorMode(this.sketch.HSB);

    if (!this.firework) {  // for the burst
      this.sketch.strokeWeight((this.mult > 2) ? this.mult : 2);
      this.sketch.stroke(col, 255, 255, this.lifespan); //[HSB, Alpha]

    } else {  // for the rocket
      this.sketch.strokeWeight(10);
      this.sketch.stroke(col, 255, 255);
    }
   this.sketch.point(this.pos.x, this.pos.y, this.pos.z);
  }

}
