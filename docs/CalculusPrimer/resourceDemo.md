# You Have Three Rectangles


# :::: controlPanel2

```p5js /autoplay
// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#EEEEEE';
myDiv.style.border = '1px solid gray';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 15, ySpacer = 15, width = 55;
let B = new ResourcePanel(p5);
for (let i=0; i < 3; i++) {
  B.addButton('rectangle');
}



p5.setup = function() { 
  var canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  var canvasHeight = width + 2 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {
  B.draw();
}

p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  const [name, state, id] = B.mousePressed();
  
  if (id != -1) {
    smartdown.setVariable('mode', id);
    smartdown.setVariable('active', true);
  }
  

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

this.dependOn = ['num'];
this.depend = function() {
  if (env.num < B.size()) {
    B.removeActiveButton();
    smartdown.setVariable('active', false);
  }
};

```

# ::::

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js

smartdown.showDisclosure('controlPanel2','','transparent,center,draggable');

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




var l_graph = board0.create('functiongraph', [f,0,xhigh], {
  strokeColor:'#777777', 
  strokeWidth:1, 
  visible:true});

var workspace = new WorkSpace(board0);


smartdown.setVariable('num', 3);
smartdown.setVariable('active', false);

this.div.onmousedown = function(e) { 
  
  let width = this.offsetWidth;
  let percent = e.clientX / width;

  if (env.num > 0 && env.active) {
    workspace.addElement(0, percent, f);
    smartdown.setVariable('num', env.num - 1);
  }

};


this.sizeChanged = function() {
  workspace.resize(myDiv.offsetWidth, myDiv.offsetHeight);
};

```

