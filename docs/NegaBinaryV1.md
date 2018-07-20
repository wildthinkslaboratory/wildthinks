### Welcome to our Negative Binary Prototype Page

Below you will find a Negative Binary machine to play with.  Negative Binary is just what it sounds like.  It's a base $-2$ machine.  It allows you to represent both positive and negative integers with just zeros and ones.  


### Negative Binary Instructions

- Tap to add a Dot to a Box
- SHIFT-click to add an Antidot
- Double click a dot to toggle between dot and antidot
- Drag a Dot Left to *implode* the dot.
- Drag a Dot out of the frame to delete it.
- Drag a Dot over an Antidot to annihilate them
- Drag a Dot to the right to *explode* it (not implemented yet)
- Drag a Dot to the left for | 1 | 1 | $\longleftarrow$ | 0 |-1 | rule (not implemented yet)


```p5js/playable/autoplay
/* global p5 */


////
// Constants, independent of window-sizing
// Some of these should be initialization parameters

const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';




////
// Color Pallette
//////////////////////////////////////////////////////////////////////////////


var purple =        [200, 0,  255];
var darkpurple =    [50,  0,   50];
var cyan =          [0,   200, 255];
var darkbluegreen = [0,   100, 100];
var lightLilac =    [220, 220, 255];
var white =         [255, 255, 255];
var paleLime =      [200, 255, 200];




////
// Color Formatting 
//////////////////////////////////////////////////////////////////////////////

var boxStroke = lightLilac;                // boxes color formatting
var boxFill = white; 


var dotFill = purple;                      // dot color formatting 
var dotStroke = darkpurple; 
var antidotFill = cyan; 
var antidotStroke = darkbluegreen; 

                                           // value boxes color formatting
var writingFill = darkbluegreen;
var valueFill = white;
var valueStroke = lightLilac;




////
// Game state
////////////////////////////////////////////////////////////////////////////

var DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});
var base = -2;
var numBoxes = 5;
var boxes;
var dots;
var currentId = [0, 0, 0];  // the id of the current dot
var uniqueId = 0;
var currentSum = 0;




////
// Values that change on window-resize
//////////////////////////////////////////////////////////////////////////////

var canvasW;  // canvas width
var canvasH;  // canvas height
var boxesW;   // width of all the boxes together
var boxesH;   // height of boxes
var boxesX;
var boxesY;
var endcapH;
var dotD;     // dot diameter
var xSpacer = 10;  // how much space between the boxes
var marginX;
var marginY;
var boxTextSize;
var valueTextSize;

var maxText = "16";  // use this text for setting textSize on window resizing




////
// Pre-playable initialization
/////////////////////////////////////////////////////////////////////////////

// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';

// const parent = myDiv.parentNode;
// const grandparent = parent.parentNode;
// parent.style.padding = '0 10px 0 0';
// parent.style.margin = '0';
// grandparent.style.border = '5px solid orange';
// grandparent.style.padding = '0';
// grandparent.style.margin = '0';

myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '100%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';




////
// Coordinate transforms between box-relative and canvas-relative
// Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
//////////////////////////////////////////////////////////////////////////////

function getBoxRelativePos(x, y, _box) {
  const boxWidth = boxes.width;
  const boxHeight = boxes.height;
  const result = {
    rx: (x - boxes.x) / boxWidth,
    ry: (y - boxes.y) / boxHeight
  };
  //  console.log('getBoxRelativePos', x, y, box, boxes, result);

  return result;
}


function getCanvasRelativePos(rx, ry, _box) {
  const boxWidth = boxes.width;
  const boxHeight = boxes.height;
  const result = {
    x: rx * boxWidth + boxes.x,
    y: ry * boxHeight + boxes.y
  };

  // console.log('getCanvasRelativePos', rx, ry, _box, boxes, result);

  return result;
}




////
// Risizing helper functions
//////////////////////////////////////////////////////////////////////////////

var textHeight = function() {
  return p5.textAscent() * 0.8; 
}

var centerTextInRect = function(x,y,width,height,text) {
  var textW = p5.textWidth(text);
  var textH = textHeight();
  var xoffset = (width - textW) / 2;
  var yoffset = (height - textH) / 2;
  return [x + xoffset, y + height - yoffset];
}




///
// Dot class, DotArray and other Dot functions
//////////////////////////////////////////////////////////////////////////////

function nextId() {        // get the next dot ID
  var i = uniqueId;
  uniqueId += 1;
  return i;
}


function Dot(x, y, box) {
  const {rx, ry} = getBoxRelativePos(x, y, box);
  this.rx = rx;                // a dot knows it's position
  this.ry = ry;
  this.oldx = rx;             // it remembers it's old position before being dragged
  this.oldy = ry;
  this.box = box;            // it knows what box it's in
  this.id = nextId();        // each dot has a unique id

  // console.log('Dot', x, y, rx, ry, box, boxID, boxes);
}


// we move dots between boxes so they need a copy with the same id for the new box
function DotCopy(d) {
  this.rx = d.rx;
  this.ry = d.ry;
  this.oldx = d.rx;
  this.oldy = d.ry;
  this.box = d.box;
  this.id = d.id;
}


function overlap(d1, d2) {
  let result = false;

  if (d1.box === d2.box) {
    const c1 = getCanvasRelativePos(d1.rx, d1.ry, d1.box);
    const c2 = getCanvasRelativePos(d2.rx, d2.ry, d2.box);
    var dist = p5.dist(c1.x,c1.y,c2.x, c2.y);
    if (dist < dotD) {
      result = true;
    }
  }

  return result;
}


function DotArray(size, fillColor, strokeColor) {
  this.dots = [];
  for (var i = 0; i < size; i++) {
    this.dots[i] = [];
  }
  this.f = fillColor;
  this.s = strokeColor;
}


DotArray.prototype.draw = function() {
  p5.push();
  p5.stroke(this.s);
  p5.fill(this.f);
  for (var i=0; i < this.dots.length; i++) {
    for (var j=0; j < this.dots[i].length; j++) {
      const dot = this.dots[i][j];
      const {x, y} = getCanvasRelativePos(dot.rx, dot.ry, dot.box);
      if (boxes.in(x, y)) { // this line shouldn't be here need to fix
        p5.ellipse(x, y, dotD, dotD);
      }
    }
  }
  p5.pop();
};




// this is all done with Canvas Relative positioning
DotArray.prototype.snapToBox = function(x,y,boxId) {
  var snappedY = y;
  var snappedX = x;

  const boxUpper = boxesY + dotD/2;
  const boxLower = boxesY + boxesH - dotD/2;
  if (y < boxUpper) {  snappedY = boxUpper; }
  if (y > boxLower) {  snappedY = boxLower; }

  const boxWidth = boxesW / numBoxes;
  const boxLeft = boxesX + (numBoxes - boxId - 1) * boxWidth + dotD/2;
  const boxRight = boxLeft + boxWidth - xSpacer - dotD;

  if (x < boxLeft) snappedX = boxLeft;
  if (x > boxRight) snappedX = boxRight;

  return [snappedX,snappedY];
}





DotArray.prototype.addDot = function(x, y, box) {
  const [snappedX,snappedY] = this.snapToBox(x, y, box);
  this.dots[box].push(new Dot(snappedX, snappedY, box));
  addDotSound.play();
};




DotArray.prototype.pushDot = function(boxID,dot) {

  const {x, y} = getCanvasRelativePos(dot.rx, dot.ry, dot.box);
  const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
  const {rx, ry} = getBoxRelativePos(snappedX, snappedY, dot.box);

  dot.rx = rx;
  dot.ry = ry;
  this.dots[boxID].push(dot);
}




DotArray.prototype.updateDotPosition = function(pos) {
  var dot = this.dots[pos[1]][pos[2]];

  const {x, y} = getCanvasRelativePos(dot.rx, dot.ry, dot.box);
  const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
  const {rx, ry} = getBoxRelativePos(snappedX, snappedY, dot.box);

  dot.rx = rx;
  dot.ry = ry;
  dot.oldx = dot.rx;
  dot.oldy = dot.ry;
};



DotArray.prototype.deleteDot = function(i, j) {
  this.dots[i].splice(j, 1);
};


DotArray.prototype.resetOldPosition = function(pos) {
  const dot = this.dots[pos[1]][pos[2]];
  dot.rx = dot.oldx;
  dot.ry = dot.oldy;
};





///
// Box class and functions
///////////////////////////////////////////////////////////////////////////

function Boxes(base, numberBoxes, x, y, boxesWidth, boxHeight) {
  this.base = base;
  this.numberBoxes = numberBoxes;
  this.x = x;
  this.y = y;
  this.height = boxHeight;
  this.width = boxesWidth/numberBoxes;
  // console.log('Boxes', this);
}


Boxes.prototype.updateSize = function(boxesX, boxesY, boxesWidth, boxHeight) {
  // console.log('Boxes.prototype.updateSize', boxesWidth, boxHeight);
  this.height = boxHeight;
  this.width = boxesWidth/this.numberBoxes;
  this.x = boxesX;
  this.y = boxesY;
};


Boxes.prototype.in = function(x, y) {
  if (y < this.y || y > (this.y + this.height)) return false;   // it's not in the boxes
  if (x < this.x || x > (this.x + this.width * this.numberBoxes)) return false;
  return true;
};


Boxes.prototype.getBoxID = function(x, y) {
  let result = -1;

  // check the vertical range of the boxes
  if (y < this.y || y > (this.y + this.height)) {
    // its not in the boxes
  }
  else {
    // check the horizontal range
    var rightX = this.x + this.width * this.numberBoxes;
    if (x < this.x || x > rightX) {
      // its not in the boxes
    }
    else {
      // It is in a box's zone, but might be in the spacer.
      const boxId = p5.floor((rightX - x) / this.width);
      const boxWidth = boxesW / numBoxes;
      const boxLeft = this.x + (numBoxes - boxId - 1) * boxWidth;
      const boxRight = boxLeft + boxWidth - xSpacer;

      if (x < boxLeft || x > boxRight) {
        p5.rect(boxLeft, y, (boxRight - boxLeft), 10);
      }
      else {
        // console.log('getBoxID', boxId, x, boxLeft, boxRight);
        result = boxId;
      }
    }
  }

  // console.log('getBoxID', x, y, this.x, this.y, this.width, this.height, result);
  return result;
};


Boxes.prototype.draw = function() {
  p5.push();


  var x = boxesX;
  var y = boxesY;
  p5.noStroke();
  p5.fill(boxFill);
  for (let i=0; i < this.numberBoxes; i++) {
    p5.rect(x + i*this.width, y , this.width - xSpacer, this.height, 20);
  }

  p5.noStroke();
  p5.fill(boxStroke);
  p5.textSize(boxTextSize);
  for (let i=0; i < this.numberBoxes; i++) {
    var t = p5.pow(this.base, this.numberBoxes - i - 1).toString();


    var [textX,textY] = centerTextInRect(x + i*this.width, y , this.width - xSpacer, this.height,t);
    p5.text(t, textX, textY);
  }

  p5.pop();
};



///
// Additional Draw Functions
/////////////////////////////////////////////////////////////////////////////////



function drawCodeBoxes() {
  var x = boxesX;
  var y = boxesY + boxesH + 15;
  var width = boxesW / numBoxes;
  var height = endcapH;

  p5.push();
  p5.noStroke();
  p5.fill(valueFill);

  for (let i=0; i < numBoxes; i++) {
    p5.rect(x + i*width, y , width - xSpacer, height, 10);
  }

  p5.noStroke();
  p5.textSize(valueTextSize);
  p5.fill(writingFill);

  

  for (let i=0; i < numBoxes; i++) {
    var code = dots[0].dots[i].length;
    code -= dots[1].dots[i].length;
    var t = code.toString();

    if (code === 0) { p5.fill(valueStroke); }
    else { p5.fill(writingFill); }

    var [textX,textY] = centerTextInRect(x + (numBoxes - i - 1)*width, y , width - xSpacer, height,t);
    p5.text(t, textX, textY);
  }

  p5.pop();
}


function drawValueBoxes() {
  var x = boxesX;
  var y = endcapH * 1.2;
  var width = boxesW / numBoxes;
  var height = endcapH;

  p5.push();
  p5.noStroke();
  p5.fill(valueFill);

  for (let i = 0; i < numBoxes; i++) {
    p5.rect(x + i*width, y, width - xSpacer, height, 10);
  }

  p5.noStroke();
  p5.fill(writingFill);
  p5.textSize(valueTextSize);

  currentSum = 0;
  for (let i = 0; i < numBoxes; i++) {
    var value = dots[0].dots[i].length * p5.pow(base, i);
    value -= dots[1].dots[i].length * p5.pow(base, i);
    currentSum += value;
    var t = value.toString();
 
    if (value === 0) {
      p5.fill(valueStroke);
    }
    else {
      p5.fill(writingFill);
    }

    var [textX,textY] = centerTextInRect(x + (numBoxes - i - 1)*width, y , width - xSpacer, height,t);
    p5.text(t, textX, textY);
  }

  p5.pop();
}



function drawSummaryBox() {
  var y = canvasH * 0.01;
  var height = endcapH;
  var x = boxesX + boxesW * (numBoxes - 1)/numBoxes;
  var boxW = boxesW / numBoxes;

  p5.push();

  p5.stroke(writingFill);
  p5.strokeWeight(2);
  p5.fill(boxFill);
  p5.rect(x, y, boxW - xSpacer, height, 10);

  p5.textSize(valueTextSize);
  p5.fill(writingFill);
  p5.stroke(writingFill);
  p5.strokeWeight(1);

  var t = currentSum.toString();

  var [textX,textY] = centerTextInRect(x, y, boxW - xSpacer, height, t);
  p5.text(t, textX, textY);

  p5.pop();
}

////
// Main functions affecting model
///////////////////////////////////////////////////////////



// two opposing dots collide and annihilate
function dotAnnihilation(id) {
  // look for overlap with an opposing dot in same box
  var opposing = 1 - id[0];
  const sourceDot = dots[id[0]].dots[id[1]][id[2]];
  const opposingDots = dots[opposing].dots;

  for (var i=0; i < opposingDots.length; i++) {
    const opposingDot = opposingDots[id[1]][i];
    if (opposingDot && overlap(sourceDot, opposingDot)) {
      deleteDot(id);
      deleteDot([opposing,id[1],i]);
      annihilateSound.play();
      return true;
    }
  }
  return false;
}



// add an antidot to the model
function addAntidot() {
  dots[1].addDot(p5.mouseX, p5.mouseY, boxes.getBoxID(p5.mouseX, p5.mouseY));
}



// add a dot to the model
function addDot() {
  const boxID = boxes.getBoxID(p5.mouseX, p5.mouseY);
  if (boxID !== DotEnum.UNDEF) {
    dots[0].addDot(p5.mouseX, p5.mouseY, boxID);
  }
}



// dots implode as they are moved to the left
function implodeDot(sendingBox, recievingBox) {
  var dotsNeeded = p5.pow(p5.abs(base), recievingBox - sendingBox);
  if (dots[currentId[0]].dots[sendingBox].length >= dotsNeeded) {     // explode the dot

    var newDot = new DotCopy(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
    newDot.box = recievingBox;

    var dotArrayID = ((recievingBox - sendingBox) % 2 ? 1 - currentId[0] : currentId[0]);

    dots[dotArrayID].pushDot(recievingBox,newDot);

    //remove this dot from it's old box
    deleteDot(currentId);

    //remove other dots from old box
    for (var i=0; i < dotsNeeded-1; i++) {
      dots[currentId[0]].dots[sendingBox].pop();
    }
  }
  else {
    resetDotPosition(currentId);     // weren't enough dots, send it back
  }

}



// reset a dot to its previous position before being dragged
function resetDotPosition(dotID) {
  if (dotID[0] !== DotEnum.UNDEF) {
    dots[dotID[0]].resetOldPosition(dotID);
  }
}



// update a dot to it's new position after drag
function updatePosition(dotID) {
  if (dotID[0] !== DotEnum.UNDEF) {
    dots[dotID[0]].updateDotPosition(dotID);
  }
}



function deleteDot(dotID) {
  if (dotID[0] !== DotEnum.UNDEF) {
    dots[dotID[0]].deleteDot(dotID[1], dotID[2]);
  }
}



// a dot has been dragged, find out if it's moved to a new box
function getSendingAndRecievingBox() {
  if (currentId[0] !== DotEnum.UNDEF) {  
    var current_dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    const {x, y} = getCanvasRelativePos(current_dot.rx, current_dot.ry, current_dot.box);
    return [current_dot.box, boxes.getBoxID(x,y)];
  }
  return [-1,-1];
}



function toggleDot() {
  if (mouseOnDot()) {

    const arrayId = currentId[0];
    const toggleArrayId = (arrayId === 0 ? 1 : 0);
    var current_dot = dots[arrayId].dots[currentId[1]][currentId[2]];
    //console.log('toggleDot', toggleArrayId, currentId, current_dot, dots);

    var newDot = new DotCopy(current_dot);

    dots[toggleArrayId].pushDot(current_dot.box,newDot);

    //remove this dot from its old box
    dots[arrayId].deleteDot(currentId[1], currentId[2]);
  }

}



////
// App mouse events
/////////////////////////////////////////////////////////////////////



// Is the mouse in the spacers between the boxes
// assumes the mouse isn't in a box
var mouseInSpacers = function() {
  if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW) return false;
  if (p5.mouseY < boxesY || p5.mouseY > boxesY + boxesH) return false;
  return true;
}



function mouseOnBoxes() {
  return boxes.getBoxID(p5.mouseX, p5.mouseY) != DotEnum.UNDEF;
}



function mouseOnDot() {
  // check the dots
  for (var n=0; n < dots.length; n++) {
    for (var i=0; i < dots[n].dots.length; i++) {
      for (var j=0; j < dots[n].dots[i].length; j++) {
        const dot = dots[n].dots[i][j];
        const { x, y } = getCanvasRelativePos(dot.rx, dot.ry, dot.box);
        const dist = p5.dist(p5.mouseX, p5.mouseY, x, y);
        if (dist < dotD / 2) {
          // console.log('mouseOnDot', p5.mouseX, p5.mouseY, x, y, dist, dotD);

          currentId = [n, i, j];
          return true;
        }
      }
    }
  }

  currentId = [DotEnum.UNDEF, -1, -1];
  return false;
}



////
// P5 Structure Functions
///////////////////////////////////////////////////////////////////////////////////


var addDotSound;
var annihilateSound;

p5.setup = function() {
  boxes = new Boxes(base, numBoxes, boxesX, boxesY, boxesW, boxesH);
  dots = [];
  dots.push(new DotArray(numBoxes, dotFill, dotStroke));
  dots.push(new DotArray(numBoxes, antidotFill, antidotStroke));

  // attribution 3.0  mark diangelo
  addDotSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bd0a27a5a92c1f904fe0713f6664d9a8b28cb476/Blop-Mark_DiAngelo-79054334.wav');

  // attribution 3.0  mark diangelo
  annihilateSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/e0ca3e1a7f8393c9c62b56650bb4b1ad01749265/Woosh-Mark_DiAngelo-4778593.wav');

  p5.createCanvas(canvasW, canvasH);
  p5.windowResized();

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  // console.log('p5.window', p5.windowWidth, p5.windowHeight);
  // console.log('myDiv.offset', myDiv.offsetWidth, myDiv.offsetHeight);

  canvasW = myDiv.offsetWidth - 10;
  canvasH = p5.windowHeight - 75;
  const minHeight = 200;
  if (canvasH < minHeight) {
    canvasH = minHeight;
  }
  endcapH = canvasH * 0.1;
  boxesW = canvasW * 0.9; // width of all the boxes together

  const boxWidth = boxesW / numBoxes;

  boxesH = canvasH * 0.5; // height of boxes
  boxesX = (p5.windowWidth - boxesW) / 2;
  boxesY = canvasH * 0.25;
  dotD = p5.min(boxWidth * 0.2, boxesH * 0.2);
  const dotMax = p5.min(boxWidth * 0.25, boxesH * 0.25);
  marginX = 2 * dotMax;
  marginY = dotD * 0.5;
  xSpacer = dotD/2;
  boxTextSize = boxesH * 0.5;
  valueTextSize = endcapH * 0.5;

  boxes.updateSize(boxesX, boxesY, boxesW, boxesH);
  p5.resizeCanvas(p5.windowWidth, canvasH);
};



p5.draw = function() {
  p5.frameRate(15);
  p5.clear();
  boxes.draw();
  dots[0].draw();
  dots[1].draw();
  drawValueBoxes();
  drawCodeBoxes();
  drawSummaryBox();
};


////
// P5 event functions
///////////////////////////////////////////////////////////////////////////////////////////



p5.mousePressed = function()
{
  if (mouseOnBoxes()) {
    if (!mouseOnDot()) {
      if (p5.keyIsPressed === true && p5.keyCode === p5.SHIFT) {   // we're clicking to add a dot
        addAntidot();
      }
      else {
        addDot();
      }
    }
  }
};


p5.doubleClicked = function()
{
  console.log("Double Clicked");
  toggleDot();
};

p5.mouseDragged = function() {
  if (currentId[0] != DotEnum.UNDEF) {
    const dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    const { rx, ry } = getBoxRelativePos(p5.mouseX, p5.mouseY, dot.box);
    dot.rx = rx;  // update the x, y position of currentId dot
    dot.ry = ry;
  }
};


// there's a lot to do here
p5.mouseReleased = function() {
  if (mouseOnBoxes() && currentId && currentId[0] !== DotEnum.UNDEF) {  // this is the end of a drag event
    [sendingBox, recievingBox] = getSendingAndRecievingBox();
      
    if (recievingBox === sendingBox) {            // drag within a box
      if (!dotAnnihilation(currentId)) {
        updatePosition(currentId);
      }
    }
    else {                                            
      if (recievingBox > sendingBox) {            // drag left
        implodeDot(sendingBox, recievingBox);
      }
      else {                                      // drag right
        resetDotPosition(currentId);
      }
    }
  }
  else {                                          // we've dragged a dot out of box region
    if (mouseInSpacers()) {                       // between the boxes
      resetDotPosition(currentId);        
    }
    else {                                        // out of the boxes
      deleteDot(currentId);
    }
  }
};

```


### Known Bugs


- The toggleDot is being called sometimes on a drag.  It also is causing annihilations when it's not supposed to. Turning it off until I can find fixes.



---

[Back to Home](:@Home)
