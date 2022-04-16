var img="";
status="";
objects=[];
function preload(){
    img= loadImage("https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2019/03/Velgen20.com_.jpg");
}
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: Detected Objects";
            document.getElementById("noofobjects").innerHTML="Number of Object: " + objects.length;
            fill(r, g, b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + "%",  objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    // fill("#FF0000");
    // text("Mazda RX7 New Gen", 210, 75);
    // noFill();
    // stroke("#FF0000");
    // rect(200, 60, 380, 200);
    // fill("#FF0000");
    // text("Mazda RX7 Old Gen", 20, 175);
    // noFill();
    // stroke("#FF0000");
    // rect(10, 160, 580, 280);
}