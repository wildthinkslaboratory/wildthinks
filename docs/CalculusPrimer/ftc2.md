
## It's Not Just About Distance, Speed and Time

We've been thinking about the movement of an object in one dimension.  We've used the formula $d = r \cdot t$ to show how slope and area are related.  This whole idea can be generalized to any continuous function.  

If $y = f(x)$ is a continuous function, we can construct a secant line between two points on our function and a corresponding rectangle. [show slope and area](:=toggleSecant=true) The slope tells us the change in $f(x)$ over the change in $x$.
$$ slope = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$$
We can rearrange this slope formula to get
$$ f(x_2) - f(x_1) = slope \cdot (x_2 - x_1)$$
and reinterpret it as an area formula.

We can divide our $x$ axis into lots of segments and make numerous slopes and rectangles. [more slopes and areas](:=toggleArray=true)

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box0' class='jxgbox' style='height:500px;'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box0', {boundingbox:[-4,30,4,-10], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, 20]   // (in pixels)
      }
      });
var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   

 
var f = function(x) { return x * x + 8; };
var f_graph = board0.create('functiongraph', [f,-4,4], {strokeColor:'#DDDDDD', strokeWidth:2});
var df = function(x) { return 2 * x; }
var df_graph = board0.create('functiongraph', [df,-4,4], {strokeColor:'purple', strokeWidth:4, visible:false});

var slope = function() { return (f(x2.X()) - f(x1.X())) / (x2.X() - x1.X())};

var x1 = board0.create('point', [2, 0],  {name: 'x1', size:3, color:'blue', visible:false});
var x2 = board0.create('point', [3, 0],  {name: 'x2', size:3, color:'blue', visible:false});

