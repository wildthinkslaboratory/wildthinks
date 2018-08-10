
let p5;  // need to pass in the p5 library from the playable and bind it to this local p5 variable

////
// Color Pallette
//////////////////////////////////////////////////////////////////////////////

const purple =        [200, 0,  255];
const darkpurple =    [50,  0,   50];
const cyan =          [0,   200, 255];
const darkbluegreen = [0,   100, 100];
const lightLilac =    [220, 220, 255];
const white =         [255, 255, 255];
const paleLime =      [200, 255, 200];
const darkGray =      [100, 100, 100];




////
// Color Formatting 
//////////////////////////////////////////////////////////////////////////////

const boxStroke = lightLilac;                // boxes color formatting
const boxFill = white; 

const dotFill = purple;                      // dot color formatting 
const dotStroke = darkpurple; 
const antidotFill = cyan; 
const antidotStroke = darkbluegreen; 
                                           
const writingFill = darkbluegreen;           // value boxes color formatting
const valueFill = white;
const valueStroke = lightLilac;

const dotButtonStroke = darkGray;            // button color formatting
const dotButtonFill = white;







// general function for shallow copying of object. Keeps the associated methods.
function copyInstance (original) {
  let copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );
  return copied;
}




////
// Coordinate transforms between box-relative and canvas-relative
// Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
//////////////////////////////////////////////////////////////////////////////

let boxX = 0;        // these varaibles are local to these functions 
let boxY = 0;        // and only updated through the updateCanvasDimensions function
let boxWidth = 0;
let boxHeight = 0;

function updateCanvasDimensions(x,y,width,height) {
  boxX = x;
  boxY = y;
  boxWidth = width;
  boxHeight = height;
}

function getCanvasRelativePos(rx, ry) {
  const result = {
    x: rx * boxWidth + boxX,
    y: ry * boxHeight + boxY
  }
  return result;
}

function getBoxRelativePos(x, y) {
  const result = {
    rx: (x - boxX) / boxWidth,
    ry: (y - boxY) / boxHeight
  };

  return result;
}





////
// Drawing helper functions
//////////////////////////////////////////////////////////////////////////////

function textHeight() {
  return p5.textAscent() * 0.8; 
}

function centerTextInRect (x,y,width,height,text) {
  const textW = p5.textWidth(text);
  const textH = textHeight();
  const xoffset = (width - textW) / 2;
  const yoffset = (height - textH) / 2;
  return [x + xoffset, y + height - yoffset];
}


function randomJiggle(amount) {
  return p5.random(-2*amount, 2*amount);
}



///
// Dot class
//////////////////////////////////////////////////////////////////////////////

function nextId() {        // get the next dot ID
  let i = uniqueId;
  uniqueId += 1;
  return i;
}


class Dot {
  constructor(x, y, box) {
    const {rx, ry} = getBoxRelativePos(x, y, box);
    this.rx = rx;                // a dot knows it's position
    this.ry = ry;
    this.oldx = rx;             // it remembers it's old position before being dragged
    this.oldy = ry;
    this.box = box;            // it knows what box it's in
    this.id = nextId();        // each dot has a unique id
  }

  getPosition() {
    return getCanvasRelativePos(this.rx, this.ry);
  }

  setPosition(x,y) {
      const { rx, ry } = getBoxRelativePos(x,y);
      this.rx = rx;  
      this.ry = ry;
  }

}


function overlap(d1, d2) {
  let result = false;

  if (d1.box === d2.box) {
    const c1 = d1.getPosition();
    const c2 = d2.getPosition();
    const dist = p5.dist(c1.x,c1.y,c2.x, c2.y);
    if (dist < dotD) {
      result = true;
    }
  }

  return result;
}



///
// DotArray class
//////////////////////////////////////////////////////////////////////////////

class DotArray {
  constructor(size, fillColor, strokeColor) {
    this.dots = [];
    for (let i = 0; i < size; i++) {
      this.dots[i] = [];
    }
    this.f = fillColor;
    this.s = strokeColor;
  }

  draw() {
    p5.push();
    p5.stroke(this.s);
    p5.fill(this.f);
    for (let i=0; i < this.dots.length; i++) {
      for (let j=0; j < this.dots[i].length; j++) {
        const dot = this.dots[i][j];
        const {x, y} = dot.getPosition();
        if (boxes.in(x, y)) { // this line shouldn't be here need to fix
          p5.ellipse(x, y, dotD, dotD);
        }
      }
    }
    p5.pop();
  }

