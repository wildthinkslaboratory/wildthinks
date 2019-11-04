### Adjustable Rectangle Class

This rectangle is adjustable because you can change the $x$ axis interval by dragging the green and red dots.  Green for 'go' and red for 'stop' to indicate the beginning and end of interval.  The rectangle will snap to the function if dragged close to it.  Once snapped it tends to stay snapped if you continue to adjust the interval unless you drag to quickly. Area is shown on mouseover.

----

[constant](:=constant=true) [linear](:=linear=true) [polynomial](:=polynomial=true)
N [](:-num/1/100/1) [](:!num) 
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

smartdown.setVariable('constant', false);
smartdown.setVariable('linear', true);
smartdown.setVariable('polynomial', false);
smartdown.setVariable('num', 20);
let oldN = 20;

JXG.Options.axis.ticks.majorHeight = 40;
// create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[-5,5,5,-5], keepaspectratio:false, axis:true});

var c = function(x) { return 2; }
var l = function(x) { return x; }
var p = function(x) { return x * x * x / 25; };
var c_graph = board0.create('functiongraph', [c,-5,5], {strokeColor:'#777777', visible:false});
var l_graph = board0.create('functiongraph', [l,-5,5], {strokeColor:'#777777', visible:true});
var p_graph = board0.create('functiongraph', [p,-5,5], {strokeColor:'#777777', visible:false});

var xInterval = new XInterval(board0, 1, 3);
var boardInfo = new BoardInfo(board0);
var rectangleArray = new calclib.RectangleArray(boardInfo, xInterval, l, env.num);



this.dependOn = ['constant', 'linear', 'polynomial', 'num'];
this.depend = function() {
	if (env.constant == true) {
		smartdown.setVariable('constant', false);
		c_graph.setAttribute({visible:true});
		l_graph.setAttribute({visible:false});
		p_graph.setAttribute({visible:false});
		rectangleArray.setFunction(c);
	}
	if (env.linear == true) {
		smartdown.setVariable('linear', false);
		c_graph.setAttribute({visible:false});
		l_graph.setAttribute({visible:true});
		p_graph.setAttribute({visible:false});
		rectangleArray.setFunction(l);
	}
	if (env.polynomial == true) {
		smartdown.setVariable('polynomial', false);
		c_graph.setAttribute({visible:false});
		l_graph.setAttribute({visible:false});
		p_graph.setAttribute({visible:true});
		rectangleArray.setFunction(p);
	}

	if (env.num != oldN) {
		rectangleArray.setN(env.num);
		oldN = env.num;
	}
	board0.update();
}

````

[Secant Array](:@CalculusPrimer/SecantArray)