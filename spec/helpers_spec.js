

describe('ccd3', function() {

  describe('helpers', function() {
    var domTestingId = 'ccd3-testing-helpers';
    var domTesting;

    beforeEach(function() {
      domTesting = setUpDomTestArea(domTestingId);
    });

    afterEach(function(){
      tearDownDomTestArea(domTestingId)
    });


    it('passes sanity checks', function(){
      expect(ccd3.helpers.d3jQLove).toBeDefined();
      expect(domTesting).toBeDefined();
      expect(document.getElementById(domTestingId)).toBe(domTesting);
    });

    describe('d3jQLove', function() {
      var container, containerId;
      var d3jQLove = ccd3.helpers.d3jQLove;

      beforeEach(function(){
        container = domTesting.appendChild( document.createElement('div'));
        containerId = 'do-you-love-me';
        container.setAttribute('id', containerId);
      });

      it('passes sanity checks', function(){
        expect(d3jQLove).toBeDefined();
        expect(containerId).toBeDefined();
        expect(jQuery(container) instanceof jQuery).toBe(true);
      });

      it('converts jQuery into standard DOM node', function(){
        var jQNode = jQuery('#'+containerId);
        expect(d3jQLove(jQNode)).toBeDefined()
        expect(d3jQLove(jQNode)).toBe(document.getElementById(containerId));
      });

      it('passes through D3 nodes', function(){
        var d3Node = d3.select('#'+containerId);
        expect(d3jQLove(d3Node)).toBeDefined();
        expect(d3jQLove(d3Node)).toBe(d3Node);
      });

      it('passes through selectors', function(){
        var selector = '#'+containerId;
        expect(d3jQLove(selector)).toBeDefined();
        expect(d3jQLove(selector)).toBe(selector);
      });


    });
  });
});