  // this is all done with Canvas Relative positioning
  snapToBox(x,y,boxId) {
    let snappedY = y;
    let snappedX = x;

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

  addDot(x, y, box) {
    const [snappedX,snappedY] = this.snapToBox(x, y, box);
    this.dots[box].push(new Dot(snappedX, snappedY, box));
    if (!addDotSound === null) { addDotSound.play(); }

  }

  pushDot(boxID,dot) {

    const {x, y} = dot.getPosition();
    const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
    const {rx, ry} = getBoxRelativePos(snappedX, snappedY);

    dot.rx = rx;
    dot.ry = ry;
    this.dots[boxID].push(dot);
  }

  updateDotPosition(pos) { 
    let dot = this.dots[pos[1]][pos[2]];

    const {x, y} = dot.getPosition();
    const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
    const {rx, ry} = getBoxRelativePos(snappedX, snappedY);

    dot.rx = rx;
    dot.ry = ry;
    dot.oldx = dot.rx;
    dot.oldy = dot.ry;
  }

  deleteDot(i, j) {
    this.dots[i].splice(j, 1);
  }

  resetOldPosition(pos) {
    let dot = this.dots[pos[1]][pos[2]];
    dot.rx = dot.oldx;
    dot.ry = dot.oldy;
  }


}


///
// Box class and functions
///////////////////////////////////////////////////////////////////////////

class Boxes {
  constructor(base, numberBoxes, x, y, boxesWidth, boxHeight) {
    this.base = base;
    this.numberBoxes = numberBoxes;
    this.x = x;
    this.y = y;
    this.height = boxHeight;
    this.width = boxesWidth/numberBoxes;
  }

  updateSize(boxesX, boxesY, boxesWidth, boxHeight) {
    this.height = boxHeight;
    this.width = boxesWidth/this.numberBoxes;
    this.x = boxesX;
    this.y = boxesY;
  }

  in(x, y) {
    if (y < this.y || y > (this.y + this.height)) return false;   // it's not in the boxes
    if (x < this.x || x > (this.x + this.width * this.numberBoxes)) return false;
    return true;
  }

  getBoxID(x, y) {
    let result = -1;

    // check the vertical range of the boxes
    if (y < this.y || y > (this.y + this.height)) {
      // its not in the boxes
    }
    else {
      // check the horizontal range
      const rightX = this.x + this.width * this.numberBoxes;
      if (x < this.x || x > rightX) {
      // its not in the boxes
      }
      else {
        // It is in a box's zone, but might be in the spacer.
        const boxId = p5.floor((rightX - x) / this.width);
        const boxLeft = this.x + (this.numBoxes - boxId - 1) * this.width;
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

    return result;
  }


  draw() {
    p5.push();
    const x = boxesX;
    const y = boxesY;
    p5.noStroke();
    p5.fill(boxFill);
    for (let i=0; i < this.numberBoxes; i++) {
      p5.rect(x + i*this.width, y , this.width - xSpacer, this.height, 20);
    }

    p5.noStroke();
    p5.fill(boxStroke);
    p5.textSize(boxTextSize);
    for (let i=0; i < this.numberBoxes; i++) {
      const t = p5.pow(this.base, this.numberBoxes - i - 1).toString();


      const [textX,textY] = centerTextInRect(x + i*this.width, y , this.width - xSpacer, this.height,t);
      p5.text(t, textX, textY);
    }
    p5.pop();
  }

}



////
// Values that change on window-resize
//////////////////////////////////////////////////////////////////////////////

// so these variables are a bit of a mess.  They are global and used throughout
// the app.  

let canvasW;  // canvas width
let canvasH;  // canvas height
let boxesW;   // width of all the boxes together
let boxesH;   // height of boxes
let boxesX;
let boxesY;
let endcapH;
let dotD;     // dot diameter
let xSpacer = 10;  // how much space between the boxes
let marginX;
let marginY;
let boxTextSize;
let valueTextSize;
let topBoxesY;
let valueBoxesY;
let codeBoxesY;
let ySpacer;
let ruleBoxX;


///
// Additional Draw Functions
/////////////////////////////////////////////////////////////////////////////////



function drawCodeBoxes() {
  const x = boxesX;
  const y = codeBoxesY;
  const width = boxesW / numBoxes;
  const height = endcapH;

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
    let code = dots[0].dots[i].length;
    code -= dots[1].dots[i].length;
    const t = code.toString();

    if (code === 0) { p5.fill(valueStroke); }
    else { p5.fill(writingFill); }

    const [textX,textY] = centerTextInRect(x + (numBoxes - i - 1)*width, y , width - xSpacer, height,t);
    p5.text(t, textX, textY);
  }

  p5.pop();
}





function drawValueBoxes() {
  const x = boxesX;
  const y = valueBoxesY;
  const width = boxesW / numBoxes;
  const height = endcapH;

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
    let value = dots[0].dots[i].length * p5.pow(base, i);
    value -= dots[1].dots[i].length * p5.pow(base, i);
    currentSum += value;
    const t = value.toString();
 
    if (value === 0) {
      p5.fill(valueStroke);
    }
    else {
      p5.fill(writingFill);
    }

    const [textX,textY] = centerTextInRect(x + (numBoxes - i - 1)*width, y , width - xSpacer, height,t);
    p5.text(t, textX, textY);
  }

