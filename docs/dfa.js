/*

  2. store transition function in the dfa
  5. code review and documentation for each function
  3. package up remaining data and functions
  6. clean up sound load
  7. clean the string
  8. error handling


*/


/////////////////////////////////////////////// COLOR SCHEME /////////////////////////////////////////////////

class Colors {
  constructor() {
    this.magenta =       [220, 70,  250];
    this.deepmagenta =   [120, 20,  180];
    this.blue =          [50,  200, 255];
    this.deepblue =      [10,  130, 180];
    this.yellow =        [250, 250,  20];
    this.gold =          [180, 120,  20];
    this.graymagenta =   [150, 140, 180];
    this.grayblue =      [130, 180, 180];
    this.tan =           [150, 150,  20];
    this.darkpurple =    [120, 90,  160];
    this.darkblue =      [130, 130, 160];
    this.brown =         [160, 120, 120];
    this.black =         [0,   0,     0];
    this.white =         [255, 255, 255];
    this.purple =        [200, 0,   255];
    this.cyan =          [0,   200, 255];
    this.darkbluegreen = [0,   100, 100];
    this.lightLilac =    [220, 220, 255];
    this.lime =          [90, 235,  130];
    this.darkGray =      [100, 100, 100];
    this.bottleGreen =   [30,  160, 120];
    this.wine =          [100,   0, 100];
    this.paleWine =      [230, 200, 200];
    this.tomato =        [255, 110, 100];
    this.deepred =       [200,  70,  70];
    this.graygreen =     [110, 150, 100];
    this.graytomato =    [180,  90,  90];
    this.darkgraygreen = [70, 130,   60];
    this.darkgrayred =   [160,  70,  70];
  }
}



class AppColors {
  constructor(anf, ans, inf, ins, ac, tc, shl, adf) {
    this.activeFill = anf;
    this.activeStroke = ans;
    this.inactiveFill = inf;
    this.inactiveStroke = ins;
    this.arrow = ac;
    this.textColor = tc;
    this.highlight = shl;
    this.inputBox = c.white;
    this.arcDotFill = adf;
  }
}



class WindowSizeVars {
  constructor() {
    this.boxX = 0;
    this.boxY = 0;
    this.boxW = 0;
    this.boxH = 0;
    this.inputX = 0;
    this.inputY = 0;
    this.inputW = 0;
    this.inputH = 0;
    this.canvasW = 0;
    this.canvasH = 0;
    this.inputXspacer = 30;
    this.inputTextSize = 0;
    this.inputIndent = 0;
    this.traceDiameter = 0;
    this.inputTextY = 0;
    this.traceY = 0;
    this.boxXmargin = 0;
    this.nodeDiameter = 0;
  }
}

function centerTextInCircle(p5, x,y,diameter,text) {
  const textW = p5.textWidth(text);
  const textH = p5.textAscent() * 0.8;
  const xoffset = (diameter - textW) / 2;
  const yoffset = (diameter - textH) / 2;
  return [x  - diameter/2 + xoffset, y + diameter/2 - yoffset];
}


////
// Coordinate transforms between box-relative and canvas-relative
// Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
//////////////////////////////////////////////////////////////////////////////

function getCanvasRelativePos(rx, ry, win) {
  const result = {
    x: rx * win.boxW + win.boxX,
    y: ry * win.boxH + win.boxY
  };
  return result;
}

function getBoxRelativePos(x, y, win) {
  const result = {
    rx: (x - win.boxX) / win.boxW,
    ry: (y - win.boxY) / win.boxH
  };

  return result;
}

// AnimatedArc is an arrow with an animation along the direction of 
// the arrow.  The first four values it's initialized are the same 
// initialization values you'd use in a p5.arc.  Then we add a label 
// for the arc and a direction (clockwise or counterclockwise) for the

