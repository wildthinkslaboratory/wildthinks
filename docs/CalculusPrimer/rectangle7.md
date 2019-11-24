# Rectangle 

# :::: clue
# --outlinebox
##### Spring Pull
When we pull on a spring, the amount of force required changes with the distance the spring is stretched. How much work is done if we stretch the spring from zero to 8 centimeters?    
# --outlinebox
# ::::

# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) Tool Panel
```p5js /autoplay
// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#EEEEEE';
myDiv.style.border = '1px solid gray';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 10, ySpacer = 10, width = 40;
let B = new ToolPanel(p5,width,xSpacer,ySpacer);
B.addButton('rectangle');
B.addButton('rectangle array');
B.initialize();


p5.setup = function() { 
  var canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  var canvasHeight = width + 2 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {
  B.draw(p5.mouseX,p5.mouseY);
}

p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  const [name, state, id] = B.mousePressed();
  
  if (id != -1) {
    smartdown.setVariable('mode', name);
  }
  

  // EnergyHack to enable looping for duration of drag.
  p5.loop();

};


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
//  window.setTimeout(function() {
//    p5.noLoop();
//  }, 5000);
};

```

[Submit Solution](:=compute=true)
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
myDiv.innerHTML = `<div id='top' style='height:200px; width:100%; border:1px solid gray;background:#FFFFEE;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;





let xlow = -2;
let xhigh = 10;
let ylow = -5;
let yhigh = 20;

let k = 2;
let f = function(x) { return k * x; };
let answer = 32;

// create the first board
JXG.Options.axis.ticks.majorHeight = 40;
board0 = JXG.JSXGraph.initBoard('bottom', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:false, showCopyright:false});



let xaxis = board0.create('axis', [[0, 0], [1,0]], 
  {name:'distance (cm)', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
  {name:'force', 
    withLabel: true, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    }
  });   

let pstart = board0.create('point', [0,0],{name:'', color:'#7777DD', fixed:true});
let p0 = board0.create('point', [8,f(8)],{name:'', color:'#7777DD', fixed:true});

let vgraph = board0.create('functiongraph', [f,0,xhigh], {
  strokeColor:'#7777DD', 
  strokeWidth:1, 
  visible:true});

let vtext = board0.create('text', [5, -15, 'force of spring'], {
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
workspace.setRectangleNames(['work', 'distance', 'force']);
workspace.setUseRectangleNames(true);
workspace.setRectangleVerticalAdjust(true);
workspace.setRectangleUseFunction(true);

////////////////////////////////////////////////////////////////////////////////////

let Atext = board0.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.9 * (yhigh - ylow),
  function() { return 'Total Area = '; }], {
  fontSize:20,
  visible:true
});


board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-2,8,10,-2], keepaspectratio:false, axis:false, showCopyright:false});

board0.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'distance (cm)', 
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




let a = 2;
let n = 30;
let d_0 = -1;

let s0 = board1.create('point',[function() { return workspace.maxX(); }, 2],{name:'', color:'black'});
let spring = function(x) { return  2 + a * Math.sin(n * (x - d_0) * Math.PI * 2 / (workspace.maxX() - d_0)); };

let sgraph = board1.create('functiongraph', [spring,d_0, 
  function() { return workspace.maxX(); }], {
  strokeColor:'#CCCCFF', 
  strokeWidth:2, 
  visible:true});

let s1 = board1.create('point',[-1, 8],{visible:false});
let s2 = board1.create('point',[-1, -2],{visible:false});

let dimensionLine = board1.create('segment', [s1,s2], {
  strokeColor:'#999999', 
  strokeWidth:6, 
  firstArrow:false, 
  lastArrow:false, 
  visible:true});



// let f1 = board1.create('point',[0, 1.2],{visible:false});
// let f2 = board1.create('point',[function() { return workspace.getArea(); }, 1.2],{visible:false});

// let dimensionLine = board1.create('segment', [p2,p3], {
//   strokeColor:'#999999', 
//   strokeWidth:2, 
//   firstArrow:true, 
//   lastArrow:true, 
//   visible:true});

// let dimensionText = board1.create('text', [
//   function() { return workspace.getArea() / 2; },
//   1.6,
//   function() { return workspace.getArea().toFixed(2); }
// ],{ strokeColor:'#999999', fontSize: 15, visible:true});

// car.on('over', function() {
//   dimensionLine.setAttribute({visible:true});
//   dimensionText.setAttribute({visible:true});
// });

// car.on('out', function() {
//   dimensionLine.setAttribute({visible:false});
//   dimensionText.setAttribute({visible:false});
// });

// let computeError = function() {
//   return 100 * Math.abs(1 - workspace.getArea() / answer);
// };

// let Etext = board0.create('text', [
//   xlow + 0.25 * (xhigh - xlow), 
//   ylow + 0.75 * (yhigh - ylow), 
//   function() { return 'Percent Error = ' + computeError().toFixed(3); }], {
//   fontSize:20,
//   visible:true
// });

// smartdown.setVariable('num', 1);
// smartdown.setVariable('active', false);
let maxWork = 100;
let workColor = function(w) { 
  let x = maxWork - w;
  let r = 240 + 15 * (x / maxWork);
  let g = 100 + 155 * x / maxWork;
  let b = 100 + 135 * x / maxWork;
  return 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
};


this.div.onmousedown = function(e) { 
  
  let width = myDiv.offsetWidth;
  let margin = (window.innerWidth - width)/2;
  let percent = (e.clientX - margin) / width;

  if (env.mode >= 0) {
    workspace.addElement(env.mode, percent, f);
  }
  
};


// this.sizeChanged = function() {
//   workspace.resize(myDiv.offsetWidth, myDiv.offsetHeight);
// };

// smartdown.setVariable('compute', false);
// smartdown.setVariable('error', 100);
// this.dependOn = ['compute'];
// this.depend = function() {
//   if (env.compute == true) {
//     smartdown.setVariable('error', computeError().toFixed(2));
//     smartdown.setVariable('compute', false);
//   }
// };

board0.on('update', function() {
  workspace.boardUpdate();
  myDiv.children[0].style.background = workColor(workspace.getArea());
});


```

