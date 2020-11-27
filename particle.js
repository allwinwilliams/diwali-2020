// from Polar Fireworks by D_Snyder

function rose(theta, gamma, n=5, d=8)
{
  let k = n/d;
  console.log("n " +n);
  console.log("d " +d);
  console.log("k " +k);
  let r = cos(k*theta);
  let x = r*cos(theta); // rotation of each particle
  let z = r*sin(theta);
  let y = r*sin(gamma*k); // gamma var contrib by Archit
  return createVector(x, y, z);

}

// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI


class Particle {
  constructor(x, y, z, hu, firework, index, n, d) {
    this.pos = createVector(x, y, z);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0, 0);
    if (this.firework) {
      this.vel = createVector(0, -2*burst_height/10,0); // height of burst
    } else {
      angleMode(RADIANS);
     this.vel = rose(map(index, 0, 120, 0, PI*4), map(index, 0,120, -2*PI, 2*PI), n, d);
      this.vel.mult(2); // explode form
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

  show() {  // render each dot
    colorMode(HSB);

    // alternate colours:
    // if (col === true) {this.hu = long_map ; col = false} else { this.hu = lat_map ; col = true}

    if (!this.firework) {  // for the burst
      strokeWeight(5);
      stroke(this.hu, 255, 255, this.lifespan); //[HSB, Alpha]

    } else {  // for the rocket
      strokeWeight(5);
      stroke(this.hu, 255, 255);
    }

   point(this.pos.x, this.pos.y, this.pos.z);

  }

}