class AnimatedArc  { 
  constructor(p5playable,label,to, color) {
    this.x = 0;                  // arc is centered at this x,y           
    this.y = 0;
    this.a = 0;                  // width
    this.b = 0;                  // height
    this.p5 = p5playable;        // need to pass in p5
    this.label = label;          // transition function symbol 
    this.to = to;                // state this edge takes you to
    this.start = 0;              // angle at which we start traversal
    this.stop = 0;               // angle at which we stop traversal
    this.cclockwise = 0;         // the arc is traversed cclockwise or clockwise
    this.angle = 0;              // angle varies to create animation
    this.active = false;         // this bool turns animation on and off
    this.labelBelow = false;     // place the label below the arc or above the arc
    this.color = color;
  }

  // draw the arrow tips.  This is a lot of work
  // for some stupid arrow heads, but gotta have em.
  drawArrowTip() {
    this.p5.push();
    this.p5.fill(...this.color);
    const angle1 = this.cclockwise ? this.start : this.stop;
    const angle2 = angle1 + (this.cclockwise ? 0.2 : -0.2);
    const A = this.a/2;
    const B = this.b/2;
    let pt1X = this.x + A * Math.cos(angle1);  // point at tip of arrow
    let pt1Y = this.y + B * Math.sin(angle1);  
    let ptX = this.x + A * Math.cos(angle2);   // a guide point to help   
    let ptY = this.y + B * Math.sin(angle2); // us get the last two points
    const slope = (pt1Y - ptY)/(pt1X - ptX);
    const a = 3;
    const b = a / slope;
    let pt2X = ptX + a;  
    let pt2Y = ptY - b;
    let pt3X = ptX - a;  
    let pt3Y = ptY + b;   
    this.p5.triangle(pt1X,pt1Y,pt2X,pt2Y,pt3X,pt3Y);
    this.p5.pop();
  }
}





// A DFA node has a position an can be an accept node.
class Node {
  constructor(p5playable, state, colors, win) {
    this.win = win;
    this.colors = colors;
    this.p5 = p5playable;
    this.rx = 0;
    this.ry = 0;
    this.state = state;
    this.accept = false;
    this.active = false;      // it can be active if we are visiting this node
    this.edges = [];          // it has outgoing transitions.
  }

  draw() {
    this.p5.push();
    this.p5.strokeWeight(2);
    if (this.active) {
      this.p5.stroke(...this.colors.activeStroke[this.state]);
      this.p5.fill(...this.colors.activeFill[this.state]); 
    }
    else {
      this.p5.stroke(...this.colors.inactiveStroke[this.state]);
      this.p5.fill(...this.colors.inactiveFill[this.state]); 
    }
    const {x,y} = getCanvasRelativePos(this.rx, this.ry, this.win);
    this.p5.ellipse(x,y,this.win.nodeDiameter,this.win.nodeDiameter); 
    if ( this.accept === true ) {                 // if it is an accept node
      const faceD = this.win.nodeDiameter * 0.8;
      const smileD = this.win.nodeDiameter * 0.5;
      const eyeD = this.win.nodeDiameter * 0.1;
      const eyeOff = eyeD;
      this.p5.ellipse(x,y,faceD, faceD);          // draw a smiley in it
      this.p5.ellipse(x-eyeOff,y-eyeOff,eyeD,eyeD);
      this.p5.ellipse(x+eyeOff,y-eyeOff,eyeD,eyeD);  
      this.p5.arc(x,y,smileD,smileD,0,this.p5.PI);    
    }
    else {
      if (this.active) {
        this.p5.fill(...this.colors.activeStroke[this.state]);
      }
      else {
        this.p5.fill(...this.colors.inactiveStroke[this.state]);
      }

      this.p5.textSize(this.win.nodeDiameter/2);
      const [cx, cy] = centerTextInCircle(this.p5,x,y,this.win.nodeDiameter,this.state.toString());
      this.p5.text(this.state.toString(),cx,cy);
    }
    this.p5.pop();
  } 

  getPosition() {
    return getCanvasRelativePos(this.rx, this.ry, this.win);
  }
}






// pull all the lower functions into inside functions
// collect all the data that needs resizing into class


const c = new Colors();

