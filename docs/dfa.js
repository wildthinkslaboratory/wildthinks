/*

  4. can we rewrite arc constructor to use nodes for input?
  2. store transition function in the dfa

  5. code review and documentation for each function
  3. package up remaining data and functions

  6. clean up sound load
  7. feed in the machine from outside


*/


const magenta =     [220, 70,  250];
const deepmagenta = [120, 20,  180];
const blue =        [50,  200, 255];
const deepblue =    [10,  130, 180];
const yellow =      [250, 250,  20];
const gold =        [180, 120,  20];
const graymagenta = [150, 140, 180];
const grayblue =    [130, 180, 180];
const tan =         [150, 150,  20];
const darkpurple =  [120, 90,  160];
const darkblue =    [130, 130, 160];
const brown =       [160, 120, 120];
const black =       [0,   0,     0];
const white =       [255, 255, 255];

const activeNodeFill = [yellow, blue, magenta];
const activeNodeStroke = [gold, deepblue, deepmagenta];
const inactiveNodeFill = [tan, grayblue, graymagenta];
const inactiveNodeStroke = [brown, darkblue, darkpurple];
const arrowColor = black;
const textColor = black;
const stringHighlight = [100,100,100,100];

class AppColors {
  constructor(anf, ans, inf, ins, ac, tc, shl) {
    this.activeFill = anf;
    this.activeStroke = ans;
    this.inactiveFill = inf;
    this.inactiveStroke = ins;
    this.arrow = ac;
    this.textColor = tc;
    this.highlight = shl;
    this.inputBox = white;
  }
}

const colors = new AppColors(activeNodeFill, activeNodeStroke, inactiveNodeFill, inactiveNodeStroke, arrowColor, textColor, stringHighlight);


function getCanvasRelativePos(rx, ry) {
  const result = {
    x: rx * win.boxW + win.boxX,
    y: ry * win.boxH + win.boxY
  };
  return result;
}