  p5.pop();
}



function drawSummaryBox() {
  const y = topBoxesY;
  const height = endcapH;
  const x = boxesX + boxesW * (numBoxes - 1)/numBoxes;
  const boxW = boxesW / numBoxes;

  p5.push();

  p5.stroke(writingFill);
  p5.strokeWeight(2);
  p5.fill(boxFill);
  p5.rect(x, y, boxW - xSpacer, height, 10);

  p5.textSize(valueTextSize);
  p5.fill(writingFill);
  p5.stroke(writingFill);
  p5.strokeWeight(1);

  const t = currentSum.toString();

  const [textX,textY] = centerTextInRect(x, y, boxW - xSpacer, height, t);
  p5.text(t, textX, textY);

  p5.pop();
}



function drawRuleButton() {
  if (!ruleButtonOn) return;
  const y = topBoxesY;
  const height = endcapH;
  const x = ruleBoxX;
  const boxW = 2* boxesW / numBoxes;

  
  const littleBoxH = height * 0.75;
  const dotSize = littleBoxH * 0.25;

  p5.push();

  p5.stroke(dotButtonStroke);
  p5.strokeWeight(1);
  p5.fill(dotButtonFill);
  p5.rect(x, y, boxW - xSpacer, height, 10);

  const centerX = ruleBoxX + (boxW - xSpacer) / 2;
  boxY = y + height * 0.125;
  const shift = littleBoxH/2;

  p5.line(centerX - shift, boxY + shift, centerX + shift, boxY + shift);
  p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift - 0.3 * shift );
  p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift + 0.3 * shift );

  if (standardRule) {
    const box1X = centerX + littleBoxH;
    const box2X = centerX - 2*littleBoxH;

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
    const boxes1X = centerX + littleBoxH;
    const boxes2X = centerX - 3*littleBoxH;
    
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
  const y = topBoxesY;
  const height = endcapH;
  const x = boxesX;
  const boxW = boxesW / numBoxes;

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

  const dotSize = p5.min(dotD, endcapH * 0.75);
  p5.ellipse(x + boxW * 2/3,y + endcapH/2,dotSize, dotSize);

  p5.fill(darkGray);

  const t = "Add Dot"
  const [textX,textY] = centerTextInRect(x, y, boxW - xSpacer, height, t);
  p5.text("Add", textX, textY);

  p5.pop();
}


///  Sound file variables
let addDotSound;
let annihilateSound;
const addDotSoundFile = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bd0a27a5a92c1f904fe0713f6664d9a8b28cb476/Blop-Mark_DiAngelo-79054334.wav';
const annihilateSoundFile = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/e0ca3e1a7f8393c9c62b56650bb4b1ad01749265/Woosh-Mark_DiAngelo-4778593.wav';


////
// Game state
////////////////////////////////////////////////////////////////////////////

const DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});




let base = 2;
let numBoxes = 6;
let boxes;
let dots;
let currentId = [DotEnum.UNDEF, 0, 0];  // the id of the current dot
let uniqueId = 0;
let currentSum = 0;

//// 
// App Restrictions
////////////////////////////////////////////////////////////////////////////

let negaBinary = false;
let dotButtonOn = true;
let ruleButtonOn = negaBinary;
let addDotsAllowed = true;
let removeDotsAllowed = true;



////
// Button States
/////////////////////////////////////////////////////////////////////////////

let addDots = true;
let standardRule = true;


////
// Main functions affecting model
/////////////////////////////////////////////////////////////////////////////



