### Adjustable Secant Line Class

# --outlinebox
**Definition 1**
A **secant line** of a graph $y=f(x)$ is any line that intersects the graph in at least two distinct points.
# --outlinebox

An adjustable secant line  can be added to a function $y = f(x)$.  The $x$ interval on the $x$ axis can be adjusted by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The slope of the secant line is shown on mouseover.

----


```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js


smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,5,5,-5], keepaspectratio:false, axis:true});

var c = function(x) { return 2; }
var l = function(x) { return x; }
var p = function(x) { return x * x * x / 25; };
var c_graph = board0.create('functiongraph', [c,-5,5], {strokeColor:'#777777', visible:false});
var l_graph = board0.create('functiongraph', [l,-5,5], {strokeColor:'#777777', visible:true});
var p_graph = board0.create('functiongraph', [p,-5,5], {strokeColor:'#777777', visible:false});


var s1 = new calclib.AdjSecantRect(board0, -3, -2, l, {}, true);
var s2 = new calclib.AdjSecantRect(board0, -2, -1, l, {}, true);
var s3 = new calclib.AdjSecantRect(board0, -1, 0, l, {}, true);
var s4 = new calclib.AdjSecantRect(board0, 0, 1, l, {}, true);
var s5 = new calclib.AdjSecantRect(board0, 1, 2, l, {}, true);
var s6 = new calclib.AdjSecantRect(board0, 2, 3, l, {}, true);



````