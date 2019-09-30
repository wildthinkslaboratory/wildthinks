

## How do you find the Tangent Line?


### Problem

We want to find the slope of the tangent line to the function $f(x) = \frac{x^2}{4} - 1$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box1', {boundingbox:[-8,13,8,-3], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x/4 - 1; };
var df = function(x) { return x/2; }
var graph_f = board.create('functiongraph', [f,-10,10]);

// point x on axis we want to get derivative value
var x = board.create('point', [4,0], {name:'x', size:3, color:'blue', fixed:true});
var fx = board.create('point', [4,f(4)], {name:'', color:'blue', fixed:true});

```
at the point where $x=4$. 

It's not obvious what to do.  A line is determined by two points or a point and a slope. The **slope** $m$ of a line determined by points $(x_1,y_1)$ and $(x_2,y_2)$ is the change in $y$ values divided by the change in $x$ values.  
$$ m = \frac{y_2 - y_1}{x_2 - x_1}.$$


We want to find the slope of the tangent line at $x=4$, but we have just one point and no slope. 

### Solution
What if we pick another point on the function a little to the left or a little to the right of $x=4$.  We can draw a line between these two points and figure out the slope of that line.  A line that intersects the function twice like this is called a **secant** line. The slope of the **secant** line through two points $(x,f(x))$ and $(x+h,f(x+h))$ on function $f(x)$ is
$$ \frac{f(x + h) - f(x)}{h}$$
Take a moment to look at this definition and make sure you understand it. Notice that it's just the normal definition of slope, the change in $y$ values divided by the change in $x$ values.

# --outlinebox question
**Question**
What value does the slope of the secant get **close** to as we get **closer and closer** to $h=0$ without ever reaching it?
# --outlinebox

Use the graph of the secant line in the app below to figure out what the slope of the tangent line is at $x=4$.  You can drag the large red dot right and left to see different secant lines.
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:600px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box2', {boundingbox:[-10,9,10,-4], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x/4 - 1; };
var df = function(x) { return x/2; }
var graph_f = board.create('functiongraph', [f,-10,10]);

// point x on axis we want to get derivative value
var x = board.create('point', [4,0], {name:'x', size:3, color:'blue', fixed:true});
var fx = board.create('point', [4,f(4)], {name:'', color:'blue', fixed:true});

// the slider point for the secant
var x_h = board.create('glider', [x.X() + 1, 0, board.defaultAxes.x], {name:'x + h', size:6} ); 

// sliding point on parabala 
var fx_h = board.create('point', [
                function() { return x_h.X(); }, 
                function() { return f(x_h.X()); }
          ], {name:'', color: 'red', fixed: true, size:3});

// secant line
var secant = board.create('line', [fx, fx_h], {strokeColor:'#FF5522'});
var secantSlope = function() { 
	if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
	return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

// print the slope of the secant line
var slopeText = board.create('text',[8,3,
	function(){ return 'Slope of Secant Line = '+ secantSlope(); }], {fontSize:30});

var hText = board.create('text',[8,1.5,
	function(){ return 'h = '+ (x_h.X() - x.X()).toFixed(3); }], {fontSize:30});


var p = board.create('point', [ function() { return x_h.X(); }, f(4)], {visible:false});

var rise = board.create('line', [fx_h, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
var run = board.create('line', [fx, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
var riseText = board.create('text', [
	function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
				 return x_h.X() - 1.5; },
	function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()); },
	'f(x+h) - f(x)'], {fontSize:12});

var runText = board.create('text', [
	function() { return x.X() + (x_h.X() - x.X())/2; },
	function() { return f(x.X()) - 0.3; },
	'h'], {fontSize:12});

 
```

# --partialborder q1
What is the slope of the tangent line when $x = 4$? [](:?answer1)
# --partialborder

```javascript/autoplay
smartdown.setVariable('answer1', '');
this.dependOn = ['answer1'];

this.depend = function() {
  if (env.answer1.trim() == '2') {
      smartdown.showDisclosure('righton','','bottomright');  
      smartdown.showDisclosure('disc1', '', 'transparent');
      setTimeout(function () {
           smartdown.hideDisclosure('righton','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: righton

# --colorbox right
right on! :thumbsup:
# --colorbox

# ::::


# :::: disc1

Congratulations! You just did some calculus. If we let the value of $h$ get very small, the slope of the secant line gets closer and closer to the slope of the tangent.  The slope of the secant line is actually undefined when $h=0$.  We aren't allowed to divide by zero. But it's ok.  When we zoom in close around $x=4$, we can see what's happening.  We don't have to move $h$ all the way to $0$ to see where slope is  going to end up.

Here is the definition of the derivative.  Compare it to the definition of the secant line from above. 
# --aliceblue derivative3 
# --colorbox derivative2
# --outlinebox derivative
**Definition of the Derivative**
$$ f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$
# --outlinebox
# --colorbox
# --aliceblue

The notation $f'(x)$ is how we represent a function that is a derivative of some function $f(x)$.  Similarly, if we took the derivative of a function $g(x)$ we'd call it $g'(x)$.  The other new notation here is $$ \lim_{h \to 0}$$. This means we let the values of $h$ in the expression get really close to the value $0$.

# :::: temp
What is a tangent line?
Why is it hard to calculate?

notes on notation: different notations for derivative

Introduce the term **derivative**. 
Don't memorize this formula, remember that it is a slope and then you can always construct it.

So there's the definition of the derivative and then

### Short cut rules

- sums
- single polynomial
- products
- quotients
- trig
- chain rule
- inverse function

Rolle's Theorem 
Related Rate problems
Implicit differentiation
# ::::

[Applications of Derivaties](:@CalculusPrimer/AppDerivatives)
[Back to Home Page](:@CalculusPrimer/Home)

# ::::