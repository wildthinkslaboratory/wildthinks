

function centerTextInRect(p5, x,y,width,height,text) {
  const textW = p5.textWidth(text);
  const textH = p5.textAscent() * 0.8;
  const xoffset = (width - textW) / 2;
  const yoffset = (height - textH) / 2;
  return [x + xoffset, y + height - yoffset];
}


class Button {
  constructor(name, img, img2) {
    this.name = name;
    this.color = '#FFFFFF';
    this.color2 = '#66AAFF';
    this.stroke = '#CCCCCC';
    this.stroke2 = '#CCCCCC';
    this.state = false;
    this.img = img;
    this.img2 = img2;
  }

  toggle() {
    this.state = !this.state;
  }

  getColor() {
    if (this.state) {
      return this.color2;
    }
    return this.color;
  }

  getStroke() {
    if (this.state) {
      return this.stroke2;
    }
    return this.stroke;
  }

  getImage() {
    if (this.state) {
      return this.img2;
    }
    return this.img;
  }
} 

class ButtonArray {
  constructor(playablep5, width, xSpacer, ySpacer) {
    this.p5 = playablep5;
    this.buttons = [];
    this.width = width;
    this.xSpacer = xSpacer;
    this.ySpacer = ySpacer;
  }

  getButtonID(x, y) {
    let result = -1;
    const W = this.xSpacer + this.width;
    const N = this.buttons.length;

    // check the vertical range of the boxes
    if (y < this.ySpacer || y > (this.ySpacer + this.width)) {
      // its not in the buttons
    }
    else {
      // check the horizontal range
      const rightX = this.xSpacer + W * N;
      if (x < this.xSpacer || x > rightX) {
      // its not in the buttons
      }
      else {
        // It is in a buttons's zone, but might be in the spacer.
        const buttonId = Math.floor((x - this.xSpacer) / W);
        const buttonLeft = this.xSpacer + buttonId * W;
        const buttonRight = buttonLeft + this.width;

        if (x < buttonLeft || x > buttonRight) {
          
        }
        else {
          result = buttonId;
        }
      }
    }

    return result;
  }

  draw() { 
    this.p5.clear();                          
    for (let i=0; i < this.buttons.length; i++) {
      this.p5.fill(this.buttons[i].getColor());
      this.p5.stroke(this.buttons[i].getStroke());
      this.p5.strokeWeight(2);
      let x = i * (this.width + this.xSpacer) + this.xSpacer;
      this.p5.rect(x, this.ySpacer, this.width, this.width, 10);  
      this.p5.image(this.buttons[i].getImage(), x, this.ySpacer, this.width, this.width);
      // let [tx, ty] = centerTextInRect(this.p5, x, this.ySpacer, this.width, this.width, this.buttons[i].name);
      // this.p5.fill('#000000');
      // this.p5.text(this.buttons[i].name, tx, ty);
    }          
  }

  mousePressed() {
    let buttonID = this.getButtonID(this.p5.mouseX,this.p5.mouseY);
    if (buttonID != -1) {
      this.buttons[buttonID].toggle();
      return [this.buttons[buttonID].name, this.buttons[buttonID].state];
    }
    return ['', false];
  }

  addButton(name, img, img2) {
    this.buttons.push(new Button(name, img, img2));
  }

  removeButton(id) {
    if (id < this.buttons.length) {
      this.buttons.splice(id,1);
    } 
  }

  size() { return this.buttons.length; }
}

class ToolPanel extends ButtonArray {
  constructor(playablep5, width, xSpacer, ySpacer) {
    super(playablep5, width, xSpacer, ySpacer);
    this.state = 0;
  }

  initialize() {
    if (this.buttons.length > 0) {
      this.buttons[0].state = true;
    }
  }

  mousePressed() {
    let buttonID = this.getButtonID(this.p5.mouseX,this.p5.mouseY);
    if (buttonID != -1) {
      this.buttons[this.state].state = false;
      this.buttons[buttonID].state = true;
      this.state = buttonID;
      return [this.buttons[buttonID].name, this.buttons[buttonID].state, buttonID];
    }
    return ['', false, buttonID];
  }
}

class CalculusToolbar extends ToolPanel {
  constructor(playablep5) {
    super(playablep5, 55, 15, 15);

    let rectImg = playablep5.loadImage('CalculusPrimer/images/rectButton.png');
    let rectImg2 = playablep5.loadImage('CalculusPrimer/images/rectButton2.png');
    let secantImg = playablep5.loadImage('CalculusPrimer/images/secantButton.png');
    let secantImg2 = playablep5.loadImage('CalculusPrimer/images/secantButton2.png');
    let rectSecantImg = playablep5.loadImage('CalculusPrimer/images/rectSecantButton.png');
    let rectSecantImg2 = playablep5.loadImage('CalculusPrimer/images/rectSecantButton2.png');
    let rectArrayImg = playablep5.loadImage('CalculusPrimer/images/rectArray.png');
    let rectArrayImg2 = playablep5.loadImage('CalculusPrimer/images/rectArray2.png');
    let secantArrayImg = playablep5.loadImage('CalculusPrimer/images/secantArray.png');
    let secantArrayImg2 = playablep5.loadImage('CalculusPrimer/images/secantArray2.png');
    let secantRectArrayImg = playablep5.loadImage('CalculusPrimer/images/secantRectArray.png');
    let secantRectArrayImg2 = playablep5.loadImage('CalculusPrimer/images/secantRectArray2.png');

    this.addButton('rectangle', rectImg, rectImg2);
    this.addButton('secant', secantImg, secantImg2);
    this.addButton('rectSecant', rectSecantImg, rectSecantImg2);
    this.addButton('rectangleArray', rectArrayImg, rectArrayImg2);
    this.addButton('secantArray', secantArrayImg, secantArrayImg2);
    this.addButton('secantRectangleArray', secantRectArrayImg, secantRectArrayImg2);

    this.initialize();
  }
}

class ResourcePanel extends ToolPanel {
  constructor(playablep5) {
    super(playablep5, 55, 15, 15);
    let rectImg = playablep5.loadImage('CalculusPrimer/images/rectButton.png');
    let rectImg2 = playablep5.loadImage('CalculusPrimer/images/rectButton2.png');
    this.addButton('rectangle', rectImg, rectImg2);
    this.addButton('rectangle', rectImg, rectImg2);
    this.addButton('rectangle', rectImg, rectImg2);
  }

  removeActiveButton() {
    for (let i=0; i < this.buttons.length; i++) {
      if (this.buttons[i].state) {
        this.removeButton(i);
        this.state = 0;
        break;
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.calclib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.ButtonArray = ButtonArray;
  exports.ToolPanel = ToolPanel;
  exports.CalculusToolbar = CalculusToolbar;
  exports.ResourcePanel = ResourcePanel;


});

