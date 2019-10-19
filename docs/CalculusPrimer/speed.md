# A Curvy Speed Question

Here's the game.  A car is traveling in a straight line.  I give you a graph that describes the speed of the car as it travels and you infer the position of the car through time.

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

The car is traveling at a constant speed of 5 meters per second. How far will the car go in 3 seconds? We know that the distance traveled by a moving object is equal to the [rate](::rate/tooltip,transparent) times the time.
$$distance = rate \cdot time$$ 
That means we can model the distance as the area of a rectangle where the length and height are the time and rate.

# :::: rate
I tend use the terms **rate** and **speed** interchangably. Rate is a more general term that measures how fast something is changing relative to something else.  Speed is more specific, measuring how fast an object's position is changing relative to time.
# ::::
```javascript /autoplay

const svgrect = 
`
<svg width="400" height="140">
  <text x="120" y="20" fill="black">time</text>
  <text x="115" y="90" fill="black">distance</text>
  <text x="315" y="90" fill="black">rate</text>
  <rect x="0" y="30" width="300" height="100" style="fill:blue;fill-opacity:0.4;stroke-width:3;stroke:rgb(0,0,0)" />
  Sorry, your browser does not support inline SVG.  
</svg>
`;

smartdown.setVariable('SVG1', svgrect);
```
[](:!SVG1|svg)

Here's a graph showing the car's speed.  The speed stays at a constang $5$ meters per second.
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
board0 = JXG.JSXGraph.initBoard('box0', {boundingbox:[-1,10,5,-1], keepaspectratio:false, axis:false});

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
      {name:'rate (m/s)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

 // parabala and it's derivative
var g = function(x) { return  5; };
var graph_g = board0.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var x = board0.create('glider', [0, 0, xaxis], {name: 't', size:6});

var p1 = board0.create('point',[0,0], {fixed:true, name: '',  visible:false});
var p2 = board0.create('point',[0,5], {fixed:true, name: '',  visible:false});
var p3 = board0.create('point',[function() { return x.X(); },0], {name: '',  visible:false});
var p4 = board0.create('point',[function() { return x.X(); },5], {name: '', color:'blue'});
var rect = board0.create('polygon',[p1,p2,p4,p3],{fillColor:'#7700FF'});

var Area = function() { return (5 * x.X()).toFixed(2); }
var areaText = board0.create('text', [ 
  function() { return x.X()/2 - 0.1; },
  2.25, 
  function(){ return Area(); }], 
  {fontSize:20});

var timeText = board0.create('text', [
  function() { return x.X()/2 - 0.1; } ,5.5, 'time'], {fontSize:15});

var rateText = board0.create('text', [
  function() { return x.X() + 0.1; } ,2.5, 'rate'], {fontSize:15});

```
[Application Notes](::instructions1/tooltip/transparent)

# :::: instructions1
Drag the red dot to the left and right to determine the distance that the car travels. 
# ::::

After $3$ seconds, the car will have traveled [[](:!distance)](::pulldown2/tooltip).

# :::: pulldown2
[](:Xa4) 5 meters
[](:Xa5) 10 meters
[](:Xa6) 15 meters
# ::::

```javascript/autoplay
smartdown.setVariable('a4', false);
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
smartdown.setVariable('distance', '________');

this.dependOn = ['a4', 'a5', 'a6'];

this.depend = function() {
  if (env.a4 == false && env.a5 == false && env.a6 == true) {
      smartdown.setVariable('distance', '15 meters');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```

### The Second Graph

The car starts moving at time $t=0$ and gradually increases it's speed. We want to know the distance the car has traveled at time $t=4$.  We'd like to use a rectangle to model the distance in terms of rate and time again, but now the rate changes throughout the time period.  What value could we use for the height of the rectangle?

It's easy to see that the average rate during this period is 2 meters per second so we could let that be the height of the rectangle. [Use average rate](:=useaverage=true) 

Another approach is to calculate the area of the shape formed under the graph from time $t=0$ to time $t=4$.  This shape is a triangle so the area will be half the base times the height.  [Use area under the curve](:=usecurve=true)

Try both approaches.  Do they produce the same answer?

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px;'>`;

smartdown.setVariable('useaverage', false);
smartdown.setVariable('usecurve', false);

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board1 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1,10,5,-1], keepaspectratio:false, axis:false});

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
      {name:'rate (m/s)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

 // parabala and it's derivative
var g = function(x) { return  x; };
var graph_g = board1.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});

var averageSpeedArea = board1.create('riemannsum',[g,1, 'middle',0,4], {strokeColor: 'blue', fillColor:'blue', fillOpacity:0.5, visible:false});

var p1 = board1.create('point', [0,0], {visible:false});
var p2 = board1.create('point', [4,4], {visible:false});
var p3 = board1.create('point', [4,0], {visible:false});
var triangle = board1.create('polygon',[p1,p2,p3],{fillColor:'#7700FF', visible:false});

