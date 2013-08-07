SVG Gradient Helper
===================

Currently this library simplifies the creation of linear gradients for SVG.
The library itself has no external dependencies, but D3 is used in the tests.

[![Build Status](https://travis-ci.org/forforf/svg_gradient_helper.png)](https://travis-ci.org/forforf/svg_gradient_helper)

API:

Making  SVG Linear Gradient:

Basic vertical gradient:

`var colorStops = svg_gradient_helper.makeGradientSvgStops(["#0000aa","#000000", "#00aa00"]);`

`var linGrad = linearGradient('my-grad-id', colorStops);`

`svg_gradient_helper.addDef(linGrad, 'body');`

Creates a linear gradient that is accessible using url('my-grad-id').





