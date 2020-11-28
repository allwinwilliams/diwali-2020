// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI
const HUE_MIN = 0;
const HUE_MAX = 255;

class Firework {
  constructor(sketch, x, y, z, gravity, name_val_1, name_val_2, fw) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;
    this.burst_height = z;
    this.name_val_1 = name_val_1;
    this.name_val_2 = name_val_2;
    this.hu1 = sketch.map(this.name_val_1, 0, 20, HUE_MIN, HUE_MAX); // colour range
    this.hu2 = sketch.map(this.name_val_2, 0, 122, HUE_MIN, HUE_MAX);
    this.firework = new Particle(this.sketch, this.burst_height, this.x, 0, this.y, fw); // starting point
    this.exploded = false;
    this.particles = [];

    this.burst_height = z;
    this.gravity = gravity;
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
     this.firework.applyForce(this.gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    _.map(this.particles, (particle, index) => {
      // particle.applyForce(gravity); // falls after bursting
      particle.update();
      particle.done() && this.particles.splice(i, 1);
    })
  }

  explode() {
    let n = this.sketch.int(this.sketch.map(this.name_val_1, 0, 20, 1, 7)); // SHAPE - spokes
    let d = this.sketch.int(this.sketch.map (this.name_val_2, 10, 122, 1, 7)); // SHAPE - loops
    for (let i = 0; i < 241; i++) {
      const p = new Particle(this.sketch, 0, this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, false, i, n, d);
      this.particles.push(p);
    }
  }

  show() {
    let col;
    if(!this.exploded){
      this.firework.show(this.hu1);
    }
    _.map(this.particles, (particle, index) => {
      particle.show((index % 2 == 0)? this.hu1 : this.hu2);
    });
  }
}
