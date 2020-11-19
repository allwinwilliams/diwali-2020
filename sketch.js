function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text(current_user.name, 100, 100);
  text(current_user.lat, 100, 150);
  text(current_user.long, 100, 200);
}
