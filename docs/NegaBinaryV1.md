![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/eb65f6202d8185468cea211757f0700fcef3aacd/negaBinaryBanner1.png)


## Welcome to our Prototype Negative Binary Page

---
Here's a cool way to write down numbers. We're going to write all of the integers.  So that's  

$$ \ldots , -4, -3, -2, -1, 0, 1, 2, 3, 4, \ldots $$

but we're only going to use the symbols $\lbrace 0,1\rbrace$.  Here's the catch.  You're not allowed to use the negative sign, $-$, in front of a number to say that it's negative.  


---

## Let's Begin

---

Let's write the number $2$ in Negative Binary.  Drag a dot to the left.  ( You can also drag it back to the right. )

---

```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js

//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';
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

const base = -2;
const numberBoxes = 2;

var dots = new dotlib.Dots();

console.log("this.dotlib", dotlib);

p5.setup = function() {

  dots.setup(p5, base, numberBoxes);
  var canvasWidth = p5.windowWidth * 0.5;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);
  p5.windowResized();

  dots.loadSounds();
  dots.turnOffRuleButton();
  dots.turnOffAddDotButton();
  dots.allowAddDots(false);
  dots.allowRemoveDots(false);
  dots.addDotsToBox(2,1,0);

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  const canvasWidth = p5.windowWidth * 0.5;
  const canvasHeight = p5.windowHeight * 0.8;
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dots.draw();
}


p5.mousePressed = function()
{
  dots.mousePressed();
}


p5.mouseDragged = function() {
  dots.mouseDragged();
}


p5.mouseReleased = function() {
  dots.mouseReleased();
}
```

---

So the code for the number $2$ is `-1`  `0`.  We have one antidot in the $-2$ box.  That's $\left( -1 \right)\left( -2 \right) = 2$.

But we promised that there wouldn't be any negative signs in our code.  Let's fix that.

---

## Transform the Antidot

---

First, some helpful INSTRUCTIONS:

- You can click on a box to add a dot.  
- If you drag the dot out of the boxes that will delete it.  
- Notice the `Add` button in the upper left.  Click on it.  Now you can add antidots too.  
- If you have a dot and an antidot in the same box, drag them together to annihilate them.  

Notice the little `play` and `stop` buttons on the upper left of every playable.  You can always click the `stop` button and then the `play` button to reset the playable.  

OK, now let's fix that antidot.  Try adding $0$ to the middle box by adding both a dot AND an antidot.  Now you can drag an antidot to the left.

---

```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js

//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';
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

const base = -2;
const numberBoxes = 3;

var dots = new dotlib.Dots();

console.log("this.dotlib", dotlib);

p5.setup = function() {

  dots.setup(p5, base, numberBoxes);
  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);
  p5.windowResized();

  dots.loadSounds();
  dots.turnOffRuleButton();
  dots.addDotsToBox(1,0,1);

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight * 0.8;
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dots.draw();
}


p5.mousePressed = function()
{
  dots.mousePressed();
}


p5.mouseDragged = function() {
  dots.mouseDragged();
}


p5.mouseReleased = function() {
  dots.mouseReleased();
}
```

---

So the code for the number $2$ is `1` `1` `0`.  We have one $4$ and one $-2$ which gives us $4 + \left(-2 \right) = 2$.  

Also, we learned a new rule:   `1` `1` $\leftarrow$ `0` `-1` .  Now we can transform antidots into dots.  (We can also use this trick to transform dots into antidots.)

---

## What's the code for -3?

---

See if you can figure out the code for $-3$.


Check out the new `rule` button. It toggles between the standard  `-1`  $\leftarrow$ `2` rule and the `1` `1` $\leftarrow$ `0` `-1`rule.  

---


```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js

//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';
myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '100%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';


const base = -2;
const numberBoxes = 4;

var dots = new dotlib.Dots();

console.log("this.dotlib", dotlib);

p5.setup = function() {

  dots.setup(p5, base, numberBoxes);
  dots.loadSounds();
  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);
  p5.windowResized();

  dots.addDotsToBox(3,0,0);
  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight * 0.8;
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dots.draw();
}


p5.mousePressed = function()
{
  dots.mousePressed();
}


p5.mouseDragged = function() {
  dots.mouseDragged();
}


p5.mouseReleased = function() {
  dots.mouseReleased();
}
```

---

## Play

---

Here's some things to try.

- Work out the codes for $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.
- Work out the codes for $-1, -2, -3, -4, -5, -6, -7, -8, -9, -10$.

---

```p5js/playable/autoplay
//xsmartdown.import=http://127.0.0.1:5555/dots.js

//smartdown.import=https://wildthinkslaboratory.github.io/wildthinks/dots.js

const bgURL = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/a813f0d1c5d0108a8b923ce73dd17ebddc692972/ExpDotsBackground.001.jpeg';


// Adjust the surrounding DIV(s) a little

const myDiv = this.div;
myDiv.style.position = 'relative';
myDiv.style['background-image'] = `url(${bgURL})`;
myDiv.style['background-repeat'] = 'no-repeat';
myDiv.style['background-size'] = 'cover';
myDiv.style.height = '100%';
myDiv.style.width = '100%';
myDiv.style.padding = '0';
myDiv.style.margin = '0';
myDiv.style.overflow = 'hidden';
myDiv.style.border = '5px solid gray';


const base = -2;
const numberBoxes = 5;

var dots = new dotlib.Dots();

console.log("this.dotlib", dotlib);

p5.setup = function() {

  dots.setup(p5, base, numberBoxes);
  dots.loadSounds();
  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);
  p5.windowResized();

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight * 0.8;
  dots.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dots.draw();
}


p5.mousePressed = function()
{
  dots.mousePressed();
}


p5.mouseDragged = function() {
  dots.mouseDragged();
}


p5.mouseReleased = function() {
  dots.mouseReleased();
}
```


### Known Bugs

- If there's a lot of dots in a box the annihilation doesn't always work.  Need to figure out how to consistently reproduce it.
- When I hit the rule button I get an undefined dot in dotsMouseDragged




---

[Back to Home](:@Home)








