

describe('svg_gradient_helper', function() {

  describe('helpers', function() {
    var domTestingId = 'svg_gradient_helper-testing-helpers';
    var domTesting;

    beforeEach(function() {
      domTesting = setUpDomTestArea(domTestingId);
    });

    afterEach(function(){
      tearDownDomTestArea(domTestingId)
    });


    it('passes sanity checks', function(){
      expect(domTesting).toBeDefined();
      expect(document.getElementById(domTestingId)).toBe(domTesting);
    });


    describe('getNode', function() {
      var container, containerId;
      var getNode = svg_gradient_helper.helpers.getNode;

      beforeEach(function(){
        container = domTesting.appendChild( document.createElement('div'));
        containerId = 'get-node-test';
        container.setAttribute('id', containerId);

      });

      it('passes sanity checks', function(){
        expect(getNode).toBeDefined();
        expect(containerId).toBeDefined();
      });

      it('gets node using css selector', function(){
        var selector = '#'+containerId;
        expect(getNode(selector)).toBeDefined();
        expect(getNode(selector)).toBe(container);
      });

      describe('jQuery compatibility tests', function(){
        var nojQueryTestsNeeded = function(){
          it('jQuery library not loaded, so no compatibility test needed', function(){
            expect(true).toBe(true)
          });
        };
        var jQueryTests = function(){
          it('converts jQuery node into standard DOM node', function(){
            var jQNode = jQuery('#'+containerId);
            expect(getNode(jQNode)).toBeDefined()
            expect(getNode(jQNode)).toBe(container);
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
          it('D3 nodes are special arrays, finds first item in nested array', function(){
            var d3Node = d3.select('#'+containerId);
            expect(getNode(d3Node)).toBeDefined();
            expect(getNode(d3Node)).toBe(container);
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
});