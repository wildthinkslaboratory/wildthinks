
### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

----

[constant](:=constant=true) [linear](:=linear=true) [polynomial](:=polynomial=true)
[Approximation Quality](:!quality)
```javascript /playable/autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;


JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-1,20,5,-5], keepaspectratio:false, axis:true});

var l = function(x) { return x * x; }
var l_graph = board0.create('functiongraph', [l,-5,5], {strokeColor:'#777777', visible:true});
var boardInfo = new BoardInfo(board0);
var rectangles = [];

smartdown.setVariable('quality', 0);
let computeError = function() {
	let area = 0;
	for (let i=0; i < rectangles.length; i++) {
		area += rectangles[i].area();
	}

	smartdown.setVariable('quality', (100 * area * 3 / 64).toFixed(2));

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
  	var xInterval = new XInterval(board0, x, x+ 0.5);
	rectangles.push(new calclib.AdjRectangle(boardInfo, xInterval, l, false));

}


````

[Adjustable Secant](:@CalculusPrimer/AdjustableSecantLine)