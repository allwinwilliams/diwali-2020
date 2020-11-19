// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor() {

    this.hu = long_map; // colour range 
    this.firework = new Particle(long_map, lat_map, 0, this.hu, true); // starting point
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
    let n = int(map(lat_map, 0,100, 1, 7)); // SHAPE - spokes
    let d = int(map (long_map, 0, 100, 1, 7)); // SHAPE - loops
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

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}