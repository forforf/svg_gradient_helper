# SVG Gradient Helper

Currently this library simplifies the creation of linear gradients for SVG.
The library itself has no external dependencies, but is compatible with jQuery
and D3 node selection.

### Current Build Status from Travis-CI
[![Build Status](https://travis-ci.org/forforf/svg_gradient_helper.png)](https://travis-ci.org/forforf/svg_gradient_helper)

## Usage

### Include the javascript source

`<script type="text/javascript" src="src/svg_gradient_helper.js"></script>`

### Basic linear gradient:

```
// a more convenient handle
var grad = svg_gradient_helper;

// make the gradient stops from an array of colors
var colorArray = ["#aaaaaa","#ffaaaa","#ffffaa","#aaffaa", "#ffffff"];
var stopArray = grad.makeStops(colorArray);

//make the linear gradient definition with it's ID attribute for referencing it
var linGrad = grad.linearGradient('my-grad-id', stopArray);

//tell it where the svg defs block lives
grad.addDef(linGrad, 'body');
```

This creates a linear gradient that is accessible using url('my-grad-id').

When adding the gradient to the svg defs, a new defs section will be created if
one doesn't exist. Or the first defs section found will have the gradient
definition added to it.

[jsFiddle of the above example](http://jsfiddle.net/forforf/3tYf3/1/)







