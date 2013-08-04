window.ccd3 = (function() {
  // Main object
  var ccd3 = {};

  // Private variables
  // -----------------
  var gradientStops = [];

  // Private functions
  // -----------------

  // create document fragment
  function createNode(tag){
    var el = document.createElement(tag);
    return document.createDocumentFragment().appendChild(el);
  }

  function isPlainObj(o) {
    return (typeof o == 'object' && o.constructor == Object);
  }

  function isString(s) {
    return (typeof s == 'string' || s instanceof String);
  }

  function calculateOffset(idx, len){
    if(idx===0){ return 0.0 }
    if(idx===(len-1)){ return 1.0 }
    return idx/(len-1)
  }


  // Array of colors, offset is linearly interpolated, opacity is 1
  function gradStopsFromColorArray(gradArray) {
    // gradientStops output format:
    // [
    //   {color: #ffffff, offset:0, opacity:1},
    //   {color: #777777, offset:0.5, opacity: 1},
    //   {color: #000000, offset:1, opacity: 1}
    //]

    var gradStops = [];

    gradArray.forEach(function(color, idx, ar){
      var opacity = 1;
      var offset = calculateOffset(idx, ar.length);
      var stopObj = {color: color, offset: offset, opacity: opacity};
      var svgStop = gradStopObjToSvgStop(stopObj);

      gradStops.push(svgStop)
    });

    return gradStops;
  }

  function gradStopObjToSvgStop(gradStopObj){
    var svgStopNode = createNode('svg:stop');
    svgStopNode.setAttribute("offset", gradStopObj.offset);
    svgStopNode.setAttribute("stop-color", gradStopObj.color);
    svgStopNode.setAttribute("stop-opacity", gradStopObj.opacity);
    return svgStopNode;
  }

  function mapToValidOpts(userOpts, validOptKeys) {
    var validOpts = {};
    Object.keys(userOpts).forEach(function(userOptKey){
      if (validOptKeys.indexOf(userOptKey)>-1){
        validOpts[userOptKey] = userOpts[userOptKey];
      }
    });
    return validOpts;
  }

  //gradientStops can be unsorted, it will be returned in offset order
  function makeGradientSvgStops(gradientStops){
    var gradientSvgStops = [];

    var firstGradientStop = gradientStops[0]

    // ToDo: Validate string is color string
    if ( isString(firstGradientStop) ) {
      var gradientSvgStops = gradStopsFromColorArray(gradientStops);
    }

    if ( isPlainObj(firstGradientStop) ) {

      var validGradientKeys = ["color", "offset", "opacity"];
      gradientStops.forEach(function(gradStopObj, idx){
        var validObj = mapToValidOpts(gradStopObj, validGradientKeys);
        var svgStop = gradStopObjToSvgStop(validObj);
        gradientSvgStops.push(svgStop);
      });
    }

    gradientSvgStops.sort( function(a,b){
      return parseFloat(a.getAttribute('offset')) - parseFloat(b.getAttribute('offset'))
    });

    return gradientSvgStops;
  }




  // Constructor Function (not sure if this is needed yet)
  function Ccd3(els) {

  }

  // Element Functions
  // -----------------

  ccd3.makeGradientSvgStops = makeGradientSvgStops;





  // ...
  ccd3.linearGradientBox = "foo";


  // Container for helper functions
  var helpers = ccd3.helpers = {};

  //converts native jQuery node into a D3 compatible node
  helpers.d3jQLove = function(el) {
    if(el instanceof jQuery) {
      return el[0];
    }
    return el;
  };

  // SVG Methods


  return ccd3;
})();