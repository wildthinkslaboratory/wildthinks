### Another DFA
added state trace above string and better state color changes
```p5js/playable/autoplay

//smartdown.import=http://127.0.0.1:5555/dfa.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71e56b6dabdb46605e9d0d411eca1b4391ec9313/dfaBackground.001.jpeg';


const myDiv = this.div;                                  // This chunk of code is some HTML/CSS stuff
myDiv.style.position = 'relative';                       // to make the playable look pretty
myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '100%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';
this.div.style.margin = '10px auto'; // shorthand for '10px auto 10px auto'
this.div.innerHTML = '';



console.log('dfalib', dfalib);

p5.preload = function() {
	dfalib.preload(p5);
}

p5.setup = function() {
	dfalib.setup();
	p5.windowResized();
}


var S;   // holsd the input string

this.dependOn = ['BitString'];
this.depend = function() {        // Called when BitString changes to a new value
  S = env.BitString;
  dfalib.newInput(S);
};

p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.8;    // components to fit into the new window size.
  dfalib.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}

// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
p5.draw = function() {
	dfalib.draw();
}


// the logic of this code is hard to follow.
// will try to clean it up and simplify the control flow
p5.mousePressed = function() {
	dfalib.mousePressed();
}

```


`Enter a string with 0's and 1's` [](:?BitString)  And then click on the drawing to watch your string get eaten up by the machine.  Did the machine like your string or not?




> Written with [StackEdit](https://stackedit.io/).
