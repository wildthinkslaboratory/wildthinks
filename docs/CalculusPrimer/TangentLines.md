

## Tangent Lines

There are two branches of calculus, **Differential Calculus**  and **Integral Calculus**.  Differential calculus is motivated by the problem of finding **tangent lines**.  What is a tangent line and why are people trying to find them? Let's look at a real world example to see how tangent lines can help us.  Imagine tossing a ball up into the air.  It rises quickly, then slows.  For an instant it is motionless before reversing direction and falling back to earth.  

Below is an animation of a ball toss.  Next to the animation you will see a concave down parabala that plots the height of the ball relative to time.  

# --aliceblue instructions
**App Notes:** In addition to running the animation with the **start** and **reset** buttons, the red dot on the  time $t$ axis can be dragged to the left or right.  
# --aliceblue

[start](:=toss=true) [reset](:=toss=false)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('toss', false);

// set up the start and reset buttons for animation
this.dependOn = ['toss'];
this.depend = function() {
  if (env.toss == true) {
    toss();
  } 
  else { reset(); }
};


// create the board
JXG.Options.text.display = 'internal';
board = JXG.JSXGraph.initBoard('box', {boundingbox:[-10,9,10,-1], keepaspectratio:true, axis:true});

// create the labels for axis
var xAxisLabel = board.create('text',[0.2,-0.4,'Time'], {fontSize:16});
var yAxisLabel = board.create('text',[0.5,0.5,'Height of Ball'], {fontSize:16});
var textRot = board.create('transform', [Math.PI/2, 0,0], {type:'rotate'}); 
textRot.bindTo(yAxisLabel);
board.update();
var xArrow = board.create('line',[[1,-0.4],[4,-0.4]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});
var yArrow = board.create('line',[[-0.5,2.2],[-0.5,8]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});


// parabala and it's derivative
var f = function(x) { return  -2*x*x + 8*x ; };
var graph_f = board.create('functiongraph', [f,0,4]);

// point on x axis
var x = board.create('glider', [0, 0, board.defaultAxes.x], {name: 't', size:6});
// point on parabala
var fx = board.create('point', [
                function() { return x.X(); }, 
                function() { return f(x.X()); }
          ], {name: '', color: 'blue', fixed: true, size:3});


// ball that is tossed
var ballPoint = board.create('point', 
  [-5, function() { return f(x.X());}], 
  {name: 'Ball', strokeColor: 'green', fillColor: '#AAFF55', size:18});


// animation functions toss ball and reset to original position
var toss = function() { x.moveTo([4,0],2000, {effect: '--'} ); }
var reset = function () {
            board.stopAllAnimation();
            x.moveTo([0,0]);
        }
      
// this restricts the domain to values where f(x) is positive.
board.on('update', function() {

  if (x.X() < 0) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [0,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }
  if (x.X() > 4) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [4,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }  
 });
 