const activeNodeFill = [c.yellow, c.lime, c.tomato];
const activeNodeStroke = [c.gold, c.bottleGreen, c.deepred];
const inactiveNodeFill = [c.tan, c.graygreen, c.graytomato];
const inactiveNodeStroke = [c.brown, c.darkgraygreen, c.darkgrayred];
const arrowColor = c.black;
const textColor = c.black;
const stringHighlight = [100,100,100,100];
const arcDotFill = c.tomato;

const colors = new AppColors(activeNodeFill, activeNodeStroke, inactiveNodeFill, inactiveNodeStroke, arrowColor, textColor, stringHighlight, arcDotFill);


let acceptSound;
let rejectSound;
let presses = 0;    // keep track of the number of mouse presses
const animationSpeed = 0.1;  // bigger is faster
let endOfInput = false;
let win;
let input = '';

let p5;
let dfa;
let stateTrace = [];

win = new WindowSizeVars();

let machine;



// A DFA just has a state and some nodes
function DFA(p5playable)  {
  this.p5 = p5playable;
  this.state = 0;
  this.nodes = [];

  this.addNodes = function(n) {
    for (let i=0; i < n; i++) {
      this.nodes.push(new Node(p5, i, colors, win));
    }
  };

  this.positionNodes = function() {
    const n = dfa.nodes.length;
    const distBetweenNodes = (win.boxW - 2 * win.boxXmargin)/n;
    const x = win.boxX + win.boxXmargin + distBetweenNodes/2;
    const y = win.boxY + win.boxH/2;
    for (let i=0; i < n; i++) {
      const {rx, ry} = getBoxRelativePos(x + distBetweenNodes * i, y, win);
      this.nodes[i].rx = rx;
      this.nodes[i].ry = ry;
    }
  };

  this.addEdge = function(from, to, label) {
    this.nodes[from].edges.push(new AnimatedArc(p5,label,to, colors.arrow));
  };

  this.positionEdges = function() {
    for (let n=0; n < this.nodes.length; n++) {          // walk each node
      for (let s=0; s < this.nodes[n].edges.length; s++) {     // walk each transition (indexed by symbol)
        let node = this.nodes[n];
        const from = node.getPosition();
        const to = this.nodes[node.edges[s].to].getPosition();

        if (from.x === to.x) {         // from and to are same node
          node.edges[s].x = from.x; 
          node.edges[s].a = win.nodeDiameter/2. ;
          node.edges[s].y = from.y - win.nodeDiameter/2;
          node.edges[s].b = win.nodeDiameter;
          node.edges[s].start =  this.p5.PI;
          node.edges[s].stop =   2* this.p5.PI; 
          node.edges[s].angle = this.p5.PI; 
        }
        else {
          const width = p5.abs(from.x - to.x);
          node.edges[s].x = p5.min(from.x, to.x) + width/2;   
          node.edges[s].a = width;
          node.edges[s].y = from.y;
          node.edges[s].b = 2 * win.nodeDiameter;
          const vert_comp = win.nodeDiameter/node.edges[s].b;
          const theta = Math.asin(-vert_comp);
          if (n > node.edges[s].to) {
            node.edges[s].start =  0;
            node.edges[s].stop =   this.p5.PI + theta; 
            node.edges[s].angle = 0; 
            node.edges[s].labelBelow = true;
          }
          else {
            node.edges[s].start =  this.p5.PI;
            node.edges[s].stop =   2* this.p5.PI + theta; 
            node.edges[s].angle = this.p5.PI - theta; 
          }
        }

        
        
        node.edges[s].cclockwise = false;  
        
                             
      } 
    }
  };

  this.draw = function() {
    this.p5.push();
    this.p5.fill(255,10);                // draw a background rect
    this.p5.noStroke();
    this.p5.rect(win.boxX, win.boxY, win.boxW, win.boxH, 10);
    this.p5.pop();
    
    this.p5.push();
    this.p5.fill(...colors.arrow);                     // draw the start arrow
    this.p5.textSize(16);
    let {x, y} = this.nodes[0].getPosition();
    const xoffset = win.nodeDiameter/2;
    this.p5.text('start',x-xoffset -70,y-3);
    this.p5.line(x-xoffset - 70,y, x-xoffset,y);
    this.p5.triangle(x-xoffset, y, x-xoffset - 5, y-5, x - xoffset-5, y+5);
    this.p5.pop();

    for (let i=0; i < this.nodes.length; i++) {   // draw the transitions first
      for (let j=0; j < this.nodes[i].edges.length; j++) {  // draw each node's 
        this.drawArc(i,j);                            // transitions
      }
    }

    for (let i=0; i < this.nodes.length; i++) {   // draw the nodes
      this.nodes[i].draw();
    }
  };

  // this is called when the edge/arc animation is finished
  // We change the DFA state and reset the animation
  this.endTransition = function(n,e) {
    let edge = this.nodes[n].edges[e];
    if (edge.cclockwise) { edge.angle = edge.stop; }  // reset edge animation
    else { edge.angle = edge.start;}
    edge.active = false;  
    this.nodes[n].active = false; 
    this.state = machine.edges[n][e];
    this.nodes[this.state].active = true;
    
    if (presses === input.length) {
      if (this.nodes[this.state].accept) {
        acceptSound.play();
      }
      else {
        rejectSound.play();
      }
    }
    stateTrace.push(this.state);
  };





  // This is the edge animation.  We pass in the node and edge
  // This info is passed on to the endTransition function is 
  // this edge is active so we can change the state.
  // it's weird to do this in a draw function but the actual 
  // DFA state change is triggered by the animation ending.
  this.drawArc = function(n,e) {
    this.p5.push();
    this.p5.noFill();    
    //this.p5.stroke(0);                           // draw the edge
    let edge = this.nodes[n].edges[e];
    
    this.p5.arc(edge.x, edge.y, edge.a, edge.b, edge.start, edge.stop);
    
    edge.drawArrowTip();                       // draw the arrow tip
    
    this.p5.textSize(24);                           // draw the label
    this.p5.fill(...colors.arrow);
    let y = edge.y + (edge.labelBelow ? edge.b/2 + 29: -edge.b/2 - 5);
    this.p5.text(edge.label,edge.x-8,y);

    if (edge.active) {                    // if edge is active draw the animation
      this.p5.noStroke();
      this.p5.fill(...colors.arcDotFill);
      const A = edge.a/2;
      const B = edge.b/2;
      const x = edge.x + A * Math.cos(edge.angle);
      const y = edge.y + B * Math.sin(edge.angle);
      this.p5.ellipse(x,y,10,10);           // draw a dot on the arc

      if (!edge.cclockwise) {          // increment position of the dot
        edge.angle += animationSpeed;   // end the transition if we've
        if (edge.angle > edge.stop) {   // reached end of arc
          this.endTransition(n,e); 
        }
      }
      else {
        edge.angle -= animationSpeed;
        if (edge.angle < edge.start) { this.endTransition(n,e); }
      }
    }
    this.p5.pop();
  };



  // start a transition between states
  // identify the current state and activate the appropriate
  // transition arrow
  this.startTransition = function(c) {
    // convert c into a number
    const i = machine.alphabet.indexOf(c);
    if (i === -1) {
      console.log('bad error in startTransition')   // we have an error
    }
    this.nodes[this.state].edges[i].active = true;
  };




  // return machine to a starting state
  this.restart = function() {
    for (let i=1; i < this.nodes.length; i++) {  // deactivate nodes
      this.nodes[i].active = false;
    }
    this.nodes[0].active = true;             // activate start node
    this.state = 0;                          // set state
    endOfInput = false;
  };
}


