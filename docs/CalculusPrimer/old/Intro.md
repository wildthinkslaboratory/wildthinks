
## How Do You Find the Area of a Curvy Shape?

You know how to find the area of a rectangle, a triangle or a trapezoid, but how do we compute the area of the strange curvy shape below?

# :::: instructions1
Drag the red and green dots to the left and right to investigate the area of the shaded region.
# ::::
Area of Shaded Region [](:?area) [Application Notes](::instructions1/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box0' class='jxgbox' style='height:300px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box0', {boundingbox:[-2,40,8,-6], keepaspectratio:false, axis:true});

 // parabala and it's derivative
var g = function(x) { return  - Math.pow(x,3) + 6 * x * x; };
var graph_g = board0.create('functiongraph', [g,-3,10], {strokeColor:'#7700FF'});
var x = board0.create('glider', [0, 0, board0.defaultAxes.x], {name: '', size:5});
var xh = board0.create('glider', [6, 0, board0.defaultAxes.x], {name: '', color:'green', size:5});
var i1 = board0.create('integral', [[
  function() { return x.X(); },
  function() { return xh.X();}], graph_g], {fillColor:'#0077FF', fillOpacity:0.3});

smartdown.setVariable('area', i1.Value().toFixed(4));
board0.on('update', function() {
  smartdown.setVariable('area', i1.Value().toFixed(4));
});



```

Calculus is all about working with curvy shapes.  Finding the area of curvy shapes is just one of the many cool things we can do with calculus.


## The Main Idea of Calculus

# --outlinebox mi
If we zoom in on curvy stuff, it starts to look more and more straight. 

from *Burn Math Class* by Jason Wilkes 
# --outlinebox



### Example 1: Area of a Circle

Let's take a circle and divide it into four pieces. [4 pieces](:=pieces=true)  Now let's lay those pieces out in a line with the pieces alternating directions. [pieces in a line](:=inLine=true) 

The four red triangles give us an approximation of the circle's area, but it's not a very good one.  We can see that the triangles don't cover all the area in the circle.  Our approximation would be better if we had more triangles.  Drag the slider to the right to get more triangles.

# :::: instructions2
Drag the slider to the left and the right.
# ::::

Number of Triangles [](:-triangles/1/40/1) [](:!triangles) [Application Notes](::instructions2/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

console.log('test log');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:400px;'>`;

smartdown.setVariable('triangles', 4);
var N = 4;


// create the board
board = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1.5,2,8,-1], keepaspectratio:true, axis:false});

// dimensions of the final rectangle with labels
var rText = board.create('text',[2.85,0.5,'r'], {fontSize:16, fixed:true, visible:false});
var cText = board.create('text',[5.4,1.7,'&#960 r'], {fontSize:16, fixed:true, visible:false});
var rDim = board.create('line',[[3,0],[3,1]], {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', fixed:true, visible:false});
var cDim = board.create('line',[[3.9,1.5],[3.9 + Math.PI,1.5]], {straightFirst:false, straightLast:false, strokeWidth:2, color:'black', fixed:true, visible:false});

// draw the circle
var circ = board.create('circle',[[1,0],1],{strokeWidth:1, strokecolor:'blue', strokeWidth:2});
var xshift = 4;        

var r = 1;


// draw the rearranged triangles curves
var rectArcs = board.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2, visible:false}); 
rectArcs.updateDataArray = function() {  
    let x = [xshift];
    let y = [0];
    let phi = Math.PI/N;
    let h = r*Math.cos(phi);
    let s = r*Math.sin(phi);
    let px = 0; 
    let py = 0;
    let sgn = 1; 
    let d = 16; 
    let dt = phi/d; 
  
    // draw the blue arcs                  
    for (let i=0; i<N; i++) {                          // for each triangle
        for (let j=-d; j<=d; j++) {                    // number of points in the blue arc
            let pt = dt*j;
            x.push(px+r*Math.sin(pt) + xshift);
            y.push(sgn*r*Math.cos(pt)-(sgn-1)*h*0.5);
        }
        px += s;
        sgn *= (-1);  // up or down
    }

    x.push((N-1)*s + xshift);
    y.push(h+(sgn-1)*h*0.5);
    this.dataX = x;
    this.dataY = y;
}


