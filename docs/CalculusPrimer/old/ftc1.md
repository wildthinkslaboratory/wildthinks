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
  'slope = r'], {fontSize:12, visible:false});

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
  'r'], {fontSize:12, visible:false});

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

It's strangely a lot to take in when you think about it.  It's easy to see that the value of $t$ is the same in both cases.  So are the values of $r$, even though in one case $r$ is a slope and the other $r$ is a vertical length.  The values of $d$ are also the same.  In one case $d$ is a vertical height and the other its a two dimensional area.  It's just two ways to write the same equation.


## Slopes and Areas on Curvy Graphs

Imagine that **Curve A** describes the position of an object through time. It's a distance function.  Imagine we pick two points on the curve. [r = d / t](:=distanceToggle2=true) The slope of the line through these points tells us the average speed traveled during that time period.  There is always a corresponding rectangle that expresses the distance traveled as the product of the rate and the time. [d = r * t](:=speedToggle2=true)

We can do this for multiple time periods. [multiple periods](:=toggleArray=true)
We can make the time periods smaller. [10 time periods](:=segments=10)

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
board1 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-1,16,8,-4], keepaspectratio:false, axis:false});

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


 
var d = function(t) { return Math.pow(t-4,4)/8 - 2 * (t-4) * (t-4) + 12; };
var d_graph = board1.create('functiongraph', [d,0,8], {strokeColor:'#DDDDDD', strokeWidth:2});
var dText = board1.create('text', [1.5,7, 'Curve A']);
var s = function(t) { return 4 * Math.pow(t-4,3)/8 - 4 * (t-4); }
var s_graph = board1.create('functiongraph', [s,0,8], {strokeColor:'purple', strokeWidth:4, visible:false});
var sText = board1.create('text', [1.5,-2, 'Curve B'],{visible:false});

var tinylines = board1.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
tinylines.updateDataArray = function() { 

    let delta = 8/N;
    let x = [];
    let y = [];
    for (let i=0; i <= 8.01; i += delta) {
        x.push(i);
        y.push(d(i));
    }
    this.dataX = x;
    this.dataY = y;
};


