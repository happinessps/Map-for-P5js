var allImages = [];
var totalImages = 7;
var index = 2;

let stufe1 = false;

let permissionGranted = false;
let permissionGrantednnoIOS = false;
let cx, cy;

function preload(){
  for(var i = 2; i < totalImages; i++){
    allImages[i] = loadImage("data/"+i+".jpg")
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(50);
  colorMode(HSB);
  
  cx = width/2;
  cy = height/2;
  
  if(typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function'){
    DeviceOrientationEvent.requestPermission()
    .catch(() => {
    let button = createButton("click to allow access to sensors");
    button.style("font-size", "24px");
    button.center();
    button.mousePressed(requestAccess);
    throw error;
    })
    .then(() => {
    })
    }else{
    let button2 = createButton("click to allow access to sensors after check your deviece access to sensors");
    button2.style("font-size", "24px");
    button2.center();
    button2.mousePressed(notDevice);
  }
}
function requestAccess(){
  DeviceOrientationEvent.requestPermission()
    .then(response =>{
    if(response == 'granted'){
      permissionGranted = true;
    }else{
      permissionGranted = false;
    }
  })
  .catch(console.error);
  this.remove();
}
function notDevice(){ 
  permissionGranted = true;
  this.remove();
}
function draw() {
  if(!permissionGranted) {
    return 
  }else {
  stufe1=true;
  index = round(random(2,6));
  image(allImages[index], 0, 0, width, height);
  fill(255);
  textSize(50);
  text('Where was the last place he visited?', windowWidth/2, windowHeight/2);
  }
}

function deviceShaken(){
  if(stufe1 == true){
    image(allImages[3], 0, 0, width, height);
    
  }
}
