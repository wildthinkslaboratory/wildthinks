# Rectangle 

# :::: clue
# --outlinebox
##### Car Ride
The car travels at a constant speed of 10 meters per second.  How far has the car traveled after 4 seconds?  
# --outlinebox
# ::::


# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) Here's another rectangle.

```p5js /autoplay
///////////////////////////////////////////////////////////////////
// this is a script for a RESOURCE PANEL toolbar
///////////////////////////////////////////////////////////////////


// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js

const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 15, ySpacer = 5, width = 55;
let B = new ResourcePanel(p5);

///////////////////////////////////////////////////////////////////
// Add the buttons you want on your resource panel
// NOTE:  The value of page variable env.num should match the number of buttons you add here

B.addButton('rectangle'); 

///////////////////////////////////////////////////////////////////


p5.setup = function() { 
  let canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  let canvasHeight = width + 2 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {  // draw the buttons
  B.draw(p5.mouseX,p5.mouseY);
}

p5.mousePressed = function()     // this function is called everytime the user clicks the mouse
{
  const [buttonType, state, id] = B.mousePressed();  // returns info on the button pushed
  
  if (id != -1) {                              // if it's a valid button
    smartdown.setVariable('mode', buttonType);         // set page mode correct type of button
    smartdown.setVariable('active', true);     // alert page we have an active button
  }
  
  p5.loop();    // EnergyHack to enable looping for duration of drag.
};


p5.mouseReleased = function() {     // this function is called when the user releases the mouse
                                    // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  window.setTimeout(function() {
    p5.noLoop();
  }, 5000);
};

smartdown.setVariable('mode', 0);
smartdown.setVariable('active', false);
smartdown.setVariable('num', 1);
this.dependOn = ['num'];
this.depend = function() {
  
  if (env.num < B.size()) {  // If we have more buttons than the page has elements, delete the active button
     B.removeActiveButton();  // we've used this resouce
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

smartdown.showDisclosure('toolbar','','transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='top' style='height:200px; width:100%; border:1px solid gray;background:#EEFFCC;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;



let xlow = -1;
let xhigh = 5;
let ylow = -3;
let yhigh = 25;

let f = function(x) { return 10; };
let answer = 40;

// create the first board
JXG.Options.axis.ticks.majorHeight = 40;
board0 = JXG.JSXGraph.initBoard('bottom', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:false, showCopyright:false});

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
  {name:'time (s)', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
  {name:'rate (m/s)', 
    withLabel: true, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    }
  });   

let pstart = board0.create('point', [0,10],{name:'', color:'#7777DD', fixed:true});
let p0 = board0.create('point', [4,10],{name:'', color:'#7777DD', fixed:true});

let vgraph = board0.create('functiongraph', [f,0,xhigh], {
  strokeColor:'#7777DD', 
  strokeWidth:1, 
  visible:true});

let vtext = board0.create('text', [3.5,11, 'speed of car'], {
  fontSize:15,
  strokeColor:'#7777DD', 
  visible:false
});

vgraph.on('over', function() {
  vtext.setAttribute({visible:true});
});

vgraph.on('out', function() {
  vtext.setAttribute({visible:false});
});


let workspace = new WorkSpace(board0);



////////////////////////////////////////////////////////////////////////////////////
// Here is where you configure the workspace based on what elements you want to 
// add.  

workspace.setSnapMargin(0.05);
workspace.setRectangleNames(['distance', 'time', 'rate']);
workspace.setUseRectangleNames(true);
workspace.setRectangleVerticalAdjust(true);
workspace.setRectangleUseFunction(true);

////////////////////////////////////////////////////////////////////////////////////

let Atext = board0.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + workspace.getArea().toFixed(2); }], {
  fontSize:20,
  visible:true
});


board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-20,5,100,-2], keepaspectratio:false, axis:false, showCopyright:false});

board0.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'', 
    withLabel: false, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    },
    ticks: {visible:false}
  }); 


let carurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/9e01e8197b3bf685747ae134de3d75feb64ea6f4/car.png';
let car = board1.create('image',[carurl, [function() { return workspace.getArea() -4 ; },-0.2], [4,1]]);

let p2 = board1.create('point',[0, 1.2],{visible:false});
let p3 = board1.create('point',[function() { return workspace.getArea(); }, 1.2],{visible:false});

let dimensionLine = board1.create('segment', [p2,p3], {
  strokeColor:'#999999', 
  strokeWidth:2, 
  firstArrow:true, 
  lastArrow:true, 
  visible:true});

let dimensionText = board1.create('text', [
  function() { return workspace.getArea() / 2; },
  1.6,
  function() { return workspace.getArea().toFixed(2); }
],{ strokeColor:'#999999', fontSize: 15, visible:true});



this.div.onmousedown = function(e) { 
  
  let width = myDiv.offsetWidth;
  let margin = (window.innerWidth - width)/2;
  let percent = (e.clientX - margin) / width;

  if (env.num > 0 && env.active) {
    workspace.addElement(env.mode, percent, f);
    smartdown.setVariable('num', env.num - 1);
  }

};


this.sizeChanged = function() {
  workspace.resize(myDiv.offsetWidth, 600);
  board1.resizeContainer(myDiv.offsetWidth, 200);
};


```

