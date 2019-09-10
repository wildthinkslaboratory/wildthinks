### Limits and Continuity

In most highschool classes you begin with a section on something called **limits and continuity**.  I was thinking about what the most important ideas from this section are when I stumbled on to this doozy of a quote from mathematician James Tanton.  He was talking about teaching limits and continuity at the highschool level.

# --aliceblue limits
*At this stage of the discussion, the notion of a “limit” should indeed be informal. In fact, the creators of calculus during the 1500s and 1600s did not think in terms of limits and found that intuition sufficed for the development at hand, compelling the subject onward in all its glory. It was only some 150 years later, after the subject was fully developed, that folk began to dig deeply into the foundations of the subject and begin to question beginning thoughts. What does it mean to be “continuous” exactly? What does a “leap of faith” really mean? Mathematicians at that time started to push the theory of calculus towards extreme situations (Does it work for the bizarre function that equals 1 for all rational numbers and 0 for all irrational numbers?) Troubles started to appear and so mathematicians had to resort to absolute technical clarity. French mathematician Augustine-Louis Cauchy (1789-1857) proposed the notion of a limit, and the full technical rigor for it was developed by Karl Weierstrass (1815-97).
The standard high-school curriculum does not present the problems that call for precise formulation of a limit, nor does it present the technical definition that goes with it! There is a half-hearted attempt to be “precise,” which, in the end is only confusing.*

From James Tanton's *Thinking Mathematics: Volume 6, Some Calculus*

# --aliceblue

I also went back and looked in my college calculus book *Calculus with Analytic Geometry* by George F. Simmons from 20+ years ago. Its old and battered, but I occasionally still use a s a reference.  I was surprised to find that it also relies on an informal definition of a limit and includes only a brief section on limits after the notion of derivative has already been introduced.

Limits and continuity is a valid area of mathematical study and you will need to master some of it to succeed in class, but just remember **it is not critical to understanding and enjoying calculus**.  

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
So even though the function is undefined at $x=1$, the limit there exists and is equal to $2$.   

# --outlinebox point1
**Remember**
The limit of the function at a point $\lim_{x \to 1} f(x)$ is not the same as the value of the function at that point $f(1)$. The limit at a point tells what value the function is **getting close to** rather than what the function value actually is.  
# --outlinebox

### Let's Do Another Example

Here's another example.
$$f(x) =
\left\{
  \begin{array}{ll}
    x^3 - 3  & \mbox{if } x \not = 1 \\
    3 & \mbox{if } x = 1
  \end{array}
\right.$$
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box4' class='jxgbox' style='height:600px; width:1000px'>`;

// create the board
board = JXG.JSXGraph.initBoard('box4', {boundingbox:[-5,5,10,-5], keepaspectratio:true, axis:true});

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
What is $\lim_{x \to 0} x^3 - 3$? [](:?a2)

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

# :::: shiny

# --colorbox right
Shiny! :sparkles:
# --colorbox

# ::::

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

# :::: cool

# --colorbox cool
Cool! :sunglasses:
# --colorbox

# ::::

### Continuity


### Functions that Misbehave

The formal stuff about limits comes into play when functions are poorly behaved.  What does "poorly behaved" mean?  We're going to be informal about that too.  Here's some misbehaving functions.
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
myDiv.innerHTML = `<div id='box5' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box5', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

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

$ f(x) = \frac{x^2 - 1}{x-1}$
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


var f = function(x) { return  x*x - 3; };
var graph_f = board.create('functiongraph', [f,-10,10]);

// undefined point
var und_p = board.create('point', [1,2], {name:'', fixed:true, size:4, strokeColor:'green', fillColor:'white', fillOpacity:1, strokeOpacity:1});
 
```
$ f(x) = \frac{x^2 - 1}{x-1}$
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
var f = function(x) { return  (x*x - 1)/(x - 1); };
var graph_f = board.create('functiongraph', [f,-10,10]);

// undefined point
var und_p = board.create('point', [1,2], {name:'', fixed:true, size:4, strokeColor:'green', fillColor:'white', fillOpacity:1, strokeOpacity:1});
 
```
---

Know the difference between a well behaved and non-wellbehaved function.

### Coming Up Next

[Tangent Lines](:@CalculusPrimer/TangentLines)
[Back to Home Page](:@CalculusPrimer/Home)

# ::::


