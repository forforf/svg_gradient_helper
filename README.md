ccd3
====

Currently this library simplifies the creation of linear gradients for SVG.
The library itself has no external dependencies, but D3 is used in the tests.

API:

Making  SVG Linear Gradient:

Basic vertical gradient:

`var colorStops = ccd3.makeGradientSvgStops(["#0000aa","#000000", "#00aa00"]);`

`var linGrad = linearGradient('my-grad-id', colorStops);`

`ccd3.addDef(linGrad, 'body');`

Creates a linear gradient that is accessible using url('my-grad-id').





