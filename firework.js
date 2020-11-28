// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI
const HUE_MIN = 0;
const HUE_MAX = 255;

class Firework {
  constructor(sketch, mult, x, burst_height, z, gravity, fw=true, name_val_1, name_val_2) {
    this.sketch = sketch;
    this.x = x;
    this.y = 0;
    this.z = z;
    this.mult = mult;
    this.name_val_1 = name_val_1;
    this.name_val_2 = name_val_2;
    this.burst_height = burst_height;
    this.hu1 = sketch.map(this.name_val_1, 0, 20, HUE_MIN, HUE_MAX); // colour range
    this.hu2 = sketch.map(this.name_val_2*1.5, 0, 122, HUE_MIN, HUE_MAX);
    console.log("hus "+ this.hu1 +" " + this.hu2)
    this.firework = new Particle(this.sketch, this.mult, this.burst_height, this.x, this.y, this.z, fw); // starting point
    this.exploded = false;
    this.particles = [];
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
    let d = this.sketch.int(this.sketch.map(this.name_val_1 + this.sketch.map(this.x, -MAP_WIDTH/2, MAP_WIDTH/2, 0, 100), 0, 110, 1, 7)); // SHAPE - spokes
    let n = this.sketch.int(this.sketch.map (this.name_val_2 + this.sketch.map(this.x, -MAP_HEIGHT/2, MAP_HEIGHT/2, 0, 50), 10, 180, 1, 7)) ; // SHAPE - loops
    for (let i = 0; i < 241; i++) {
      const p = new Particle(this.sketch, this.mult, this.burst_height, this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, false, i, n, d);
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