var f1 = board0.create('point', [
    function() { return x1.X(); },
    function() { return f(x1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var f2 = board0.create('point', [
    function() { return x2.X(); },
    function() { return f(x2.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var fline = board0.create('line', [f1, f2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

var f3 = board0.create('point', [
    function() { return x2.X(); },
    function() { return f(x1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var frise = board0.create('line', [f3, f2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
var frun = board0.create('line', [f1, f3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

var friseText = board0.create('text', [
  function() { if (x2.X() > x1.X()) { return x2.X() + 0.1; } 
         return x2.X() - 0.7; },
  function() { return (f(x2.X()) - f(x1.X()))/2 + f(x1.X()); },
  'f(x2) - f(x1)'], {fontSize:12, visible:false});

var frunText = board0.create('text', [
  function() { return x1.X() + (x2.X() - x1.X())/2 - 0.2; },
  function() { return f(x1.X()) - 0.8;},
  'x2 - x1'], {fontSize:12, visible:false});

var fslopeText = board0.create('text', [
  function() { if (x2.X() > x1.X()) { return x1.X() + (x2.X() - x1.X())/2 - 0.4; } 
         return x1.X() + (x2.X() - x1.X())/2 + 0.2; },
  function() { return (f(x2.X()) - f(x1.X()))/2 + f(x1.X()) + 1; },
  'slope'], {fontSize:12, visible:false});




var df1 = board0.create('point', [
    function() { return x1.X(); },
    slope 
  ], {name:'', fixed:true, visible:false});

var df2 = board0.create('point', [
    function() { return x2.X(); },
    slope
  ], {name:'', fixed:true, visible:false});

var dfrect = board0.create('polygon',[x1,df1,df2,x2],{fillColor:'#7700FF',visible:false});

var dflengthText = board0.create('text', [
  function() { return x1.X() + (x2.X() - x1.X())/2 - 0.2; },
  function() { return df1.Y() + 1.5; },
  'x2 - x1'], {fontSize:12, visible:false});

var dfheightText = board0.create('text', [
  function() { if (x2.X() > x1.X()) { return x2.X() + 0.1; } 
                  return x2.X() - 0.3; },
  function() { return df1.Y()/2; },
  'slope'], {fontSize:12, visible:false});

var dfareaText = board0.create('text', [
  function() { return x1.X() + (x2.X() - x1.X())/2 - 0.25; },
  function() { return df1.Y() /2 + 0.2; },
  'f(x2) - f(x1)'], {fontSize:12, visible:false});


var tinylines = board0.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
tinylines.updateDataArray = function() { 

    let delta = 8/N;
    let x = [];
    let y = [];
    for (let i=-4; i <= 4.01; i += delta) {
        x.push(i);
        y.push(f(i));
    }
    this.dataX = x;
    this.dataY = y;
};

var rectangles = board0.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
rectangles.updateDataArray = function() {

    let delta = 8/N;
    let x = [-4];
    let y = [0];
    for (let i=-4; i < 4.01; i += delta) {
        let slope = (f(i + delta) - f(i)) / delta ;
        x.push(i);  // four points of our rectangle
        y.push(slope);

        x.push(i + delta);
        y.push(slope);

        x.push(i + delta);
        y.push(0);
    }
    this.dataX = x;
    this.dataY = y;
};

var turnOnSecant = function() {
    frise.setAttribute({visible:true});
    frun.setAttribute({visible:true});
    fline.setAttribute({visible:true});
    friseText.setAttribute({visible:true});
    frunText.setAttribute({visible:true});
    fslopeText.setAttribute({visible:true});
    dfrect.setAttribute({visible:true});
    dflengthText.setAttribute({visible:true});
    dfheightText.setAttribute({visible:true});
    dfareaText.setAttribute({visible:true});
    x1.setAttribute({visible:true});
    x2.setAttribute({visible:true});
};

var turnOffSecant = function() {
      frise.setAttribute({visible:false});
      frun.setAttribute({visible:false});
      fline.setAttribute({visible:false});
      friseText.setAttribute({visible:false});
      frunText.setAttribute({visible:false});
      fslopeText.setAttribute({visible:false});
      dfrect.setAttribute({visible:false});
      dflengthText.setAttribute({visible:false});
      dfheightText.setAttribute({visible:false});
      dfareaText.setAttribute({visible:false});
      x1.setAttribute({visible:false});
      x2.setAttribute({visible:false});
};


smartdown.setVariable('segments', 4);
var N = 4;
var oldN = 4;
smartdown.setVariable('toggleArray', false);
smartdown.setVariable('toggleSecant', false);
smartdown.setVariable('toggleDF', false);
this.dependOn = ['segments','toggleArray', 'toggleSecant', 'toggleDF'];
this.depend = function() {

  board0.suspendUpdate();

  if (env.toggleSecant == true && env.toggleArray == false) {
    smartdown.setVariable('segments', 8);
  }

  if (env.toggleArray == true && env.toggleSecant == true) {
    tinylines.setAttribute({visible:true});
    rectangles.setAttribute({visible:true});
  }

  var P = parseInt(env.segments);
  if (P != N) {
    oldN = N;
    N = P;    
  }
  
  if (N == 8) {
    turnOnSecant()
  }
  else {
    if (oldN == 8) {
      turnOffSecant();
    }
  }

  if (env.toggleDF == true) {
    df_graph.setAttribute({visible:true});
  }

  board0.unsuspendUpdate();
};

````
Number of Divisions [](:-segments/1/100/1) [](:!segments) 
[Application Notes](::instructions1/tooltip,transparent)

# :::: instructions1
Drag slider to the right and left.
# ::::
As our slopes and rectangles get very small, the height of the rectangles define a new fuction that tells us the slope of function $f(x)$ for some value of $x$. [toggleDF](:=toggleDF=true) It tells us how fast the function is changing.

## Cost Functions in Economics

Here we have a function that describes the cost of making widgets in terms of the number of widgets we make.  What's the cost of producing one more widget?  It depends on how many widgets you've made.  To understand the cost function, we can look at the **marginal cost** function which tells us the rate at which the cost function is changing.  Instead of distance equals rate times time we have the number of widgets times the marginal cost is the cost.

```javascript /autoplay

const svgrect = 
`
<svg width="450" height="140">
  <text x="65" y="20" fill="black">number of widgets</text>
  <text x="125" y="90" fill="black">cost</text>
  <text x="315" y="90" fill="black">marginal cost</text>
  <rect x="0" y="30" width="300" height="100" style="fill:blue;fill-opacity:0.4;stroke-width:3;stroke:rgb(0,0,0)" />
  Sorry, your browser does not support inline SVG.  
</svg>
`;

smartdown.setVariable('SVG2', svgrect);
```
[](:!SVG2|svg)


```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board1 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1.5,300,10,-40], keepaspectratio:false, axis:false});

var xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'1000s of widgets', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, 20]   // (in pixels)
      }
      });
var yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'cost ($1000)', 
      withLabel: true, 
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-100, -20]   // (in pixels)
        }
      });   

 // parabala and it's derivative
var c = function(x) { return  2 * Math.pow(x,3) - 18 * x * x + 60 * x + 30; };
var graph_c = board1.create('functiongraph', [c,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var mc = function(x) { return 6 * x * x - 36 * x + 60; }
var graph_mc = board1.create('functiongraph', [mc,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var cText = board1.create('text', [6,200, 'Cost Function'], {fontSize:18});
var mcText = board1.create('text', [6.5,125, 'Marginal Cost Function'], {fontSize:18});

var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:true}); 
tinylines.updateDataArray = function() { 

    let delta = 10/N;
    let x = [];
    let y = [];
    for (let i=0; i <= 10.01; i += delta) {
        x.push(i);
        y.push(c(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:true});
rectangles.updateDataArray = function() {

    let delta = 10/N;
    let x = [0];
    let y = [0];
    for (let i=0; i < 10.01; i += delta) {
        let slope = (c(i + delta) - c(i)) / delta ;
        x.push(i);  // four points of our rectangle
        y.push(slope);

        x.push(i + delta);
        y.push(slope);

        x.push(i + delta);
        y.push(0);
    }
    this.dataX = x;
    this.dataY = y;
};

smartdown.setVariable('segments1', 3);
var N = 3;

// get the number of triangles from smartdown cell
this.dependOn = ['segments1'];
this.depend = function() {
  board1.suspendUpdate();
  N = parseInt(env.segments1);
  board1.unsuspendUpdate();
};

```
Number of Divisions [](:-segments1/1/100/1) [](:!segments1) [Application Notes](::instructions1/tooltip/transparent)

# :::: instructions1
Drag the red dot to the left and right to determine the distance that the car travels. 
# ::::

## Shapes

Consider a rectangle with $16\text{cm}^2$ in area. You are allowed to change the width of the rectangle, but the area has to remain the same.  The perimeter $P$ will vary depending on the width $w$ we choose.  Here is a graph of the perimeter of the rectangle with respect to its width.


```javascript /autoplay

const svgrect = 
`
<svg width="520" height="140">
  <text x="100" y="20" fill="black">width (w)</text>
  <text x="100" y="90" fill="black">Perimeter (P)</text>
  <text x="315" y="90" fill="black">change in Perimeter</text>
  <rect x="0" y="30" width="300" height="100" style="fill:blue;fill-opacity:0.4;stroke-width:3;stroke:rgb(0,0,0)" />
  Sorry, your browser does not support inline SVG.  
</svg>
`;

smartdown.setVariable('SVG1', svgrect);
```
[](:!SVG1|svg)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board2 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-2,50,8,-50], keepaspectratio:false, axis:false});

var xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'width (w)', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'Perimeter (P)', 
      withLabel: true, 
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-140, -20]   // (in pixels)
        }
      });   

// function and it's derivative
var f = function(x) { return  2*x + 32 /x; };
var df = function(x) { return 2  - (32/(x*x)); };


var graph_f = board2.create('functiongraph', [f,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var graph_df = board2.create('functiongraph', [df,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var dText = board2.create('text', [5.5,20, 'Perimeter'], {fontSize:18});
var dfText = board2.create('text', [1,-20, 'Change in Perimeter'], {fontSize:18});

var tinylines = board2.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:true}); 
tinylines.updateDataArray = function() { 

    let delta = 8/N;
    let x = [];
    let y = [];
    for (let i=0; i <= 8.01; i += delta) {
        x.push(i);
        y.push(f(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board2.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:true});
rectangles.updateDataArray = function() {

    let delta = 8/N;
    let x = [0];
    let y = [0];
    for (let i=0; i < 8.01; i += delta) {
        let slope = (f(i + delta) - f(i)) / delta ;
        x.push(i);  // four points of our rectangle
        y.push(slope);

        x.push(i + delta);
        y.push(slope);

        x.push(i + delta);
        y.push(0);
    }
    this.dataX = x;
    this.dataY = y;
};

smartdown.setVariable('segments2', 3);
var N = 3;

// get the number of triangles from smartdown cell
this.dependOn = ['segments2'];
this.depend = function() {
  board2.suspendUpdate();
  N = parseInt(env.segments2);
  board2.unsuspendUpdate();
};

```
Number of Divisions [](:-segments2/1/100/1) [](:!segments2) [Application Notes](::instructions1/tooltip/transparent)

Calculus is the study of how things change. This is essential to analyzing functions.  That occur every where you have continuous functions.

[Result of an Infinte Process](:@CalculusPrimer/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/Home)

