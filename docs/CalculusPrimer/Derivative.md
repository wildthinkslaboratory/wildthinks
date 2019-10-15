
## Finding the Derivative of a Function

Here is a graph showing the function $f(x) = x^2$.  We know how to estimate the rate the function is changing at certain points by looking at the slope of a secant line.  Go ahead and find the rate of change at the following points.  

Rate of change at $x=1$ [](:?f1) 
Rate of change at $x=2$ [](:?f2) 
Rate of change at $x=3$ [](:?f3) 

So far we've had nice computer apps to help us find the rate of change.  What if we don't have a computer?  Also, we don't want to just find the rate of change at a few points.  We want a function that tells us the rate of change for any value of $x$.  

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:500px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,10,5,-3], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'x', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-20, 20]   // (in pixels)
      }
      });
var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'y', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });   

// parabala and it's derivative
var f = function(x) { return  x*x; };
var df = function(x) { return 2 * x; }
var graph_f = board0.create('functiongraph', [f,-10,10]);

// point x on axis we want to get derivative value
var x = board0.create('glider', [1,0, xaxis], {name:'x', size:6});
var fx = board0.create('point', [ 
	function() { return x.X(); },
	function() { return f(x.X()); }], {name:'', color:'blue', fixed:true});

// the slider point for the secant
var x_h = board0.create('glider', [x.X() + 1, 0, xaxis], {name:'x + h', size:6, color:'green'} ); 

// sliding point on parabala 
var fx_h = board0.create('point', [
                function() { return x_h.X(); }, 
                function() { return f(x_h.X()); }
          ], {name:'', color: 'blue', fixed: true, size:3});

// secant line
var secant = board0.create('line', [fx, fx_h], {strokeColor:'#FF5522'});
var secantSlope = function() { 
	if (x.X() == x_h.X()) { return "UNDEFINED: divide by zero"; }
	return ((f(x.X()) - f(x_h.X()))/(x.X() - x_h.X())).toFixed(3).toString(); 
}

// print the slope of the secant line
var slopeText = board0.create('text',[-4,-2,
	function(){ return 'Slope of Secant Line = '+ secantSlope(); }], {fontSize:20});

var hText = board0.create('text',[-4,-1,
	function(){ return 'h = '+ (x_h.X() - x.X()).toFixed(3); }], {fontSize:20});


var p = board0.create('point', [ 
	function() { return x_h.X(); }, 
	function() { return f(x.X());}], {visible:false});

var rise = board0.create('line', [fx_h, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
var run = board0.create('line', [fx, p], {color:'black', strokeWidth:1, straightFirst:false, straightLast:false, dash:2});
var riseText = board0.create('text', [
	function() { if (x_h.X() > x.X()) { return x_h.X() + 0.1; } 
				 return x_h.X() - 1.5; },
	function() { return (f(x_h.X()) - f(x.X()))/2 + f(x.X()); },
	'f(x+h) - f(x)'], {fontSize:12});

var runText = board0.create('text', [
	function() { return x.X() + (x_h.X() - x.X())/2; },
	function() { return f(x.X()) - 0.3; },
	'h'], {fontSize:12});

 
```

# --outlinebox b
[**Definition 2**](::important/tooltip,transparent) 
The **derivative** of a function $f$ begins with the [slope of a secant line](:=showSecant=true). It's the change in $y$ over the change in $x$.  Then we let the points defining our secant line get very [close together](::instructions1/tooltip,transparent) by letting the value of $h$ get very small. We call this taking the limit as $h$ goes to $0$. [limit](:=showLimit=true)
[](:!formula1|markdown)

# :::: important
# --colorbox a
### This is the most important definition in all of calculus
Take your time. Use the app to decipher the symbols. Try to understand this before moving on.
# --colorbox
# ::::
# --outlinebox

# :::: instructions1
Drag the green dot towards the red dot.
# ::::
The definition of the derivative describes a process you've already done many times in this primer! Great we have a definition, but what do we do with it?

```javascript /autoplay

var limit = '\\lim_{h \\to 0}';
var secantSlope = '\\frac{f(x+h) - f(x)}{h}'


smartdown.setVariable('showSecant', false);
smartdown.setVariable('showLimit', false);
smartdown.setVariable('formula1', '');
this.dependOn = ['showSecant','showLimit'];
this.depend = function() {
	if (env.showSecant == true && env.showLimit == false) {
		smartdown.setVariable('formula1', '$$' + secantSlope + '$$');
	}
	if (env.showSecant == true && env.showLimit == true) {
		smartdown.setVariable('formula1', '$$' + limit + secantSlope + '$$');
	}

  };
```


```javascript /autoplay

var limitpre = '$$\\lim_{h \\to 0} \\frac{';
var f_x = 'f(x)';
var f_xh = 'f(x+h)';
var limitpost = '}{h}$$';

var makelimit = function() {
	return limitpre + f_x + '-' + f_xh + limitpost;
};

smartdown.setVariable('f', '');
smartdown.setVariable('fx_h', '')
smartdown.setVariable('formula', makelimit());
this.dependOn = ['f', 'fx_h'];
this.depend = function() {
	if (env.f == 'x^2') {
		f_x = env.f;
		smartdown.setVariable('formula', makelimit());
	}
	else {
		f_x = 'f(x)';
		smartdown.setVariable('formula', makelimit());
	}

	if (env.fx_h == '(x+h)^2') {
		f_xh = env.fx_h;
		smartdown.setVariable('formula', makelimit());
	}
	else {
		f_xh = 'f(x+h)';
		smartdown.setVariable('formula', makelimit());
	}

	if (env.f == 'x^2' && env.fx_h == '(x+h)^2') {
		smartdown.showDisclosure('expand','','transparent'); 
	}
  };
```



[f(x)](:?f)
[f(x + h)](:?fx_h)
[](:!formula|markdown)

# :::: expand
OK, hang in there for some algebra. Let's expand the $(x+h)^2$ term. 
$$\lim_{h \to 0} \frac{x^2 - (x^2 -2xh + h^2)}{h}$$
Combine like terms 
$$\lim_{h \to 0} \frac{2xh - h^2}{h}$$
Cancel the $h$'s from the numerator and denominator
$$\lim_{h \to 0} 2x - h$$
As $h$ gets really close to zero, this will become the function
$$f'(x) = 2x$$
# ::::



[Applications of Derivaties](:@CalculusPrimer/AppDerivatives)
[Back to Home Page](:@CalculusPrimer/Home)

