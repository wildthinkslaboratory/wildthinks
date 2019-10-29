

/*
This class holds the board and sizing data.            
*/
class BoardInfo {
  constructor(b) {
    this.board = b;
    let boundingBox = this.board.getBoundingBox();
    this.Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
    this.Xerror = (boundingBox[2] - boundingBox[0]) / 50;  
  }
}


/*
   This creates an interval on the X axis.  The interval can be resized with two gliders x1 and x2 on 
   the X axis.  There is also a vertical glider midY in the middle of the interval.
*/
class XInterval {
  constructor(b, X1, X2) {
    let xline = b.create('line', [[0,0],[1,0]], {visible:false});
    this.x1 = b.create('glider', [X1,0,xline], {name: '', size:5, color:'green'});
    this.x2 = b.create('glider', [X2,0,xline], {name: '', size:5, color:'red'});
    this.midX = this.midX.bind(this);
    let vline = b.create('line', [[this.midX ,0], [this.midX, 1]], {visible:false});
    this.midY = b.create('glider', [this.midX(), 0, vline], {name: '', size:4, color:'#1111CC', visible:false});
  }

  midX() {
    return this.x1.X() + (this.x2.X() - this.x1.X()) / 2;
  }

}



function AdjRectangle(binfo, xinterval, F, vAdjust = true) {

  let board = binfo.board;
  let bi = binfo; 
  let verticalAdjust = vAdjust;  // allow vertical adjusting
  let showAnnotations = false;   
  let attachedFunction = F;  // function that determines it's height

  let xint = xinterval;
  if (verticalAdjust) { xint.midY.setAttribute({visible:true}); }
  let height = function() {
      if (verticalAdjust) { return xint.midY.Y(); }
      else { return attachedFunction(xint.midX()); }
  };

  // the two points that define the top of rectangle
  let f1 = board.create('point', [function() { return xint.x1.X(); }, height], {visible:false});
  let f2 = board.create('point', [function() { return xint.x2.X(); }, height], {visible:false});

  this.rect = board.create('polygon',
    [xint.x1, f1, f2, xint.x2], {strokeColor: '#333333',fillColor:'#1111FF', hasInnerPoints:true});

  let area = function() { return ((xint.x2.X() - xint.x1.X()) * height()).toFixed(3); }
  
  // these components are all part of the annotation
  let areaText = board.create('text', [
    function() { return xint.midX() - bi.Xerror;},
    function() { return height() / 2; },
    area
    ], {fontSize:15, visible:false});
  
  let p1 = board.create('point',[
    function() { return xint.x2.X() + bi.Xerror / 2; }, 
    height
    ],{visible:false});

  let p2 = board.create('point',[
    function() { return xint.x2.X() +  bi.Xerror / 2; }, 
    0 
    ],{visible:false});

  let dimensionLine = board.create('segment', [p1,p2], {
    strokeColor:'black', 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});
  let dimensionText = board.create('text', [
    function() { return xint.x2.X() + bi.Xerror; } ,
    function () { return height() / 2; },
    function() { return height().toFixed(3); }
    ],{fontSize: 15, visible:false});


  this.rect.on('over', function(e){
    turnOnAnnotations();
  });

  this.rect.on('out', function(e){
    if (!showAnnotations) {
      turnOffAnnotations();
    }
  });

  function turnOnAnnotations() {
    areaText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
  }

  function turnOffAnnotations() {
    areaText.setAttribute({visible:false});
    dimensionText.setAttribute({visible:false});
    dimensionLine.setAttribute({visible:false});
  }

  // functions we are exporting
  this.setHeight = function(h) {       
    xint.midY.setPositionDirectly(JXG.COORDS_BY_USER, [xint.midY.X(),h]); 
    xint.midY.prepareUpdate().update(true).updateRenderer();
  };

  this.snapToFunction = function() {
    let currentH = height();
    let functionH = attachedFunction(xint.midX());
    if (currentH <= functionH + bi.Yerror && currentH >= functionH - bi.Yerror) {
      this.setHeight(attachedFunction(xint.midX()));
    }
  };

  this.setFunction = function(f) { 
    attachedFunction = f; 
  };


  this.annotationsOn = function() { turnOnAnnotations(); }
  this.annotationsOff = function() { turnOffAnnotations(); }
  this.annotationsOn = this.annotationsOn.bind(this);
  this.annotationsOff = this.annotationsOff.bind(this);
};