function getBoxRelativePos(x, y) {
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
  constructor(p5playable, x,y,width,height,start,stop,label,clockwise,labelBelow=false) {
    this.p5 = p5playable;
    this.x = x;              
    this.y = y;
    this.a = width/2;  
    this.b = height/2;
    this.label = label;  
    this.start = start;  
    this.stop = stop;
    this.cclockwise = !clockwise;
    this.labelBelow = labelBelow;
    this.angle = start;               // angle varies to create animation
    if (this.cclockwise) { 
      this.angle = stop; 
    }
    this.active = false;              // this bool turns animation on and off
  }

  // draw the arrow tips.  This is a lot of work
  // for some stupid arrow heads, but gotta have em.
  drawArrowTip() {
    this.p5.push();
    this.p5.fill(...colors.arrow);
    const angle1 = this.cclockwise ? this.start : this.stop;
    const angle2 = angle1 + (this.cclockwise ? 0.2 : -0.2);
    let pt1X = this.x + this.a * Math.cos(angle1);  // point at tip of arrow
    let pt1Y = this.y + this.b * Math.sin(angle1);  
    let ptX = this.x + this.a * Math.cos(angle2);   // a guide point to help   
    let ptY = this.y + this.b * Math.sin(angle2); // us get the last two points
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
  constructor(p5playable, x, y, state, accept=false) {
    this.p5 = p5playable;
    const {rx, ry} = getBoxRelativePos(x,y);
    console.log('rx', rx, 'ry', ry);
    this.rx = rx;
    this.ry = ry;
    this.state = state;
    this.accept = accept;
    this.active = false;      // it can be active if we are visiting this node
    this.edges = [];          // it has outgoing transitions.
  }

  draw() {
    this.p5.push();
    this.p5.strokeWeight(2);
    if (this.active) {
      this.p5.stroke(...colors.activeStroke[this.state]);
      this.p5.fill(...colors.activeFill[this.state]); 
    }
    else {
      this.p5.stroke(...colors.inactiveStroke[this.state]);
      this.p5.fill(...colors.inactiveFill[this.state]); 
    }
    const {x,y} = getCanvasRelativePos(this.rx, this.ry);
    this.p5.ellipse(x,y,win.nodeDiameter,win.nodeDiameter); 
    if ( this.accept === true ) {                 // if it is an accept node
      this.p5.ellipse(x,y,30,30);          // draw a smiley in it
      this.p5.ellipse(x-5,y-3,5,5);
      this.p5.ellipse(x+5,y-3,5,5);  
      this.p5.arc(x,y,20,20,0,this.p5.PI);    
    }
    else {
      this.p5.textSize(32);
      this.p5.text(this.state.toString(),x-10,y+10);
    }
    this.p5.pop();
  } 

  addEdge(x,y,width,height,label,start,stop,clockwise,labelBelow=false) {
    this.edges.push(new AnimatedArc(p5,x,y,width,height,label,start,stop,clockwise,labelBelow));
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
    this.inputIndent = 40;
    this.traceDiameter = 0;
    this.inputTextY = 0;
    this.traceY = 0;
    this.boxXmargin = 0;
    this.nodeDiameter = 0;
  }
}

// pull all the lower functions into inside functions
// collect all the data that needs resizing into class



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

const machine = {
  nodes : 3,
  edges : [ [0,1], [2,0], [1,2] ],
  accept : [0],
  alphabet : null
};


// A DFA just has a state and some nodes
class DFA  {
  constructor(p5playable) {
    this.p5 = p5playable;
    this.state = 0;
    this.nodes = [];
  }

  addNodes(n) {
    const distBetweenNodes = (win.boxW - 2 * win.boxXmargin)/n;
    const x = win.boxX + win.boxXmargin + distBetweenNodes/2;
    const y = win.boxY + win.boxH/2;
    for (let i=0; i < n; i++) {
      this.nodes.push(new Node(p5, x + distBetweenNodes * i, y, i, false));
    }
  }

  draw() {
    this.p5.push();
    this.p5.fill(255,10);                // draw a background rect
    this.p5.strokeWeight(4);
    this.p5.stroke(200);
    this.p5.rect(win.boxX, win.boxY, win.boxW, win.boxH, 10);
    this.p5.pop();
    
    this.p5.push();
    this.p5.fill(...colors.arrow);                     // draw the start arrow
    this.p5.textSize(16);
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    this.p5.text('start',x-70,y-3);
    this.p5.line(x-70,y,x-30,y);
    this.p5.triangle(x-30,y,x-35,y-5,x-35,y+5);
    this.p5.pop();

    for (let i=0; i < this.nodes.length; i++) {   // draw the nodes
      this.nodes[i].draw();
      for (let j=0; j < this.nodes[i].edges.length; j++) {  // draw each node's 
        this.drawArc(i,j);                            // transitions
      }
    }
  }

  // this is called when the edge/arc animation is finished
  // We change the DFA state and reset the animation
  endTransition(n,e) {
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
  }





  // This is the edge animation.  We pass in the node and edge
  // This info is passed on to the endTransition function is 
  // this edge is active so we can change the state.
  // it's weird to do this in a draw function but the actual 
  // DFA state change is triggered by the animation ending.
  drawArc(n,e) {
    this.p5.push();
    this.p5.noFill();                               // draw the edge
    let edge = this.nodes[n].edges[e];
    this.p5.arc(edge.x,edge.y,2*edge.a,2*edge.b,edge.start,edge.stop);
    
    edge.drawArrowTip();                       // draw the arrow tip
    
    this.p5.textSize(24);                           // draw the label
    this.p5.fill(...colors.arrow);
    let y = edge.y + (edge.labelBelow ? edge.b + 30: -edge.b - 10);
    this.p5.text(edge.label,edge.x-8,y);

    if (edge.active) {                    // if edge is active draw the animation
      this.p5.noStroke();
      this.p5.fill(220,20,220);
      const x = edge.x + edge.a * Math.cos(edge.angle);
      const y = edge.y + edge.b * Math.sin(edge.angle);
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
  } 



  // start a transition between states
  // identify the current state and activate the appropriate
  // transition arrow
  startTransition(c) {
    if (c === '0') { this.nodes[this.state].edges[0].active = true; }
    else { this.nodes[this.state].edges[1].active = true; }
  }




  // return machine to a starting state
  restart() {
    for (let i=1; i < this.nodes.length; i++) {  // deactivate nodes
      this.nodes[i].active = false;
    }
    this.nodes[0].active = true;             // activate start node
    this.state = 0;                          // set state
    endOfInput = false;
  }

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
  const y = win.inputTextY - win.inputTextSizeq;
  for (let i = 0; i < stateTrace.length - 1; i++) {
    x = win.inputX + win.inputIndent - win.inputXspacer/4;
    p5.rect(x + i * win.inputXspacer, y, win.inputXspacer - 4, win.inputTextSize + 8,5);
  }
  p5.pop();
}




function setup() {

  // make the DFA, two nodes each with two transitions
  dfa = new DFA(p5);

  dfa.addNodes(3);
  dfa.nodes[0].active = true;
  dfa.nodes[0].accept = true;
  //dfa.addNode(150,win.boxY+125,true);
  dfa.nodes[0].addEdge(150,win.boxY+85,40,50,dfa.p5.PI*3/4,dfa.p5.PI*9/4,'0',true);
  dfa.nodes[0].addEdge(200,win.boxY+115,70,60,dfa.p5.PI*9/8,dfa.p5.PI*15/8,'1',true);
  //dfa.addNode(250,win.boxY+125);
  dfa.nodes[1].addEdge(300,win.boxY+115,70,60,dfa.p5.PI*9/8,dfa.p5.PI*15/8,'0',true);
  dfa.nodes[1].addEdge(200,win.boxY+130,70,60,dfa.p5.PI*1/8,dfa.p5.PI*7/8,'1',true,true);
  //dfa.addNode(350,win.boxY+125);
  dfa.nodes[2].addEdge(300,win.boxY+130,70,60,dfa.p5.PI*1/8,dfa.p5.PI*7/8,'0',true,true);
  dfa.nodes[2].addEdge(350,win.boxY+85,40,50,dfa.p5.PI*3/4,dfa.p5.PI*9/4,'1',true);

  dfa.p5.createCanvas(win.canvasW,win.canvasH);
}



function preload(p5playable) {
  p5 = p5playable;
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

  exports.newInput = newInput;
  exports.setup = setup;
  exports.mousePressed = mousePressed;
  exports.preload = preload;
  exports.draw = draw;
  exports.windowResized = windowResized;

});


