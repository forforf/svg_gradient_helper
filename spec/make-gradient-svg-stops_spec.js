describe('svg_gradient_helper', function() {

  describe('makeGradientSvgStops', function() {
    it('passes sanity checks', function(){
      expect(svg_gradient_helper.makeGradientSvgStops).toBeDefined();
    });


    describe('set by array', function() {
      var singleColorArray, expectedOuterHtmls;

      it('creates a one item array of svg:stops for a single item color array', function(){

        singleColorArray = ['#123456'];
        var svgStops = svg_gradient_helper.makeGradientSvgStops(singleColorArray);

        expect(svgStops.length).toEqual(1);
        expect(svgStops[0].getAttribute('stop-color')).toEqual('#123456');
        expect(svgStops[0].getAttribute('offset')).toEqual('0');
        expect(svgStops[0].getAttribute('stop-opacity')).toEqual('1');
      });

      describe('creates svg:stops with interpolated offset', function(){
        var colorArray, svgStops, d3Stops;
        var getAttrs = function getAttrs(name, nodes){
          var attrs = [];
          nodes.forEach(function(node){
            attrs.push(node.getAttribute(name))
          });
          return attrs;
        };

        beforeEach(function(){
          colorArray = ['#000', '#f00', '#0f0', '#00f', '#fff'];
          svgStops = svg_gradient_helper.makeGradientSvgStops(colorArray);
        });

        it('has proper size and opacity', function(){
          expect(svgStops.length).toEqual(5);
          expect( getAttrs( 'stop-opacity', svgStops)).toEqual(['1', '1','1', '1', '1']);
        });

        it('has the proper color assignments', function(){
          expect(svgStops[0].getAttribute('stop-color')).toEqual('#000');
          expect(svgStops[1].getAttribute('stop-color')).toEqual('#f00');
          expect(svgStops[2].getAttribute('stop-color')).toEqual('#0f0');
          expect(svgStops[3].getAttribute('stop-color')).toEqual('#00f');
          expect(svgStops[4].getAttribute('stop-color')).toEqual('#fff');
        });

        it('has the proper offsets', function(){
          expect(svgStops[0].getAttribute('offset')).toEqual('0');
          expect(svgStops[1].getAttribute('offset')).toEqual('0.25');
          expect(svgStops[2].getAttribute('offset')).toEqual('0.5');
          expect(svgStops[3].getAttribute('offset')).toEqual('0.75');
          expect(svgStops[4].getAttribute('offset')).toEqual('1');
        });
      });

      describe('creates svg:stops with explicit configurations', function(){
        var stopArray, svgStops, d3Stops;

        beforeEach(function(){
          //unsorted, it will be returned in offset order
          stopArray = [
            {color: '#444444', offset:0.6, opacity:0.7},
            {color: '#111111', offset:0,   opacity:0.3},
            {color: '#888888', offset:1,   opacity:1}
          ];
          svgStops = svg_gradient_helper.makeGradientSvgStops(stopArray);
        });

        it('has proper size', function(){
          expect(svgStops.length).toEqual(3);
        });

        it('has the proper color assignments', function(){
          expect(svgStops[0].getAttribute('stop-color')).toEqual('#111111');
          expect(svgStops[1].getAttribute('stop-color')).toEqual('#444444');
          expect(svgStops[2].getAttribute('stop-color')).toEqual('#888888');
        });

        it('has the proper offsets', function(){
          expect(svgStops[0].getAttribute('offset')).toEqual('0');
          expect(svgStops[1].getAttribute('offset')).toEqual('0.6');
          expect(svgStops[2].getAttribute('offset')).toEqual('1');
        });

        it('has the proper opacities', function(){
          expect(svgStops[0].getAttribute('stop-opacity')).toEqual('0.3');
          expect(svgStops[1].getAttribute('stop-opacity')).toEqual('0.7');
          expect(svgStops[2].getAttribute('stop-opacity')).toEqual('1');
        });
      });
    });
  });
});