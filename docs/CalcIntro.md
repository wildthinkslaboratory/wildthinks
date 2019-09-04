

### The Main Idea of Calculus

In geometry class you learn how to solve lots of important problems that deal with shapes and lines, points and angles.  It's all very useful for answering questions that occur in everyday life.  However, most of what you learn in geometry deals with straight lines: lines, squares, rectangles, polygons.  The only curves we learn about are circles.  The tasks of geometry, like finding areas and volumes, seem much harder for curvy shapes.  

# --outlinebox mainidea
**The Main Idea of Calculus:** from *Burn Math Class* by Jason Wilkes

If we zoom in on curvy stuff, it starts to look more and more straight.  
# --outlinebox

![fullwidth](https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1479851209/sunrise-2014-EARTH1116.jpg?itok=T8sGC69d)
Take a curvy shape like the earth, and zoom in super close.  Let's consider a sample of the earth's surface that is about 20 square miles.  That's big enough so most of us wouldn't want to walk across it in a single day.  For most of what we do in our daily lives on our 20 square mile plot, a flat earth approximation works pretty well.  It also worked well for a majority of human existence.  It wasn't until the 17th century that we conclusively determined that the earth was round.
 

A flat approximation is great because it makes the math easy.  However, if we want to fly from California to New York in an airplane, or if we are interested in launching satellites or sending robots to Mars then we have to zoom out and consider the full curvy shape of the earth.  The trick of calculus is to cut our shape up into lots and lots of tiny zoomed in pieces where we can pretend our curve is flat.  Then we use straight line math on the tiny pieces. Finally, we glue all the little pieces back together to get a result that works for the full curvy shape.

Let's use this strategy to figure out the area of a circle.  We'll start by dividing the circle into 4 pie pieces.  We have two views of our pieces, first as a circle and second, arranged in line with the pieces alternating directions. We'll approximate the area of the circle by calculating the area of the four triangles which have nice straight lines and areas that are easy to calculate.  Currently our approximation is too small.  The triangles don't cover all the area in the circle.  Now let's zoom in and make the triangles smaller by sliding the **number of triangles** slider to the right.    


[Number of Triangles](:-triangles/1/40/1) [](:!triangles)


```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px;'>`;

smartdown.setVariable('triangles', 4);
var N = 4;

this.dependOn = ['triangles'];
this.depend = function() {
  board.suspendUpdate();
  N = parseInt(env.triangles);
  board.unsuspendUpdate();
};



 board = JXG.JSXGraph.initBoard('box', {boundingbox:[-1.5,2,8,-3], keepaspectratio:true, axis:false});
        // var N = board.createElement('slider', [[0,1.5],[3,1.5],[1,4,40]], {name:'number of triangles',snapWidth:1});
        var circ = board.createElement('circle',[[1,0],1],{strokeWidth:1, strokecolor:'blue', strokeWidth:2});
		var xshift = 4;        

        var c = board.createElement('curve', [[0],[0]],{strokecolor:'blue', strokeWidth:2}); 
        c.updateDataArray = function() {
                var r = 1, n = N, 
                    x = [xshift], y = [0],
                    phi = Math.PI/n,
                    h = r*Math.cos(phi),
                    s = r*Math.sin(phi),
                    i, j, 
                    px = 0, py = 0, sgn = 1, 
                    d = 16, 
                    dt = phi/d, 
                    pt;
                    
                for (i=0;i<n;i++) {
                    for (j=-d;j<=d;j++) {
                        pt = dt*j;
                        x.push(px+r*Math.sin(pt) + xshift);
                        y.push(sgn*r*Math.cos(pt)-(sgn-1)*h*0.5);
                    }
                    px += s;
                    sgn *= (-1);
                }
                x.push((n-1)*s + xshift);
                y.push(h+(sgn-1)*h*0.5);
                this.dataX = x;
                this.dataY = y;
            }


        var c1 = board.createElement('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2}); 
        c1.updateDataArray = function() {
                var r = 1, n = N, 
                    x = [x], y = [0],
                    phi = Math.PI/n,
                    h = r*Math.cos(phi),
                    s = r*Math.sin(phi),
                    i, j, 
                    px = 0, py = 0, sgn = 1, 
                    d = 1/2, 
                    dt = phi/d, 
                    pt;
                    
                for (i=0;i<n;i++) {
                    for (j=-d;j<=d;j++) {
                        pt = dt*j;
                        x.push(px+r*Math.sin(pt) + xshift);
                        y.push(sgn*r*Math.cos(pt)-(sgn-1)*h*0.5);
                    }
                    px += s;
                    sgn *= (-1);
                }
                x.push((n-1)*s + xshift);
                y.push(h+(sgn-1)*h*0.5);
                this.dataX = x;
                this.dataY = y;
            }


        var c2 = board.createElement('curve', [[0],[0]],{strokecolor:'red', strokeWidth:2}); 
        c2.updateDataArray = function() {
                var r = 1, n = N, 
                    px = circ.midpoint.X(), py = circ.midpoint.Y(),  
                    x = [px], y = [py],
                    phi = Math.PI/n,
                    s = r*Math.sin(phi),
                    i, j, 
                    d = 1/2, 
                    dt = phi/d, 
                    pt = Math.PI*0.5+phi;
                    
                for (i=0;i<n;i++) {
                    for (j=-d;j<=d;j++) {
                        x.push(px+r*Math.cos(pt));
                        y.push(py+r*Math.sin(pt));
                        pt -= dt;
                    }

                    x.push(px);
                    y.push(py);
                    pt += dt;
                }
                console.log('x',x);
                console.log('y',y);
                this.dataX = x;
                this.dataY = y;
            }
            board.update();
```

As we make the triangles smaller, the sum of their total area gets closer and closer to the area of the circle.  Our rearranged version of the triangles is also changing.  The more triangles we add the more it looks like a rectangle.  The width of the rectangle is getting closer to being the radius of the circle $r$ and the length of the rectangle is approaching half the circumference of the circle $\pi r$.  Move the slider back and forth until you've convinced yourself of these dimensions.  Now we have a classic straight line geometry problem for area.  Multiplying the length times the width we get an area of $\pi r^2$ for our circle.


### Coming Up Next

[Tangent Lines and While They're Cool](:@TangentLines)
# :::: todo

## To Do

- review current pages for:
	- bugs 
	- formatting issues (whitespace, color etc.) 
	- content

- differential calculus
	- tangent line what is it
	- motivation for tangent line
	- tangent line app 
- 

# ::::


