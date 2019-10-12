# Another Curvy Speed Question

New game.  A car is traveling in a straight line.  I give you a graph that describes the distance traveled by the car over time and you infer the speed of the car through time.

```p5js/autoplay
var div = this.div;
div.style.background = 'none';
div.style.width = '100%';
div.style.height = '10%';
div.style.padding = 0;
div.style.margin = 'auto';


let x = 0;  // set start position
let scale = 1 / 20;
smartdown.setVariable('play', false);

p5.setup = function() {
  p5.windowResized();
  img = p5.loadImage('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/9e01e8197b3bf685747ae134de3d75feb64ea6f4/car.png');
};

p5.windowResized = function() {
  p5.resizeCanvas(div.clientWidth, div.clientHeight);
};

p5.draw = function() {
  if (x <= div.clientWidth - (img.width * scale)) {
      p5.background('white');
      p5.image(img, x, div.clientHeight - img.height * scale, img.width * scale, img.height * scale);
      x += 20;
  }
  else {
    p5.noLoop();
  }
};

this.dependOn = ['play'];
this.depend = function() {
  if (env.play == true) {
      x = 0;
      smartdown.setVariable('play', false);
      p5.loop();
  }

};

```
[Again](:=play=true)

### The First Graph

How do we figure out the speed of the car from it's position graph?  If the car is traveling at a constant speed, we know that $distance = speed \cdot time$, so we have  
$$speed = \frac{distance}{time}$$ 



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
board0 = JXG.JSXGraph.initBoard('box0', {boundingbox:[-1,30,5,-5], keepaspectratio:false, axis:false});

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
      {name:'distance (m)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

 // parabala and it's derivative
var g = function(x) { return  5 * x; };
var graph_g = board0.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var gp = function(x) { return 5; }
var graph_gp = board0.create('functiongraph', [gp,0,5], {strokeColor:'#0077FF', strokeWidth:2, visible:false});
var x = board0.create('glider', [1, 0, xaxis], {name: 't', size:6});
var gx = board0.create('point', [
    function() { return x.X(); },
    function() { return g(x.X()); } 
  ], {name:'', color:'blue', fixed:true});


var p1 = board0.create('point', [1,5], {name:'',visible:false, fixed:true, color:'orange'});
var p2 = board0.create('point', [2,5], {name:'',visible:false, fixed:true, color:'orange'});
var p3 = board0.create('point', [3,5], {name:'',visible:false, fixed:true, color:'orange'});

smartdown.setVariable('s11', '');
smartdown.setVariable('s12', '');
smartdown.setVariable('s13', '');

this.dependOn = ['s11','s12','s13'];
this.depend = function() {
    if (env.s11 == 5) {
      p1.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s12 == 5) {
      p2.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s13 == 5) {
      p3.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s11 == 5 && env.s12 == 5 && env.s13 == 5) {
      graph_gp.setAttribute({visible:true});
    }
};

```
[Application Notes](::instructions1/tooltip/transparent)

# :::: instructions1
Drag the red dot to the left and right.  You can see the coordinates of a point by mousing over the point.
# ::::

Find the speed of the car at the given times.
Speed at time 1 [](:?s11) m/s
Speed at time 2 [](:?s12) m/s
Speed at time 3 [](:?s13) m/s


### A Second Curvy Graph
This time our distance graph is curvy.  How can we find the speed at time $t=1$? We'll use the usual strategy, we'll approximate it with a straight line.  [Straight Line Approximation](:=start1=true) This tells us that between time $t=1$ and time $t=4$, the car travels at approximately 2.5 meters per second.

Let's do the usual thing again and improve our approximation. [Improve Approximation](:=improve=true) We see that the speed of the car between $t=1$ and time $t=2.5$ is approximately 1.75 meters per second.  

Make the approximation better.  See if you can approximate the speed the car is going at time $t=1$.


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
board1 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1,20,5,-5], keepaspectratio:false, axis:false});

var xaxis = board1.create('axis', [[0, 0], [1,0]], 
      {name:'time (s)', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board1.create('axis', [[0, 0], [0, 1]], 
      {name:'distance (m)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

 // parabala and it's derivative
var g = function(x) { return  x * x / 2; };
var graph_g = board1.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var gp = function(x) { return x; }
var graph_gp = board1.create('functiongraph', [gp,0,5], {strokeColor:'#0077FF', strokeWidth:2, visible:false});

// point x on axis we want to get derivative value
var x = board1.create('glider', [1, 0, xaxis], {name: 't', size:6, visible:false});

var gx = board1.create('point', [
    function() { return x.X(); },
    function() { return g(x.X()); } 
  ], {name:'', color:'blue', fixed:true, visible:false});

// the slider point for the secant
var x_h = board1.create('glider', [x.X() + 3, 0, xaxis], {name:'t + h', size:6, color:'green',visible:false} ); 
// sliding point on parabala 
var gx_h = board1.create('point', [
                function() { return x_h.X(); }, 
                function() { return g(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3, visible:false});

// secant line
var secant = board1.create('line', [gx, gx_h], {strokeColor:'#FF5522', visible:false});
var secantSlope = function() { 
  if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
  return ((g(x.X()) - g(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

// print the slope of the secant line
var slopeText = board1.create('text',[1,10,
  function(){ return 'Slope of Line = '+ secantSlope(); }], {fontSize:30, visible:false});


var p1 = board1.create('point', [1,1], {name:'',visible:false, fixed:true, color:'orange'});
var p2 = board1.create('point', [2,2], {name:'',visible:false, fixed:true, color:'orange'});
var p3 = board1.create('point', [3,3], {name:'',visible:false, fixed:true, color:'orange'});

smartdown.setVariable('s21', '');
smartdown.setVariable('s22', '');
smartdown.setVariable('s23', '');
smartdown.setVariable('start1', false);
smartdown.setVariable('improve', false);

this.dependOn = ['s21','s22','s23','start1','improve'];
this.depend = function() {

    if (env.improve == true) {
      smartdown.setVariable('improve', false);
      x_h.setPositionDirectly(JXG.COORDS_BY_USER, [x.X() + (x_h.X() - x.X())/2,0]); 
      x_h.prepareUpdate().update(true).updateRenderer();
      gx_h.prepareUpdate().update(true).updateRenderer();
    }

    if (env.start1 == true) {
      secant.setAttribute({visible:true});
      x.setAttribute({visible:true});
      gx.setAttribute({visible:true});
      x_h.setAttribute({visible:true});
      gx_h.setAttribute({visible:true});
      slopeText.setAttribute({visible:true});      
    }
    if (env.s21 == 1) {
      p1.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s22 == 2) {
      p2.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s23 == 3) {
      p3.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s21 == 1 && env.s22 == 2 && env.s23 == 3) {
      graph_gp.setAttribute({visible:true});
      secant.setAttribute({visible:false});
      x.setAttribute({visible:false});
      gx.setAttribute({visible:false});
      x_h.setAttribute({visible:false});
      gx_h.setAttribute({visible:false});
      slopeText.setAttribute({visible:false});
    }
};
```
[Straight Line Approximation](:=start1=true) [Improve Approximation](:=improve=true) [Application Notes](::instructions2/tooltip/transparent)

# :::: instructions2
Drag the red and green dots to the left and right. 
# ::::

Find the speed of the car at these times.
Speed at time 1 [](:?s21) m/s
Speed at time 2 [](:?s22) m/s
Speed at time 3 [](:?s23) m/s


### A Third Graph

New distance curve, but same idea.  Approximate the speed at the given times.

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
board2 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-1,50,5,-4], keepaspectratio:false, axis:false});

