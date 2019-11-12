

## Tangent Lines

What is a tangent line?  We'll start with an informal definition.  If you have a curvy graph, a tangent line touches the graph at just one single spot.  Here are a couple of examples.

```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x; };
var graph_f = board.create('functiongraph', [f,-5,5]);
var pt = board.create('point',[1,1], {name:''});
var line = board.create('line', [[1,1], [2,3]], {strokeColor:'red'});

 
```
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box5' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box5', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x; };
var circle = board.create('circle', [[0,0],2]);

var pt = board.create('point',[0,-2], {name:''});
var line = board.create('line', [[0,-2], [1,-2]], {strokeColor:'red'});

 
```
---
# --outlinebox tangents
If you have curvy functions, then you need tangent lines.
# --outlinebox

It's hard to overstate how useful tangent lines are. They are needed in every scientific field.  Just about every modern technology relies in some way or another on tangent lines.  When you drive over a bridge you benefit from tangent lines.  When you use your smart phone or go to the doctor or buy countless products throughout your life you benefit from tangent lines. I'm just going to show you three examples where tangent lines are useful.  

## Example 1: Instantaneous Rate of Change
You're having a water balloon fight.  You're standing on top of a 30 foot building.  You see your friend standing directly below you.  He is 5 feet tall.  You consider dropping a water balloon on him.  What speed will the water balloon be going when it hits his head?  It's easy to figure out the speed of an object when it moves at a constant speed, but the speed of our water balloon is always changing.  
  
# :::: instructions
In addition to running the animation with the **start** and **reset** buttons, the red dot on the  time $t$ axis can be dragged to the left or right.  
To set the height of the balloon, enter a value in the height box and hit the 'Set Height' button.
# ::::

[Set Start Height](:?startHeight)
[start](:=toss1=true) [reset](:=reset1=true) [Set Height](:=setHeight=true) [](:?height) [Application Notes](::instructions/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('toss1', false);
smartdown.setVariable('setHeight', false);
smartdown.setVariable('reset1', false);
smartdown.setVariable('startHeight', 30);

var startHeight = 30;
// create the board
JXG.Options.text.display = 'internal';
board = JXG.JSXGraph.initBoard('box2', {boundingbox:[-5,40,10,-5], keepaspectratio:false, axis:true});
window.board = board;

// create the labels for axis
var xAxisLabel = board.create('text',[0.2,-2,'Time'], {fontSize:16});
//var yAxisLabel = board.create('text',[0.5,0.5,'Height of Ball'], {fontSize:16});
// var textRot = board.create('transform', [Math.PI/2, 0,0], {type:'rotate'}); 
// textRot.bindTo(yAxisLabel);
//board.update();
var xArrow = board.create('line',[[0.7,-2],[2,-2]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});
var friend = board.create('line',[[-3,0],[-3,5]],
  {straightFirst:false, straightLast:false, strokeWidth:8, color:'black'});

// parabala and it's derivative
let f = function(x) { return  -9.81*x*x + startHeight; };
let f_inv = function(x) { return Math.sqrt((x-startHeight)/(-9.81)); };
let df = function(x) { return -19.62*x; }
let graph_f = board.create('functiongraph', [f,0,5]);

// point on x axis
var x = board.create('glider', [0, 0, board.defaultAxes.x], {name: 't', size:6});
smartdown.setVariable('height', f(x.X()));

// point on parabala
var fx = board.create('point', [
                function() { return x.X(); }, 
                function() { return f(x.X()); }
          ], {name: '', color: 'blue', fixed: true, size:3});

// invisible point we need because it takes two points to make the tangent line
var fx2 = board.create('point', [
                function() { return x.X() + 1; }, 
                function() { return f(x.X()) + df(x.X()); }
          ], {visible:false});

// tangent line
var line = board.create('line',[fx, fx2],{strokeColor:'#FF5522'});


// text displaying current height of the water balloon
var fText = board.create('text',[3,25,function(){ return 'Height of Balloon = '+ f(x.X()).toFixed(2); }], {fontSize:30});

// text displaying current slope of tangent line
var slopeText = board.create('text',[3,20,function(){ return 'Slope of Tangent Line = '+ df(x.X()).toFixed(2); }], {fontSize:30});

// text displaying current slope of tangent line
var speedText = board.create('text',[3,15,function(){ return 'Speed (ft/sec) = '+ df(x.X()).toFixed(2); }], {fontSize:30});


// ball that is tossed
var ballPoint = board.create('point', 
  [-3, function() { return f(x.X());}], 
  {name: 'Balloon', strokeColor: 'green', fillColor: '#AAFF55', size:10});


// animation functions toss ball and reset to original position
var toss = function() { x.moveTo([1.749,0],1750, {effect: '--'} ); }
var reset = function () {
            board.stopAllAnimation();
            x.moveTo([0,0]);
        }
      
// set up the start and reset buttons for animation
this.dependOn = ['toss1','reset1','setHeight', 'startHeight'];
this.depend = function() {

  startHeight = parseFloat(env.startHeight);

  if (env.toss1 == true) {
    toss();
    smartdown.setVariable('toss1', false);
  } 
  if (env.reset1 == true) { 
    reset(); 
    smartdown.setVariable('reset1', false);
  }

  if (env.setHeight == true) {
    h = parseFloat(env.height);
    if (h >=0 || h <= 2) {
      x.setPositionDirectly(JXG.COORDS_BY_USER, [f_inv(h),0]); 
      x.prepareUpdate().update(true).updateRenderer();
      fx.prepareUpdate().update(true).updateRenderer();
    }
    smartdown.setVariable('setHeight',false);
  }


};

// this restricts the domain to values where f(x) is positive.
board.on('update', function() {

  if (x.X() < 0) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [0,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }
  if (x.X() > 1.75) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [1.75,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  } 
  smartdown.setVariable('height', f(x.X()).toFixed(2));
 });
 
```
Notice that the slope of the tangent line tells us the speed of the balloon. It's not the average speed over some time window.  It tells us the instantaneous speed at a given time.  We call this the **instantaneous rate of change** of the balloon.  If we set the height to 5 feet, we can see that the ball will be traveling about [[](:!nspeed)](::pulldown2/tooltip/transparent) feet per second which is around 21 mph.  Ouch! Maybe you should reconsider dropping it.  
# :::: yes
# --colorbox yes
YES! :ok_hand:
# --colorbox
# ::::

