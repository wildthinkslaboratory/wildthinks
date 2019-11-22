# Rectangle 

# :::: clue
# --outlinebox
##### Rocket Launch
Here is a graph showing the speed of a rocket during it's first launch phase. What is the height of the rocket 120 seconds after lift off?  
# --outlinebox
# ::::

# :::: navbar
# --colorbox
[Continue](:@CalculusPrimer/rectangle3)
# --colorbox
# ::::

# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) You have a rectangle array! 

```p5js /autoplay
// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 10, ySpacer = 10, width = 40;
let B = new ResourcePanel(p5);
B.addButton('rectangle array');



p5.setup = function() { 
  let canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  let canvasHeight = width + 2 * ySpacer;
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
    smartdown.setVariable('active', true);
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

this.dependOn = ['num'];
this.depend = function() {
  if (env.num < B.size()) {
    B.removeActiveButton();
    smartdown.setVariable('active', false);
  }
};

```
[Submit Solution](:=compute=true)
# ::::

# :::: success
Error of [](:!error)%.  Success!  Less than 4% error achieved.
# ::::

# :::: keeptrying
Error of [](:!error)%. Keep trying.  The error must be below 4%.
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
//myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;
myDiv.innerHTML = `<div id='left' style='height:700px; width:70%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:29%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;
let xlow = -30;
let xhigh = 180;
let ylow = -200;
let yhigh = 2000;


let c = 19 / 7200;
let f = function(x) { return c * Math.pow(x,3) / 3; };

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('left', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:false});

let xaxis = board0.create('axis', [[0, 0], [1,0]], 
  {name:'time (s)', 
    withLabel: true,
    label: {
      fontSize: 15,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis = board0.create('axis', [[0, 0], [0, 1]], 
  {name:'rate (m/s)', 
    withLabel: true, 
    label: {
      fontSize: 15,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, -20]   // (in pixels)
    }
  });   


board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,60000,2,-5000], keepaspectratio:false, axis:true});

board0.addChild(board1);

let vgraph = board0.create('functiongraph', [f,0,120], {
  strokeColor:'#7777DD', 
  strokeWidth:1, 
  visible:true});

let vtext = board0.create('text', [100,1400, 'speed of rocket'], {
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

let pstart = board0.create('point', [0,0],{name:'', color:'#7777DD'});
let p1 = board0.create('point', [120, f(120)],{ color:'#7777DD',name:''});

let workspace = new WorkSpace(board0);
workspace.setSnapMargin(0.5);

let Atext = board0.create('text', [25,1400, 
  function() { return 'Total Area = ' + workspace.getArea().toFixed(0); }], {
  fontSize:20,
  visible:true
});

//let rocket = board1.create('point',[1, function() { return workspace.getArea(); }],{name:''});

let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
let rocket = board1.create('image',[rocketurl, [0.9,function() { return workspace.getArea() - 3000; }], [0.2,3000]]);

let p2 = board1.create('point',[1.2, 0],{visible:false});
let p3 = board1.create('point',[1.2, function() { return workspace.getArea(); }],{visible:false});

let dimensionLine = board1.create('segment', [p2,p3], {
  strokeColor:'#999999', 
  strokeWidth:2, 
  firstArrow:true, 
  lastArrow:true, 
  visible:true});

let dimensionText = board1.create('text', [
  1.3,
  function () { return workspace.getArea() / 2; },
  function() { return workspace.getArea().toFixed(0); }
],{ strokeColor:'#999999', fontSize: 15, visible:true});


let computeError = function() {
  return 100 * Math.abs(1 - workspace.getArea() / 45600);
};

smartdown.setVariable('num', 1);
smartdown.setVariable('active', false);
smartdown.setVariable('mode', 0);

this.div.onmousedown = function(e) { 
  
  let width = myDiv.offsetWidth;
  let margin = (window.innerWidth - width)/2;
  let percent = (e.clientX - margin) / (width * 0.7);

  if (env.num > 0 && env.active) {
    workspace.addElement(env.mode, percent, f);
    smartdown.setVariable('num', env.num - 1);
  }

};

// let Etext = board0.create('text', [25,1300, 
//   function() { return 'Percent Error = ' + computeError().toFixed(3); }], {
//   fontSize:20,
//   visible:true
// });

this.sizeChanged = function() {
  let width = myDiv.offsetWidth;
  board0.resizeContainer(width * 0.7, 700);
  board1.resizeContainer(width * 0.29, 700);
};

smartdown.setVariable('compute', false);
smartdown.setVariable('error', 100);
this.dependOn = ['compute'];
this.depend = function() {
  if (env.compute == true) {
    smartdown.setVariable('error', computeError().toFixed(2));
    smartdown.setVariable('compute', false);

    if (env.error < 5.0) {
      smartdown.showDisclosure('success','','draggable,closeable,center,shadow');
      smartdown.hideDisclosure('keeptrying','','');
    }
    else {
      smartdown.showDisclosure('keeptrying','','draggable,closeable,center,shadow');
      smartdown.hideDisclosure('success','','');
    }
  }
};

```

