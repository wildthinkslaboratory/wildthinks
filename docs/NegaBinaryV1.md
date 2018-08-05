
![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/eb65f6202d8185468cea211757f0700fcef3aacd/negaBinaryBanner1.png)

### Welcome to our Prototype Negative Binary Page

---

#### Let's write all of the integers, both positive and negative without any negative signs using just the symbols 0 and 1.


___


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
var darkGray =      [100, 100, 100];





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

var dotButtonStroke = darkGray;
var dotButtonFill = white;





////
// Game state
////////////////////////////////////////////////////////////////////////////

var DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});

var base = -3;
var numBoxes = 4;
var boxes;
var dots;
var currentId = [0, 0, 0];  // the id of the current dot
var uniqueId = 0;
var currentSum = 0;
var addDotSound;
var annihilateSound;


//// 
// App Restrictions
////////////////////////////////////////////////////////////////////////////


var negaBinary = false;
var dotButtonOn = true;
var ruleButtonOn = negaBinary;



////
// Button States
/////////////////////////////////////////////////////////////////////////////

var addDots = true;
var standardRule = true;



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
var topBoxesY;
var valueBoxesY;
var codeBoxesY;
var ySpacer;
var ruleBoxX;


var maxText = "16";  // use this text for setting textSize on window resizing




////
// Pre-playable initialization
/////////////////////////////////////////////////////////////////////////////

// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';
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


function randomJiggle(amount) {
  return p5.random(-2*amount, 2*amount);
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
  var y = codeBoxesY;
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
  var y = valueBoxesY;
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
  var y = topBoxesY;
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



function drawRuleButton() {
  if (!ruleButtonOn) return;
  var y = topBoxesY;
  var height = endcapH;
  var x = ruleBoxX;
  var boxW = 2* boxesW / numBoxes;

  
  var littleBoxH = height * 0.75;
  var dotSize = littleBoxH * 0.25;

  p5.push();

  p5.stroke(dotButtonStroke);
  p5.strokeWeight(1);
  p5.fill(dotButtonFill);
  p5.rect(x, y, boxW - xSpacer, height, 10);

  var centerX = ruleBoxX + (boxW - xSpacer) / 2;
  boxY = y + height * 0.125;
  var shift = littleBoxH/2;

  p5.line(centerX - shift, boxY + shift, centerX + shift, boxY + shift);
  p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift - 0.3 * shift );
  p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift + 0.3 * shift );

  if (standardRule) {
    var box1X = centerX + littleBoxH;
    var box2X = centerX - 2*littleBoxH;

    p5.rect(box1X, boxY,littleBoxH,littleBoxH,5);
    p5.rect(box2X, boxY,littleBoxH,littleBoxH,5);
    p5.stroke(dotStroke);
    p5.fill(dotFill);

    p5.ellipse(box1X + shift*0.7, boxY + shift*0.7, dotSize, dotSize);
    p5.ellipse(box1X + shift*1.3, boxY + shift*1.3, dotSize, dotSize);

    p5.stroke(antidotStroke);
    p5.fill(antidotFill);   
    p5.ellipse(box2X + shift, boxY + shift, dotSize, dotSize);
  }
  else {
    var boxes1X = centerX + littleBoxH;
    var boxes2X = centerX - 3*littleBoxH;
    
    p5.rect(boxes1X, boxY,littleBoxH,littleBoxH,5);  
    p5.rect(boxes1X + littleBoxH, boxY,littleBoxH,littleBoxH,5); 
    p5.rect(boxes2X, boxY,littleBoxH,littleBoxH,5); 
    p5.rect(boxes2X + littleBoxH, boxY,littleBoxH,littleBoxH,5);   

    p5.stroke(dotStroke);
    p5.fill(dotFill);

    p5.ellipse(boxes2X + shift, boxY + shift, dotSize, dotSize);
    p5.ellipse(boxes2X + littleBoxH + shift, boxY + shift, dotSize, dotSize);

    p5.stroke(antidotStroke);
    p5.fill(antidotFill);   
    p5.ellipse(boxes1X + littleBoxH + shift, boxY + shift, dotSize, dotSize);


  }
 
  p5.pop();
}



function drawDotButton() {
  if (!dotButtonOn) return;
  var y = topBoxesY;
  var height = endcapH;
  var x = boxesX;
  var boxW = boxesW / numBoxes;

  p5.push();

  p5.stroke(dotButtonStroke);
  p5.strokeWeight(1);
  p5.fill(dotButtonFill);
  p5.rect(x, y, boxW - xSpacer, height, 10);

  p5.textSize(valueTextSize);
  p5.fill(dotButtonStroke);
 
  if (addDots) {
    p5.stroke(dotStroke);
    p5.fill(dotFill);
  }
  else {
    p5.stroke(antidotStroke);
    p5.fill(antidotFill);
  }

  var dotSize = p5.min(dotD, endcapH * 0.75);
  p5.ellipse(x + boxW * 2/3,y + endcapH/2,dotSize, dotSize);

  p5.fill(darkGray);

  const t = "Add Dot"
  var [textX,textY] = centerTextInRect(x, y, boxW - xSpacer, height, t);
  p5.text("Add", textX, textY);

  p5.pop();
}



