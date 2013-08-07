describe('svg_gradient_helper', function() {

  describe('linearGradient', function() {
    it('passes sanity checks', function(){
      expect(svg_gradient_helper.linearGradient).toBeDefined();
    });

    describe('creation', function(){
      var gradientStops, angle;
      beforeEach(function(){
        var colorArray = ['#000', '#f00', '#0f0', '#00f', '#fff'];
        gradientStops = svg_gradient_helper.makeGradientSvgStops(colorArray);
      });

      it('creates a dom id attribute', function(){
        var domId='dom-id-lin-grad-test';
        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops);

        expect(linGrad.getAttribute('id')).toEqual(domId);
      });

      it('creates gradient vector starting at 0%', function(){
        var domId='grad-vector-start-lin-grad-test';
        var startPerc = "0%";

        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops);
        expect(linGrad.getAttribute('x1')).toEqual(startPerc);
        expect(linGrad.getAttribute('y1')).toEqual(startPerc);
      });

      it('creates gradient vector starting at 0%', function(){
        var domId='grad-vector-start-lin-grad-test';
        var startPerc = "0%";

        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops);
        expect(linGrad.getAttribute('x1')).toEqual(startPerc);
        expect(linGrad.getAttribute('y1')).toEqual(startPerc);
      });

      it('provides vertical gradient by default', function(){
        var domId='grad-vector-default-lin-grad-test';
        var x2EndPerc = "0%";
        var y2EndPerc = "100%";
        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops);
        expect(linGrad.getAttribute('x2')).toEqual(x2EndPerc);
        expect(linGrad.getAttribute('y2')).toEqual(y2EndPerc);
      });

      it('supports arbitrary gradients using floats', function(){
        var domId='grad-vector-float-lin-grad-test';
        var gradientVector = {x1: 0.1, y1: 0.2, x2: 0.9, y2: 0.8}

        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops, gradientVector);

        expect(linGrad.getAttribute('x1')).toEqual("10%");
        expect(linGrad.getAttribute('y1')).toEqual("20%");
        expect(linGrad.getAttribute('x2')).toEqual("90%");
        expect(linGrad.getAttribute('y2')).toEqual("80%");
      });

      it('supports arbitrary gradients using perc strings', function(){
        var domId='grad-vector-perc-str-lin-grad-test';
        var gradientVector = {x1: "15%", y1: "25%", x2: "95%", y2: "85%"}

        var linGrad = svg_gradient_helper.linearGradient(domId, gradientStops, gradientVector);
        expect(linGrad.getAttribute('x1')).toEqual("15%");
        expect(linGrad.getAttribute('y1')).toEqual("25%");
        expect(linGrad.getAttribute('x2')).toEqual("95%");
        expect(linGrad.getAttribute('y2')).toEqual("85%");
      });
    });
  });
});