/*
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
function AdjSecant(binfo, xinterval, F) {

  let board = binfo.board;
  let bi = binfo;    
  let f = F;  
  let showAnnotations = false;

  let xint = xinterval;
  
  let f1 = board.create('point', [
    function() { return xint.x1.X(); },  
    function() { return f(xint.x1.X());}
    ], {color: 'blue', size:3, name:'', visible:true});
  let f2 = board.create('point', [
    function() { return xint.x2.X(); } , 
    function() { return f(xint.x2.X());}
    ], {color: 'blue', size:3, name:'', visible:true});

  this.line = board.create('line', [f1, f2], {strokeColor:'blue', strokeWidth:3, straightFirst:false, straightLast:false, visible:true});
  let slope = function() { return  ((f(xint.x2.X()) - f(xint.x1.X())) / (xint.x2.X() - xint.x1.X())).toFixed(3); }

  let slopeText = board.create('text', [
    function() { return xint.midX() - 2 * bi.Xerror;},
    function() { return f1.Y() + (f2.Y() - f1.Y()) / 2 + bi.Yerror; },
    slope
    ], {fontSize:15, visible:false});

  let p3 = board.create('point',[ function() { return xint.x2.X(); }, function() { return f2.Y(); }],{visible:false});
  let p4 = board.create('point',[ function() { return xint.x2.X(); }, function() { return f1.Y(); } ],{visible:false});

  let dimensionLine = board.create('segment', [p3,p4], {
    strokeColor:'black', 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});

  let dimensionText = board.create('text', [
    function() { return xint.x2.X() + bi.Xerror/2; } ,
    function () { return f1.Y() + (f2.Y() - f1.Y()) / 2; },
    function() { return (f2.Y() - f1.Y()).toFixed(3); }
    ],{fontSize: 15, visible:false});


  this.line.on('over', function(e){
    turnOnAnnotations();
  });
  this.line.on('out', function(e){
    if (!showAnnotations) {
      turnOffAnnotations();
    }
  });

  function turnOnAnnotations() {
    slopeText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
  }

  function turnOffAnnotations() {
    slopeText.setAttribute({visible:false});
    dimensionText.setAttribute({visible:false});
    dimensionLine.setAttribute({visible:false});
  }


  this.setFunction = function(F) { f = F; };

  this.annotationsOn = function() { turnOnAnnotations(); }
  this.annotationsOff = function() { turnOffAnnotations(); }
  this.annotationsOn = this.annotationsOn.bind(this);
  this.annotationsOff = this.annotationsOff.bind(this);
};


function AdjSecantRect(binfo, xinterval, F, d) {
  let board = binfo.board; 
  let bi = binfo;
  let f = F;
  let rateCurve = d; 
  let showAnnotations = false;
  
  let xint = xinterval;
  xint.midY.setAttribute({visible:true});

  let rectangleFunction = function() { 
    if (rateCurve) {
      return f(xint.midX());      // height of rectangle is f is rateCurve
    }
    return  (f(xint.x2.X()) - f(xint.x1.X())) / (xint.x2.X() - xint.x1.X());  // slope of secant 
  };

  let secantFunction = function(x) {
    if (rateCurve) {
      if (x == xint.x1.X()) { return xint.midY.Y(); }
      else { return xint.midY.Y() + f(xint.midX()) * (xint.x2.X() - xint.x1.X()); }
    }
    return f(x);
  };

  let rectangle = new AdjRectangle(bi, xint, rectangleFunction, false);
  let secant = new AdjSecant(bi, xint, secantFunction, false);

  this.setFunction = function(F) { f = F; };
  this.setRateCurve = function(b) { 
    rateCurve = b; 
    if (rateCurve) { xint.midY.setAttribute({visible:true}); }
    else { xint.midY.setAttribute({visible:false}); }
    
  }

  rectangle.rect.on('over', function(e){
    rectangle.annotationsOn();
    secant.annotationsOn();
  });

  rectangle.rect.on('out', function(e){
    if (!showAnnotations) {
      rectangle.annotationsOff();
      secant.annotationsOff();
    }
  });

  secant.line.on('over', function(e){
    rectangle.annotationsOn();
    secant.annotationsOn();
  });

  secant.line.on('out', function(e){
    if (!showAnnotations) {
      rectangle.annotationsOff();
      secant.annotationsOff();
    }
  });

};



function RectangleArray(binfo, xinterval, F, N ) {
  let board = binfo.board;
  let bi = binfo;  
  let xint = xinterval;  
  let f = F;  
  let n = N;

  let rectangles = board.create('curve', [[0],[0]],
    {strokeColor: '#333333',fillColor:'#2222FF', 
    fillOpacity:0.3, highlightFillColor:'#FF2222', 
    highlightFillOpacity:0.3, hasInnerPoints:true});
  
  let area = 0;
  rectangles.updateDataArray = function() {

    area = 0;
    let delta = (xint.x2.X() - xint.x1.X()) / N;
    let x = [xint.x1.X()];
    let y = [0];
    let lastRect = xint.x2.X() - delta + 0.01;
    for (let i=xint.x1.X(); i < lastRect; i += delta) {

        let height = f(i + delta/2, delta);
        x.push(i);  // four points of our rectangle
        y.push(height);

        x.push(i + delta);
        y.push(height);

        x.push(i + delta);
        y.push(0);

        area += delta * height;
    }

    this.dataX = x;
    this.dataY = y;

  };

  let areaText = board.create('text', [
    function() { return xint.x2.X() - 2 * bi.Xerror;},
    function() { 
      if (f(xint.x2.X()) <= 0) { return bi.Yerror * 2; }
      return - bi.Yerror * 2;
    },
    function() { return 'A = ' + area.toFixed(3).toString(); }
    ], {fontSize:15, visible:true});
  

  this.setFunction = function(F) { f = F; };
  this.setN = function(n) { N = n; }

}


function SecantArray(binfo, xinterval, F, N ) {
  let board = binfo.board;
  let bi = binfo;  
  let xint = xinterval;  
  let f = F;  
  let n = N;

  let secants = board.create('curve', [[0],[0]],
    {strokecolor:'blue', strokeWidth:2}); 

  secants.updateDataArray = function() { 

    let cum = 0;
    let delta = (xint.x2.X() - xint.x1.X()) / N;
    let x = [];
    let y = [];
    let lastPoint = xint.x2.X() + 0.01;
    for (let i=xint.x1.X(); i <= lastPoint; i += delta) {
        x.push(i);
        let [dy, c] = f(i, delta, cum);
        y.push(dy + c);
        cum += dy;
    }
    this.dataX = x;
    this.dataY = y;
  };

  this.setFunction = function(F) { f = F; };
  this.setN = function(n) { N = n; }
}


// there's a problem passing functions to other array classes
function SecantRectangleArray(binfo, xinterval, F, N, d) {
  let board = binfo.board;
  let bi = binfo;  
  let xint = xinterval;  
  let f = F;  
  let n = N;
  let rateCurve = d; 
  let showAnnotations = false;
 
  if (rateCurve) { xint.midY.setAttribute({visible:true}); }

  let rectangleFunction = function(x, delta=0) { 
    if (rateCurve) {
      return f(x);      // height of rectangle is f is rateCurve
    }
    return  (f(x + delta/2) - f(x - delta/2)) / delta;  // slope of secant 
  };

  let secantFunction = function(x, delta, cum) {
    if (rateCurve) {
      return [f(x - delta/2) * delta, cum ];
    }
    return [f(x), 0];
  };

  let rectangles = new RectangleArray(binfo, xinterval, rectangleFunction, N);
  let secants = new SecantArray(binfo, xinterval, secantFunction, N);
  this.setFunction = function(F) { f = F; };
  this.setN = function(n) { 
    rectangles.setN(n); 
    secants.setN(n);
  }

} 



///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.calclib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.AdjRectangle = AdjRectangle;
  exports.AdjSecant = AdjSecant;
  exports.AdjSecantRect = AdjSecantRect;
  exports.RectangleArray = RectangleArray;
  exports.SecantArray = SecantArray;
  exports.SecantRectangleArray = SecantRectangleArray;

});

