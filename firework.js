// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor(x, y, z, stroke_weight, scale) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = scale;
    this.hu = 200; // COLOUR RANGE - expt
    console.log(this.hu);
    this.firework = new Particle(x, y, z, stroke_weight, this.hu, true); // starting point
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
     this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      // this.particles[i].applyForce(gravity); // doesnt fall after bursting
      this.particles[i].update();

      if (this.particles[i].done()) {
    //   this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    let n = int(map(this.x, 0,76, 1, 7)) + int(hour()) // SHAPE - spokes
    let d = int(map (this.y, 0, 100, 1, 7)) // SHAPE - loops
    for (let i = 0; i < 241; i++) // no. of particles
      {
        const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, this.hu, false, i, n,d);
        this.particles.push(p);
      }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    console.log("x, y: ", this.x, this.y)
    for (var i = 0; i < this.particles.length; i++) {
      if( i % 2 == 0) {
        this.particles[i].show(this.x);
      } else {
        this.particles[i].show(this.y);
      }
    }
  }
}