// draw the red triangles in the rearranged triangles
var c1 = board.create('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2, visible:false}); 
c1.updateDataArray = function() { 
    let x = [xshift];  // put the starting point in
    let y = [0];
    let phi = Math.PI/N;
    let h = r*Math.cos(phi);
    let s = r*Math.sin(phi);
    let px = 0, py = 0;  
    let dt = phi*2; 
                   
    let sgn = 1;
    for (let i=0; i<N; i++) {
        for (let j=-1; j<=1; j=j+2) {
            let pt = dt*j/2;
            x.push(px+r*Math.sin(pt) + xshift);
            y.push(sgn*r*Math.cos(pt)-(sgn-1)*h*0.5);
        }
        px += s;
        sgn *= (-1);
    }

    x.push((N-1)*s + xshift);  // add the last point
    y.push(h+(sgn-1)*h*0.5);
    this.dataX = x;
    this.dataY = y;
}

// draw red triangles in circle
var c2 = board.create('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2,visible:false}); 
c2.updateDataArray = function() {
    let px = circ.midpoint.X(); 
    let py = circ.midpoint.Y();  
    let x = [px]; 
    let y = [py];
    let phi = Math.PI/N;
    let s = r*Math.sin(phi);
    let dt = phi*2;
    let pt = Math.PI*0.5+phi;
                    
    for (let i=0; i<N; i++) {
        for (let j=-1; j<=1; j=j+2) {
            x.push(px+r*Math.cos(pt));
            y.push(py+r*Math.sin(pt));
            pt -= dt;
        }
        x.push(px);
        y.push(py);
        pt += dt;
    }
    this.dataX = x;
    this.dataY = y;
}
            
board.update();

smartdown.setVariable('pieces', false);
smartdown.setVariable('inLine', false);
smartdown.setVariable('showradius', false);
smartdown.setVariable('showcirc', false);

this.dependOn = ['pieces','inLine', 'triangles', 'showradius', 'showcirc'];
this.depend = function() {
  if (env.pieces == true) {
    c2.setAttribute({visible:true});
  }
  if (env.inLine == true) {
    c1.setAttribute({visible:true});
    rectArcs.setAttribute({visible:true});
  }
  if (env.showradius == true) {
    rText.setAttribute({visible:true});
    rDim.setAttribute({visible:true});
  }
  if (env.showcirc == true) {
    cText.setAttribute({visible:true});
    cDim.setAttribute({visible:true});
  }

  board.suspendUpdate();
  N = parseInt(env.triangles);
  board.unsuspendUpdate();
}


```
As we add more and more triangles, our approximation gets better. The rearranged version of the circle looks more and more like a rectangle. What are the dimensions of this rectangle?  The height of the rectangle is getting very close to the radius of the cirle. [circle radius](:=showradius=true)  

Look at what happens to the circumference of the circle in the rectangle. Half the circumference is along the top of the rectangle and the other half is along the bottom. The length of the rectangle is getting closer to $\pi r$ which is half of the circumference of the circle. [show half circumference](:=showcirc=true) The area of this rectangle is getting closer and closer to [[](:!areaCircle)](::pulldown1/tooltip/transparent). 

# :::: pulldown1
[](:Xa1) 64
[](:Xa2) $\pi r^2$
[](:Xa3) $\infty$
# ::::

```javascript/autoplay
smartdown.setVariable('areaCircle','________');
smartdown.setVariable('a1', false);
smartdown.setVariable('a2', false);
smartdown.setVariable('a3', false);
this.dependOn = ['a1', 'a2', 'a3'];

this.depend = function() {
  if (env.a2 == true && env.a1 == false && env.a3 == false) {
      smartdown.setVariable('areaCircle','the area of our circle');
      smartdown.showDisclosure('yes','','bottomright,transparent,shadow');  
      setTimeout(function () {
           smartdown.hideDisclosure('yes','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: yes
# --colorbox yes
YES! :ok_hand:
# --colorbox
# ::::



### Another Fun Example
Here's a similar example playing with polygons.  We look at the ratio of a polygon's perimeter to its diameter.

Number of Polygon Sides[](:-polygon/3/99/1) [](:!polygon) [Application Notes](::instructions2/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:400px;'>`;

smartdown.setVariable('polygon', 4);
var N = 4;


var perimeter = function() {
    let Phi = (Math.PI)/N;
    return 2*N*(Math.sin(Phi));
}

var diameter = function() {
    let Phi = (Math.PI)/N;
    if (N % 2) {
        return 1 + Math.cos(Phi);
    }
    return 2 * Math.cos(Phi);
}


// create the brd
brd = JXG.JSXGraph.initBoard('box2', {boundingbox:[-1.5,2,8,-1], keepaspectratio:true, axis:false});

var pText = brd.create('text', [3,0, function() { return 'perimeter = ' + perimeter().toFixed(4).toString(); }], {fontSize:30});

var dText = brd.create('text', [3,-0.3, function() { return 'diameter = ' + diameter().toFixed(4).toString(); }], {fontSize:30});

var piText = brd.create('text', [3,-0.6, 
    function() { return 'perimeter/diameter = ' + (perimeter()/diameter()).toFixed(4).toString(); }], 
    {fontSize:30});


// invisible circle
var circ = brd.create('circle',[[1,0],1],{strokeWidth:1, strokecolor:'blue', strokeWidth:2, visible:false});
var r = 1;

// draw polygon sides
var c2 = brd.create('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2}); 
c2.updateDataArray = function() {
    let px = circ.midpoint.X(); 
    let py = circ.midpoint.Y();  
    let x = []; 
    let y = [];
    let Phi = (Math.PI)/N;
    let s = r*Math.sin(Phi);
    let dt = Phi*2;
    let pt = Math.PI*0.5+Phi;
                 
    for (let i=0; i<N; i++) {
        for (let j=-1; j<=1; j=j+2) {
            x.push(px+r*Math.cos(pt));
            y.push(py+r*Math.sin(pt));
            pt -= dt;
        }
        //x.push(px);
        //y.push(py);
        pt += dt;
    }
    this.dataX = x;
    this.dataY = y;
}

// draw diameter
var c = brd.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2}); 
c.updateDataArray = function() {

    let px = circ.midpoint.X(); 
    let py = circ.midpoint.Y();  
    let Phi = (Math.PI)/N;
    let d = r*Math.cos(Phi);
    if (N % 2) { d = 1; }
    let x = [px,px,px]; 
    let y = [py+r*Math.cos(Phi),py,py - d];
                 
    this.dataX = x;
    this.dataY = y;
}

brd.update();

// get the number of sides for polygon from smartdown cell
this.dependOn = ['polygon'];
this.depend = function() {
  brd.suspendUpdate();
  N = parseInt(env.polygon);
  brd.unsuspendUpdate();
};


```
---

As the number of sides gets larger and larger, the ratio of a polygons perimeter to it's diameter is getting closer and closer to [[](:!pi)](::pulldown3/tooltip/transparent).

# :::: pulldown3
[](:Xa4) $\pi$
[](:Xa5) 3
[](:Xa6) $r^2$
# ::::


```javascript/autoplay
smartdown.setVariable('a4', false);
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
smartdown.setVariable('pi', '________');

this.dependOn = ['a4', 'a5', 'a6'];

this.depend = function() {
  if (env.a4 == true && env.a5 == false && env.a6 == false) {
      smartdown.setVariable('pi', 'Pi');
      smartdown.showDisclosure('correct','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```

# :::: correct
# --colorbox right
correct! :grinning:
# --colorbox
# ::::

# --aliceblue ct
## Concluding Thoughts

# :::: instructions4
Drag the slider to the left and the right.
# ::::

Number of Lines [](:-lines/3/50/1) [](:!lines) [Application Notes](::instructions4/tooltip/transparent)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

console.log('test log');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box4' class='jxgbox' style='height:300px;'>`;

smartdown.setVariable('lines', 20);
var N = 20;


// create the board
board4 = JXG.JSXGraph.initBoard('box4', {boundingbox:[-2,22,2,-2], keepaspectratio:false, axis:false});

// get the number of triangles from smartdown cell
this.dependOn = ['lines'];
this.depend = function() {
  board4.suspendUpdate();
  N = parseInt(env.lines);
  board4.unsuspendUpdate();
};

 // parabala and it's derivative
var g = function(x) { return  10 * Math.cos(Math.PI * x) + 10; };
var graph_g = board4.create('functiongraph', [g,-5,5], {strokeColor:'#3333FF', strokeWidth:2});


// draw the red triangles in the rearranged triangles
var tinylines = board4.create('curve', [[0],[0]],{strokecolor:'purple', strokeWidth:2}); 
tinylines.updateDataArray = function() { 

    let delta = 4/N;
    let x = [];
    let y = [];
    for (let i=-4; i < 5; i += delta) {
        x.push(i);
        y.push(g(i));
    }
    this.dataX = x;
    this.dataY = y;
}


board4.update();

```
----
1. We can approximate a curve by connecting lots of very tiny straight lines.

2. Whatever math we need to do, we'll do it on the tiny straight line pieces or shapes. 

3. We can glue the tiny straight line  solutions together to get a result that works for the full curvy shape.  

Calculus is an ingenious and practical way to achieve this process.  The magic happens in how we assemble the small solutions into the full solution.

# --outlinebox q1
#### Question

```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box5' class='jxgbox' style='height:300px;'>`;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board5 = JXG.JSXGraph.initBoard('box5', {boundingbox:[-2,40,8,-6], keepaspectratio:false, axis:true});

 // parabala and it's derivative
var g = function(x) { return  - Math.pow(x,3) + 6 * x * x; };
var graph_g = board5.create('functiongraph', [g,-3,10], {strokeColor:'#7700FF'});
var i1 = board5.create('integral', [[0,6], graph_g], {fillColor:'#0077FF', fillOpacity:0.3});


```


Returning to our original question, try to think of a strategy to approximate the area of the shaded region that involves lots of tiny straight line shapes? How would you do it?
# --outlinebox
# --aliceblue


### Coming Up Next

[Another Curvy Question](:@CalculusPrimer/speed)
[Back to Home Page](:@CalculusPrimer/Home)