# :::: pulldown2
[](:Xa4) 4
[](:Xa5) 10
[](:Xa6) 31
# ::::
```javascript/autoplay
smartdown.setVariable('nspeed','???');
smartdown.setVariable('a4', false);
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
this.dependOn = ['a4', 'a5', 'a6'];

this.depend = function() {
  if (env.a6 == true && env.a4 == false && env.a5 == false) {
      smartdown.setVariable('nspeed','31');
      smartdown.showDisclosure('yes','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('yes','','bottomright'); 
      }, 3000);
    } 
  };
```

### Example 2: Minimization Problem

A rectangular pen $8\text{ft}^2$ in area is to be fenced off for a pet rabbit.  One side of the pen will be the barn wall. The remaining three sides we'll make with fencing. However, fencing is really expensive.  We need to find the dimensions for the pen that minimize the length of fence.

Say our pen has width $w$ and length $l$.  In order to get $8\text{ft}^2$ in area, we must have $wl = 8$. We also know that the length of fence $F$ will be  $F = 2w + l$.  We can write the amount of fencing in terms of the width $w$  as $F = 2w + \frac{8}{w}$

# --outlinebox question
How can we use the slope of the tangent line to find the minimum possible amount of fencing?
# --outlinebox
# :::: instructions2
The red dot on the  time $w$ axis can be dragged to the left or right.  
To set the slope of the tangent line or the width, enter a value in the box and hit the button.
# ::::
[Set Slope of Tangent Line](:=setSlope=true) [](:?slope) [Set Width](:=setWidth=true) [](:?width) [Application Notes](::instructions2/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box3' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('setSlope', false);
smartdown.setVariable('setWidth', false);

MathJax.Hub.Config({
    extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
// create the board
JXG.Options.text.display = 'internal';
board = JXG.JSXGraph.initBoard('box3', {boundingbox:[-5,15,20,-1], keepaspectratio:true, axis:true});

// create the labels for axis
var xAxisLabel = board.create('text',[0.2,-0.4,'width'], {fontSize:16});
var yAxisLabel = board.create('text',[0.5,1,'Length of Fence'], {fontSize:16});
var textRot = board.create('transform', [Math.PI/2, 0,0], {type:'rotate'}); 
textRot.bindTo(yAxisLabel);
board.update();
var xArrow = board.create('line',[[2,-0.4],[5,-0.4]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});
var yArrow = board.create('line',[[-1,4],[-1,8]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});


// function and it's derivative
var f = function(x) { return  2*x + 8/x; };
var df = function(x) { return 2  - (8/(x*x)); };
var df_inv = function(x) { return Math.sqrt(8/(2-x)); };

var graph_f = board.create('functiongraph', [f,0,10]);

// point on x axis
var x = board.create('glider', [1, 0, board.defaultAxes.x], {name: 'w', size:6});
smartdown.setVariable('width', x.X().toFixed(2));
smartdown.setVariable('slope', df(x.X()).toFixed(2));

// point on function
var fx = board.create('point', 
  [ 
  function() { return x.X(); }, 
  function() { return f(x.X()); }
  ], 
  { 
    name:'',
    color: 'blue', 
    fixed: true, 
    size:3,
  });

// invisible point we need because it takes two points to make the tangent line
var fx2 = board.create('point', [
                function() { return x.X() + 1; }, 
                function() { return f(x.X()) + df(x.X()); }
          ], {visible:false});


// tangent line
var line = board.create('line',[fx, fx2],{strokeColor:'#FF5522'});



var line1 = board.create('line',[[15,9], [15,25] ],{strokeColor:'black', strokeWidth:5, straightFirst:false, straightLast:false});
var line2 = board.create('line',[[15,10], [function() { return 15 - x.X(); }, 10 ] ],{strokeColor:'black', strokeWidth:2, straightFirst:false, straightLast:false});

var y = function() { return 8 / x.X();};

var line3 = board.create('line',[[
  function() { return 15 - x.X(); }, 
  10], [
  function() { return 15 - x.X(); },
  function() { return 10 + y(x.X()); }] ],{strokeColor:'black', strokeWidth:2, straightFirst:false, straightLast:false});
var line4 = board.create('line',[[
  function() { return 15 - x.X(); },
  function() { return 10 + y(x.X()); }], [
  15,
  function() { return 10 + y(x.X()); }] ],{strokeColor:'black', strokeWidth:2, straightFirst:false, straightLast:false});

// text displaying current slope of tangent line
var slopeText = board.create('text',[3,3,function(){ return 'Slope of Tangent Line = ' + df(x.X()).toFixed(4); }], {fontSize:20});

var xText = board.create('text',[7,7.5,function(){ return 'w = ' + x.X().toFixed(4); }], {fontSize:20});
var yText = board.create('text',[7,6,function(){ return 'l = ' + y(x.X()).toFixed(4); }], {fontSize:20});
var LText = board.create('text',[7,4.5,function(){ return 'F = ' + f(x.X()).toFixed(4); }], {fontSize:20});
var barnText = board.create('text',[15.2, 10, 'barn wall'], {fontSize:20});
var xTextmoving = board.create('text',[ function() { return 15 - x.X()/2; }, 9.5, 'w']);
var yTextmoving = board.create('text',[
  function() { return 14 - x.X(); }, 
  function() { return 10 + y(x.X())/2; }, 'l']);



  
// this restricts the domain to values where f(x) is positive.
board.on('update', function() {
  console.log('update happening');
  if (x.X() < 0) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [0,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }
  smartdown.setVariable('width', x.X().toFixed(2));
  smartdown.setVariable('slope', df(x.X()).toFixed(2));
  
});

// set up the start and reset buttons for animation
this.dependOn = ['setSlope','setWidth'];
this.depend = function() { 
  console.log('in depends');
  if (env.setWidth == true) {
    let w = parseFloat(env.width);
    x.moveTo([w,0]);
    x.prepareUpdate().update(true).updateRenderer();
  }
  if (env.setSlope == true) {
    console.log('in set slope');
    let s = parseFloat(env.slope);
    let w = df_inv(s);
    x.moveTo([w,0]);
    x.prepareUpdate().update(true).updateRenderer();
    console.log('in set slope');
    console.log('descendents length', x.descendents().length);
    console.log('descendents', x.descendents());
  }
};


```
The minimum amount of fence occurs when the slope of the tangent line is [](:?minslope) and the width is [](:?bestwidth).
### Example 3: Another Minimization Problem

In this example we look at the path that light travels between two points $A$ and $B$.  The light will travel part of the way through air and part of the way through water.  Point $X$ marks the transition between air and water.  The amount of time it takes to travel between two points is the distance divided by the speed.  So the time to travel bewteen $A$ and $B$ via $X$ will be $$T = \frac{AX}{v_{air}} + \frac{XB}{v_{water}}$$  where $AX$ is the distance from $A$ to $X$, $XB$ is the distance from $X$ to $B$, $v_{air}$ is the speed of light in air and $v_{water}$ is the speed of light in water.

Light will take the path that minimizes the time of travel.  To find the correct placement of transition point $X$, we need to find the minimum value for $T$.  This minimum will occur when the tangent line to graph $T$ is zero.

# :::: instructions3
All the red dots are draggable.    
# ::::
[Application Notes](::instructions3/tooltip/transparent) 
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box4' class='jxgbox' style='height:600px;'>`;


// create the board
JXG.Options.text.display = 'internal';
board = JXG.JSXGraph.initBoard('box4', {boundingbox:[-5,10,10,-5], keepaspectratio:true, axis:true});

var waterLabel = board.create('text',[-4,-0.5,'water'], {fontSize:24});
var airLabel = board.create('text',[-4,0.5,'air'], {fontSize:24});

// create the water
var w1 = board.create('point', [-6,0],{fixed:true});
var w2 = board.create('point', [40,0],{fixed:true});
var w3 = board.create('point', [40,-5],{fixed:true});
var w4 = board.create('point', [-6,-5],{fixed:true});
var poly = board.createElement('polygon',[w1,w2,w3,w4],{fixed:true, fillColor:'#0077FF',fillOpacity:0.25});

var speed_air = 4; //186226.52;
var speed_water = 3; //139746.73;

var p1 = board.create('point', [1,2], {name:'A'});
var p2 = board.create('point', [10,-3], {name:'B'});
var slider = board.create('glider', [5, 0, board.defaultAxes.x], {name: 'X', size:6});

// function and it's derivative
var T = function(x) {
  let aSq = Math.pow(p1.Y(),2);
  let xSq = Math.pow(x - p1.X(),2);
  let bSq = Math.pow(p2.Y(),2);
  let cXSq = Math.pow(p2.X() - x, 2);

  return  Math.sqrt(aSq + xSq)/speed_air + Math.sqrt(bSq + cXSq)/speed_water; 
};
var dT = function(x) {
  let aSq = Math.pow(p1.Y(),2);
  let xSq = Math.pow(x,2);
  let bSq = Math.pow(p2.Y(),2);
  let cXSq = Math.pow(p2.X() - x, 2);

  return (x)/(speed_air * Math.sqrt(aSq + xSq)) - (p2.X() -x)/(speed_water * Math.sqrt(bSq + cXSq));
}


var graph_T = board.create('functiongraph', [T,-5,35]);
var graph_dT = board.create('functiongraph', [dT,-5,35], {strokeColor:'green'});
var l1 = board.create('line',[p1,slider],
  {straightFirst:false, straightLast:false, strokeWidth:5, color:'black',lastArrow:true});
var l2 = board.create('line',[slider,p2],
  {straightFirst:false, straightLast:false, strokeWidth:5, color:'black',lastArrow:true});
var dtp = board.create('point', [
  function(x) { return slider.X(); },
  function(x) { return dT(slider.X()); }], {color:'green'});

// point on parabala
var fx = board.create('point', [
                function() { return slider.X(); }, 
                function() { return T(slider.X()); }
          ], {name: '', color: 'blue', fixed: true, size:3});

// // invisible point we need because it takes two points to make the tangent line
var fx2 = board.create('point', [
                function() { return slider.X() + 1; }, 
                function() { return T(slider.X()) + dT(slider.X()); }
          ], {visible:false});

// // tangent line
var line = board.create('line',[fx, fx2],{strokeColor:'#FF5522'});

// text displaying current slope of tangent line
var slopeText = board.create('text',[10,5,function(){ return 'Slope of Tangent Line = ' + dT(slider.X()).toFixed(4); }], {fontSize:20});

// this restricts the domain to values where f(x) is positive.
board.on('update', function() {

  if (p1.Y() < 0) {
    p1.setPositionDirectly(JXG.COORDS_BY_USER, [p1.X(),0]); 
    p1.prepareUpdate().update(true).updateRenderer();
  }

  if (p2.Y() > 0) {
    p2.setPositionDirectly(JXG.COORDS_BY_USER, [p2.X(),0]); 
    p2.prepareUpdate().update(true).updateRenderer();
  }
});

```
Tangent lines give us a snap shot of how our function is changing at a given point.  



#### Coming Up Next 

[Learn to Calculate the Slope of the Tangent Line](:@CalculusPrimer/Derivative)
[Back to Home Page](:@CalculusPrimer/Home)






