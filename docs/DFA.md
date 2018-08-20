### Another DFA
added state trace above string and better state color changes
```p5js/playable/autoplay

//smartdown.import=http://127.0.0.1:5555/dfa.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/0fe1c494e0a94243f3b6d10dd38ef2a341d92f95/bgRedCream-20.jpg';


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



p5.preload = function() {
	dfalib.preload(p5);
}

p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
	dfalib.setup();        
	p5.windowResized();
	smartdown.setVariable('Input', '');          // set the input string to empty string
}


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.8;    // components to fit into the new window size.
  dfalib.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dfalib.draw();                                 // The machine is redrawn multiple times a second.
}


p5.mousePressed = function() {                   // this function is called everytime the user clicks the mouse
	dfalib.mousePressed();
}



var I;    // this holds the input string

this.dependOn = ['Input'];
this.depend = function() {                       // this function is called when the input changes to a new value
  I = env.Input;
  if (I[I.length - 1] === '\n') {                // we only enter a new input when the user hits enter  i.e. '\n'
    const cleanI = cleanInput(I);                // the user may not have entered a valid string so we clean it up
    smartdown.setVariable('Input', cleanI);      // convert the alphabet from a string to an array of characters
    dfalib.newInput(I);                          // add the input to the machine
  }
};


function cleanInput(i) {                                // here's where we clean up the input
  return i.replace(/\s/g, '');                          // remove any spaces, tabs or enter characters
}


```

[Enter a string](:?Input)
[Current string](:!Input)

And then click on the drawing to watch your string get eaten up by the machine.  Did the machine like your string or not?




> Written with [StackEdit](https://stackedit.io/).
