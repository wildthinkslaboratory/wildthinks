
## Mystery String Challenge
So Kurt Gödel took a bunch of strings that were originally proofs and he interpreted them as numbers and then he studied their mathematical properties.  This led to him writing a mathematical definition of proof numbers.  I thought it might be fun to give you an interesting set of strings to interpret as numbers.  The following playable is a Deterministic Finite Automata (DFA).  I'll probably make a whole page on these soon.  But for right now, all you need to know is that it eats up strings.  If it likes a string it will **ding**.  If it doesn't like a string it will **honk**.  It will only eat strings made with the alphabet `ab`.  

INSTRUCTIONS:
- Enter a string in the box below and type enter to load the string.  
- It will only eat strings made with the letters `a` and `b`.  
- Each time you click the mouse the machine will consume another letter.
- If the machine ends on the *yellow* state, the machine will accept the string and play a **ding**.

How would you describe the strings that the machine likes?  How could you interpret the strings that the machine likes as numbers.  Do they have any interesting mathematical properties?  


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

const machine = {
  nodes : 3,
  edges : [ [0,1], [2,0], [1,2] ],
  accept : [0],
  alphabet : ['a','b']
};


dfalib.construct(p5, machine);

p5.preload = function() {
	dfalib.loadSounds();
}

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.  
	p5.windowResized();
	dfalib.setup();      
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
  i = i.replace(/\s/g, '');                             // remove any spaces, tabs or enter characters
  if (!/^[ab]*$/.test(i)) {
  	alert('String can only contain letters a and b.');
  	return '';
  }
  return i;
}


```

[Enter a string](:?Input)
[Current string](:!Input)

 





