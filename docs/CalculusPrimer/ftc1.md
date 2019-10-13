## Putting the Pieces Together

We can use slopes on a distance curve to give us a rate curve.  We can use areas under a rate curve to generate a distance curve.  These two processes seem to be inverses of each other, like addition and subtraction or multiplication and division.  But why?  

The connection is in the simple formula $d = r \cdot t$. Distance is equal to rate times time [d = r * t](:=speedToggle=true).  If we have the rate and the time, then finding the distance is always going to be an area problem.

If instead we have the distance and the time and we want to find the rate, then we write this formula as $r = \frac{d}{t}$.  Speed is the ratio of the distance to the time. [r = d / t](:=distanceToggle=true) Finding the speed in terms of distance and time is a slope problem.  

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
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-2,7,10,-1], keepaspectratio:true, axis:false});

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
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

var speed = 1;
smartdown.setVariable('Speed', 1);
smartdown.setVariable('distanceToggle', false);
smartdown.setVariable('speedToggle', false);

 
var d = function(t) { return speed * t; };
var d_graph = board0.create('functiongraph', [d,-60,60], {strokeColor:'#DDDDDD', strokeWidth:2});
var s = function(x) { return speed; }
var s_graph = board0.create('functiongraph', [s,-60,60], {strokeColor:'#DDDDDD', strokeWidth:2});


var t1 = board0.create('glider', [2, 0, xaxis], {name: '', size:5});
var t2 = board0.create('glider', [4, 0, xaxis], {name: '', size:5, color:'green'});

var d1 = board0.create('point', [
    function() { return t1.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var d2 = board0.create('point', [
    function() { return t2.X(); },
    function() { return d(t2.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var dline = board0.create('line', [d1, d2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

var d3 = board0.create('point', [
    function() { return t2.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var drise = board0.create('line', [d3, d2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
var drun = board0.create('line', [d1, d3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

var driseText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.2; } 
         return t2.X() - 0.3; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'd'], {fontSize:12, visible:false});

var drunText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { if (t2.X() > t1.X()) { return d(t1.X()) - 0.1;} 
                return d(t1.X()) + 0.3; },
  't'], {fontSize:12, visible:false});

var dslopeText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t1.X() + (t2.X() - t1.X())/2 - 1.2; } 
         return t1.X() + (t2.X() - t1.X())/2 + 0.2; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'slope = s'], {fontSize:12, visible:false});

var distanceOn = false;
var turnOffDistance = function() {
  d1.setAttribute({visible:false});
  d2.setAttribute({visible:false});
  dline.setAttribute({visible:false});
  drise.setAttribute({visible:false});
  driseText.setAttribute({visible:false});
  drun.setAttribute({visible:false});
  drunText.setAttribute({visible:false});
  dslopeText.setAttribute({visible:false});
}

var turnOnDistance = function() {
  d1.setAttribute({visible:true});
  d2.setAttribute({visible:true});
  dline.setAttribute({visible:true});
  drise.setAttribute({visible:true});
  driseText.setAttribute({visible:true});
  drun.setAttribute({visible:true});
  drunText.setAttribute({visible:true});
  dslopeText.setAttribute({visible:true});
}

var s1 = board0.create('point', [
    function() { return t1.X(); },
    s 
  ], {name:'', fixed:true, visible:false});

var s2 = board0.create('point', [
    function() { return t2.X(); },
    s
  ], {name:'', fixed:true, visible:false});

var srect = board0.create('polygon',[t1,s1,s2,t2],{fillColor:'#7700FF',visible:false});

var slengthText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { return speed + 0.3; },
  't'], {fontSize:12, visible:false});

var sheightText = board0.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.2; } 
                  return t2.X() - 0.3; },
  function() { return speed/2; },
  's'], {fontSize:12, visible:false});

var sareaText = board0.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { return speed/2 + 0.2; },
  'd'], {fontSize:12, visible:false});

var speedOn = false;
var turnOffSpeed = function() {
  srect.setAttribute({visible:false});
  slengthText.setAttribute({visible:false});
  sheightText.setAttribute({visible:false});
  sareaText.setAttribute({visible:false});
}

var turnOnSpeed = function() {
  srect.setAttribute({visible:true});
  slengthText.setAttribute({visible:true});
  sheightText.setAttribute({visible:true});
  sareaText.setAttribute({visible:true});
}

this.dependOn = ['Speed','distanceToggle','speedToggle'];
this.depend = function() {
  if (env.distanceToggle == true) {
    if (distanceOn) { 
      turnOffDistance();
      distanceOn = false;
    }
    else {
      turnOnDistance();
      distanceOn = true;
    }
    smartdown.setVariable('distanceToggle',false);
  }
    
  if (env.speedToggle == true) {
    if (speedOn) { 
      turnOffSpeed();
      speedOn = false;
    }
    else {
      turnOnSpeed();
      speedOn = true;
    }
    smartdown.setVariable('speedToggle',false);
  }

  board0.suspendUpdate();
  speed = parseFloat(env.Speed);
  board0.unsuspendUpdate();
};

````
[r = d / t](:=distanceToggle=true) [d = r * t](:=speedToggle=true) Rate [](:-Speed/0/3/0.1) [](:!Speed)
[Application Notes](::instructions1/tooltip,transparent)

# :::: instructions1
- Drag the red and green dots to the left and the right to adjust the time period. 
- Click the buttons!
- Use the slider to adjust the speed.
# ::::

## Slopes and Areas on Curvy Graphs

