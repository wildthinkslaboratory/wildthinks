

/*
  - how do I center the area text? not easy
  - why doesn't strokeColor work?  Maybe a bug in jsxgraph?
*/
function AdjustableRectangle(b,X1,X2,hf,attr) {
  let error = 0.5;
  let board = b;            
  let heightFunction = hf;  // function that determines it's height

  // the x interval that rectangle lives on
  // in this class this interval is adjustable
  let xline = board.create('line', [[0,0],[1,0]], {visible:false});
  let x1 = board.create('glider', [X1,0,xline], {name: '', size:5, color:'green'});
  let x2 = board.create('glider', [X2,0,xline], {name: '', size:5, color:'red'});
  let midX = function() { return x1.X() + (x2.X() - x1.X())/2 ; };

  // a vertical line and glider that is used as a handle to adjust height of rectangle
  let vline = board.create('line', [[midX,0], [midX,1]], {visible:false});
  let glider = board.create('glider', [midX(), heightFunction(midX()), vline], {name: '', size:4, color:'purple'});

  // the two points that define the top of rectangle
  let f1 = board.create('point', [function() { return x1.X(); },  function() { return glider.Y();}], {visible:false});
  let f2 = board.create('point', [function() { return x2.X(); } , function() { return glider.Y();}], {visible:false});

  let rect = board.create('polygon',
    [x1, f1, f2, x2], {strokeColor: '#333333',fillColor:'#1111FF', hasInnerPoints:true});
  let area = function() { return ((x2.X() - x1.X()) * glider.Y()).toFixed(3); }
  let rText = board.create('text', [
    function() { return midX();},
    function() { return glider.Y() / 2; },
    area
    ], {fontSize:15, visible:false});

  rect.on('over', function(e){
    rText.setAttribute({visible:true});
  });
  rect.on('out', function(e){
    rText.setAttribute({visible:false});
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
    if (currentH <= functionH + error && currentH >= functionH - error) {
      this.setHeight(heightFunction(midX()));
    }
  };

  this.setFunction = function(f) { 
    heightFunction = f; 
  }
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

//  exports.Rectangle = Rectangle;
  exports.AdjustableRectangle = AdjustableRectangle;
//  exports.RectArray = RectArray;

});

