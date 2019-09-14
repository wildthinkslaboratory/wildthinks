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

Calculus will introduce you to some big and fabulous new ideas.  Also, calculus is a hard class. But it's not the new ideas that make it hard.  Calculus is hard because there's a lot of new [notation](::notation/tooltip).  Calculus is also hard because solving a calculus problem often requires a lot of steps with lots and lots of messy algebra. The struggle to decipher the crazy notation and manage the tedious algebra can eclipse the big beautiful ideas.  

The goal of this primer is to give you an interactive way to play with the big ideas before you start calculus class.  I hope you can build intuition and firmly anchor these ideas in your mind.  Then, when you get to class you will be free to focus on the fussy details of working problems without losing the forest for the trees (or without losing the beautiful definition of the derivative to the countless shortcut rules for computing them).  These are bold ideas with far reaching applications and consequences.  They require time and patience to fully sink in. So take your time, play and enjoy.

# :::: notation
![fullwidth](https://online-learning.harvard.edu/sites/default/files/styles/header/public/course/asset-v1_HarvardX%2BCalcAPL1x%2B2T2017%2Btype%40asset%2Bblock%40TITLE-Calculus-Applied-2120x1192-NO-SPOTLIGHT%202.png?itok=crWwjmVi)
We can be thankful we got Leibniz's notation and not Newton's or things could be worse.
# ::::

[Books I used to build these pages](::books/center/lightbox)
# :::: books
# --aliceblue books
**Books** I used to build these pages:
*Thinking Mathematics: Volume 6, Some Calculus* by James Tanton
*The Art of Problem Solving: Calculus* by David Patrick
*Calculus with Analytic Geometry* by George E. Simmons
*Burn Math Class* by Jason Wilkes
[Close](::books)
# --aliceblue
# ::::

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
	- write a nice conclusion
	- review code for clean up
- Limits Page
	- make intro shorter
	- hide some in a disclosable
	- clean up code
	- managing division by zero
	- most functions are continuous
	- misbehaving functions

- Tangent Lines
	- improve questions
	- finish second example
- Derivative Page
	- need to develop the definition part (maybe they make it themselves with an app)

	In calculus we learn two tasks: taking derivatives and computing integrals.  However, a majority of the class is actually deriving and then memorizing short cut rules for computing these things.  When the class is over, students may be more likely to remember the short cut rules than the higher level ideas that made them necessary.  

![thumbnail](https://upload.wikimedia.org/wikipedia/commons/c/c1/Wiki_slope_in_2d.svg)
# ::::

