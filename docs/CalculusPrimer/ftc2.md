
## It's Not Just About Distance, Speed and Time


## Population Growth in Biology



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
board1 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,300,100,-40], keepaspectratio:false, axis:false});

var xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'time (days)', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, 20]   // (in pixels)
      }
      });
var yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'rabbits', 
      withLabel: true, 
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-100, -20]   // (in pixels)
        }
      });   

var a = 20;
var b = 2;

 // parabala and it's derivative
var r = function(x) { return  a * x * x / 2 - b * f * x * x / 2; };
var graph_r = board1.create('functiongraph', [r,0,100], {strokeColor:'#DDDFFF', strokeWidth:2});

var drdt = function(x) { return a * x - b * x * f; }
var graph_dtdr = board1.create('functiongraph', [drdt,0,100], {strokeColor:'#DDDFFF', strokeWidth:2});

// var rText = board1.create('text', [6,200, 'Cost Function'], {fontSize:18});
// var drdtText = board1.create('text', [6.5,125, 'Marginal Cost Function'], {fontSize:18});

// var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:true}); 
// tinylines.updateDataArray = function() { 

//     let delta = 10/N;
//     let x = [];
//     let y = [];
//     for (let i=0; i <= 10.01; i += delta) {
//         x.push(i);
//         y.push(c(i));
//     }
//     this.dataX = x;
//     this.dataY = y;
// };


// var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:true});
// rectangles.updateDataArray = function() {

//     let delta = 10/N;
//     let x = [0];
//     let y = [0];
//     for (let i=0; i < 10.01; i += delta) {
//         let slope = (c(i + delta) - c(i)) / delta ;
//         x.push(i);  // four points of our rectangle
//         y.push(slope);

//         x.push(i + delta);
//         y.push(slope);

//         x.push(i + delta);
//         y.push(0);
//     }
//     this.dataX = x;
//     this.dataY = y;
// };

// smartdown.setVariable('segments2', 3);
// var N = 3;

smartdown.setVariable('numFoxes',2);
var f = 2;

// get the number of triangles from smartdown cell
this.dependOn = ['numFoxes'];
this.depend = function() {
  board1.suspendUpdate();
  f = parseInt(env.numFoxes);
  board1.unsuspendUpdate();
};

```
Number of Foxes [](:-numFoxes/0/10/1) [](:!numFoxes) [Application Notes](::instructions1/tooltip/transparent)
Number of Divisions [](:-segments2/1/100/1) [](:!segments2) 

# :::: instructions1
Drag the red dot to the left and right to determine the distance that the car travels. 
# ::::

So far, all our examples are about the movement of an object through time, but all continuous functions have a rate of change that we will want to understand. 

This type of analysis applies to all continuous functions.  If we have a function $f(x)$


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
myDiv.innerHTML = `<div id='box3' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box3', {boundingbox:[-1.5,300,10,-40], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'1000s of widgets', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, 20]   // (in pixels)
      }
      });
var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
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
var graph_c = board0.create('functiongraph', [c,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var mc = function(x) { return 6 * x * x - 36 * x + 60; }
var graph_mc = board0.create('functiongraph', [mc,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var cText = board0.create('text', [6,200, 'Cost Function'], {fontSize:18});
var mcText = board0.create('text', [6.5,125, 'Marginal Cost Function'], {fontSize:18});

var tinylines = board0.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:true}); 
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


var rectangles = board0.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:true});
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

smartdown.setVariable('segments2', 3);
var N = 3;

// get the number of triangles from smartdown cell
this.dependOn = ['segments2'];
this.depend = function() {
  board0.suspendUpdate();
  N = parseInt(env.segments2);
  board0.unsuspendUpdate();
};

```
Number of Divisions [](:-segments2/1/100/1) [](:!segments2) [Application Notes](::instructions1/tooltip/transparent)

# :::: instructions1
Drag the red dot to the left and right to determine the distance that the car travels. 
# ::::

[Result of an Infinte Process](:@CalculusPrimer/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/Home)