var rectangles = board1.create('curve', [[0],[0]],{fillColor:'#7700FF', fillOpacity:0.3, visible:false});
rectangles.updateDataArray = function() {

    let delta = 8/N;
    let x = [0];
    let y = [0];
    for (let i=0; i < 8; i += delta) {
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

var t1 = board1.create('point', [2, 0], {name: '', size:3, color:'blue', visible:false});
var t2 = board1.create('point', [4, 0], {name: '', size:3, color:'blue', visible:false});

var d1 = board1.create('point', [
    function() { return t1.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var d2 = board1.create('point', [
    function() { return t2.X(); },
    function() { return d(t2.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var dline = board1.create('line', [d1, d2], {strokeColor:'blue', straightFirst:false, straightLast:false, visible:false});

var d3 = board1.create('point', [
    function() { return t2.X(); },
    function() { return d(t1.X()); } 
  ], {name:'', color:'blue', fixed:true, size:2, visible:false});

var drise = board1.create('line', [d3, d2], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});
var drun = board1.create('line', [d1, d3], {strokeColor:'black', dash:2, straightFirst:false, straightLast:false, visible:false});

var driseText = board1.create('text', [
  function() { if (t2.X() > t1.X()) { return t2.X() + 0.1; } 
         return t2.X() - 0.3; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'd'], {fontSize:12, visible:false});

var drunText = board1.create('text', [
  function() { return t1.X() + (t2.X() - t1.X())/2; },
  function() { if (t2.X() > t1.X()) { return d(t1.X()) - 0.5;} 
                return d(t1.X()) + 0.10; },
  't'], {fontSize:12, visible:false});

var dslopeText = board1.create('text', [
  function() { if (t2.X() > t1.X()) { return t1.X() + (t2.X() - t1.X())/2 - 0.5; } 
         return t1.X() + (t2.X() - t1.X())/2 + 0.2; },
  function() { return (d(t2.X()) - d(t1.X()))/2 + d(t1.X()); },
  'slope = r'], {fontSize:12, visible:false});

var slope = (d(t2.X()) - d(t1.X())) / (t2.X() - t1.X());
var s1 = board1.create('point', [t1.X(), slope], {name:'', fixed:true, visible:false});

var s2 = board1.create('point', [t2.X(), slope], {name:'', fixed:true, visible:false});

var srect = board1.create('polygon',[t1,s1,s2,t2],{fillColor:'#7700FF',visible:false});

var slengthText = board1.create('text', [t1.X() + (t2.X() - t1.X())/2, slope + 0.8, 't'], {fontSize:12, visible:false});

var sheightText = board1.create('text', [t2.X() + 0.1, slope/2, 'r'], {fontSize:12, visible:false});

var sareaText = board1.create('text', [ t1.X() + (t2.X() - t1.X())/2,  slope/2 + 0.2, 'd'], {fontSize:12, visible:false});


smartdown.setVariable('segments', 3);
var N = 3;
var oldN = 3;
smartdown.setVariable('distanceToggle2', false);
smartdown.setVariable('speedToggle2', false);
smartdown.setVariable('toggleArray', false);
smartdown.setVariable('toggleCurveB', false);
var speedOn = false;
var distanceOn = false;


// get the number of triangles from smartdown cell
this.dependOn = ['segments','distanceToggle2','speedToggle2', 'toggleArray', 'toggleCurveB'];
this.depend = function() {

  board1.suspendUpdate();

  if (env.distanceToggle2 == true && env.toggleArray == false) {
    d1.setAttribute({visible:true});
    d2.setAttribute({visible:true});
    drise.setAttribute({visible:true});
    drun.setAttribute({visible:true});
    dline.setAttribute({visible:true});
    driseText.setAttribute({visible:true});
    drunText.setAttribute({visible:true});
    dslopeText.setAttribute({visible:true});
  }
  
  if (env.speedToggle2 == true && env.toggleArray == false) {
    smartdown.setVariable('segments', 4);
  }

  if (env.toggleArray == true) {
    tinylines.setAttribute({visible:true});
    rectangles.setAttribute({visible:true});
    d1.setAttribute({visible:false});
    d2.setAttribute({visible:false});
  }

  var P = parseInt(env.segments);
  if (P != N) {
    oldN = N;
    N = P;    
  }
  
  if (N == 4) {
    drise.setAttribute({visible:true});
    drun.setAttribute({visible:true});
    dline.setAttribute({visible:true});
    driseText.setAttribute({visible:true});
    drunText.setAttribute({visible:true});
    dslopeText.setAttribute({visible:true});
    srect.setAttribute({visible:true});
    slengthText.setAttribute({visible:true});
    sheightText.setAttribute({visible:true});
    sareaText.setAttribute({visible:true});
  }
  else {
    if (oldN == 4) {
      drise.setAttribute({visible:false});
      drun.setAttribute({visible:false});
      dline.setAttribute({visible:false});
      driseText.setAttribute({visible:false});
      drunText.setAttribute({visible:false});
      dslopeText.setAttribute({visible:false});
      srect.setAttribute({visible:false});
      slengthText.setAttribute({visible:false});
      sheightText.setAttribute({visible:false});
      sareaText.setAttribute({visible:false});
    }
  }

  if (env.toggleCurveB == true) {
    s_graph.setAttribute({visible:true});
    sText.setAttribute({visible:true});
  }

  board1.unsuspendUpdate();
};


```
Number of Divisions [](:-segments/1/100/1) [](:!segments) 
[Application Notes](::instructions2/tooltip/transparent)

# :::: instructions2
Drag the slider to the left and right.
# ::::

As the time periods get very small, the rectangles define a new function that relates to Curve A.  It's related by the function $d = r \cdot t$.  [show rectangle curve](:=toggleCurveB=true) This function gives the height of our rectangels, which is $r$ the rate at which the object is moving at a given time. It's our speed curve.

# --aliceblue ct
## Concluding Thoughts

1. Slopes and areas are inverses of each other.  

2. We can see this in simple distance equals rate times time problems and we can see it in the tiny straight line approach we use to solve curvy problems.

# --aliceblue

### Coming Up Next

[More Slopes and Areas](:@CalculusPrimer/ftc2)
[Back to Home Page](:@CalculusPrimer/Home)


