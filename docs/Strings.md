![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/86e53be54318e87d44d8db3ca0a15896690e1f30/stringsBanner-20.jpg)

This page builds on James Tanton's **exploding dots** curriculum.  If you're new to exploding dots, checkout these amazing pages: [G'Day Math! **Exploding Dots**](http://gdaymath.com/courses/exploding-dots/) and [Global Math Week **Exploding Dots**](https://www.explodingdots.org).

---

## Exploding Dots Meets Kurt Gödel (Also Strings are Numbers)

---

One of the most interesting requirements for doing mathematics is having some strategy for writing numbers down.  Without one, how can we communicate?  I vaguely remember in grade school being taught that the *numbers* were different than the *numerals* we used to represent them, but I found it all very confusing at the time.  

Exploding Dot's shows us that there are lots of different ways to write numbers down.  This makes the difference between  *numbers* and *numerals* easier to grasp.   You can also learn this by taking an introductory Number Theory class but unfortunately most people don't encounter one until they major in math in college.  That's way too late.
 
If two people agree to use the same strategy for writing numbers down, then they can communicate ideas and agree on meaning.  The problem is that once a number is written down with a numeral, the meaning of that string of symbols is open to interpretation.  Someone else can pick a different strategy for interpreting your numeral and say it means something else.  Who's to say who is right?  This actually leads to some weird and unavoidable restrictions on mathematics.

This topic is challenging to learn and also challenging to teach (my personal disclaimer).  If you're new to this stuff you should know that it never makes full sense the first time through.  So do not be disuaded and check out the video below.

---

![fullwidth](https://youtu.be/oXyek2Q40AI)

---


## A Base 26 Machine with THE alphabet for an alphabet.

---

This is a base $26$ machine.  Instead of using the standard number symbols to encode numbers, it uses the symbols `{a,b,c,d,e,f,g,h,i,j,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}`.  It's probably not hugely illuminating, but I just wrote an exploding dots library.   I have a hammer and I'm looking for nails.  I've initilized it with the string `cab`, which has a value of $1353$, but you can try out any word you like.

---

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
  dots.setup(p5, base, numberBoxes);             // initialize the machine with the base and number of boxes. 
  var canvasWidth = p5.windowWidth;              // set the size of the playable
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
  p5.windowResized();                            

  dots.loadSounds();                             // load the sounds for the app
  dots.setAlphabetSymbols(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);      
  dots.addDotsToBox(2,1,2);
  dots.addDotsToBox(1,1,0);             

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
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
---

## What's Next?  Gödel's Incompleteness Part 2?

___

So the next thing we have to cover is Georg Cantor's proof that you can't map a set to it's powerset.  His proof uses something called *diagonalization* and I think it's a good candidate for an interactive web app/playable.  So that's what I'll build next. (When I have time.)  So stay tuned.


[Back to Home](:@Home)

#### Composed in Smartdown using Scape

---

The pages on this site are written in Smartdown, the markup language for [Scape: STEM Collaboration and Programming Environment](http://www.infoclay.com/scape/index.html).  Scape and Smartdown make it easy to share technical and interactive content such as charts, graphs, and featherweight programs called playables.  


