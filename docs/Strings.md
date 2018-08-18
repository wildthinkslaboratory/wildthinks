![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/86e53be54318e87d44d8db3ca0a15896690e1f30/stringsBanner-20.jpg)

This page builds on James Tanton's **exploding dots** curriculum.  If you're new to exploding dots, checkout these amazing pages: [G'Day Math! **Exploding Dots**](http://gdaymath.com/courses/exploding-dots/) and [Global Math Week **Exploding Dots**](https://www.explodingdots.org).


## Exploding Dots Meets Kurt Gödel (Also, Strings are Numbers) 

In this exploration we'll learn what **strings** are and how to interpret strings as numbers.  Then we'll see how Kurt Gödel used this idea in his famous Incompleteness Theorem.


SIDE NOTE: Some of the ideas in this video are challenging to learn and also challenging to explain (my personal disclaimer).  If you're new to this stuff you should know that it never makes full sense the first time through.  So do not be dissuaded and check out the video below.


![fullwidth](https://youtu.be/oXyek2Q40AI)


## Words are Numbers!  A Base 26 Machine


Here is the base $26$ machine from the video.  It uses the rule $1 \leftarrow 26$.  The **dots** are orange and **antidots** are green.  Instead of using the standard number symbols to encode numbers, it uses the alphabet `abcdefghijlmnopqrstuvwxyz`.  



INSTRUCTIONS:
- Click on a box to add a **dot**.  
- Drag a **dot** out of the boxes to delete it.  
- Notice the `Add` button in the upper left.  Click on it.  Now you can add **antidots** too.  
- If you have a **dot** and an **antidot** in the same box, drag them together to annihilate them.  

Notice the gray band above every playable?  You can always reset a playable by clicking this gray band.  Once to  `stop` the playable and  then again to `play` the playable.  (Ooh, you can also see the code for this playable when you click the `stop` button. Cool. We'll show you how to write your own playable on a different page soon.)

I've initilized it with the string `cab`, which has a base 10 value of $1353$.  Said another way, the base 10 number $1353$ has the code `cab` in this base 26 machine.  


### Things to try

- Which base 10 number has the code `hi`? 
- What's the base 10 value of your favorite three letter word?



```p5js/playable/autoplay

//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

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


In this playable you can type in an alphabet from your keyboard.  The number of symbols in your alphabet will become the base of the machine and the symbols of your alphabet will be used to write the codes.  


### Things to try
- The machine is initialized with the standard base 2 alphabet `01`.  Set the machine to encode the number four.  It should show the code `100`.  Now change the alphabet to `0123456789`.  The code `100` will stay the same, but what is the new value for this code?  
- What happens if you choose the alphbet `10`?  What does the code `100` mean in this machine?  Note that usually we ignore any `0` symbols that are placed in front of a number.  In this case we ignore any  leading `1` symbols.
- I like the alphabet `_o`.  The underscore `_` for zero reminds me of an empty box and the 'o' for one is like a little **dot**.  It reminds me of exploding dots.  


```p5js/playable/autoplay

//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

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


## What's Next?  Gödel's Incompleteness Theorem Part 2?


If we want to understand the next part of Gödel's proof we have to study Georg Cantor's proof that you can't map a set to it's powerset.  His proof uses something called *diagonalization* and I think it's a good candidate for an interactive web exploration.  So that's what I'll build next.  Stay tuned.


[Back to Home](:@Home)


#### Composed in Smartdown using Scape


The pages on this site are written in Smartdown, the markup language for [Scape: STEM Collaboration and Programming Environment](http://www.infoclay.com/scape/index.html).  Scape and Smartdown make it easy to share technical and interactive content such as charts, graphs, and featherweight programs called playables.  


