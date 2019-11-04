zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz


```javascript /autoplay/kiosk
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box1' class='jxgbox' style='height:800px;'>`;


xlow = -2;
xhigh = 10;
ylow = -2;
yhigh = 20;
JXG.Options.axis.ticks.majorHeight = 40;
//create the board
board0 = JXG.JSXGraph.initBoard('box1', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:false});

var xaxis = board0.create('axis', [[0, 0], [1,0]], 
  {name:'distance (cm)', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

var yaxis = board0.create('axis', [[0, 0], [0, 1]], 
      {name:'Force (lbs)', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-120, -20]   // (in pixels)
        }
      });   



var f = function(x) { return 4*x; };

var l_graph = board0.create('functiongraph', [f,0,xhigh], {strokeColor:'#999999', strokeWidth:3, visible:true});

var xInterval = new XInterval(board0, 1, 3);
var boardInfo = new BoardInfo(board0);
var rectSecArray = new calclib.SecantRectangleArray(boardInfo, xInterval, f, 20, true);




````
