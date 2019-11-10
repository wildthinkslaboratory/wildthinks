zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

# :::: controlPanel
# --aliceblue
[Undo](:=undo=true) 
# --aliceblue
# ::::

# :::: controlPanel2

```p5js /autoplay
// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#EEEEEE';
myDiv.style.border = '1px solid gray';
myDiv.style.borderRadius = '8px';

let width = 55;
let xSpacer = 15;
let ySpacer = 15;
let numButtons = 6;
let B = new ToolPanel(p5, width, xSpacer, ySpacer);
let rectImg, rectImg2, secantImg, secantImg2, rectArray, rectArray2, secantArray, secantArray2, secantRectArray, secantRectArray2;




p5.setup = function() { 
  var canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  var canvasHeight = width + 2 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on

  rectImg = p5.loadImage('CalculusPrimer/images/rectButton.png');
  rectImg2 = p5.loadImage('CalculusPrimer/images/rectButton2.png');
  secantImg = p5.loadImage('CalculusPrimer/images/secantButton.png');
  secantImg2 = p5.loadImage('CalculusPrimer/images/secantButton2.png');
  rectSecantImg = p5.loadImage('CalculusPrimer/images/rectSecantButton.png');
  rectSecantImg2 = p5.loadImage('CalculusPrimer/images/rectSecantButton2.png');
  rectArrayImg = p5.loadImage('CalculusPrimer/images/rectArray.png');
  rectArrayImg2 = p5.loadImage('CalculusPrimer/images/rectArray2.png');
  secantArrayImg = p5.loadImage('CalculusPrimer/images/secantArray.png');
  secantArrayImg2 = p5.loadImage('CalculusPrimer/images/secantArray2.png');
  secantRectArrayImg = p5.loadImage('CalculusPrimer/images/secantRectArray.png');
  secantRectArrayImg2 = p5.loadImage('CalculusPrimer/images/secantRectArray2.png');


  B.addButton('rectangle', rectImg, rectImg2);
  B.addButton('secant', secantImg, secantImg2);
  B.addButton('rectSecant', rectSecantImg, rectSecantImg2);
  B.addButton('rectangleArray', rectArrayImg, rectArrayImg2);
  B.addButton('secantArray', secantArrayImg, secantArrayImg2);
  B.addButton('secantRectangleArray', secantRectArrayImg, secantRectArrayImg2);

  B.initialize();
};


p5.draw = function() {
  B.draw();
}

p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  const [name, state, id] = B.mousePressed();
  
  smartdown.setVariable('mode', id);

  // EnergyHack to enable looping for duration of drag.
  p5.loop();

};


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  window.setTimeout(function() {
    p5.noLoop();
  }, 5000);
};

```

# ::::

```javascript /autoplay/kiosk
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js

smartdown.showDisclosure('controlPanel2','','transparent,center,draggable');
smartdown.showDisclosure('controlPanel','','transparent,center,draggable');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;

var xlow = -2;
var xhigh = 10;
var ylow = -2;
var yhigh = 20;

// var xlow = -2;
// var xhigh = 20;
// var ylow = -100;
// var yhigh = 500;
var f = function(x) { return  Math.pow(x,2)/4; };
//var f = function(x) { return  Math.pow(x,3)/8 - Math.pow(x,4)/128; };

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
  {name:'time (s)', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'rate (m/s)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   




var l_graph = board0.create('functiongraph', [f,0,xhigh], {strokeColor:'#999999', strokeWidth:3, visible:true});

var workspace = new WorkSpace(board0);

console.log(JXG.COORDS_BY_USER);

smartdown.setVariable('mode', 0);
smartdown.setVariable('undo', false);
this.div.onmousedown = function(e) { 
  
  let width = this.offsetWidth;
  let percent = e.clientX / width;

  workspace.addElement(env.mode, percent, f);

};

this.dependOn = ['undo'];
this.depend = function() {
  if (env.undo == true) {
    workspace.undo();
    smartdown.setVariable('undo', false);
  }
};

this.sizeChanged = function() {
  workspace.resize(myDiv.offsetWidth, myDiv.offsetHeight);
};

````