////
// Main functions affecting model
/////////////////////////////////////////////////////////////////////////////



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



// dots explode as they are moved to the left
function explodeDot(sendingBox, recievingBox) {
  
  var dotsNeeded = p5.pow(p5.abs(base), recievingBox - sendingBox);

  if (dots[currentId[0]].dots[sendingBox].length < dotsNeeded) return false;

  var newDot = new DotCopy(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
  newDot.box = recievingBox;


  var dotArrayID = currentId[0];
  if (base < 0) {
    dotArrayID = ((sendingBox - recievingBox) % 2 ? 1 - currentId[0] : currentId[0]);
  }

  dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
  deleteDot(currentId);                            // remove this dot from it's old box
  for (var i=0; i < dotsNeeded-1; i++) {           // remove other dots from old box
    dots[currentId[0]].dots[sendingBox].pop();
  }
  return true;
}


// dots explode as they are moved to the left
function negaBinaryRule2(sendingBox, recievingBox) {

  if (recievingBox === sendingBox + 1) {
    const arrayId = currentId[0];
    const toggleArrayId = (arrayId === 0 ? 1 : 0);
    dots[toggleArrayId].addDot(p5.mouseX, p5.mouseY, currentId[1] + 1);  // add a dot to the next box under the mouse
    resetDotPosition(currentId);                                         // send current dot back to old position
    toggleDot(currentId);                                                // and toggle it
    return true;
  }
  return false;
}



function unexplode(sendingBox, recievingBox) {

  var dotsToAdd = p5.pow(p5.abs(base), sendingBox - recievingBox);
  var newDot = new DotCopy(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
  newDot.box = recievingBox;
  
  var dotArrayID = currentId[0];
  if (base < 0) {
    dotArrayID = ((sendingBox - recievingBox) % 2 ? 1 - currentId[0] : currentId[0]);
  }

  dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
  deleteDot(currentId);                            // remove this dot from it's old box  
  for (var i=0; i < dotsToAdd-1; i++) {           // remove other dots from old box
    dots[dotArrayID].addDot(p5.mouseX + randomJiggle(dotD), p5.mouseY + randomJiggle(dotD), recievingBox);
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



function toggleDot(dotID) {
    const arrayId = dotID[0];
    const toggleArrayId = (arrayId === 0 ? 1 : 0);
    var current_dot = dots[arrayId].dots[dotID[1]][dotID[2]];
    var newDot = new DotCopy(current_dot);

    dots[toggleArrayId].pushDot(current_dot.box,newDot);

    dots[arrayId].deleteDot(dotID[1], dotID[2]);          //remove this dot from its old box

    currentId = [toggleArrayId, dotID[1], dotID[2]];
}





////
// App mouse events
////////////////////////////////////////////////////////////////////////////////////////////

function mouseOnDotButton() {
  if (!dotButtonOn) return;
  if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW/numBoxes) return false;
  if (p5.mouseY < topBoxesY || p5.mouseY > topBoxesY + endcapH) return false;
  return true;
}

function mouseOnRuleButton() {
  if (!ruleButtonOn) return;
  if (p5.mouseX < ruleBoxX || p5.mouseX > ruleBoxX + 2 * boxesW/numBoxes) return false;
  if (p5.mouseY < topBoxesY || p5.mouseY > topBoxesY + endcapH) return false;
  return true;
}


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

/////////////////////////////////////////////////////////////////////////////////
function dotsMouseReleased() {
  if (mouseOnBoxes() && currentId && currentId[0] !== DotEnum.UNDEF) {  // this is the end of a drag event
    [sendingBox, recievingBox] = getSendingAndRecievingBox();
    
    if (recievingBox === sendingBox) {            // drag within a box
      if (!dotAnnihilation(currentId)) {
        updatePosition(currentId);
      }
    }
    else {                                            
      if (recievingBox > sendingBox) {            // drag left
        if (standardRule) {
          if (!explodeDot(sendingBox, recievingBox)) {
            resetDotPosition(currentId);            // weren't enough dots, send it back
          }
        }
        else {
          if (!negaBinaryRule2(sendingBox, recievingBox)) {
            resetDotPosition(currentId);
          }
        }
      }
      else {                                      // drag right
        unexplode(sendingBox,recievingBox);
        //resetDotPosition(currentId);
      }
    }
  }
  else {                                          // we've dragged a dot out of box region
    if (mouseInSpacers()) {                       // between the boxes
      resetDotPosition(currentId);        
    }
    else {                                        // out of the boxes
      if(mouseOnDot()) {
        deleteDot(currentId);
      }
    }
  }
};



function dotsMousePressed()
{
  if (mouseOnDotButton()) {  addDots = !addDots;  }
  if (mouseOnRuleButton()) {  standardRule = !standardRule;  }

  if (mouseOnBoxes()) {
    if (!mouseOnDot()) {
      if (addDots) {
        addDot();
      }
      else {
        addAntidot();
      }
    }
  }
};



function dotsMouseDragged()
{
  if (currentId[0] != DotEnum.UNDEF) {
    const dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    const { rx, ry } = getBoxRelativePos(p5.mouseX, p5.mouseY, dot.box);
    dot.rx = rx;  // update the x, y position of currentId dot
    dot.ry = ry;
  }
};


function dotsDraw()
{
  p5.frameRate(15);
  p5.clear();
  boxes.draw();
  dots[0].draw();
  dots[1].draw();
  drawValueBoxes();
  drawCodeBoxes();
  drawSummaryBox();
  drawDotButton();
  drawRuleButton();
};

function dotsWindowResized(width,height)
{

  canvasW = width;
  canvasH = height;


  const minHeight = 200;
  if (canvasH < minHeight) {
    canvasH = minHeight;
  }

  endcapH = canvasH * 0.1;
  boxesW = canvasW * 0.9; // width of all the boxes together

  const boxWidth = boxesW / numBoxes;

  boxesH = canvasH * 0.5; // height of boxes
  boxesX = (width - boxesW) / 2;
  boxesY = (canvasH - boxesH) / 2 + endcapH/2;
  dotD = p5.min(boxWidth * 0.2, boxesH * 0.2);
  const dotMax = p5.min(boxWidth * 0.25, boxesH * 0.25);
  marginX = 2 * dotMax;
  marginY = dotD * 0.5;
  xSpacer = dotD/2;
  ySpacer = dotD/2;
  
  boxTextSize = boxesH * 0.5;
  
  var boxW = boxesW / numBoxes - ySpacer;
  var t = '-' + p5.abs(p5.pow(base,numBoxes-1)).toString();
  p5.push();
  p5.textSize(boxTextSize);
  while (p5.textWidth(t) > boxW) {
    boxTextSize *= 0.75;
    p5.textSize(boxTextSize);
  }
  p5.pop();

  valueTextSize = endcapH * 0.5;
  topBoxesY = boxesY - 2*ySpacer - 2*endcapH;
  valueBoxesY = boxesY - ySpacer - endcapH;
  codeBoxesY = boxesY + boxesH + ySpacer;
  ruleBoxX = boxesX + boxWidth;


  boxes.updateSize(boxesX, boxesY, boxesW, boxesH);
};



////
// P5 Structure Functions
///////////////////////////////////////////////////////////////////////////////////



p5.setup = function() {


  boxes = new Boxes(base, numBoxes, boxesX, boxesY, boxesW, boxesH);
  dots = [];
  dots.push(new DotArray(numBoxes, dotFill, dotStroke));
  dots.push(new DotArray(numBoxes, antidotFill, antidotStroke));
  if (numBoxes < 4) ruleButonOn = false;

  // attribution 3.0  mark diangelo
  addDotSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bd0a27a5a92c1f904fe0713f6664d9a8b28cb476/Blop-Mark_DiAngelo-79054334.wav');

  // attribution 3.0  mark diangelo
  annihilateSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/e0ca3e1a7f8393c9c62b56650bb4b1ad01749265/Woosh-Mark_DiAngelo-4778593.wav');


  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);

  p5.windowResized();

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {

  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  dotsWindowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dotsDraw();
}


////
// P5 event functions
///////////////////////////////////////////////////////////////////////////////////////////



p5.mousePressed = function()
{
  dotsMousePressed();
};



p5.mouseDragged = function() {
  dotsMouseDragged();
};





// there's a lot to do here
p5.mouseReleased = function() {
  dotsMouseReleased();
};


```


### Known Bugs

- If there's a lot of dots in a box the annihilation doesn't always work.  Need to figure out how to consistently reproduce it.


## Negative Binary Instructions

- Tap to add a Dot to a Box
- Toggle the Add Dot button to switch to adding Antidots
- Drag a Dot Left to *explode* the dot.
- Drag a Dot out of the frame to delete it.
- Drag a Dot over an Antidot to annihilate them
- Drag a Dot to the right to *unexplode* it 
- Toggle the Rule button to switch between the | $1$ | $1$ | $\longleftarrow$ | $0$ | $-1$ | rule and the standard $-1 \longleftarrow 2$ rule.


---

[Back to Home](:@Home)