var areaText1 = board1.create('text', [1.9,1.3,'8'], {fontSize:20, visible:false});
var areaText2 = board1.create('text', [2.5,1.3,'8'], {fontSize:20, visible:false});

this.dependOn = ['useaverage', 'usecurve'];
this.depend = function() {
  if (env.useaverage == true) {
    smartdown.setVariable('useaverage', false);
    averageSpeedArea.setAttribute({visible:true});
    areaText1.setAttribute({visible:true});

    triangle.setAttribute({visible:false});
    areaText2.setAttribute({visible:false});
  }
  if (env.usecurve == true) {
    smartdown.setVariable('usecurve', false);
    averageSpeedArea.setAttribute({visible:false});
    areaText1.setAttribute({visible:false});

    triangle.setAttribute({visible:true});
    areaText2.setAttribute({visible:true});
  }

};
```
[Use average speed](:=useaverage=true) [Use area under the curve](:=usecurve=true)

After $4$ seconds, the car will have traveled [[](:!distance2)](::pulldown1/tooltip).

# :::: pulldown1
[](:Xa1) 8 meters
[](:Xa2) 9 meters
[](:Xa3) 12 meters
# ::::

```javascript/autoplay
smartdown.setVariable('a1', false);
smartdown.setVariable('a2', false);
smartdown.setVariable('a3', false);
smartdown.setVariable('distance2', '________');

this.dependOn = ['a1', 'a2', 'a3'];

this.depend = function() {
  if (env.a1 == true && env.a2 == false && env.a3 == false) {
      smartdown.setVariable('distance2', '8 meters');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```
### A Third Curvy Graph


How far has the car traveled after $4$ seconds?  The rate changes throughout our time period and it's not obvious what the average rate is.  How can we figure out the distance at time $t=4$?

We'll approximate it with a rectangle.  We'll use the speed at time $t=2$ as the height of the rectangle since that is right in the middle of our time period. [1 Rectangle](:=N=1) That gives us a distance of about 16 meters.

How can we make our approximation more accurate?  How about dividing our time period in two and making two separate approximations and adding them together. [2 Rectangles](:=N=2) This estimates the distance at about 20 meters.

Why stop at 2 when we can add more rectangles? [10 Rectangles?](:=N=10) Each rectangle is an estimate of the distance traveled  over a very small time interval.  

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
board2 = JXG.JSXGraph.initBoard('box2', {boundingbox:[-1,25,5,-4], keepaspectratio:false, axis:false});

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
      {name:'speed (m/s)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

smartdown.setVariable('N', 0);
var N = 0;

 // parabala and it's derivative
var g = function(x) { return  x * x; };
var graph_g = board2.create('functiongraph', [g,0,5], {strokeColor:'#7700FF', strokeWidth:2});
var nfun = function() { return N; }
var area = board2.create('riemannsum',[g,nfun, 'middle',0,4],
  {strokeColor: 'blue', fillColor:'blue', fillOpacity:0.5});

var areaText = board2.create('text',
  [0.5,10, function(){ return 'Area of rectangle(s) = ' + area.Value().toFixed(3); }], 
  {fontSize:20});

// get the number of divisions
this.dependOn = ['N'];
this.depend = function() {
    board2.suspendUpdate();
    N = parseInt(env.N);
    board2.unsuspendUpdate();
};

```
Number of Rectangles [](:-N/0/100/1) [](:!N) [Application Notes](::instructions/tooltip/transparent)
# :::: instructions
- Drag the slider to the left and the right. 
# ::::

After $4$ seconds, the car will have traveled [[](:!distance3)](::pulldown3/tooltip).

# :::: pulldown3
[](:Xa7) 8 meters
[](:Xa8) 21 meters
[](:Xa9) 21 and 1/3 meters
# ::::

```javascript/autoplay
smartdown.setVariable('a7', false);
smartdown.setVariable('a8', false);
smartdown.setVariable('a9', false);
smartdown.setVariable('distance3', '________');

this.dependOn = ['a7', 'a8', 'a9'];

this.depend = function() {
  if (env.a7 == false && env.a8 == false && env.a9 == true) {
      smartdown.setVariable('distance3', '21 and 1/3 meters');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```
# --aliceblue ct
## Concluding Thoughts

Once again we solved a curvy problem by glueing together lots of small straight line solutions! 

We should note that the computer continues to do a great job of adding up the area of lots of rectangles for us. We probably wouldn't enjoy doing it ourselves with pen and paper.  Calculus will give us an easy way to compute these areas with pen and paper.  It's coming.  Wait for it.

# --aliceblue

### Coming Up Next

[Another Curvy Speed Question](:@CalculusPrimer/distance)
[Back to Home Page](:@CalculusPrimer/Home)



# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::

