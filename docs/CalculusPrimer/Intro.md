
## How Do You Find the Area of a Curvy Shape?

You know how to find the area of a square, a triangle or a trapezoid.  With the exception of circles, almost everything you've learned about geometry deals with straight lines.  How do we find the area of the curvy shape below?  

# :::: instructions1
Drag the red dots along the curve to investigate the area of the shaded region.
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


// create the board
board0 = JXG.JSXGraph.initBoard('box0', {boundingbox:[-4,22,5,-2], keepaspectratio:false, axis:false});

 // parabala and it's derivative
var g = function(x) { return  10 * Math.cos(Math.PI * x) + 10; };
var graph_g = board0.create('functiongraph', [g,-5,5], {strokeColor:'#7700FF'});
var i1 = board0.create('integral', [[-1.6, 3], graph_g], {fillColor:'#0077FF', fillOpacity:0.3});

smartdown.setVariable('area', i1.Value().toFixed(2));
board0.on('update', function() {
  smartdown.setVariable('area', i1.Value().toFixed(2));
});

```
-----

We can see that the area of one of these blue lumps is [[](:!twenty)](::pulldown2/tooltip/transparent), but how did we come up with that value?  Answer: we used calculus.

# :::: pulldown2
[](:Xa7) 7
[](:Xa8) 20
[](:Xa9) 300
# ::::


```javascript/autoplay
smartdown.setVariable('a7', false);
smartdown.setVariable('a8', false);
smartdown.setVariable('a9', false);
smartdown.setVariable('twenty', '________');

this.dependOn = ['a7', 'a8', 'a9'];

this.depend = function() {
  if (env.a7 == false && env.a8 == true && env.a9 == false) {
      smartdown.setVariable('twenty', '20');
      smartdown.showDisclosure('correct','','bottomright'); 
      setTimeout(function () {
           smartdown.hideDisclosure('correct','','bottomright'); 
      }, 3000);
    } 
  };
```

## The Main Idea of Calculus

# --outlinebox mi
If we zoom in on curvy stuff, it starts to look more and more straight. 

from *Burn Math Class* by Jason Wilkes 
# --outlinebox



### Example 1: Area of a Circle

[Read](::circleApp/transparent)
![](https://gist.github.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/25cdd12010ff563e89b8963523c1ff1f02bd2d1d/circleAreaApp.mp3)
# :::: circleApp
We'll divide our circle into 4 pie pieces.  We have two views of our pieces, first inside the circle and second, arranged in line with the pieces alternating directions. We'll approximate the area of the circle by calculating the area of the four triangles.  Currently our approximation is too small since the triangles don't cover all the area in the circle.  To improve our approximation we can increase the number of triangles.
# ::::

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
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('triangles', 4);
var N = 4;

// get the number of triangles from smartdown cell
this.dependOn = ['triangles'];
this.depend = function() {
  board.suspendUpdate();
  N = parseInt(env.triangles);
  board.unsuspendUpdate();
};

// create the board
board = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1.5,2,8,-1], keepaspectratio:true, axis:false});

// dimensions of the final rectangle with labels
var rText = board.create('text',[2.85,0.5,'r'], {fontSize:16});
var rText = board.create('text',[5.4,1.6,'&#960 r'], {fontSize:16});
var rDim = board.create('line',[[3,0],[3,1]], {straightFirst:false, straightLast:false, strokeWidth:2, color:'black'});
var cDim = board.create('line',[[3.9,1.5],[3.9 + Math.PI,1.5]], {straightFirst:false, straightLast:false, strokeWidth:2, color:'black'});

// draw the circle
var circ = board.create('circle',[[1,0],1],{strokeWidth:1, strokecolor:'blue', strokeWidth:2});
var xshift = 4;        

var r = 1;


// draw the rearranged triangles curves
var rectArcs = board.create('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2}); 
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
var c1 = board.create('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2}); 
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
var c2 = board.create('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2}); 
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

```
As we add more and more triangles, our approximation gets better and better. The rearranged version of the circle looks more and more like a rectangle as the number of triangles gets larger. The area of this rectangle is getting closer and closer to [[](:!areaCircle)](::pulldown1/tooltip/transparent).

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
      smartdown.showDisclosure('yes','','bottomright');  
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
myDiv.innerHTML = `<div id='box2' class='jxgbox' style='height:600px;'>`;

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
      smartdown.showDisclosure('correct','','bottomright'); 
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


// create the board
board5 = JXG.JSXGraph.initBoard('box5', {boundingbox:[-4,22,5,-2], keepaspectratio:false, axis:false});

 // parabala and it's derivative
var g = function(x) { return  10 * Math.cos(Math.PI * x) + 10; };
var graph_g = board5.create('functiongraph', [g,-5,5], {strokeColor:'#7700FF'});
var i1 = board5.create('integral', [[-3, 3], graph_g], {fillColor:'#0077FF', fillOpacity:0.3});

```
Returning to our original question, can you think of a strategy to approximate the area of the shaded region?
# --outlinebox
# --aliceblue


### Coming Up Next

[The Result of an Infinite Process](:@CalculusPrimer/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/Home)