function drawInputBox() {
  p5.push();
  p5.fill(...colors.inputBox);
  p5.noStroke();
  p5.rect(win.inputX,win.inputY,win.inputW,win.inputH);
  p5.pop();
}

// draw the string from the input box on the screen
function drawInput() {

  drawInputBox();                                       // first we draw the input box

  p5.push();                                            // draw the trace
  p5.strokeWeight(1);
  for (let i=0; i < stateTrace.length; i++) {
    p5.stroke(...colors.activeStroke[stateTrace[i]]);
    p5.fill(...colors.activeFill[stateTrace[i]]); 
    const x = win.inputX + win.inputIndent - win.inputXspacer/3 + win.inputXspacer * i ;
    p5.ellipse(x,win.traceY,win.traceDiameter, win.traceDiameter); 
  }
                        
  p5.fill(...colors.textColor);           // draw the input string
  p5.textSize(win.inputTextSize);

  let x = win.inputX + win.inputIndent;
  for (let i=0; i < input.length; i++) {
    p5.text(input[i], x + win.inputXspacer*i, win.inputTextY);
  }

  p5.fill(...colors.highlight); 
  p5.noStroke();
  const y = win.inputTextY - win.inputTextSize;
  for (let i = 0; i < stateTrace.length - 1; i++) {
    const x = win.inputX + win.inputIndent - win.inputXspacer/4;
    p5.rect(x + i * win.inputXspacer, y, win.inputXspacer - 4, win.inputTextSize + 8,5);
  }
  p5.pop();
}

