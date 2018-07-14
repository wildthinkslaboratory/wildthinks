
### Hold the SHIFT key down when you click to add an antidot

```p5js/playable
this.div.style.position = 'relative';
this.div.style['background-image'] = 'url("https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg")';
this.div.style['background-repeat'] = 'no-repeat';
this.div.style['background-size'] = 'cover';
this.div.style.height = '500px';
this.div.style.width = '1000px';
this.div.style.border = '5px solid gray';




var canvasW = 1000;  // canvas width
var canvasH = 500;  // canvas height

var base = -2;


// formating variables for the boxes
var numBoxes = 5;
var boxesW = 600; // width of all the boxes together
var boxesH = 150; // height of boxes
var boxesX = (canvasW - boxesW)/2;
var boxesY = (canvasH - boxesH)/2;
var xSpacer = 10;  // how much space between the boxes
var bs = [220,220,255]; // box stroke color
var bf = [255,255,255]; // box fill color
var btSize = 80;        // box font size



var dotD = 30;  // dot diameter

// dot formatting Goldfish version
//var df = [255,100,0]; // dot fill color
//var ds = [100,50,0]; // dot fill color
//var adf = [200,200,200]; // antidot fill color
//var ads = [50,50,50]; // antidot fill color

// dot formatting Heidi version
var df = [200,0,255]; // dot fill color
var ds = [50,0,50]; // dot fill color
var adf = [0,200,255]; // antidot fill color
var ads = [0,50,50]; // antidot fill color

// formatting for code and value boxes
var wf = [0,100,100];
var vf = bf;
var vs = bs;
var vtSize = 30;

// data model variables
var DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});


var id = 0;
var nextId = function() {
	var i = id;
	id += 1;
	return i;
}



var Dot = function(x,y,box) {
	this.x = x;                // a dot knows it's position
	this.y = y;
	this.oldx = x;             // it remembers it's old position before being dragged
	this.oldy = y;
	this.box = box;            // it knows what box it's in
	this.id = nextId();        // each do has a unique id
}



// we move dots between boxes so they need a copy with the same id for the new box
var dotCopy =  function(d) {
	var copy = new Dot(d.x,d.y,d.box);
	copy.oldx = d.x;
	copy.oldy = d.y;
	copy.id = d.id;
	return copy;
}




var overlap = function(d1,d2) {
	var dist = p5.dist(d1.x, d1.y, d2.x,d2.y);
	if (dist < dotD) return true;
	return false;
}


var DotArray = function(size,fillColor,strokeColor) {
	this.dots = [];
	for (var i=0; i < size; i++) { 
		this.dots[i] = []; 
	}
	this.f = fillColor;
	this.s = strokeColor;
}

DotArray.prototype.draw = function() {
	p5.push();
	p5.stroke(this.s[0],this.s[1],this.s[2]);
	p5.fill(this.f[0],this.f[1],this.f[2]);
	for (var i=0; i < this.dots.length; i++) {
		for (var j=0; j < this.dots[i].length; j++) {
			if (boxes.in(this.dots[i][j].x,this.dots[i][j].y)) {            // this line shouldn't be here need to fix
				p5.ellipse(this.dots[i][j].x,this.dots[i][j].y,dotD,dotD);
			}
		}
	}
	p5.pop();
}





DotArray.prototype.addDot = function(x,y,box) {
	this.dots[box].push(new Dot(x,y,box));
	addDotSound.play();
}


DotArray.prototype.deleteDot = function(i,j) {
	this.dots[i].splice(j,1);
}


DotArray.prototype.resetOldPosition = function(pos) {

	this.dots[pos[1]][pos[2]].x = this.dots[pos[1]][pos[2]].oldx;
	this.dots[pos[1]][pos[2]].y = this.dots[pos[1]][pos[2]].oldy;
}


DotArray.prototype.updateDotPosition = function(pos) {

	this.dots[pos[1]][pos[2]].oldx = this.dots[pos[1]][pos[2]].x;
	this.dots[pos[1]][pos[2]].oldy = this.dots[pos[1]][pos[2]].y;
}


// class for the boxes 
var Boxes = function(base,numberBoxes,x,y,boxesWidth,boxHeight) {
	this.base = base;
	this.numberBoxes = numberBoxes;
	this.x = x;
	this.y = y;
	this.height = boxHeight;
	this.width = boxesWidth/numberBoxes;
}


Boxes.prototype.in = function(x,y) {
	if (y < this.y || y > (this.y + this.height)) return false;   // it's not in the boxes
	if (x < this.x || x > (this.x + this.width * this.numberBoxes)) return false;
	return true;
}

Boxes.prototype.getBoxID = function(x,y) {

	// check the vertical range of the boxes
	if (y < this.y || y > (this.y + this.height)) return -1;   // it's not in the boxes

	// check the horizontal range 
	var rightX = this.x + this.width * this.numberBoxes;
	if (x < this.x || x > rightX) return -1;  // it's not in the boxes

	return p5.floor((rightX - x) / this.width);
}




Boxes.prototype.draw = function() {
	p5.push();
	p5.noStroke();
	p5.fill(bf[0],bf[1],bf[2]);
	var i=0;
	var x = boxesX;
	var y = boxesY;
	for (i=0; i < this.numberBoxes; i++) {
		p5.rect(x + i*this.width, y , this.width - xSpacer,this.height, 20);
	}
	
	p5.noStroke();
	p5.fill(bs[0],bs[1],bs[2]);
	p5.textSize(btSize);
	for (i=0; i < this.numberBoxes; i++) {
		var t = p5.pow(this.base,this.numberBoxes - i - 1).toString();
		var tInset = (this.width - p5.textWidth(t) - xSpacer)/2;
		p5.text(t,x + i*this.width + tInset, y + this.height - btSize/2);
	}

	p5.pop();	

}


// these are the main data structures for the model
var boxes = new Boxes(base,numBoxes,boxesX,boxesY,boxesW,boxesH);
var dots = [];
dots.push(new DotArray(numBoxes,df,ds));
dots.push(new DotArray(numBoxes,adf,ads)); 
var currentIDID = [0,0,0];  // the id of the current dot








var drawMaskRect = function() {
	p5.clear();
	p5.push();
	p5.fill(200,255,200);                // draw a background rect
	p5.noStroke();

	var marginX = 20;
	var marginY = 60;
	p5.rect(boxesX-marginX, boxesY-marginY,boxesW + 2 * marginX - xSpacer, boxesH + 2 * marginY, 10);
	p5.pop();

}


var drawCodeBoxes = function() {
	p5.push();
	p5.noStroke();
	p5.fill(vf[0],vf[1],vf[2]);
	var i=0;
	var x = boxesX;
	var y = boxesY + boxesH + 10;
	var width = boxesW / numBoxes;
	var height = 40;
	for (i=0; i < numBoxes; i++) {
		p5.rect(x + i*width, y , width - xSpacer, height, 10);
	}


	p5.noStroke();
	p5.textSize(vtSize);
	p5.fill(wf[0],wf[1],wf[2]);
	var textY = y + height - 10;
	//p5.text("code", x - width, textY);
	for (i=0; i < numBoxes; i++) {
		var code = dots[0].dots[i].length;
		code -= dots[1].dots[i].length;
		var t = code.toString();
		var tInset = (width - p5.textWidth(t) - xSpacer)/2;

		if (code === 0) { p5.fill(vs[0],vs[1],vs[2]); }
		else { p5.fill(wf[0],wf[1],wf[2]); }

		p5.text(t,x + (numBoxes - 1 - i)*width + tInset, textY);
	}

	p5.pop();	

}

var drawValueBoxes = function() {
	p5.push();
	p5.noStroke();
	p5.fill(vf[0],vf[1],vf[2]);
	var i=0;
	var x = boxesX;
	var y = boxesY - 50;
	var width = boxesW / numBoxes;
	var height = 40;
	for (i=0; i < numBoxes; i++) {
		p5.rect(x + i*width, y, width - xSpacer, height, 10);
	}

	p5.stroke(wf[0],wf[1],wf[2]);
	p5.strokeWeight(5);
	p5.rect(x + boxesW + 25, y, width - xSpacer, height, 10);


	p5.noStroke();
	p5.fill(wf[0],wf[1],wf[2]);
	p5.textSize(vtSize);
	var textY = y + height - 10;
	//p5.text("value", x - width, textY);
	var sum = 0;
	for (i=0; i < numBoxes; i++) {
		var value = dots[0].dots[i].length * p5.pow(base,i);
		value -= dots[1].dots[i].length * p5.pow(base,i);
		sum += value;
		var t = value.toString();
		var tInset = (width - p5.textWidth(t) - xSpacer)/2;

		if (value === 0) { p5.fill(vs[0],vs[1],vs[2]); }
		else { p5.fill(wf[0],wf[1],wf[2]); }
	
		p5.text(t,x + (numBoxes - 1 - i)*width + tInset, textY);
	}

	p5.fill(wf[0],wf[1],wf[2]);
	var offset_x = (width - xSpacer - p5.textWidth(sum.toString())) / 2;
	p5.text(sum.toString(),x + boxesW + 25 + offset_x, textY);
	p5.pop();	
}

var mouseOnCanvas = function() {
	if (p5.mouseX < 0 || p5.mouseX > canvasW ) return false;
	if (p5.mouseY < 0 || p5.mouseY > canvasH ) return false;
	return true;
}

var mouseOnBoxes = function() {
	return boxes.getBoxID(p5.mouseX,p5.mouseY) != DotEnum.UNDEF;
}


var mouseOnDot = function() {

	// check the dots
	for (var n=0; n < dots.length; n++) {
		for (var i=0; i < dots[n].dots.length; i++) {
			for (var j=0; j < dots[n].dots[i].length; j++) {
				if (p5.dist(p5.mouseX,p5.mouseY,dots[n].dots[i][j].x,dots[n].dots[i][j].y) < dotD/2) {
					currentID = [n,i,j];
					return true;
				}
			}
		}
	}

	currentID = [DotEnum.UNDEF,-1,-1];
	return false;

}






var checkForDotAntidotAnnihilation = function() {
	for (var n=0; n < numBoxes; n++) {    // walk through the boxes
		for (var i=0; i < dots[0].dots[n].length; i++) {
			for (var j=0; j < dots[1].dots[n].length; j++) {
				if (overlap(dots[0].dots[n][i], dots[1].dots[n][j])) {
					dots[0].deleteDot(n,i);
					dots[1].deleteDot(n,j);
					annihilateSound.play();
				}
			}

		}
		
	}
}


var annihilation = function(id) {
	// look for overlap with an opposing dot in same box
	var opposing = 1 - id[0];
	for (var i=0; i < dots[opposing].dots.length; i++) {
		if (overlap(dots[id[0]].dots[id[1]][id[2]], dots[opposing].dots[id[1]][i])) {
			dots[id[0]].deleteDot(id[1],id[2]);
			dots[opposing].deleteDot(id[1],i);
			annihilateSound.play();
			return true;
		}
	}
	return false;
}




var finishDotDrag = function() {	
	if (mouseOnBoxes()) {
		if (currentID[0] != DotEnum.UNDEF) {  

			var current_dot = dots[currentID[0]].dots[currentID[1]][currentID[2]];

			// get the box id after drag
			var recievingBox = boxes.getBoxID(current_dot.x,current_dot.y);
			var sendingBox = current_dot.box;

			if (recievingBox === sendingBox) {                  // drag within a box
				if (!annihilation(currentID)) {
					dots[currentID[0]].updateDotPosition(currentID);
				}
				


			}
			else {                                              // drag between boxes
				if (recievingBox > sendingBox) {                // drag left
					var dotsNeeded = p5.pow(p5.abs(base), recievingBox - sendingBox);
					if (dots[currentID[0]].dots[sendingBox].length >= dotsNeeded) {     // explode the dot

								//add this dot to new box
		 						var newDot = dotCopy(dots[currentID[0]].dots[currentID[1]][currentID[2]]);
		 						newDot.box = recievingBox;

		 						var dotArrayID = ((recievingBox - sendingBox) % 2 ? 1 - currentID[0] : currentID[0]);

		 						dots[dotArrayID].dots[recievingBox].push(newDot);

		 
		 						//remove this dot from it's old box
		 						dots[currentID[0]].deleteDot(currentID[1],currentID[2]);

		 						//remove other dots from old box
		 						for (var i=0; i < dotsNeeded-1; i++) {
									dots[currentID[0]].dots[sendingBox].pop();
								}

					}  
					else {
						dots[currentID[0]].resetOldPosition(currentID);  // weren't enough dots, send it back
					}  
				}
				else {   // drag right
					dots[currentID[0]].resetOldPosition(currentID); 
				}
				
			}
		}
	}
	else {	// dragged out of bounds 
		deleteCurrentDot();
	}
}




var deleteCurrentDot = function() {
	if (currentID[0] != DotEnum.UNDEF) {  
		dots[currentID[0]].deleteDot(currentID[1],currentID[2]);
	}	

}




/////////////////////////////  MAIN USER EVENTS  /////////////////////////////

var addAntidot = function() {
	dots[1].addDot(p5.mouseX,p5.mouseY,boxes.getBoxID(p5.mouseX,p5.mouseY));

}

var addDot = function() {
	dots[0].addDot(p5.mouseX,p5.mouseY,boxes.getBoxID(p5.mouseX,p5.mouseY));
}

var dragLeft = function() {

}

var dragRight = function() {

}

var dragOffBoxes = function() {

}

var dragDotAnnihilation = function() {

}


///////////////////////   MAIN STRUCTURE FUNCTIONS ////////////////////////////

var addDotSound;
var annihilateSound;
p5.setup = function() {

	// attribution 3.0  mark diangelo
	addDotSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bd0a27a5a92c1f904fe0713f6664d9a8b28cb476/Blop-Mark_DiAngelo-79054334.wav');

	// attribution 3.0  mark diangelo
	annihilateSound = p5.loadSound('https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/e0ca3e1a7f8393c9c62b56650bb4b1ad01749265/Woosh-Mark_DiAngelo-4778593.wav');

	p5.createCanvas(canvasW,canvasH);
}





// the draw function runs about 30 times a second
p5.draw = function() {
	drawMaskRect();
	boxes.draw();
	dots[0].draw();
	dots[1].draw();
	drawValueBoxes();
	drawCodeBoxes();
  
}







///////////////////////   MAIN EVENT FUNCTIONS ////////////////////////////


// P5 EVENTS
var dragging = false;
p5.mousePressed = function() 
{	
	if (mouseOnBoxes()) {
		if (!mouseOnDot()) {
			if (p5.keyIsPressed === true && p5.keyCode === p5.SHIFT) {   // we're clicking to add a dot
				addAntidot(); 
			}
			else { 
				addDot(); 
			}		
		}
	}
}



p5.mouseDragged = function() {
	if (currentID[0] != DotEnum.UNDEF) {
		dots[currentID[0]].dots[currentID[1]][currentID[2]].x = p5.mouseX;  // update the x,y position of currentID dot
		dots[currentID[0]].dots[currentID[1]][currentID[2]].y = p5.mouseY;
	}
}


p5.mouseReleased = function() {

	finishDotDrag();

}


```