// two opposing dots collide and annihilate
function dotAnnihilation(id) {
  // look for overlap with an opposing dot in same box
  const opposing = 1 - id[0];
  const sourceDot = dots[id[0]].dots[id[1]][id[2]];
  const opposingDots = dots[opposing].dots;

  for (let i=0; i < opposingDots.length; i++) {
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
  
  const dotsNeeded = p5.pow(p5.abs(base), recievingBox - sendingBox);

  if (dots[currentId[0]].dots[sendingBox].length < dotsNeeded) return false;

  let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
  newDot.box = recievingBox;


  let dotArrayID = currentId[0];
  if (base < 0) {
    dotArrayID = ((sendingBox - recievingBox) % 2 ? 1 - currentId[0] : currentId[0]);
  }

  dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
  deleteDot(currentId);                            // remove this dot from it's old box
  for (let i=0; i < dotsNeeded-1; i++) {           // remove other dots from old box
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

  const dotsToAdd = p5.pow(p5.abs(base), sendingBox - recievingBox);
  let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
  newDot.box = recievingBox;
  
  let dotArrayID = currentId[0];
  if (base < 0) {
    dotArrayID = ((sendingBox - recievingBox) % 2 ? 1 - currentId[0] : currentId[0]);
  }

  dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
  deleteDot(currentId);                            // remove this dot from it's old box  
  for (let i=0; i < dotsToAdd-1; i++) {           // remove other dots from old box
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
    const current_dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    const {x, y} = current_dot.getPosition();
    return [current_dot.box, boxes.getBoxID(x,y)];
  }
  return [-1,-1];
}



function toggleDot(dotID) {
    const arrayId = dotID[0];
    const toggleArrayId = (arrayId === 0 ? 1 : 0);
    const current_dot = dots[arrayId].dots[dotID[1]][dotID[2]];
    let newDot = copyInstance(current_dot);

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
function mouseInSpacers() {
  if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW) return false;
  if (p5.mouseY < boxesY || p5.mouseY > boxesY + boxesH) return false;
  return true;
}



function mouseOnBoxes() {
  return boxes.getBoxID(p5.mouseX, p5.mouseY) != DotEnum.UNDEF;
}



function mouseOnDot() {
  // check the dots
  for (let n=0; n < dots.length; n++) {
    for (let i=0; i < dots[n].dots.length; i++) {
      for (let j=0; j < dots[n].dots[i].length; j++) {
        const dot = dots[n].dots[i][j];
        const { x, y } = dot.getPosition();
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
function mouseReleased() {
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
        if (removeDotsAllowed) { 
          deleteDot(currentId); 
          currentId = [DotEnum.UNDEF,-1,-1];
        }
        else { resetDotPosition(currentId); }
      }
    }
  }
};



function mousePressed()
{
  if (mouseOnDotButton()) {  addDots = !addDots;  }
  if (mouseOnRuleButton()) {  standardRule = !standardRule;  }

  if (mouseOnBoxes() && !mouseOnDot() && addDotsAllowed) {
    if (addDots) {
      addDot();
    }
    else {
      addAntidot();
    }
  }
};



function mouseDragged()
{
  if (currentId[0] != DotEnum.UNDEF) {
    const dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
    dot.setPosition(p5.mouseX, p5.mouseY);
  }
};


function draw()
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

function windowResized(width,height)
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
  
  const boxW = boxesW / numBoxes - ySpacer;
  const t = '-' + p5.abs(p5.pow(base,numBoxes-1)).toString();
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
  updateCanvasDimensions(boxesX,boxesY,boxesW/numBoxes,boxesH);
};


function loadSounds() {
  addDotSound = p5.loadSound(addDotSoundFile);
  annihilateSound = p5.loadSound(annihilateSoundFile);    
}

function setup(playableP5, b, n) {


  p5 = playableP5;
  base = b;
  numBoxes = n;

  if (base === -2) {
    negaBinary = true;
    ruleButtonOn = true;
    console.log("turned on ruleButtonOn");
  }

  boxes = new Boxes(base, numBoxes, boxesX, boxesY, boxesW, boxesH);
  dots = [];
  dots.push(new DotArray(numBoxes, dotFill, dotStroke));
  dots.push(new DotArray(numBoxes, antidotFill, antidotStroke));
  if (numBoxes < 4) ruleButonOn = false;
}

function turnOffAddDotButton() {  dotButtonOn = false; }

function turnOffRuleButton() {  ruleButtonOn = false; }

function allowAddDots(b) { addDotsAllowed = b; }

function allowRemoveDots(b) { removeDotsAllowed = b; }

function addDotsToBox(numberOfDots, dotType, box) {
  const dotArrayID = dotType;
  if (dotArrayID > 1) dotArrayID = 1;
  for (let i=0; i < numberOfDots; i++) {   
    const boxW = boxesW/numBoxes;        
    const x = boxesX + (numBoxes - box - 1)* boxW + boxW/2;
    const y = boxesY + (boxesH/2);
    dots[1-dotArrayID].addDot(x + randomJiggle(dotD), y + randomJiggle(dotD), box);
  }

}

///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.dl = mod.exports;
  }
})(this, function (exports) {
  'use strict';


  exports.setup = setup;
  exports.loadSounds = loadSounds;
  exports.windowResized = windowResized;
  exports.draw = draw;
  exports.mouseDragged = mouseDragged;
  exports.mousePressed = mousePressed;
  exports.mouseReleased = mouseReleased;
  exports.turnOffAddDotButton = turnOffAddDotButton;
  exports.turnOffRuleButton = turnOffRuleButton;
  exports.allowAddDots = allowAddDots;
  exports.allowRemoveDots = allowRemoveDots;
  exports.addDotsToBox = addDotsToBox;
});




