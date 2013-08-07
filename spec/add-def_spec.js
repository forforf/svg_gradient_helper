describe('svg_gradient_helper', function() {
  var svgns = 'http://www.w3.org/2000/svg';

  describe('addDef', function() {
    var domTestingId = 'svg_gradient_helper-testing-add-def';
    var domTesting, svgElemNode, elemId;

    beforeEach(function() {
      domTesting = setUpDomTestArea(domTestingId);
      elemId = "svg-defs-test-elem";
      svgElemNode = document.createElementNS(svgns, 'rect');
      svgElemNode.setAttribute('id', elemId);

    });

    afterEach(function(){
      tearDownDomTestArea(domTestingId)
    });


    it('passes sanity checks', function(){
      expect(svg_gradient_helper.addDef).toBeDefined();
      expect(domTesting).toBeDefined();
      expect(document.getElementById(domTestingId)).toBe(domTesting);
    });

    it('adds element to defs without pre-existing svg defs elements', function() {

      svg_gradient_helper.addDef(svgElemNode, "#"+domTestingId);

      expect(document.querySelector('svg defs')).toBeDefined();
      expect(document.querySelector('svg defs')).not.toBeNull();
      expect(document.getElementsByTagName('defs').length).toEqual(1);
      expect(document.getElementsByTagName('svg').length).toEqual(1);
      expect(document.getElementById(elemId)).toEqual(svgElemNode);

    });

    it('adds element to defs with pre-existing svg element but no defs element', function() {
      var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      document.getElementById(domTestingId).appendChild(svgNode);

      svg_gradient_helper.addDef(svgElemNode, "#"+domTestingId);

      expect(document.querySelector('svg defs')).toBeDefined();
      expect(document.querySelector('svg defs')).not.toBeNull();
      expect(document.getElementsByTagName('defs').length).toEqual(1);
      expect(document.getElementsByTagName('svg').length).toEqual(1);
      expect(document.getElementById(elemId)).toEqual(svgElemNode);

    });

    it('adds element to defs with pre-existing svg and defs element', function() {
      var defsNode = document.createElementNS(svgns, 'defs');
      var svgNode = document.createElementNS(svgns, 'svg');
      svgNode.appendChild(defsNode);
      document.getElementById(domTestingId).appendChild(svgNode);

      svg_gradient_helper.addDef(svgElemNode, "#"+domTestingId);

      expect(document.querySelector('svg defs')).toBeDefined();
      expect(document.querySelector('svg defs')).not.toBeNull();
      expect(document.getElementsByTagName('defs').length).toEqual(1);
      expect(document.getElementsByTagName('svg').length).toEqual(1);
      expect(document.getElementById(elemId)).toEqual(svgElemNode);
    });

    it('adds element to defs using a document node finder', function() {

      var docNode = document.querySelector("#" + domTestingId);

      svg_gradient_helper.addDef(svgElemNode, docNode);

      expect(document.querySelector('svg defs')).toBeDefined();
      expect(document.querySelector('svg defs')).not.toBeNull();
      expect(document.getElementsByTagName('defs').length).toEqual(1);
      expect(document.getElementsByTagName('svg').length).toEqual(1);
      expect(document.getElementById(elemId)).toEqual(svgElemNode);

    });

    describe('jQuery compatibility tests', function(){
      var nojQueryTestsNeeded = function(){
        it('jQuery library not loaded, so no compatibility test needed', function(){
          expect(true).toBe(true)
        });
      };
      var jQueryTests = function(){
        it('adds element to defs using a jQuery node', function() {

          var docNode = jQuery("#" + domTestingId);

          svg_gradient_helper.addDef(svgElemNode, docNode);

          expect(document.querySelector('svg defs')).toBeDefined();
          expect(document.querySelector('svg defs')).not.toBeNull();
          expect(document.getElementsByTagName('defs').length).toEqual(1);
          expect(document.getElementsByTagName('svg').length).toEqual(1);
          expect(document.getElementById(elemId)).toEqual(svgElemNode);

        });
      };

      if (typeof jQuery === 'undefined'){
        nojQueryTestsNeeded();
      } else {
        jQueryTests();
      }
    });
    describe('D3 compatibility tests', function(){
      var noD3TestsNeeded = function(){
        it('D3 library not loaded, so no compatibility test needed', function(){
          expect(true).toBe(true)
        });
      };
      var d3Tests = function(){
        it('adds element to defs using a d3 selection', function() {

          var docNode = d3.select("#" + domTestingId);

          svg_gradient_helper.addDef(svgElemNode, docNode);

          expect(document.querySelector('svg defs')).toBeDefined();
          expect(document.querySelector('svg defs')).not.toBeNull();
          expect(document.getElementsByTagName('defs').length).toEqual(1);
          expect(document.getElementsByTagName('svg').length).toEqual(1);
          expect(document.getElementById(elemId)).toEqual(svgElemNode);

        });
      };

      if (typeof d3 === 'undefined'){
        noD3TestsNeeded();
      } else {
        d3Tests();
      }
    });

  });


});