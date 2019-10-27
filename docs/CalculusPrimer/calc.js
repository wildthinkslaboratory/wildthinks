


/*
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
function AdjRectangle(b,X1,X2,F) {

  let board = b; 
  let boundingBox = board.getBoundingBox();
  let Yerror = (boundingBox[1] - boundingBox[3]) / 50;  
  let Xerror = (boundingBox[2] - boundingBox[0]) / 50;  
  let visible = false;   
  let heightFunction = F;  // function that determines it's height

  // the x interval that rectangle lives on
  // in this class this interval is adjustable
  let xline = board.create('line', [[0,0],[1,0]], {visible:false});
  let x1 = board.create('glider', [X1,0,xline], {name: '', size:5, color:'green'});
  let x2 = board.create('glider', [X2,0,xline], {name: '', size:5, color:'red'});
  let midX = function() { return x1.X() + (x2.X() - x1.X())/2 ; };

  // a vertical line and glider that is used as a handle to adjust height of rectangle
  let vline = board.create('line', [[midX,0], [midX,1]], {visible:false});
  let glider = board.create('glider', [midX(), heightFunction(midX()), vline], {name: '', size:4, color:'#1111CC'});

  // the two points that define the top of rectangle
  let f1 = board.create('point', [function() { return x1.X(); },  function() { return glider.Y();}], {visible:false});
  let f2 = board.create('point', [function() { return x2.X(); } , function() { return glider.Y();}], {visible:false});

  let rect = board.create('polygon',
    [x1, f1, f2, x2], {strokeColor: '#333333',fillColor:'#1111FF', hasInnerPoints:true});
  let area = function() { return ((x2.X() - x1.X()) * glider.Y()).toFixed(3); }
  
  let aText = board.create('text', [
    function() { return midX() - Xerror;},
    function() { return glider.Y() / 2; },
    area
    ], {fontSize:15, visible:false});


  
  let p1 = board.create('point',[ function() { return x2.X() + Xerror / 2; }, function() { return glider.Y(); }],{visible:false});
  let p2 = board.create('point',[ function() { return x2.X() +  Xerror / 2; }, 0 ],{visible:false});
  let dimensionLine = board.create('segment', [p1,p2], {
    strokeColor:'black', 
    strokeWidth:2, 
    firstArrow:true, 
    lastArrow:true, 
    visible:false});
  let dimensionText = board.create('text', [
    function() { return x2.X() + Xerror; } ,
    function () { return glider.Y() / 2; },
    function() { return glider.Y().toFixed(3); }
    ],{fontSize: 15, visible:false});

  rect.on('over', function(e){
    aText.setAttribute({visible:true});
    dimensionText.setAttribute({visible:true});
    dimensionLine.setAttribute({visible:true});
  });
  rect.on('out', function(e){
    if (!visible) {
      aText.setAttribute({visible:false});
      dimensionText.setAttribute({visible:false});
      dimensionLine.setAttribute({visible:false});
    }
  });


  // functions we are exporting
  this.height = function() { return glider.Y(); };
  this.setHeight = function(h) {       
    glider.setPositionDirectly(JXG.COORDS_BY_USER, [glider.X(),h]); 
    glider.prepareUpdate().update(true).updateRenderer();
  };
  this.getMidX = function() { return midX(); };

  this.snapToFunction = function() {
    let currentH = glider.Y();
    let functionH = heightFunction(midX());
    if (currentH <= functionH + Yerror && currentH >= functionH - Yerror) {
      this.setHeight(heightFunction(midX()));
    }
  };

  this.setFunction = function(f) { 
    heightFunction = f; 
  };

  this.setAreaText = function(b) {
    if (b) {
      aText.setAttribute({visible:true});
      visible = true;

    }
    else {
      aText.setAttribute({visible:false});
      visible = false;
    }
  };

};



/*
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
function AdjSecant(b,X1,X2,F) {

  let board = b;   
  let boundingBox = board.getBoundingBox();
  let error = (boundingBox[1] - boundingBox[3]) / 50;    
  let f = F;  
  let slopeVisible = false;

  // the x interval that secant line lives on
  // in this class this interval is adjustable
  let xline = board.create('line', [[0,0],[1,0]], {visible:false});
  let x1 = board.create('glider', [X1,0,xline], {name: '', size:5, color:'green'});
  let x2 = board.create('glider', [X2,0,xline], {name: '', size:5, color:'red'});
  let midX = function() { return x1.X() + (x2.X() - x1.X())/2 ; };

  // the two points that define the top of rectangle
  let f1 = board.create('point', [function() { return x1.X(); },  function() { return f(x1.X());}], {color: 'blue', size:3, name:'', visible:true});
  let f2 = board.create('point', [function() { return x2.X(); } , function() { return f(x2.X());}], {color: 'blue', size:3, name:'', visible:true});

  let line = board.create('line', [f1, f2], {strokeColor:'blue', strokeWidth:3, straightFirst:false, straightLast:false, visible:true});
  let slope = function() { return  ((f(x2.X()) - f(x1.X())) / (x2.X() - x1.X())).toFixed(3); }

  let sText = board.create('text', [
    function() { return midX() - 2 * error;},
    function() { return f1.Y() + (f2.Y() - f1.Y()) / 2 + error; },
    slope
    ], {fontSize:15, visible:false});

  line.on('over', function(e){
    sText.setAttribute({visible:true});
  });
  line.on('out', function(e){
    if (!slopeVisible) {
      sText.setAttribute({visible:false});
    }
  });

  this.setFunction = function(F) { f = F; };

  this.setSlopeText = function(b) {
    if (b) {
      sText.setAttribute({visible:true});
      slopeVisible = true;

    }
    else {
      sText.setAttribute({visible:false});
      slopeVisible = false;
    }
  };
};


function AdjSecantRect(b, X1, X2, F, attr, d) {
  let board = b;
  let derivative = d; 
  let boundingBox = board.getBoundingBox();
  let error = (boundingBox[1] - boundingBox[3]) / 50;     
  let textVisible = false;
  let f = F;

  console.log('derivative', derivative);

  // the x interval that secant line lives on
  // in this class this interval is adjustable
  let xline = board.create('line', [[0,0],[1,0]], {visible:false});
  let x1 = board.create('glider', [X1,0,xline], {name: '', size:5, color:'green'});
  let x2 = board.create('glider', [X2,0,xline], {name: '', size:5, color:'red'});
  let midX = function() { return x1.X() + (x2.X() - x1.X())/2 ; };


  let slope = function() { 
    if (derivative) {
      return f(midX());      // height of rectangle is f is derivative
    }
    return  (f(x2.X()) - f(x1.X())) / (x2.X() - x1.X());  // slope of secant 
  };

  let area = function() { 
    return (x2.X() - x1.X()) * slope(); 
  };

  // a vertical line and glider that is used as a handle to adjust height of rectangle
  let vline = board.create('line', [[midX,0], [midX,1]], {visible:false});
  let constant = board.create('glider', [midX(), 0, vline], {name: '', size:4, color:'#1111CC'});

  // the two points on the secant line
  let f1 = board.create('point', [
    function() { return x1.X(); },  
    function() { 
      if (derivative) { return constant.Y(); }
      return f(x1.X());}], 
    {color: 'blue', size:3, name:'', visible:true});
  let f2 = board.create('point', [
    function() { return x2.X(); } , 
    function() { 
      if (derivative) { return constant.Y() + area(); }
      return f(x2.X());}], 
    {color: 'blue', size:3, name:'', visible:true});

  let line = board.create('line', [f1, f2], 
    {strokeColor:'blue', strokeWidth:3, straightFirst:false, straightLast:false, visible:true});
  let slopeText = function() { return slope().toFixed(3); }

  let sText = board.create('text', [
    function() { return midX() - 2 * error;},
    function() { return f1.Y() + (f2.Y() - f1.Y()) / 2 + error; },
    slopeText
    ], {fontSize:15, visible:false});



  this.setSlopeText = function(b) {
    if (b) {
      sText.setAttribute({visible:true});
      slopeVisible = true;

    }
    else {
      sText.setAttribute({visible:false});
      slopeVisible = false;
    }
  };

  this.setFunction = function(F) { f = F; };

  // the two points that define the top of rectangle

  let r1 = board.create('point', [function() { return x1.X(); }, slope ], {visible:false});
  let r2 = board.create('point', [function() { return x2.X(); }, slope ], {visible:false});

  let rect = board.create('polygon',
    [x1, r1, r2, x2], {strokeColor: '#333333',fillColor:'#1111FF', hasInnerPoints:true});

  let areaText = function() { return area().toFixed(3); }

  let aText = board.create('text', [
    function() { return midX() - error;},
    function() { return slope() / 2; },
    areaText
    ], {fontSize:15, visible:false});

  line.on('drag', function(e) {
    if (derivative) {

    }

  });
  line.on('over', function(e){
    sText.setAttribute({visible:true});
    aText.setAttribute({visible:true});
  });
  line.on('out', function(e){
    if (!textVisible) {
      sText.setAttribute({visible:false});
      aText.setAttribute({visible:false});
    }
  });

  rect.on('over', function(e){
    sText.setAttribute({visible:true});
    aText.setAttribute({visible:true});
  });
  rect.on('out', function(e){
    if (!textVisible) {
      sText.setAttribute({visible:false});
      aText.setAttribute({visible:false});
    }
  });

};

// function FixedRectangle(b, X1, X2, hf, attr) {
//   let board = b;
//   let heightFunction = hf;

//   let x1 = X1; // the x interval that rectangle lives on
//   let x2 = X2;
//   let bottom1 = board.create('point', [x1,0], {visible:false});
//   let bottom2 = board.create('point', [x2,0], {visible:false});
//   let midX = function() { return x1 + (x2 - x1)/2 ; };

//   // a vertical line and glider that is used as a handle to adjust height of rectangle
//   let vline = board.create('line', [[midX,0], [midX,1]], {visible:false});
//   let glider = board.create('glider', [midX(), heightFunction(midX()), vline], {name: '', size:4, color:'purple'});

//   // the two points that define the top of rectangle
//   let top1 = board.create('point', [x1, function() { return glider.Y();}], {visible:false});
//   let top2 = board.create('point', [x2, function() { return glider.Y();}], {visible:false});

//   let rect = board.create('polygon',[bottom1, top1, top2, bottom2],attr);

//   this.height = function() { return glider.Y(); };
//   this.setHeight = function(h) {       
//     glider.setPositionDirectly(JXG.COORDS_BY_USER, [glider.X(),h]); 
//     glider.prepareUpdate().update(true).updateRenderer();
//   };
//   this.getMidX = function() { return midX(); };
// };


// function RectArray(b, N, X1, X2, h, F, attr) {
//   let board = b;
//   let rects = [];
//   let x1 = X1;
//   let x2 = X2;
//   let f = F;
//   let n = N;
//   let attributes = attr;
//   let error = 0.5;

//   let delta = (x2 - x1)/n;
//   for (let i=x1; i < x2; i += delta) {
//     rects.push(new Rectangle(board,i,i+delta,h,attributes));
//   }


//   this.area = function() {
//     let a = 0;
//     for (i=0; i < rects.length; i++) {
//       a += delta * rects[i].height();
//     }
//     return a;
//   };

//   this.snapToFunction = function() {
//     for (let i=0; i < rects.length; i++) {
//       let currentH = rects[i].height();
//       let functionH = f(rects[i].getMidX());
//       if (currentH <= functionH + error && currentH >= functionH - error) {
//         rects[i].setHeight(functionH);
//       }
//     }
//   };

//   this.snapAllToFunction = function() {
//     for (let i=0; i < rects.length; i++) {
//       rects[i].setHeight(f(rects[i].getMidX()));
//     }
//     board.update();
//   };


// }



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

});

