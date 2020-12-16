// must be in HTTPS
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('starting');
  noStroke();
  // get position once
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
}

function setPos(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  background(0);
  fill(255);
  textSize(32);
  text("Current position: " + nf(lat,2,2) + " " + nf(lng,2,2), 10, height/2);
}
