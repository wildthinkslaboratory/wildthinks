### A Quick Look at Limits

Consider the function 
$$ f(x) = \frac{x^2 - 1}{x-1}.$$
The graph of $f(x)$ looks a lot like the graph of $g(x) = x + 1$  

---
$ f(x) = \frac{x^2 - 1}{x-1}$
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
var f = function(x) { return  (x*x - 1)/(x - 1); };
var graph_f = board.create('functiongraph', [f,-10,10]);

// undefined point
var und_p = board.create('point', [1,2], {name:'', fixed:true, size:4, strokeColor:'green', fillColor:'white', fillOpacity:1, strokeOpacity:1});
 
```
$ g(x) = x+1$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box2', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x + 1; };
var graph_f = board.create('functiongraph', [f,-10,10]);
 
```


---
except the function $f(x)$ has a hole in the graph at the point where $x=1$ because the function is undefined at that point. Dividing by zero is not OK. Even though the function is not defined at $x=1$, we can still ask the question

# --outlinebox question
**Question**
What value does the function get **close** to as we get **closer and closer** to $x=1$ without ever reaching it?
# --outlinebox

# :::: instructions
The red dot on the $x$ axis can be dragged to the left or right.  
# ::::
[Application Notes](::instructions/tooltip)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box3' class='jxgbox' style='height:600px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box3', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  (x*x - 1)/(x - 1); };
var graph_f = board.create('functiongraph', [f,-10,10]);

// the slider point for x axis
var x = board.create('glider', [0, 0, board.defaultAxes.x], {name:'x', size:6} ); 

// sliding point on graph
var fx = board.create('point', [
                function() { return x.X(); }, 
                function() { return f(x.X()); }
          ], {name:'', color: 'green', fixed: true, size:3});

// undefined point
var und_p = board.create('point', [1,2], {name:'', fixed:true, size:4, strokeColor:'green', fillColor:'white', fillOpacity:1, strokeOpacity:1});

// print the slope of the secant line
var xText = board.create('text',[6,3,
	function(){ return 'x = ' + x.X().toFixed(4).toString(); }], {fontSize:30});

var fString = function() { 
	if (x.X().toFixed(4) == 1) { return 'UNDEFINED: divide by zero'; }
	return f(x.X()).toFixed(4).toString(); }

var fText = board.create('text',[6,1.5,
	function(){ return 'f(x) = ' + fString(); }], {fontSize:30});

 
```


# --partialborder q1
Slide the red dot on the $x$ axis to the left and the right. What value does $f(x)$ get close to as $x$ approaches $1$? [](:?answer1)
# --partialborder

```javascript/autoplay
smartdown.setVariable('answer1', '');
this.dependOn = ['answer1'];

