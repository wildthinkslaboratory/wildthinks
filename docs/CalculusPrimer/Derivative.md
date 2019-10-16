
## Finding the Derivative of a Function

Here is a graph showing the function $f(x) = x^2$.  We know how to estimate the rate the function is changing at certain points by looking at the slope of a secant line.  Go ahead and find the rate of change at the following points.  

Rate of change at $x=1$ [](:?f1) 
Rate of change at $x=2$ [](:?f2) 
Rate of change at $x=3$ [](:?f3) 

So far we've had nice computer apps to help us find the rate of change.  What if we don't have a computer?  Also, we don't want to just find the rate of change at a few points.  We want a function that tells us the rate of change for any value of $x$.  But first a [WARNING](::warn/button,center,shadow,outline,lightbox,transparent).

# :::: warn
# --colorbox c
So far we've avoided a lot of notation and algebra. The truth is you've been taking derivatives of functions already (possibly without knowing that was what you were doing).  However, if you want to see a formal definition of what a derivative is, some notation and algebra is required.  We'll try to make it as painless as possible.
[Close](::warn)
# --colorbox
# ::::

[Application Notes](::instructions1/tooltip/transparent)


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
//var graph_df = board0.create('functiongraph', [df,-10,10],{strokeColor: '#11AA66', visible:true});

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

smartdown.setVariable('f1', '');
smartdown.setVariable('f2', '');
smartdown.setVariable('f3', '');

this.dependOn = ['f1','f2','f3'];
this.depend = function() {
    if (env.f1 == 2) {
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.f2 == 4) {
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.f3 == 6) {
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    }
    if (env.f1 == 2 && env.f2 == 4 && env.f3 == 6) {
      x.setPositionDirectly(JXG.COORDS_BY_USER, [1,0]); 
      x_h.setPositionDirectly(JXG.COORDS_BY_USER, [2,0]); 
	  x.prepareUpdate().update(true).updateRenderer();
      x_h.prepareUpdate().update(true).updateRenderer();
      fx.prepareUpdate().update(true).updateRenderer();
      fx_h.prepareUpdate().update(true).updateRenderer();
      board0.update();
    }
};
 
```

# --outlinebox b
[**Definition 2**](::important/tooltip) 
The **derivative** of a function $f$ begins with the [slope of a secant line](:=showSecant=true). It's the change in $y$ over the change in $x$ for the two points on the secant.  Then we let the points defining our secant line get very [close together](::instructions1/tooltip,transparent) by letting the value of $h$ get very small. We call this taking the limit as $h$ goes to $0$. [limit](:=showLimit=true)
[](:!formula1|markdown)
# --outlinebox

# :::: important
##### This is the most important definition in all of calculus
# ::::

# :::: instructions1
Drag the green dot towards the red dot.
# ::::
The definition of the derivative describes a process you've already done many times in this primer! 

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

## Using the Definition of the Derivative
Great we have a definition, but what do we do with it?  The definition of the derivative is a general formula meaning you can use it for any continuous function.  We want to use it for the function $f(x) = x^2$.  We need to take our definition and replace the general references to a function $f(x)$ and $f(x+h)$ with expressions for our specific function. Type in the more specific expressions below.

$f(x)$ becomes [](:?f) [Formatting Tips](::tips/tooltip,transparent)
$f(x+h)$ becomes [](:?fx_h)
[](:!formula2|markdown)


# :::: tips
- exponents $x^y$ can be entered as `x^y`
- don't forget parentheses where needed
# ::::

# :::: algebra
Now we have to do some algebra. First we [expand](:=expand=true) $(x+h)^2$.  Then we [combine](:=combine=true) like terms. [Cancel](:=cancel=true) the $h$'s.  Finally we evaluate the limit. To do this, think about what would happen to the expression $2x + h$ as the value of $h$ gets close to $0$. It becomes the expression $2x$.  Therefore, the derivative of $f(x) = x^2$ is
$$f'(x) = 2x$$
We can use this function to find the instantaneous rate of change of our function for any value of $x$.
# :::: 


```javascript /autoplay

var limitpre = '$$\\lim_{h \\to 0} \\frac{';
var f_x = 'f(x)';
var f_xh = 'f(x+h)';
var limitpost = '}{h}$$';

var makelimit = function() {
	return limitpre + f_xh + '-' + f_x + limitpost;
};

smartdown.setVariable('f', '');
smartdown.setVariable('fx_h', '')
smartdown.setVariable('formula2', makelimit());
this.dependOn = ['f', 'fx_h'];
this.depend = function() {
	if (env.f == 'x^2') {
		f_x = env.f;
		smartdown.setVariable('formula2', makelimit());
	}
	else {
		f_x = 'f(x)';
		smartdown.setVariable('formula2', makelimit());
	}

	if (env.fx_h == '(x+h)^2') {
		f_xh = env.fx_h;
		smartdown.setVariable('formula2', makelimit());
	}
	else {
		f_xh = 'f(x+h)';
		smartdown.setVariable('formula2', makelimit());
	}

	if (env.f == 'x^2' && env.fx_h == '(x+h)^2') {
		smartdown.showDisclosure('algebra','','transparent'); 
	}
  };
```

```javascript /autoplay
var start = '\\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}';
var algebra1 = '= \\lim_{h \\to 0} \\frac{x^2 + 2hx + h^2 - x^2}{h}';
var algebra2 = ' = \\lim_{h \\to 0} \\frac{2hx + h^2}{h}';
var algebra3 =  '= \\lim_{h \\to 0} 2x + h';

smartdown.setVariable('expand', false);
smartdown.setVariable('combine', false);
smartdown.setVariable('cancel', false);
//smartdown.setVariable('formula3', '$$' + start + '$$');
this.dependOn = ['expand','combine','cancel'];
this.depend = function() {
	if (env.expand == true && env.combine == false && env.cancel == false) {
		smartdown.setVariable('formula2', '$$' + start + algebra1 + '$$');
	}
	if (env.expand == true && env.combine == true && env.cancel == false) {
		smartdown.setVariable('formula2', '$$' + start + algebra1 + algebra2 + '$$');
	}	
	if (env.expand == true && env.combine == true && env.cancel == true) {
		smartdown.setVariable('formula2', '$$' + start + algebra1 + algebra2 + algebra3 + '$$');
	}

  };
```



[Applications of Derivaties](:@CalculusPrimer/AppDerivatives)
[Back to Home Page](:@CalculusPrimer/Home)


# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::


