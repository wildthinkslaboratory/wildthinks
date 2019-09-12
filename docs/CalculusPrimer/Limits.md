### Limits and Continuity


Many highschool calculus classes will begin with a section on **limits and continuity**.  While researching this topic I stumbled on to this doozy of a [quote from mathematician James Tanton](::tantonOnLimits/center/lightbox/scrollable).  It's a good read and I highly recommend it.  A key take away that I wasn't aware of is that the creators of calculus themselves didn't have a formal notion of a limit.  All this formalism about limits came 150 years later when people started applying calculus to weird misbehaving functions.

# :::: tantonOnLimits
# --aliceblue limits
![icon](https://aperiodical.com/wp-content/uploads/2018/06/tanton-300x300.png)
"... Many programs give the impression that this material is a precursor to rigor and technical precision, but, in the end, appeal to intuition over and over again. A student who thinks deeply is given the impression that a foundation is laid, but one with no cement or stone and therefore no real means to support a structure of any weight.
At this stage of the discussion, the notion of a “limit” should indeed be informal. In fact, the creators of calculus during the 1500s and 1600s did not think in terms of limits and found that intuition sufficed for the development at hand, compelling the subject onward in all its glory. It was only some 150 years later, after the subject was fully developed, that folk began to dig deeply into the foundations of the subject and begin to question beginning thoughts. What does it mean to be “continuous” exactly? What does a “leap of faith” really mean? Mathematicians at that time started to push the theory of calculus towards extreme situations (Does it work for the bizarre function that equals 1 for all rational numbers and 0 for all irrational numbers?) Troubles started to appear and so mathematicians had to resort to absolute technical clarity. French mathematician Augustine-Louis Cauchy (1789-1857) proposed the notion of a limit, and the full technical rigor for it was developed by Karl Weierstrass (1815-97).
The standard high-school curriculum does not present the problems that call for precise formulation of a limit, nor does it present the technical definition that goes with it! There is a half-hearted attempt to be “precise,” which, in the end is only confusing. "

From James Tanton's *Thinking Mathematics: Volume 6, Some Calculus*
[Close](::tantonOnLimits)

# --aliceblue
# ::::


# --outlinebox bogged
**Remember**
Do not get too bogged down on pseudo rigorous limits and continuity problems.  It's not essential for enjoying and understanding calculus.
# --outlinebox

In fact, if you want, you can go straight on to [Tangent Lines](:@CalculusPrimer/TangentLines) and come back and do this page later.

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

# --aliceblue instructions
**App Notes:** The red dot on the $x$ axis can be dragged to the left or right.  
# --aliceblue

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
 
 # --colorbox important
**Very Important Idea:**
We get the value of a function $f(x)$ at a point $a$ by just plugging $a$ into $f(x)$ and seeing what we get.  We get the limit of $f(x)$ at point $a$ $$\lim_{x \to a} f(x)$$ by taking values **nearby** $a$ and plugging those into $f(x)$.  How nearby?  As close as we can get without reaching $a$.
# --colorbox

Most of the time this distinction doesn't matter because the value of the function at a point and the limit at that point will be the same. In this case we'll say the function is **continuous** at that point.

# --outlinebox continuous
Informally, a function $f(x)$ is continuous at a point $x = a$ if the value of the function and the limit of the function are the same at that point.  $$f(a) = \lim_{x \to a} f(x)$$
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
If you are working with funtions like these you may need to learn more about the mathematics of limits.




### Coming Up Next

[Tangent Lines](:@CalculusPrimer/TangentLines)
[Back to Home Page](:@CalculusPrimer/Home)

# ::::