![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/86e53be54318e87d44d8db3ca0a15896690e1f30/stringsBanner-20.jpg)

This page builds on James Tanton's **exploding dots** curriculum.  If you're new to exploding dots, checkout these amazing pages: [G'Day Math! **Exploding Dots**](http://gdaymath.com/courses/exploding-dots/) and [Global Math Week **Exploding Dots**](https://www.explodingdots.org).


## Exploding Dots Meets Kurt Gödel (Also, Strings are Numbers) 

In this exploration we'll learn what **strings** are and how to interpret strings as numbers.  Then we'll see how Kurt Gödel used this idea in his famous Incompleteness Theorem.


SIDE NOTE: Some of the ideas in this video are challenging to learn and also challenging to explain (my personal disclaimer).  If you're new to this stuff you should know that it never makes full sense the first time through.  So do not be dissuaded and check out the video below.


![fullwidth](https://youtu.be/oXyek2Q40AI)


## Words are Numbers!  A Base 26 Machine


Here is the base $26$ machine from the video.  It uses the rule $1 \leftarrow 26$.  The **dots** are red and **antidots** are light blue.  Instead of using the standard number symbols `0123456789` to encode numbers, it uses the alphabet `abcdefghijlmnopqrstuvwxyz`.  

First, some helpful instructions.  Notice the gray band above every playable?  You can always reset a playable by clicking this gray band.  Once to  `stop` the playable and  then again to `play` the playable.  (Ooh, you can also see the code for this playable when you click the `stop` button. Cool. We'll show you how to write your own playable on a different page soon.)


INSTRUCTIONS:
- Click on a box to add a **dot**.  
- Drag a **dot** out of the boxes to delete it.  
- Notice the `Add` button in the upper left.  Click on it.  Now you can add **antidots** too.  
- If you have a **dot** and an **antidot** in the same box, drag them together to annihilate them.  


I've initilized the machine with the string `cab`, which has a base 10 value of $1353$.  Said another way, the base 10 number $1353$ has the code `cab` in this base 26 machine.  


### Things to try

- Which base 10 number has the code `hi`? 
- What's the base 10 value of your favorite three letter word?



```p5js/playable/autoplay

//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=/dots.js


// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/0fe1c494e0a94243f3b6d10dd38ef2a341d92f95/bgRedCream-20.jpg';


// Adjust the surrounding DIV(s) a little
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
myDiv.style.overflow = 'auto';

const base = 26;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes, 'red');             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
  dots.setAlphabetSymbols(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);      
  dots.addDotsToBox(2,1,2);
  dots.addDotsToBox(1,1,0);             
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.8;    // components to fit into the new window size.
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  dots.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse 
  dots.mouseReleased();                          // button after a click.
}


```

## Choose your own alphabet


In this playable you can type in an alphabet from your keyboard.  The number of symbols in your alphabet will become the base of the machine and the symbols of your alphabet will be used to write the codes. Currently this machine doesn't allow you to use white space as part of your alphabet so you can't interpret sentences as numbers like we did in the video.  You could substitute the underscore `_` for a space if you wanted.  This machine is only three boxes long, but imagine what it would be like to have one with a hundred boxes, or a million boxes.  You can begin to see how we could interpret an email, a book, a program or a proof as a number.


### Things to try
- The machine is initialized with the standard base 2 alphabet `01`.  Set the machine to encode the number four.  It should show the code `100`.  Now change the alphabet to `0123456789`.  The code `100` will stay the same, but what is the new value for this code?  
- What happens if you choose the alphabet `10` (subtly different from the alphabet `01`)?  This will change the value AND the code.  You'll need to adjust the position of **dots** to get the code `100` back. What does the code `100` mean in this machine?  Note that usually we ignore any `0` symbols that are placed in front of a number.  In this case we ignore any  leading `1` symbols.  What other numbers could the code `100` stand for?
- I like the alphabet `_o`.  The underscore `_` for zero reminds me of an empty box and the `o` for one is like a little **dot**. 
- Experiment and come up with your very own number system.  Using all your exploding dots knowledge you can work out how to do addition, subtraction, multiplication  and division with it. 


```p5js/playable/autoplay

//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=/dots.js

// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/0fe1c494e0a94243f3b6d10dd38ef2a341d92f95/bgRedCream-20.jpg';


// Adjust the surrounding DIV(s) a little
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

const base = 2;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes, 'red');             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();    

  smartdown.setVariable('Alphabet', '');                        

  dots.loadSounds();                             // load the sounds for the app 
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.8;    // components to fit into the new window size.
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dots.draw();                                   // The machine is redrawn multiple times a second.
}


p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  dots.mousePressed();
}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse
  dots.mouseDragged();
}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse 
  dots.mouseReleased();                          // button after a click.
}



var A;    // this holds the alphabet string

this.dependOn = ['Alphabet'];
this.depend = function() {                       // this function is called when the alphabet changes to a new value
  A = env.Alphabet;
  if (A[A.length - 1] === '\n') {                // we only enter a new alphabet when the user hits enter  i.e. '\n'
    const cleanA = cleanUpAlphabet(A);           // the user may not have entered a valid alphabet to we clean it up
    smartdown.setVariable('Alphabet', cleanA.join(''));              // convert the alphabet from a string to an array of characters
    dots.setAlphabetSymbols(cleanA);             // add the alphabet to the machine
  }
};


function cleanUpAlphabet(a) {                                    // here's where we clean up the alphabet
  aNoWhiteSpace = a.replace(/\s/g, '');                          // remove any spaces, tabs or enter characters
  let newA = Array.from(new Set(aNoWhiteSpace.split('')));       // remove duplicate characters
  return newA;
}

```


[Enter an alphabet](:?Alphabet)
[Current alphabet](:!Alphabet)

## Make a Better Number System

Our current system for writing numbers in base $10$ with the alphabet `0123456789`, evolved over a long period of time.  It's been used for so long in so many cultures that most people don't know any other way to count and do mathematics.  That doesn't mean it's the best system.  I personally think we could devise a better one.  Base $12$ is an intriguing possibility.  It has four divisors: $2,3,4$ and $6$.  The number $10$ only has two: $2$ and $5$.  Think back to when you learned the multiplication tables.  How might that process be different if the base had more divisors?  What if we had an alphabet where the symbols actually looked like the quantities they described?  What are the advantages and disadvantages to having a small base versus a larger base?  I hope you'll experiment.  If you come up with any great new system please let me know and I will add it to my page.


## Mystery String Challenge
So Kurt Gödel took a bunch of strings that were originally intended as proofs and he interpreted them as numbers and then he studied their mathematical properties.  This led to him writing a mathematical definition of proof numbers.  I thought it might be fun to give you an interesting set of strings to interpret as numbers.  The following playable is a Deterministic Finite Automata (DFA).  I'll probably make a whole page on these soon.  It's fun to try and figure out how this machine works.  How does it decide which arrow to follow when it eats a letter?  But for right now, all you need to know is that it eats up strings.  If it likes a string it will **ding**.  If it doesn't like a string it will **honk**.  It will only eat strings made with the alphabet `ab`.  If you were to collect all the strings it likes (or accepts) into a set, how would you describe those strings?  If you followed Gödel's example and you interpreted the strings as numbers, what base would you use and what alphabet?  Do your string numbers have any interesting mathematical properties?

INSTRUCTIONS:
- Enter a string in the box below and type enter to load the string.  
- It will only eat strings made with the letters `a` and `b`.  
- Each time you click the mouse the machine will consume another letter.
- If the machine ends on the *yellow* state, the machine will accept the string and play a **ding**.


```p5js/playable/autoplay

//xsmartdown.import=http://127.0.0.1:5555/dfa.js

//smartdown.import=/dfa.js

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


let dfa = new dfalib.DFA(p5, machine);

p5.preload = function() {
  dfa.loadSounds();
}

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.  
  p5.windowResized();
  dfa.setup();      
  smartdown.setVariable('Input', '');          // set the input string to empty string
}


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.8;    // components to fit into the new window size.
  dfa.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.
  dfa.draw();                                 // The machine is redrawn multiple times a second.
}


p5.mousePressed = function() {                   // this function is called everytime the user clicks the mouse
  dfa.mousePressed();
}



var I;    // this holds the input string

this.dependOn = ['Input'];
this.depend = function() {                       // this function is called when the input changes to a new value
  I = env.Input;
  if (I[I.length - 1] === '\n') {                // we only enter a new input when the user hits enter  i.e. '\n'
    const cleanI = cleanInput(I);                // the user may not have entered a valid string so we clean it up
    smartdown.setVariable('Input', cleanI);      // convert the alphabet from a string to an array of characters
    dfa.restart(I);                              // add the input to the machine
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

 Have you figured out what property these strings all share?  Notice that this machine is actually symmetrical.  That means if the machine likes a string `aabb` then it will also like the reverse of that string `bbaa`.  So reversing a string preserves the property.  How can you explain that?



## What's Next?  Gödel's Incompleteness Theorem Part 2?

The next part of Gödel's proof is a variation of Georg Cantor's proof that you can't map a set to it's powerset.  The background concepts for Cantor's proof are amazingly few and simple for a proof that has such far reaching consequences.  We just need to understand a little bit about functions and functional mappings and we need to know what a power set is.  His proof uses something called *diagonalization* and I think it's a good candidate for an interactive web exploration.  I'll put that on my list of things I want to build.  Stay tuned.


[Back to Home](:@Home)


#### Composed in Smartdown using Scape


The pages on this site are written in Smartdown, the markup language for [Scape: STEM Collaboration and Programming Environment](http://www.infoclay.com/scape/index.html).  Scape and Smartdown make it easy to share technical and interactive content such as charts, graphs, and featherweight programs called playables.  


