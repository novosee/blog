
var database;
var ref;

var balls = [];

var threshold = 20;
//receive
var accChangeX = 0;
var accChangeY = 0;
var accChangeT = 0;
//send
var maccChangeX = 0;
var maccChangeY = 0;
var maccChangeT = 0;


function firebasesetup() {
  // Start Firebase
  var config = {
    apiKey: "AIzaSyA-VyZJOZVqXZj82wvVMkfJedDEhqXcIh8",
    authDomain: "novosee-a7bad.firebaseio.com",
    databaseURL: "https://novosee-a7bad.firebaseio.com",
    storageBucket: "novosee-a7bad.appspot.com",
    messagingSenderId: "363965061200"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  ref = database.ref("fireball");
  setInterval(function () {
    maccChangeX = abs(accelerationX - pAccelerationX);
    maccChangeY = abs(accelerationY - pAccelerationY);
    maccChangeT = maccChangeX + maccChangeY;
    datesend(maccChangeX, maccChangeY, maccChangeT);
    //datesend(maccChangeX++, maccChangeY++ + 1, maccChangeT++ + 2);
  }, 200)

}

function dateupdate() {
  ref.on("value", function (snapshot) {
    accChangeX = snapshot.val().accChangeX;
    accChangeY = snapshot.val().accChangeY;
    accChangeT = snapshot.val().accChangeT;
    console.log("The updated post title is " + accChangeT);
  });


}

function datesend(maccChangeX, maccChangeY, maccChangeT) {
  if (maccChangeT != 0) {
    ref.update({
      "accChangeX": maccChangeX,
      "accChangeY": maccChangeY,
      "accChangeT": maccChangeT
    });
  }

}
function setup() {
  createCanvas(displayWidth, displayHeight);
  //frameRate(20);

  for (var i = 0; i < 20; i++) {
    balls.push(new Ball());
  }

  firebasesetup();
  dateupdate();

}

function mousePressed() {
  //var fs = fullscreen();
  //fullscreen(!fs);
  console.log('fullscreen');

}

function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  checkForShake();
}

// Ball class
function Ball() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.xspeed = random(-2, 2);
  this.yspeed = random(-2, 2);
  this.oxspeed = this.xspeed;
  this.oyspeed = this.yspeed;
  this.direction = 0.7;

  this.move = function () {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  };

  // Bounce when touch the edge of the canvas  
  this.turn = function () {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    }
    else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    }
    else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    }
    else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  };

  // Add to xspeed and yspeed based on 
  // the change in accelerationX value
  this.shake = function () {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  };

  // Gradually slows down 
  this.stopShake = function () {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    }
    else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    }
    else {
      this.yspeed = this.oyspeed;
    }
  };

  this.display = function () {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function checkForShake() {
  // Calculate total change in accelerationX and accelerationY
  //accChangeX = abs(accelerationX - pAccelerationX);
  //accChangeY = abs(accelerationY - pAccelerationY);
  //accChangeT = accChangeX + accChangeY;
  // If shake
  if (accChangeT >= threshold) {
    for (var i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  }
  // If not shake
  else {
    for (var i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}









var dnow = new Date();
function loadTimeline(syear, smonth, sday, shours, sminutes, eyear, emonth, eday, ehours, eminutes) {
  var dataset = new vis.DataSet();
  var now = new Date();
  var utcoffset = now.getTimezoneOffset() * 60000;
  var options = {
    start: Date.UTC(syear, smonth - 1, sday, shours, sminutes, 0, 0) + utcoffset,//vis.moment().add(-3, 'hours'), // changed so its faster
    end: Date.UTC(eyear, emonth - 1, eday, ehours, eminutes, 0, 0) + utcoffset,//vis.moment(),
    orientation: 'top'
  };
  var graph2d = new vis.Graph2d(container, dataset, options);
  var ref = database.ref("vivid");
  //Date.UTC(year, month(0-11), day, hours, minutes, seconds, millisec)
  ref.orderByChild("time").startAt(Date.UTC(syear, smonth - 1, sday, shours, sminutes, 0, 0) + utcoffset).endAt(Date.UTC(eyear, emonth - 1, eday, ehours, eminutes, 0, 0) + utcoffset).on("child_added", gotAll, errData);

  //ref.orderByChild("time").limitToLast(50).on("child_added", gotAll, errData);
  // The data comes back as an object
  function gotAll(gdata) {
    var sd = {};
    sd.x = new Date(gdata.val().time).toString();
    sd.y = gdata.val().count;
    dataset.add(sd);
    //console.log(sd.x);

  }

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}


function lodaTotalTimeline(eyear, emonth, eday) {
  var dataset = new vis.DataSet();
  var now = new Date();
  var utcoffset = now.getTimezoneOffset() * 60000;
  var options = {
    start: Date.UTC(eyear, emonth - 1, eday, 18, 0, 0, 0) + utcoffset,//vis.moment().add(-3, 'hours'), // changed so its faster
    end: Date.UTC(eyear, emonth - 1, eday, 23, 0, 0, 0) + utcoffset,//vis.moment(),
    style: 'bar',
    barChart: { align: 'center' },
    dataAxis: {
      icons: true
    },
    orientation: 'top'
  };
  var graph2d = new vis.Graph2d(container, dataset, options);
  var ref = database.ref("vivid");
  //Date.UTC(year, month(0-11), day, hours, minutes, seconds, millisec)

  ref.orderByChild("time").startAt(Date.UTC(eyear, emonth - 1, eday, 17, 50, 0, 0) + utcoffset).endAt(Date.UTC(eyear, emonth - 1, eday, 23, 10, 0, 0) + utcoffset).on("child_added", gotAll, errData);
  ref.orderByChild("time").startAt(Date.UTC(eyear, emonth - 1, eday - 1, 17, 50, 0, 0) + utcoffset).endAt(Date.UTC(eyear, emonth - 1, eday - 1, 23, 10, 0, 0) + utcoffset).on("child_added", gotAll, errData);
  ref.orderByChild("time").startAt(Date.UTC(eyear, emonth - 1, eday - 2, 17, 50, 0, 0) + utcoffset).endAt(Date.UTC(eyear, emonth - 1, eday - 2, 23, 10, 0, 0) + utcoffset).on("child_added", gotAll, errData);

  //ref.orderByChild("time").limitToLast(50).on("child_added", gotAll, errData);
  // The data comes back as an object
  function gotAll(gdata) {
    var sd = {};
    sd.x = new Date(gdata.val().time).toString();
    sd.y = gdata.val().count;
    dataset.add(sd);
    //console.log(sd.x);

  }

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}
