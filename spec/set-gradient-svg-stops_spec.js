describe('ccd3', function() {

  describe('setGradientSvgStops', function() {
    it('passes sanity checks', function(){
      expect(ccd3.setGradientSvgStops).toBeDefined();
    });


    // d3 is just used as a handle for testing,
    // especially helpful for multiple node selections

    describe('set by array', function() {
      var singleColorArray, expectedOuterHtmls;

      it('creates a one item array of svg:stops for a single item color array', function(){

        singleColorArray = ['#123456'];
        var svgStops = ccd3.setGradientSvgStops(singleColorArray);

        var d3Stops = d3.selectAll(svgStops);

        expect(d3Stops.size()).toEqual(1);
        expect(d3Stops.attr('stop-color')).toEqual('#123456');
        expect(d3Stops.attr('offset')).toEqual('0');
        expect(d3Stops.attr('stop-opacity')).toEqual('1');
      });

      describe('creates svg:stops with interpolated offset', function(){
        var colorArray, svgStops, d3Stops;

        beforeEach(function(){
          colorArray = ['#000', '#f00', '#0f0', '#00f', '#fff'];
          svgStops = ccd3.setGradientSvgStops(colorArray);
          d3Stops = d3.selectAll(svgStops);
        });

        it('has proper size and opacity', function(){
          expect(d3Stops.size()).toEqual(5);
          expect(d3Stops.attr('stop-opacity')).toEqual('1');
        });

        it('has the proper color assignments', function(){
          expect(d3.select(d3Stops[0][0]).attr('stop-color')).toEqual('#000');
          expect(d3.select(d3Stops[0][1]).attr('stop-color')).toEqual('#f00');
          expect(d3.select(d3Stops[0][2]).attr('stop-color')).toEqual('#0f0');
          expect(d3.select(d3Stops[0][3]).attr('stop-color')).toEqual('#00f');
          expect(d3.select(d3Stops[0][4]).attr('stop-color')).toEqual('#fff');
        });

        it('has the proper offsets', function(){
          expect(d3.select(d3Stops[0][0]).attr('offset')).toEqual('0');
          expect(d3.select(d3Stops[0][1]).attr('offset')).toEqual('0.25');
          expect(d3.select(d3Stops[0][2]).attr('offset')).toEqual('0.5');
          expect(d3.select(d3Stops[0][3]).attr('offset')).toEqual('0.75');
          expect(d3.select(d3Stops[0][4]).attr('offset')).toEqual('1');
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
          svgStops = ccd3.setGradientSvgStops(stopArray);
          d3Stops = d3.selectAll(svgStops);
        });

        it('has proper size', function(){
          expect(d3Stops.size()).toEqual(3);
          //expect(d3Stops.attr('stop-opacity')).toEqual('1');
        });

        it('has the proper color assignments', function(){
          expect(d3.select(d3Stops[0][0]).attr('stop-color')).toEqual('#111111');
          expect(d3.select(d3Stops[0][1]).attr('stop-color')).toEqual('#444444');
          expect(d3.select(d3Stops[0][2]).attr('stop-color')).toEqual('#888888');
        });

        it('has the proper offsets', function(){
          expect(d3.select(d3Stops[0][0]).attr('offset')).toEqual('0');
          expect(d3.select(d3Stops[0][1]).attr('offset')).toEqual('0.6');
          expect(d3.select(d3Stops[0][2]).attr('offset')).toEqual('1');
        });

        it('has the proper opacities', function(){
          expect(d3.select(d3Stops[0][0]).attr('stop-opacity')).toEqual('0.3');
          expect(d3.select(d3Stops[0][1]).attr('stop-opacity')).toEqual('0.7');
          expect(d3.select(d3Stops[0][2]).attr('stop-opacity')).toEqual('1');
        });
      });
    });
  });
});