```
If we want to understand how something moves, we're often interested in the speed of travel.  How fast does the ball move?  Is the speed constant or does it vary?  When is the ball traveling fast and when is it traveling slow?  How does the speed vary with time?  These are exactly the type of questions that tangent lines help us answer.  

In the new version of our app below, we've added a tangent line to our graph and we've posted the slope of the tangent line.  Play with this app and think about how the slope of the tangent line relates to the speed of the ball.

[start](:=toss1=true) [reset](:=toss1=false)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('toss1', false);

// set up the start and reset buttons for animation
this.dependOn = ['toss1'];
this.depend = function() {
  if (env.toss1 == true) {
    toss();
  } 
  else { reset(); }
};


// create the board
JXG.Options.text.display = 'internal';
board = JXG.JSXGraph.initBoard('box', {boundingbox:[-10,9,10,-1], keepaspectratio:true, axis:true});

// create the labels for axis
var xAxisLabel = board.create('text',[0.2,-0.4,'Time'], {fontSize:16});
var yAxisLabel = board.create('text',[0.5,0.5,'Height of Ball'], {fontSize:16});
var textRot = board.create('transform', [Math.PI/2, 0,0], {type:'rotate'}); 
textRot.bindTo(yAxisLabel);
board.update();
var xArrow = board.create('line',[[1,-0.4],[4,-0.4]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});
var yArrow = board.create('line',[[-0.5,2.2],[-0.5,8]],
  {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', lastArrow:true});


// parabala and it's derivative
var f = function(x) { return  -2*x*x + 8*x ; };
var df = function(x) { return -4*x + 8; }
var graph_f = board.create('functiongraph', [f,0,4]);

// point on x axis
var x = board.create('glider', [0, 0, board.defaultAxes.x], {name: 't', size:6});
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

// text displaying current slope of tangent line
var slopeText = board.create('text',[4,3,function(){ return 'Slope of Tangent Line = '+ df(x.X()).toFixed(4); }], {fontSize:30});

// ball that is tossed
var ballPoint = board.create('point', 
  [-5, function() { return f(x.X());}], 
  {name: 'Ball', strokeColor: 'green', fillColor: '#AAFF55', size:18});


// animation functions toss ball and reset to original position
var toss = function() { x.moveTo([4,0],2000, {effect: '--'} ); }
var reset = function () {
            board.stopAllAnimation();
            x.moveTo([0,0]);
        }
      
// this restricts the domain to values where f(x) is positive.
board.on('update', function() {

  if (x.X() < 0) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [0,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }
  if (x.X() > 4) {
    x.setPositionDirectly(JXG.COORDS_BY_USER, [4,0]); 
    x.prepareUpdate().update(true).updateRenderer();
  }  
 });
 
```

# --aliceblue questions
**Questions:**

For what value of time is the slope of the tangent line $0$? [](:?zeroslope)
Assuming the function is only defined between $0$ and $4$, when is the slope positive?  [](:?positiveInterval)  [formatting tips](::tip)
# :::: tip
Intervals with less than or equal signs $5 \leq x \leq 7$ are written with square brackets [5,7].
Intervals with strictly less then signs $5 < x < 7$ are written with parentheses (5,7).
Intervals can be mixed.  $5 < x \leq 7$ is written as (5,7].
Intervals with infinity $\infty < x \leq 100$ are written as (inf,100].
# ::::
When is the slope negative?  [](:?negativeInterval)
[submit answers](:=submit=true)
# --aliceblue

```javascript/autoplay
smartdown.setVariable('zeroslope', '');
smartdown.setVariable('positiveInterval', '');
smartdown.setVariable('negativeInterval', '');
smartdown.setVariable('submit', false);

this.dependOn = ['submit'];

this.depend = function() {
  if (env.submit == true) {
    console.log('submit');
    if (env.zeroslope.trim() == '2' 
    && env.positiveInterval.trim() == '(0,2)' 
    && env.negativeInterval.trim() == '(2,4)') {
      smartdown.showDisclosure('righton','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('righton','','bottomright'); 
      }, 3000);
    } else {
      smartdown.showDisclosure('tryagain','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('tryagain','','bottomright'); 
      }, 3000);
    }

  } 
  env.submit = false;
};
```

# :::: righton

# --colorbox right
right on! :thumbsup:
# --colorbox

# ::::

# :::: tryagain

# --colorbox try
keep trying
# --colorbox

# ::::

In this example, the slope of the tangent line tells us the speed the ball is traveling at a given time $t$. Positive slopes tell us that the ball is traveling in the upward direction and negative slopes occur when the ball is falling down.  The absolute value of the speed is greatest when the ball is initially tossed and again when it hits the ground.  And all this can be seen by looking at tangent lines.

Not all functions represent moving objects. More generally, tangent lines tell us something called the **instantaneous rate of change** of our function. We can pick a point on our function and determine whether the function is increasing or decreasing at that spot, and how quickly it's values are changing.  

So this is the question that Isaac Newton was trying to answer when the proverbial apple fell from the tree.  Next we see how to calculate the slope of the tangent line and in the process get our first taste of calculus.

#### Coming Up Next 

[Learn to Calculate the Slope of the Tangent Line](:@CalculusPrimer/Derivative)






