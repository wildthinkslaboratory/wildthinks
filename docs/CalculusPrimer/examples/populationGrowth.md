#### Population Growth Curve

Here's a population growth curve.

.............................................................................................................................................................................................................................................................................................................................

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

