### NegaBinary Instructions

- Tap to add a Dot to a Box
- Double-Tap to invert a Dot
- Drag Dot Left to *transform* a group.


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
  // console.log('getBoxRelativePos', x, y, box, boxes, result);

  return result;
}


function getCanvasRelativePos(rx, ry, _box) {
  const boxWidth = boxes.width;
  const boxHeight = boxes.height;
  const result = {
    x: rx * boxWidth + boxes.x,
    y: ry * boxHeight + boxes.y
  };

  // console.log('getCanvasRelativePos', rx, ry, box, boxes, result);

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
  this.x = rx;                // a dot knows it's position
  this.y = ry;
  this.oldx = rx;             // it remembers it's old position before being dragged
  this.oldy = ry;
  this.box = box;            // it knows what box it's in
  this.id = nextId();        // each dot has a unique id

  // console.log('Dot', x, y, rx, ry, box, boxID, boxes);
}


// we move dots between boxes so they need a copy with the same id for the new box
function DotCopy(d) {
  this.x = d.x;
  this.y = d.y;
  this.oldx = d.x;
  this.oldy = d.y;
  this.box = d.box;
  this.id = d.id;
}


function overlap(d1, d2) {
  let result = false;

  if (d1.box === d2.box) {
    var dist = p5.dist(d1.x, d1.y, d2.x, d2.y);
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
      const {x, y} = getCanvasRelativePos(dot.x, dot.y, dot.box);
      if (boxes.in(x, y)) { // this line shouldn't be here need to fix
        p5.ellipse(x, y, dotD, dotD);
      }
    }
  }
  p5.pop();
};


DotArray.prototype.addDot = function(x, y, box) {
  this.dots[box].push(new Dot(x, y, box));
  addDotSound.play();
};


DotArray.prototype.deleteDot = function(i, j) {
  this.dots[i].splice(j, 1);
};


DotArray.prototype.resetOldPosition = function(pos) {
  const dot = this.dots[pos[1]][pos[2]];
  dot.x = dot.oldx;
  dot.y = dot.oldy;
};


