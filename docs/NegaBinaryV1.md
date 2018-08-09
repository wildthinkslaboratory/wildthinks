
![](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/eb65f6202d8185468cea211757f0700fcef3aacd/negaBinaryBanner1.png)


### Welcome to our Prototype Negative Binary Page

---

---

## Negative Binary Instructions

- Tap to add a Dot to a Box
- Toggle the Add Dot button to switch to adding Antidots
- Drag a Dot Left to *explode* the dot.
- Drag a Dot out of the frame to delete it.
- Drag a Dot over an Antidot to annihilate them
- Drag a Dot to the right to *unexplode* it 
- Toggle the Rule button to switch between the | $1$ | $1$ | $\longleftarrow$ | $0$ | $-1$ | rule and the standard $-1 \longleftarrow 2$ rule.


```p5js/playable/autoplay
/*//smartdown.import=http://127.0.0.1:5555/dots.js*/

//smartdown.import=https://raw.githubusercontent.com/wildthinkslaboratory/wildthinks/master/docs/dots.js?token=AfXFVtIYDI3EmFNt695SHVJICTet-nL-ks5bdQKuwA%3D%3D

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

p5.setup = function() {

  dl.setup(p5, base, numberBoxes);
  dl.loadSounds();
  var canvasWidth = p5.windowWidth;
  var canvasHeight = p5.windowHeight * 0.8;
  p5.createCanvas(canvasWidth,canvasHeight);
  p5.windowResized();

  p5.pixelDensity(1);   // this should be taken out as soon as they fix the clear() function in p5js
};


p5.windowResized = function() {
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight * 0.8;
  dl.windowResized(canvasWidth, canvasHeight);
  p5.resizeCanvas(canvasWidth, canvasHeight);
}


p5.draw = function() {
  dl.draw();
}


p5.mousePressed = function()
{
  dl.mousePressed();
}


p5.mouseDragged = function() {
  dl.mouseDragged();
}


p5.mouseReleased = function() {
  dl.mouseReleased();
}
```



### Known Bugs

- If there's a lot of dots in a box the annihilation doesn't always work.  Need to figure out how to consistently reproduce it.
- When I hit the rule button I get an undefined dot in dotsMouseDragged




---

[Back to Home](:@Home)
