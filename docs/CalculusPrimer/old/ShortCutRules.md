## Short Cut Rules

All of those derivative rules were derived from the definition of the derivative, which is a secant line through the function with the two points getting closer and closer together.


So when you get to calculus class, [promise](::promise/tooltip,transparent) me that you won't forget the definition of the derivative.

# :::: promise
[](:Xcontract) I promise I won't forget the definition of the derivative.
# ::::

# :::: thankyou
# --colorbox 
Thank You. :pray:
# --colorbox
# ::::

```javascript /autoplay
smartdown.setVariable('contract', false);

this.dependOn = ['contract'];

this.depend = function() {
  if (env.contract == true ) {
      smartdown.showDisclosure('thankyou','','bottomright,transparent,shadow'); 
      setTimeout(function () {
           smartdown.hideDisclosure('thankyou','','bottomright'); 
      }, 3000);
    } 
  };
```