this.depend = function() {
  if (env.answer1.trim() == '2') {
      smartdown.showDisclosure('boom','','bottomright');  
      smartdown.showDisclosure('limit', '', '');
      setTimeout(function () {
           smartdown.hideDisclosure('boom','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: boom

# --colorbox right
boom! :boom:
# --colorbox

# ::::

# :::: limit

The **limit** as $x$ approaches $1$ of $\frac{x^2 - 1}{x-1}$ is $2$.  Here's how we write it.
$$\lim_{x \to 1} \frac{x^2 - 1}{x-1} = 2$$
So even though the function is undefined at $x=1$, the limit there exists and is equal to $2$. In the upcoming pages we'll see an important example of this kind of limit where the function is undefined at a point, but the limit exists.  All of differential calculus is based on a specific limit like this.  


### Another example.  
$$f(x) =
\left\{
  \begin{array}{ll}
    x^3 - 3  & \mbox{if } x \not = 1 \\
    3 & \mbox{if } x = 1
  \end{array}
\right.$$
[Application Notes](::instructions/tooltip)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box10' class='jxgbox' style='height:600px; width:1000px'>`;

// create the board
board = JXG.JSXGraph.initBoard('box10', {boundingbox:[-5,5,10,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x*x - 3; };
var graph_f = board.create('functiongraph', [f,-10,10]);


var und_p = board.create('point', [1,-2], {name:'', fixed:true, size:4, strokeColor:'green', fillColor:'white', fillOpacity:1, strokeOpacity:1});

// undefined point
var def_p = board.create('point', [1,3], {name:'', fixed:true, size:4, color:'blue'});
// undefined point
var def_p2 = board.create('point', [0,-3], {name:'', fixed:true, size:4, color:'blue'});


// the slider point for x axis
var x = board.create('glider', [0, 0, board.defaultAxes.x], {name:'x', size:6} ); 

// sliding point on graph
var fx = board.create('point', [
                function() { return x.X(); }, 
                function() { return f(x.X()); }
          ], {name:'', color: 'green', fixed: true, size:3});

 // print the slope of the secant line
var xText = board.create('text',[3,3,
  function(){ return 'x = ' + x.X().toFixed(4).toString(); }], {fontSize:30});

var fString = function() { 
  if (x.X().toFixed(4) == 1) { return '3.0000'; }
  return f(x.X()).toFixed(4).toString(); }

var fText = board.create('text',[3,1.5,
  function(){ return 'f(x) = ' + fString(); }], {fontSize:30});

```
# --partialborder q2

What is $\lim_{x \to 1} x^3 - 3$? [](:?a1)
What is $f(1)$? [](:?a3)
What is $\lim_{x \to 0} x^3 - 3$? [](:?a2)
What is $f(0)$? [](:?a4)

# --partialborder 

```javascript/autoplay
smartdown.setVariable('a1', '');
this.dependOn = ['a1'];

this.depend = function() {
  if (env.a1.trim() == '-2') {
      smartdown.showDisclosure('shiny','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('shiny','','bottomright'); 
      }, 3000);
    } 
  };
```

```javascript/autoplay
smartdown.setVariable('a2', '');
this.dependOn = ['a2'];

this.depend = function() {
  if (env.a2.trim() == '-3') {
      smartdown.showDisclosure('cool','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('cool','','bottomright'); 
      }, 3000);
    } 
  };
```
```javascript/autoplay
smartdown.setVariable('a3', '');
this.dependOn = ['a3'];

this.depend = function() {
  if (env.a3.trim() == '3') {
      smartdown.showDisclosure('boom','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('boom','','bottomright'); 
      }, 3000);
    } 
  };
```
```javascript/autoplay
smartdown.setVariable('a4', '');
this.dependOn = ['a4'];

this.depend = function() {
  if (env.a4.trim() == '-3') {
      smartdown.showDisclosure('shiny','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('shiny','','bottomright'); 
      }, 3000);
    } 
  };
```
# :::: shiny

# --colorbox right
Shiny! :sparkles:
# --colorbox

# ::::

# :::: cool

# --colorbox cool
Cool! :sunglasses:
# --colorbox

# ::::
 
Notice that sometimes the limit of the function at a point is the same as the value of the function at that point and sometimes they're different.  Most of the time this distinction doesn't matter because the value of the function at a point and the limit at that point will be the same. In this case we'll say the function is **continuous** at that point.

# --outlinebox continuous
Informally, a function $f(x)$ is **continuous** at a point $x = a$ if the value of the function and the limit of the function are the same at that point.  $$f(a) = \lim_{x \to a} f(x)$$
A function is continuous if it is continuous for all of it's domain values.
# --outlinebox

#### Nice Continuous Functions 
Here are a few lovely continuous functions.
$f(x) = x^2$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box4' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box4', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return x*x - 2; };

var graph_f = board.create('functiongraph', [f,-5,5]);
 
```

$ f(x) = \sin x$
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


var f = function(x) { return  Math.sin(x); };
var graph_f = board.create('functiongraph', [f,-10,10]);
 
```
$ f(x) = x^3$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box6' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box6', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x*x*x; };

var graph_f = board.create('functiongraph', [f,-10,10]);
 
```
---

#### Weird Misbehaving Functions
Here are some weird and discontinuous functions.
$f(x) =
\left\{
  \begin{array}{ll}
    x  & \mbox{if } x \leq 0 \\
    x+2 & \mbox{if } x > 0
  \end{array}
\right.$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box7' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box7', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { 
  if (x <= 0) return x;
  return x+2;
};

var graph_f = board.create('functiongraph', [f,-10,10]);

// undefined point
var p1 = board.create('point', [0,2], {name:'', fixed:true, size:3, strokeColor:'blue', fillColor:'white', fillOpacity:1, strokeOpacity:1});
var p2 = board.create('point', [0,0], {name:'', color:'blue'});

 
```

$ f(x) = \tan x$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box8' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box8', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});


var f = function(x) { return  Math.tan(x); };
var graph_f = board.create('functiongraph', [f,-10,10]);
 
```
$ f(x) = \lfloor x \rfloor$
```javascript /playable/autoplay/inline
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box9' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box9', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  Math.floor(x); };

var graph_f = board.create('functiongraph', [f,-10,10]);

for (let i=-10; i <= 10; i++) {
  board.create('point', [i,i], {name:'', fixed:true, color:'blue'});
  board.create('point', [i+1,i], {name:'', fixed:true, strokeColor:'blue', fillColor:'white'});
}
 
```
---
If you are working with funtions like these weird functions, you need to be more careful and precise about taking limits.  However, we can avoid functions like these for now.

# --aliceblue review
### Review
It's important to remember that the limit of a function at a point may not be the same as the [[](:!value)](::pulldown1/tooltip) of the function at that point.  The limit of a function at a point $x = a$ tells us what the function does as $x$ [[](:!close)](::pulldown2/tooltip) $a$.  A function is continuous at a point if the value of the limit is the same as the [[](:!value2)](::pulldown4/tooltip) at that point.  Most functions we see in beginning calculus problems are [[](:!continuous)](::pulldown3/tooltip).

For more practice on identifying limits, check out [IXL's Calculus Problems](https://www.ixl.com/math/calculus/find-limits-using-graphs).  You can do a bunch of problems without an account.  If you want them to keep track of your progress you will need to join and pay a monthly fee.

# --aliceblue

# :::: pulldown1
[](:Xa5) range
[](:Xa6) value
[](:Xa7) domain 
# ::::

# :::: pulldown2
[](:Xa8) reaches
[](:Xa9) is undefined
[](:Xa10) gets closer and closer to
# ::::

# :::: pulldown3
[](:Xa11) continuous
[](:Xa12) discontinuous
[](:Xa13) straight lines
# ::::

# :::: pulldown4
[](:Xa14) value of the function
[](:Xa15) x value
# ::::


```javascript/autoplay
smartdown.setVariable('value','???');
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
smartdown.setVariable('a7', false);
this.dependOn = ['a5', 'a6', 'a7'];

this.depend = function() {
  if (env.a6 == true && env.a5 == false && env.a7 == false) {
      smartdown.setVariable('value','value');
      smartdown.showDisclosure('yes','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('yes','','bottomright'); 
      }, 3000);
    } 
  };
```
```javascript/autoplay
smartdown.setVariable('close','???');
smartdown.setVariable('a8', false);
smartdown.setVariable('a9', false);
smartdown.setVariable('a10', false);
this.dependOn = ['a8', 'a9', 'a10'];

this.depend = function() {
  if (env.a10 == true && env.a8 == false && env.a9 == false) {
      smartdown.setVariable('close','closer and closer to');
      smartdown.showDisclosure('boom','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('boom','','bottomright'); 
      }, 3000);
    } 
  };
```
```javascript/autoplay
smartdown.setVariable('continuous','???');
smartdown.setVariable('a11', false);
smartdown.setVariable('a12', false);
smartdown.setVariable('a13', false);
this.dependOn = ['a11', 'a12', 'a13'];

this.depend = function() {
  if (env.a11 == true && env.a12 == false && env.a13 == false) {
      smartdown.setVariable('continuous','continuous');
      smartdown.showDisclosure('cool','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('cool','','bottomright'); 
      }, 3000);
    } 
  };
```
```javascript/autoplay
smartdown.setVariable('value2','???');
smartdown.setVariable('a14', false);
smartdown.setVariable('a15', false);
this.dependOn = ['a14', 'a15'];

this.depend = function() {
  if (env.a14 == true && env.a15 == false) {
      smartdown.setVariable('value2','value of the function');
      smartdown.showDisclosure('shiny','','bottomright');  
      setTimeout(function () {
           smartdown.hideDisclosure('shiny','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: yes
# --colorbox yes
YES! :ok_hand:
# --colorbox
# ::::

### Coming Up Next

[Tangent Lines](:@CalculusPrimer/TangentLines)
[Back to Home Page](:@CalculusPrimer/Home)

# ::::