var xaxis = board2.create('axis', [[0, 0], [1,0]], 
      {name:'time (s)', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'distance (m)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   


 // parabala and it's derivative
var g = function(x) { return  x * x * x / 3; };
var graph_g = board2.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var gp = function(x) { return x * x; }
var graph_gp = board2.create('functiongraph', [gp,0,5], {strokeColor:'#0077FF', strokeWidth:2, visible:false});

// point x on axis we want to get derivative value
var x = board2.create('glider', [1, 0, xaxis], {name: 't', size:6, visible:false});

var gx = board2.create('point', [
    function() { return x.X(); },
    function() { return g(x.X()); } 
  ], {name:'', color:'blue', fixed:true, visible:false});

// the slider point for the secant
var x_h = board2.create('glider', [x.X() + 3, 0, xaxis], {name:'t + h', size:6, color:'green',visible:false} ); 
// sliding point on parabala 
var gx_h = board2.create('point', [
                function() { return x_h.X(); }, 
                function() { return g(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3, visible:false});

// secant line
var secant = board2.create('line', [gx, gx_h], {strokeColor:'#FF5522', visible:false});
var secantSlope = function() { 
  if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
  return ((g(x.X()) - g(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

// print the slope of the secant line
var slopeText = board2.create('text',[1,25,
  function(){ return 'Slope of Line = '+ secantSlope(); }], {fontSize:30, visible:false});


var p1 = board2.create('point', [1,1], {name:'',visible:false, fixed:true, color:'orange'});
var p2 = board2.create('point', [2,4], {name:'',visible:false, fixed:true, color:'orange'});
var p3 = board2.create('point', [3,9], {name:'',visible:false, fixed:true, color:'orange'});

smartdown.setVariable('s31', '');
smartdown.setVariable('s32', '');
smartdown.setVariable('s33', '');
smartdown.setVariable('start2', false);
smartdown.setVariable('improve2', false);

this.dependOn = ['s31','s32','s33','start2', 'improve2'];
this.depend = function() {

    if (env.improve2 == true) {
      smartdown.setVariable('improve2', false);
      x_h.setPositionDirectly(JXG.COORDS_BY_USER, [x.X() + (x_h.X() - x.X())/2,0]); 
      x_h.prepareUpdate().update(true).updateRenderer();
      gx_h.prepareUpdate().update(true).updateRenderer();
    }

    if (env.start2 == true) {
      secant.setAttribute({visible:true});
      x.setAttribute({visible:true});
      gx.setAttribute({visible:true});
      x_h.setAttribute({visible:true});
      gx_h.setAttribute({visible:true});
      slopeText.setAttribute({visible:true});      
    }

    if (env.s31 == 1) {
      p1.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s32 == 4) {
      p2.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s33 == 9) {
      p3.setAttribute({visible:true});
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.s31 == 1 && env.s32 == 4 && env.s33 == 9) {
      graph_gp.setAttribute({visible:true});
      secant.setAttribute({visible:false});
      x.setAttribute({visible:false});
      gx.setAttribute({visible:false});
      x_h.setAttribute({visible:false});
      gx_h.setAttribute({visible:false});
      slopeText.setAttribute({visible:false});
    }
};

```
[Straight Line Approximation](:=start2=true) [Improve Approximation](:=improve2=true) [Application Notes](::instructions2/tooltip/transparent)

Find the speed of the car at these times.
Speed at time 1 [](:?s31) m/s
Speed at time 2 [](:?s32) m/s
Speed at time 3 [](:?s33) m/s

# --aliceblue ct
## Concluding Thoughts

1. We continue to solve curvy problems with tiny straight line solutions.

2. Did anyone notice that the speed graphs we computed here look familiar?  These are the exact same speed graphs we used in our [first curvy speed](:@CalculusPrimer/speed) problem.  The area under the speed curve told us the car's distance.  Now, the slope of a line on the distance curve gives us back the car's speed. This interesting connection between [slopes and areas](:@CalculusPrimer/ftc1) is what we'll think about next.

# --aliceblue

### Coming Up Next

[What's the Connection Between Slopes and Areas?](:@CalculusPrimer/ftc1)
[Back to Home Page](:@CalculusPrimer/Home)



# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::

