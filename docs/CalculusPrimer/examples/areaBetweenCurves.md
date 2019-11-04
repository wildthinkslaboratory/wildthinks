# :::: prompt
This curve describes speed of a car through time.  Use rectangles to estimate how far the car travels between time $t=0$ and time $t=4$?
# ::::

# :::: controlPanel
# --colorbox cp
[Rectangle Secant Array](:=useRectangle=true) [Undo](:=undo=true) [Submit](:=submit=true)
Rectangle Area [](:!area)
Percent Correct [](:!quality)%
# --colorbox
# ::::


----
[Control Panel](::controlPanel/button,transparent,center,draggable,closeable)

### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

```javascript /autoplay/kiosk
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js

smartdown.showDisclosure('prompt', '', 'center,draggable,shadow,closeable');
smartdown.showDisclosure('controlPanel','','transparent,bottomright,draggable,shadow');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1,10,3,-5], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
      {name:'time (s)', 
      withLabel: true,
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-80, 20]   // (in pixels)
      }
      });
var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'rate (m/s)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   

var l1 = function(x) { return - x * x + 8; }
var l2 = function(x) { return Math.pow(x,3)/3 - x*x + 4}
var l_graph = board0.create('functiongraph', [l1,0,5], {strokeColor:'#999999', strokeWidth:3, visible:true});
var l_graph = board0.create('functiongraph', [l2,0,5], {strokeColor:'#999999', strokeWidth:3, visible:true});
var boardInfo = new BoardInfo(board0);


this.dependOn = [];
this.depend = function() {

};


board0.on('update', function() {
	computeError();
});

this.div.onmousedown = function(e) { 
	
	let lx = board0.getBoundingBox()[0];
	let rx = board0.getBoundingBox()[2];
	let width = this.offsetWidth;
	console.log('width', width, 'mouse x', e.clientX);
	let percent = e.clientX / width;
	let x = lx + (rx - lx) * percent;

	if (addRect) {
		var xInterval = new XInterval(board0, x, x + 0.5);
		moves.push(new calclib.RectangleArray(boardInfo, xInterval, l1, false));
	}

}


````

[Adjustable Secant](:@CalculusPrimer/AdjustableSecantLine)