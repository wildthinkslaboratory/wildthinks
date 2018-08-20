### Another DFA
added state trace above string and better state color changes
```p5js/playable/autoplay

//smartdown.import=http://127.0.0.1:5555/dfa.js

this.div.style.position = 'relative';
this.div.style['background-image'] = 'url("https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71e56b6dabdb46605e9d0d411eca1b4391ec9313/dfaBackground.001.jpeg")';
	

this.div.style['background-repeat'] = 'no-repeat';
this.div.style['background-size'] = 'cover';
//this.div.style.background = 'gray';
this.div.style.height = '500px';
this.div.style.width = '800px';
this.div.style.border = '5px solid gray';

console.log('dfalib', dfalib);

p5.preload = function() {
	dfalib.preload(p5);
}

p5.setup = function() {
	dfalib.setup();
}


var S;   // holsd the input string

this.dependOn = ['BitString'];
this.depend = function() {        // Called when BitString changes to a new value
  S = env.BitString;
  dfalib.newInput(S);
};


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