Imagine that **Curve A** describes the movement of an object through time.  We know that the rate during different time periods can be approximated by the slopes of straight lines. [r = d / t](:=distanceToggle2=true) For each of these time periods, we can also draw a corresponding rate times time rectangle [d = r * t](:=speedToggle2=true). The height of these rectangles approximate **Curve B**, the rate curve.  Making our time periods smaller will improve our approximation. 
Number of Time Periods [](:-segments/1/100/1) [](:!segments) 

We could reverse this process and use rectangles under **Curve B** to generate the line segments of **Curve A**.


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
board1 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-4,16,4,-4], keepaspectratio:false, axis:false});

var xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   


 
var d = function(t) { return Math.pow(t,4)/8 - 2 * t * t + 12; };
var d_graph = board1.create('functiongraph', [d,-6,6], {strokeColor:'#DDDDDD', strokeWidth:2});
var dText = board1.create('text', [-3.5,7, 'Curve A']);
var s = function(t) { return 4 * Math.pow(t,3)/8 - 4 * t; }
var s_graph = board1.create('functiongraph', [s,-6,6], {strokeColor:'#DDDDDD', strokeWidth:2});
var sText = board1.create('text', [-3.5,-2, 'Curve B']);

var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
tinylines.updateDataArray = function() { 

    let delta = 8/N;
    let x = [];
    let y = [];
    for (let i=-4; i <= 4.01; i += delta) {
        x.push(i);
        y.push(d(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
rectangles.updateDataArray = function() {

    let delta = 8/N;
    let x = [-4];
    let y = [0];
    for (let i=-4; i < 4; i += delta) {
        let slope = (d(i + delta) - d(i)) / delta ;
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

var turnOffDistance = function() {
  tinylines.setAttribute({visible:false})
}

var turnOnDistance = function() {
  tinylines.setAttribute({visible:true})
}

var turnOffSpeed = function() {
  rectangles.setAttribute({visible:false});
}

var turnOnSpeed = function() {
  rectangles.setAttribute({visible:true});
}

smartdown.setVariable('segments', 4);
var N = 4;
smartdown.setVariable('distanceToggle2', false);
smartdown.setVariable('speedToggle2', false);
var speedOn = false;
var distanceOn = false;

// get the number of triangles from smartdown cell
this.dependOn = ['segments','distanceToggle2','speedToggle2'];
this.depend = function() {
  if (env.distanceToggle2 == true) {
    if (distanceOn) { 
      turnOffDistance();
      distanceOn = false;
    }
    else {
      turnOnDistance();
      distanceOn = true;
    }
    smartdown.setVariable('distanceToggle2',false);
  }
    
  if (env.speedToggle2 == true) {
    if (speedOn) { 
      turnOffSpeed();
      speedOn = false;
    }
    else {
      turnOnSpeed();
      speedOn = true;
    }
    smartdown.setVariable('speedToggle2',false);
  }

  board1.suspendUpdate();
  N = parseInt(env.segments);
  board1.unsuspendUpdate();
};


```
[r = d / t](:=distanceToggle2=true) [d = r * t](:=speedToggle2=true) Number of Divisions [](:-segments/1/100/1) [](:!segments) 
[Application Notes](::instructions2/tooltip/transparent)
[Note](::note/tooltip,transparent) 

# :::: instructions2
Drag the slider to the left and the right.
# ::::

# :::: note
The aspect ration on this graph is not true for better viewing. 
# ::::

## It's Not Just About Distance, Speed and Time

So far, all our examples are about the movement of an object through time, but all continuous functions have a rate of change that we will want to understand. 

For example, here we have a function that describes the cost of making widgets in terms of the number of widgets we make.  What's the cost of producing one more widget?  It depends on how many widgets you've made.  To understand the cost function, we can look at the **marginal cost** function which tells us the rate at which the cost function is changing.  In stead of distance equals rate times time we have 

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
board2 = JXG.JSXGraph.initBoard('box3', {boundingbox:[-1.5,300,10,-40], keepaspectratio:false, axis:false});

var xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'1000s of widgets', 
      withLabel: true,
      label: {
        fontSize: 15,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, 20]   // (in pixels)
      }
      });
var yaxis = board2.create('axis', [[0, 0], [0, 1]], 
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
var graph_c = board2.create('functiongraph', [c,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var mc = function(x) { return 6 * x * x - 36 * x + 60; }
var graph_mc = board2.create('functiongraph', [mc,0,10], {strokeColor:'#DDDFFF', strokeWidth:2});

var cText = board2.create('text', [6,200, 'Cost Function'], {fontSize:18});
var mcText = board2.create('text', [6.5,125, 'Marginal Cost Function'], {fontSize:18});

var tinylines = board2.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:true}); 
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


var rectangles = board2.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:true});
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
  board2.suspendUpdate();
  N = parseInt(env.segments2);
  board2.unsuspendUpdate();
};

```
Number of Divisions [](:-segments2/1/100/1) [](:!segments2) [Application Notes](::instructions1/tooltip/transparent)

# :::: instructions1
Drag the red dot to the left and right to determine the distance that the car travels. 
# ::::


# --aliceblue ct
## Concluding Thoughts

1. Slopes and areas are inverses of each other.  

2. We can see this in simple distance equals rate times time problems and we can see it in the tiny straight line approach we use to solve curvy problems.

3. There are many examples of problems that can be solved with slopes and areas. We can apply this type of analysis any time we want to understand how a function is changing.

# --aliceblue

### Coming Up Next

[Result of an Infinte Process](:@CalculusPrimer/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/Home)


