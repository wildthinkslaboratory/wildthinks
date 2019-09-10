```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:200px;'>`;

smartdown.setVariable('N', 40);
var n = 40;

var brd = JXG.JSXGraph.initBoard('box', {boundingbox:[-3,5,3,-3],axis:true});

// some colors for random selection
colors = ['#00FF77', '#FF7700', '#7700FF', '#FFFF00', '#2222FF', '#FF2222'];

// some random points
var p = [];
p.push(brd.create('point',[-2.7,(Math.random()-0.2)*5]));
p.push(brd.create('point',[-1,(Math.random()-0.2)*5]));
p.push(brd.create('point',[0,(Math.random()-0.2)*5]));
p.push(brd.create('point',[1,(Math.random()-0.2)*5]));
p.push(brd.create('point',[2.7,(Math.random()-0.2)*5]));

// we make a polynomial from the random points
var f = JXG.Math.Numerics.lagrangePolynomial(p);

var plot = brd.create('functiongraph',[f,-3,3]);
var nfun = function() { return n; }
var lo = brd.create('riemannsum',[f,nfun, 'lower',-3,3],
	{strokeColor: 'blue', fillColor:colors[Math.floor(Math.random()*colors.length)], fillOpacity:0.5});
 

// get the number of divisions
this.dependOn = ['N'];
this.depend = function() {
  brd.suspendUpdate();
  n = parseInt(env.N);
  brd.unsuspendUpdate();
};

```
[N](:-N/2/100/1) [](:!N) 
#### Everything You Should Know About Calculus Before Your First Day of Calculus Class

Dear Izzy and Andre,

Both of you will be starting calculus classes in the next two years. I hope the exploration in these pages will smooth the way.

Calculus is a beautiful subject, but sometimes the beauty of calculus doesn't shine through in a highschool calculus class.  The highlevel ideas and concepts get lost when working intricate and complex problems written in baffling and unfamiliar notation.  In calculus we learn two tasks: taking derivatives and computing integrals.  However, a majority of the class is memorizing (and hopefully deriving) short cut rules for computing these things.  When the class is over, students may be more likely to remember the short cut rules than the higher level ideas from which they are derived.  The focus of this primer is on the high level ideas.   If you have the high level ideas firmly in your head before you start, you can focus on the details of intricate problem solving without losing the big picture.  Take your time, play with the apps to build intuition.  These are big and fabulous ideas and they require time and patience to fully sink in. 

# --aliceblue books
**Books** I used to build these pages:
*Thinking Mathematics: Volume 6, Some Calculus* by James Tanton
*The Art of Problem Solving: Calculus* by David Patrick
*Calculus with Analytic Geometry* by George E. Simmons
*Burn Math Class* by Jason Wilkes
# --aliceblue

#### Begin Here
1. [The Main Idea](:@CalculusPrimer/Intro)
2. [Limits](:@CalculusPrimer/Limits)
3. [Tangent Lines](:@CalculusPrimer/TangentLines)
4. [The Derivative](:@CalculusPrimer/Derivative)
5. [Applications of the Derivative](:@CalculusPrimer/AppDerivatives)
6. [The Integral](:@CalculusPrimer/Integral)
7. [Applications of Integration](:@CalculusPrimer/IntegralApps)
8. [The Fundamental Theorem of Calculus](:@CalculusPrimer/FundamentalTheorem)

# :::: todo
TODO
___

- Main Idea Page
	- add questions after apps.
- Limits Page
	- clean up code
	- additional examples
		- obvious example
		- value of function different than limit example
	- continuity
	- more misbehaving functions
- Tangent Lines
	- improve questions
	- finish second example
- Derivative Page
	- need to develop the definition part (maybe they make it themselves with an app)

![thumbnail](https://upload.wikimedia.org/wikipedia/commons/c/c1/Wiki_slope_in_2d.svg)
# ::::

