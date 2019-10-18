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

var areaText = brd.create('text',[1,-2, function(){ return 'Area of rectangles =' + lo.Value().toFixed(2); }], {fontSize:20});

// get the number of divisions
this.dependOn = ['N'];
this.depend = function() {
  brd.suspendUpdate();
  n = parseInt(env.N);
  brd.unsuspendUpdate();
};

```
**N**[](:-N/2/100/1) [](:!N) [Application Notes](::instructions/tooltip/transparent)
# :::: instructions
- Drag the slider to the left and the right. 
- Drag the red dots to adjust the curve.

# ::::

### A Calculus Primer

This calculus primer will cover everything you should know about calculus before your first day of calculus class.  A few first thoughts:




1. Look out for [Buttons](::buttonStuff/button,transparent,center,shadow,outline) to click.  Sometimes they look like [this](:=click=true).

# :::: buttonStuff
# --colorbox 
Buttons always do something interesting or reveal more information.
[Close](::buttonStuff)
# --colorbox
# ::::

2. Don't miss any [mouse over text](::mouseover/tooltip,transparent).

# :::: mouseover
Mouse over text often has important instructions!
# ::::

# :::: calc_hard
3. Calculus is [hard](::hard), but this primer isn't!

# :::: hard
Calculus is not hard for the reasons you may think.  Calculus is hard because 
	1. there's a lot of new [notation](::notation/tooltip,transparent).  
	2. solving a calculus problem often requires a lot of steps with lots and lots of messy algebra. 
Much of this primer can be managaged without any notation or algebra. 
[Close](::hard)
# ::::

# :::: notation
![fullwidth](https://online-learning.harvard.edu/sites/default/files/styles/header/public/course/asset-v1_HarvardX%2BCalcAPL1x%2B2T2017%2Btype%40asset%2Bblock%40TITLE-Calculus-Applied-2120x1192-NO-SPOTLIGHT%202.png?itok=crWwjmVi)
# ::::

# ::::

```javascript/autoplay
smartdown.setVariable('click', false);
this.dependOn = ['click'];
this.depend = function() {
  if (env.click == true) {
      smartdown.setVariable('click', false);
      smartdown.showDisclosure('clicked','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('clicked','','bottomright,transparent,shadow'); 
      }, 3000);
    } 
  };
```
# :::: clicked
# --colorbox 
Button Clicked! :zap:
# --colorbox
# ::::
----

[Books I used to build these pages](::books/center/lightbox)
# :::: books
**Books** I used to build these pages:
*Thinking Mathematics: Volume 6, Some Calculus* by James Tanton
*The Art of Problem Solving: Calculus* by David Patrick
*Calculus with Analytic Geometry* by George E. Simmons
*Burn Math Class* by Jason Wilkes
[Close](::books)
# ::::
[Dedication](::dedication/button,transparent,center,shadow,outline)
# :::: dedication
# --colorbox
This Calculus Primer is dedicated to Izzy and Andre: two highly creative and rigorous thinkers.
[Close](::dedication)
# --colorbox
# ::::
### Begin Here
1. [The Main Idea](:@CalculusPrimer/Intro)
2. [A Curvy Speed Question](:@CalculusPrimer/speed)
3. [Another Curvy Speed Question](:@CalculusPrimer/distance)
4. [Slopes and Areas](:@CalculusPrimer/ftc1)
5. [More Slopes and Areas](:@CalculusPrimer)
6. [The Result of an Infinite Process](:@CalculusPrimer/InfiniteProcess)
7. [The Derivative](:@CalculusPrimer/Derivative)
8. [Practice With the Definition of Derivative](:@CalculusPrimer/DerivativePractice)
9. [Short Cut Rules](:@CalculusPrimer)
10. [The Integral](:@CalculusPrimer)
11. [The Fundamental Theorem of Calculus](:@CalculusPrimer)

##### [Back to WildThinks Homepage](:@Home)


Quilting example
