


### The Main Idea of Calculus

In geometry class you learn how to solve lots of important problems that deal with shapes and lines, points and angles.  It's all very useful for answering questions that occur in everyday life.  However, most of what you learn in geometry deals with straight lines: lines, squares, rectangles, polygons.  The only curves we learn about are circles.  The tasks of geometry, like finding areas and volumes, seem much harder for curvy shapes.  

# --outlinebox mainidea
**The Main Idea of Calculus:** from *Burn Math Class* by Jason Wilkes

If we zoom in on curvy stuff, it starts to look more and more straight.  
# --outlinebox

![fullwidth](https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1479851209/sunrise-2014-EARTH1116.jpg?itok=T8sGC69d)

Take a curvy shape like the earth, and zoom in super close.  Let's consider a sample of the earth's surface that is about 20 square miles.  For most of what we do in our daily lives on our 20 square mile plot, we can assume that the earth is flat and that works pretty well.   It wasn't until the 17th century that we conclusively determined that the earth was round, so it worked pretty well for a majority of human existence. 

A flat approximation is great because it makes the math easy.  However, if we want to fly from California to New York in an airplane, or if we are interested in launching satellites or sending robots to Mars then we have to zoom out and consider the full curvy shape of the earth.  The trick of calculus is to zoom in real close until we can pretend our curve is flat. We do our math there with straight lines.  We then glue lots of tiny straight line  solutions together to get a result that works for the full curvy shape.

Let's use this strategy to figure out the area of a circle.  We'll start by dividing the circle into 4 pie pieces.  We have two views of our pieces, first as a circle and second, arranged in line with the pieces alternating directions. We'll approximate the area of the circle by calculating the area of the four triangles which have nice straight lines and areas that are easy to calculate.  Currently our approximation is too small.  The triangles don't cover all the area in the circle.  Now let's zoom in and make the triangles smaller by sliding the **number of triangles** slider to the right.    

# :::: instructions
Drag the slider to the left and the right.
# ::::

Number of Triangles [](:-triangles/1/40/1) [](:!triangles) [Application Notes](::instructions/tooltip)
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
As we add more and more triangles, our approximation gets better and better. The rearranged version of the circle looks more and more like a rectangle as the number of triangles gets larger. 
The area of this rectangle is getting closer and closer to [[](:!areaCircle)](::pulldown1/tooltip).

# :::: pulldown1
[](:Xa1) 64
[](:Xa2) $\pi r^2$
[](:Xa3) $\infty$
# ::::

```javascript/autoplay
smartdown.setVariable('areaCircle','???');
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

Number of Polygon Sides[](:-polygon/3/99/1) [](:!polygon) [Application Notes](::instructions/tooltip)
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

As the number of sides gets larger and larger, the ratio of a polygons perimeter to it's diameter is getting closer and closer to [[](:!pi)](::pulldown2/tooltip).

# :::: pulldown2
[](:Xa4) $\pi$
[](:Xa5) 3
[](:Xa6) $r^2$
# ::::


```javascript/autoplay
smartdown.setVariable('a4', false);
smartdown.setVariable('a5', false);
smartdown.setVariable('a6', false);
smartdown.setVariable('pi', '???');

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



### Coming Up Next

[The Result of an Infinite Process](:@CalculusPrimer/InfiniteProcess)
[Back to Home Page](:@CalculusPrimer/Home)

