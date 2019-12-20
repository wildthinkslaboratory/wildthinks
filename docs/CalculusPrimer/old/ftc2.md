
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
As our slopes and rectangles get very small, the height of the rectangles define a new fuction that tells us the slope of function $f(x)$ for some value of $x$. [show rectangle curve](:=toggleDF=true) This function tells us how fast the function is changing.

This new function is really helpful for analyzing the original function.  

# --aliceblue
##### Questions

1. What happens to $f(x)$ when the rectangle curve is zero?  

2. What can we say about $f(x)$ is the value of the rectangle curve is negative?  
# --aliceblue

#### Population Growth Curve

Here's a population growth curve.

[show slopes and rectangles](:=showSandR=true)
[show rectangle curve](:=showDF=true)

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
var xbound1 = 0;
var xbound2 = 10;
board2 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-2,1300,xbound2,-100], keepaspectratio:false, axis:false});

var xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'time', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'population size', 
      withLabel: true, 
      label: {
        fontSize: 12,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-100, -20]   // (in pixels)
        }
      });   

var P_0 = 10;
var M = 1000; // carrying capacity
var r = 1 / 900;

// function and it's derivative
//var f = function(x) { return  (P_0 * M * Math.exp(r * M * x)) / (M - P_0 + P_0 * Math.exp(r * M * x)); };
var f = function(x) { return  (P_0 * M) / ((M - P_0) * Math.exp(-r * M * x) + P_0); };
var graph_f = board2.create('functiongraph', [f,xbound1,xbound2], {strokeColor:'#CCCFFF', strokeWidth:2});

var df = function(x) { return  (P_0 * M * M * r * (M - P_0))/ (P_0 * P_0 * Math.exp(r * M * x) + 2 * P_0 *(M - P_0) + (M - P_0) * (M - P_0) * Math.exp(-r * M * x)); };
var graph_df = board2.create('functiongraph', [df,xbound1,xbound2], {strokeColor:'purple', strokeWidth:4, visible:false});

// var dText = board2.create('text', [5.5,20, 'Perimeter'], {fontSize:18});
// var dfText = board2.create('text', [1,-20, 'Change in Perimeter'], {fontSize:18});

var tinylines = board2.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
tinylines.updateDataArray = function() { 

    let delta = (xbound2 - xbound1)/N;
    let x = [];
    let y = [];
    for (let i=xbound1; i <= xbound2 + 0.01; i += delta) {
        x.push(i);
        y.push(f(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board2.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
rectangles.updateDataArray = function() {

    let delta = (xbound2 - xbound1)/N;
    let x = [xbound1];
    let y = [0];
    for (let i=xbound1; i < xbound2 + 0.01; i += delta) {
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
smartdown.setVariable('showDF', false);
smartdown.setVariable('showSandR', false);
var N = 3;

// get the number of triangles from smartdown cell
this.dependOn = ['segments2', 'showDF', 'showSandR'];
this.depend = function() {
  if (env.showSandR == true) {
    tinylines.setAttribute({visible:true});
    rectangles.setAttribute({visible:true});
  }
  if (env.showDF == true) {
    graph_df.setAttribute({visible:true});
  }
  board2.suspendUpdate();
  N = parseInt(env.segments2);
  board2.unsuspendUpdate();
};

```
Number of Divisions [](:-segments2/1/100/1) [](:!segments2) [Application Notes](::instructions1/tooltip/transparent)



# --aliceblue ct
## Concluding Thoughts

1. For every continuous function, there is another related function that tells us how that function is changing.

2. Understanding how a function changes is critical to many fields of study.

# --aliceblue

[Result of an Infinte Process](:@CalculusPrimer/old/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/old/Home)