function construct(p5playable, m) { 
  p5 = p5playable;
  machine = m;
  dfa = new DFA(p5);
  dfa.addNodes(machine.nodes);

  dfa.nodes[0].active = true;
  for (let i=0; i < machine.accept.length; i++) {
    dfa.nodes[machine.accept[i]].accept = true;
  }

  for (let from=0; from < machine.edges.length; from++) {  // for each node
    for (let sym=0; sym < machine.edges[from].length; sym++) { // for each input symbol
      const symbol = machine.alphabet[sym];
      const to = machine.edges[from][sym];
      dfa.addEdge(from, to, symbol);
    }
  }
}


function setup() {

  dfa.positionNodes();
  dfa.positionEdges();
  dfa.p5.createCanvas(win.canvasW,win.canvasH);
}



function loadSounds() {
  acceptSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/f68a0fa7a0cfcf6b72c42986db991bde94bbc90d/SmallGlockA.wav');

  rejectSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/26bde39ba9f27eecdf5ea85533b411a8e378f1a1/cartoon004.wav');   
}

function mousePressed() {
  let validS = !!input;
  if (validS && presses < input.length) {
    dfa.startTransition(input[presses]);
    p5.redraw();
    if (presses < input.length+1) {  // stop drawing boxes when we get to end
      presses += 1;              // of the string
    }
  } 
}



function draw() {
  dfa.draw();
  drawInput();
}

function newInput(i) {
  input = i;
  stateTrace = [0];
  presses = 0;
  dfa.restart();
}

function windowResized(width, height) {
  win.canvasW = width;
  win.canvasH = height;

  const minHeight = 200;
  if (win.canvasH < minHeight) {
    win.canvasH = minHeight;
  }

  win.inputIndent = win.canvasW * 0.05;
  win.boxW = win.canvasW * 0.6;
  win.boxH = win.canvasH * 0.5;
  win.inputW = win.canvasW;
  win.inputH = win.canvasH * 0.2;

  win.inputX = 0;
  win.boxX = (width - win.boxW) / 2;

  win.inputY = win.canvasH * 0.1;
  win.boxY = win.canvasH * 0.4;

  win.traceDiameter = win.inputH * 0.3;
  win.inputTextSize = win.inputH * 0.3;
  win.inputXspacer = win.traceDiameter + 10;

  win.inputTextY = win.inputY + win.inputH * 0.85;
  win.traceY = win.inputY + win.inputH * 0.15 + win.traceDiameter/2;
  win.boxXmargin = win.boxW * 0.1;

  win.nodeDiameter = win.boxH * 0.3;
  dfa.positionEdges();
}



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
    global.dfalib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.construct = construct;
  exports.newInput = newInput;
  exports.setup = setup;
  exports.mousePressed = mousePressed;
  exports.loadSounds = loadSounds;
  exports.draw = draw;
  exports.windowResized = windowResized;

});