DotArray.prototype.updateDotPosition = function(pos) {
  const dot = this.dots[pos[1]][pos[2]];

  dot.oldx = dot.x;
  dot.oldy = dot.y;
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

function drawMaskRect() {
  p5.push();
  p5.fill(paleLime);                // draw a background rect
  p5.noStroke();

  p5.rect(
    boxesX - marginX,
    boxesY - marginY,
    boxesW + 2 * marginX - xSpacer,
    boxesH + 2 * marginY,
    10);
  p5.pop();
}


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

    var [textX,textY] = centerTextInRect(x + i*width, y , width - xSpacer, height,t);
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



///////////////////////////////////////////////////////////////////////////////////




function mouseOnBoxes() {
  return boxes.getBoxID(p5.mouseX, p5.mouseY) != DotEnum.UNDEF;
}


function mouseOnDot() {
  // check the dots
  for (var n=0; n < dots.length; n++) {
    for (var i=0; i < dots[n].dots.length; i++) {
      for (var j=0; j < dots[n].dots[i].length; j++) {
        const dot = dots[n].dots[i][j];
        const { x, y } = getCanvasRelativePos(dot.x, dot.y, dot.box);
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


/*
unused

function checkForDotAntidotAnnihilation() {
  for (var n=0; n < numBoxes; n++) {    // walk through the boxes
    for (var i=0; i < dots[0].dots[n].length; i++) {
      for (var j=0; j < dots[1].dots[n].length; j++) {
        if (overlap(dots[0].dots[n][i], dots[1].dots[n][j])) {
          dots[0].deleteDot(n, i);
          dots[1].deleteDot(n, j);
          annihilateSound.play();
        }
      }

    }

  }
}
*/


function annihilation(id) {
  // look for overlap with an opposing dot in same box
  var opposing = 1 - id[0];
  const sourceDot = dots[id[0]].dots[id[1]][id[2]];
  const opposingDots = dots[opposing].dots;

  for (var i=0; i < opposingDots.length; i++) {
    const opposingDot = opposingDots[id[1]][i];
    if (opposingDot && overlap(sourceDot, opposingDot)) {
      dots[id[0]].deleteDot(id[1], id[2]);
      dots[opposing].deleteDot(id[1], i);
      annihilateSound.play();
      return true;
    }
  }
  return false;
}




function finishDotDrag() {
  if (mouseOnBoxes() && currentId) {
    if (currentId[0] != DotEnum.UNDEF) {
      var current_dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
      const {x, y} = getCanvasRelativePos(current_dot.x, current_dot.y, current_dot.box);
      // get the box id after drag
      var recievingBox = boxes.getBoxID(x, y);
      var sendingBox = current_dot.box;

      if (recievingBox === sendingBox) {                  // drag within a box
        if (!annihilation(currentId)) {
          dots[currentId[0]].updateDotPosition(currentId);
        }
      }
      else {                                              // drag between boxes
        if (recievingBox > sendingBox) {                // drag left

          var dotsNeeded = p5.pow(p5.abs(base), recievingBox - sendingBox);
          if (dots[currentId[0]].dots[sendingBox].length >= dotsNeeded) {     // explode the dot

            //add this dot to new box
            var newDot = new DotCopy(current_dot);
            newDot.box = recievingBox;

            var dotArrayID = ((recievingBox - sendingBox) % 2 ? 1 - currentId[0] : currentId[0]);

            dots[dotArrayID].dots[recievingBox].push(newDot);
            console.log('finishDotDrag added', recievingBox, sendingBox, currentId[0], dotArrayID);

            //remove this dot from it's old box
            dots[currentId[0]].deleteDot(currentId[1], currentId[2]);

            //remove other dots from old box
            for (var i=0; i < dotsNeeded-1; i++) {
              dots[currentId[0]].dots[sendingBox].pop();
            }
          }
          else {
            // console.log('finishDotDrag cancel', dots[currentId[0]].dots[sendingBox], dotsNeeded, recievingBox, sendingBox);

            dots[currentId[0]].resetOldPosition(currentId);  // weren't enough dots, send it back
          }
        }
        else {   // drag right
          dots[currentId[0]].resetOldPosition(currentId);
        }

      }
    }
  }
  else {  // dragged out of bounds
    deleteCurrentDot();
  }
}




function deleteCurrentDot() {
  if (currentId[0] != DotEnum.UNDEF) {
    dots[currentId[0]].deleteDot(currentId[1], currentId[2]);
  }
}



/////////////////////////////  MAIN USER EVENTS  /////////////////////////////

function addAntidot() {
  dots[1].addDot(p5.mouseX, p5.mouseY, boxes.getBoxID(p5.mouseX, p5.mouseY));
}

function addDot() {
  const boxID = boxes.getBoxID(p5.mouseX, p5.mouseY);
  if (boxID !== DotEnum.UNDEF) {
    dots[0].addDot(p5.mouseX, p5.mouseY, boxID);
  }
}


function toggleDot() {
  if (mouseOnDot()) {

    const arrayId = currentId[0];
    const toggleArrayId = arrayId === 0 ? 1 : 0;
    var current_dot = dots[arrayId].dots[currentId[1]][currentId[2]];
    console.log('toggleDot', toggleArrayId, currentId, current_dot, dots);

    var newDot = new DotCopy(current_dot);

    dots[toggleArrayId].dots[current_dot.box].push(newDot);

    //remove this dot from its old box
    dots[arrayId].deleteDot(currentId[1], currentId[2]);
  }

}

/*
unused

function dragLeft() {

}

function dragRight() {

}

function dragOffBoxes() {

}

function dragDotAnnihilation() {

}
*/


///////////////////////   MAIN STRUCTURE FUNCTIONS ////////////////////////////

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


// the draw function runs about 30 times a second
p5.draw = function() {
  p5.frameRate(15);

  //drawMaskRect();
  boxes.draw();
  dots[0].draw();
  dots[1].draw();
  drawValueBoxes();
  drawCodeBoxes();
  drawSummaryBox();
};



///////////////////////   MAIN EVENT FUNCTIONS ////////////////////////////


// P5 EVENTS

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

  // toggleDot is getting called sometimes on a drag to the left
  // turning it off until I can figure out a fix
  // console.log('doubleClicked');
  //toggleDot();
};

p5.mouseDragged = function() {
  if (currentId[0] != DotEnum.UNDEF) {
    const dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    const { rx, ry } = getBoxRelativePos(p5.mouseX, p5.mouseY, dot.box);
    // console.log('mouseDragged', p5.mouseX, p5.mouseY, rx, ry, dot.box);
    dot.x = rx;  // update the x, y position of currentId dot
    dot.y = ry;
  }
};


p5.mouseReleased = function() {

  finishDotDrag();

};

```


### Known Bugs

- The ability to drag a Dot and drop it outside of any boxes is currently disabled. Instead, dropping out of bounds will simply cancel the drag. This is because I want to make a *no-dot's-land* between the boxes, so that we don't end up with dots in an ambigous area between boxes.
- We can probably eliminate the need for `drawMaskRect` if we erase the previous image of the dot explicitly as we are dragging. I don't know how to do this, but I'm imagining that redrawing with a transparent fill color might do the trick. The Mask is a pain, unless we just make the whole canvas the mask.
- The toggleDot is being called sometimes on a drag.  Turning it off until I can find a fix.


---

[Back to Home](:@Home)
