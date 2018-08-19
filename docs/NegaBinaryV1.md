![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/eb65f6202d8185468cea211757f0700fcef3aacd/negaBinaryBanner1.png)




This page builds on James Tanton's Exploding Dots curriculum.  If you're new to exploding dots, checkout these amazing pages: [G'Day Math! Exploding Dots](http://gdaymath.com/courses/exploding-dots/) and [Global Math Week Exploding Dots](https://www.explodingdots.org).



## Welcome to our Negative Binary page

Here's a cool way to write down numbers.  It's called negative binary and we can write all of the integers with it, both negative and positive, using only the symbols `0` and `1`.  Here's the catch.  We aren't going to use any negative signs, $-$, in front of a number to say that it's negative.  




## Let's Begin



In negative binary we use the rule $-1 \leftarrow 2$.  Two **dots** on the right change into one negative **dot** or **antidot** on the left. Let's write the number $2$. Notice there are two purple **dots** in the right most box below.  That's the ones box.  Drag a **dot** to the left.  ( You can also drag it back to the right when you're done. )  The two purple purple **dots** turn into one blue **antidot** in the negative two box.  Can you figure out why an **antidot** appears when you drag these two dots?



```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little
const myDiv = this.div;                                  // This chunk of code is some HTML/CSS stuff
myDiv.style.position = 'relative';                       // to make the playable look pretty
myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '50%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';
this.div.style.margin = '10px auto'; // shorthand for '10px auto 10px auto'
this.div.innerHTML = '';


const base = -2;               // set the base for the machine
const numberBoxes = 2;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes);             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth * 0.5;        // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.7;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
  dots.turnOffRuleButton();                      // configure the machine the way we want it.
  dots.turnOffAddDotButton();
  dots.allowAddDots(false);
  dots.allowRemoveDots(false);
  dots.addDotsToBox(2,1,0);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth * 0.5;      // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.7;    // components to fit into the new window size.
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



So the code for the number $2$ is `-1`  `0`.  We have one **antidot** in the $-2$ box.  That's $\left( -1 \right)\left( -2 \right) + 0 \cdot 1 = 2$.

But we promised that there wouldn't be any negative signs in our code.  Let's fix that.



## Transform the **Antidot**

First, some helpful instructions. Notice the gray band above every playable?  You can always reset a playable by clicking this gray band.  Once to  `stop` the playable and  then again to `play` the playable.  (Ooh, you can also see the code for this playable when you click the `stop` button. It's a scrollable box. Cool. We'll show you how to write your own playable on a different page soon.)

INSTRUCTIONS:
- Click on a box to add a **dot**.  
- Drag a **dot** out of the boxes to delete it.  
- Notice the `Add` button in the upper left.  Click on it.  Now you can add **antidots** too.  
- If you have a **dot** and an **antidot** in the same box, drag them together to annihilate them.  



OK, now let's fix that **antidot**.  Try adding $0$ to the middle box by adding both a **dot** AND an **antidot**.  Now you can drag an **antidot** to the left.  No more **antidot**!



```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


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

const base = -2;               // set the base for the machine
const numberBoxes = 3;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes);             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.7;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
  dots.turnOffRuleButton();                      // configure the machine the way we want it.
  dots.addDotsToBox(1,0,1);
};


p5.windowResized = function() {                  // this function is called when the user changes
  const canvasWidth = p5.windowWidth;            // the size of the window.  It will rescale all the 
  const canvasHeight = p5.windowHeight * 0.7;    // components to fit into the new window size.
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



So the code for the number $2$ is `1` `1` `0`.  We have a **dot** in the $4$ box, a **dot** in the  $-2$ box and nothing in the $1$ box.  That gives us $4 + \left(-2 \right) + 0 = 2$.  

Also, we learned a new rule:   `1` `1` $\leftarrow$ `0` `-1` .  Now we can transform an **antidot** into **dots**.  (We can also use this trick to transform a **dot** into **antidots**.)



## What's the code for -3?



See if you can figure out the code for $-3$.


Check out the new `rule` button. It toggles between the standard  `-1`  $\leftarrow$ `2` rule and the `1` `1` $\leftarrow$ `0` `-1`rule.  




```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


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

const base = -2;               // set the base for the machine
const numberBoxes = 4;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes);             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
                                                 // configure the machine the way we want it.
  dots.addDotsToBox(3,0,0);
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


Did you get `1` `1` `0` `1` ?  That's $(-8) + 4 + 0 + 1 = -3$.



## Play


Here's a fully working machine and here are some things for you to try.

- Work out the codes for $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.
- Work out the codes for $-1, -2, -3, -4, -5, -6, -7, -8, -9, -10$.
- How is the code for each positive number $x$ related to the code for it's negation $-x$?  Can you construct one from the other?
- Can you make up divisibility rules?  How can you tell if a number is divisible by $2$? When is it divisible by $3$?
- Is every number's $\lbrace 0, 1 \rbrace$ code unique?  If so, how would you prove it?



```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js


// import the dots library
//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

// this is the url for the background picture
const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


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

const base = -2;               // set the base for the machine
const numberBoxes = 6;         // set how many boxes you want

var dots = new dotlib.Dots();  // create the dots and boxes machine


p5.setup = function() {                          // this function is called when you start the
                                                 // playable. 
  dots.setup(p5, base, numberBoxes);             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

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
```

[Back to Home](:@Home)

#### Composed in Smartdown using Scape



The pages on this site are written in Smartdown, the markup language for [Scape: STEM Collaboration and Programming Environment](http://www.infoclay.com/scape/index.html).  Scape and Smartdown make it easy to share technical and interactive content such as charts, graphs, and featherweight programs called playables.  










