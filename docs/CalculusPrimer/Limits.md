### Limits and Continuity

In most highschool classes you begin with a section on something called **limits and continuity**.  I was thinking about what the most important ideas from this section are when I stumbled on to this doozy of a quote from mathematician James Tanton.  He was talking about teaching limits and continuity at the highschool level.

# --aliceblue limits
*At this stage of the discussion, the notion of a “limit” should indeed be informal. In fact, the creators of calculus during the 1500s and 1600s did not think in terms of limits and found that intuition sufficed for the development at hand, compelling the subject onward in all its glory. It was only some 150 years later, after the subject was fully developed, that folk began to dig deeply into the foundations of the subject and begin to question beginning thoughts. What does it mean to be “continuous” exactly? What does a “leap of faith” really mean? Mathematicians at that time started to push the theory of calculus towards extreme situations (Does it work for the bizarre function that equals 1 for all rational numbers and 0 for all irrational numbers?) Troubles started to appear and so mathematicians had to resort to absolute technical clarity. French mathematician Augustine-Louis Cauchy (1789-1857) proposed the notion of a limit, and the full technical rigor for it was developed by Karl Weierstrass (1815-97).
The standard high-school curriculum does not present the problems that call for precise formulation of a limit, nor does it present the technical definition that goes with it! There is a half-hearted attempt to be “precise,” which, in the end is only confusing.*

From James Tanton's *Thinking Mathematics: Volume 6, Some Calculus*

# --aliceblue

Limits and continuity is a valid area of mathematical study and you will need to master some of it to succeed in class, but just remember **it is not critical to understanding and enjoying calculus**.  

### One Quick Look at Limits

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
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

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
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:300px; width:300px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

// parabala and it's derivative
var f = function(x) { return  x + 1; };
var graph_f = board.create('functiongraph', [f,-10,10]);
 
```


---
except the function $f(x)$ has a hole in the graph at the point where $x=1$ because the function is undefined at that point. Dividing by zero is not OK. Even though the function is not defined at $x=1$, we can ask the question

# --outlinebox question
**Question**
What value does the function get close to as we get closer and closer to $x=1$ without ever reaching it?
# --outlinebox

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px;'>`;

// create the board
board = JXG.JSXGraph.initBoard('box', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true});

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
Slide the red dot on the $x$ axis to the left and the right. What value does $f(x)$ get close to as $x$ approaches $1$? [](:?answer1)

```javascript/autoplay
smartdown.setVariable('answer1', '');
this.dependOn = ['answer1'];

this.depend = function() {
  if (env.answer1.trim() == '2') {
      smartdown.showDisclosure('nice','','bottomright');  
      smartdown.showDisclosure('limit', '', '');
      setTimeout(function () {
           smartdown.hideDisclosure('nice','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: nice

# --colorbox right
nice! :grinning:
# --colorbox

# ::::

# :::: limit

The **limit** as $x$ approaches $1$ of $\frac{x^2 - 1}{x-1}$ is $2$.  Here's how we write it.
$$\lim_{x \to 1} \frac{x^2 - 1}{x-1} = 2$$
So even though the function is undefined at $x=1$, the limit there exists and is equal to $2$.   

# --outlinebox point1
**Remember**
The limit of the function at a point is not the same as the value at that point. The limit at a point tells what value the function is **getting close to** rather than what the value actually is.  
# --outlinebox

1. This kind of thinking requires a leap of faith.  
2. Obvious example
3. Defined different at point example
4. definition of continuity 


### Limits on Weird Functions

Know the difference between a well behaved and non-wellbehaved function.

### What's Missing

- formal definition of a limit
- $\delta$, $\epsilon$ proofs
- sums and products of limits
- Squeeze Theorem

### Up Next

[Tangent Lines](:@CalculusPrimer/TangentLines)

# ::::

[Calculus Primer Home](:@CalculusPrimer/Home)