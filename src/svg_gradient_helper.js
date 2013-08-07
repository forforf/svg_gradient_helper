
window.svg_gradient_helper = (function() {
  // Main object
  var svg_gradient_helper = {};
  var svgns = 'http://www.w3.org/2000/svg';

  // Private variables
  // -----------------
  var gradientStops = [];

  // Private functions
  // -----------------

  // create document fragment
  function createSvgNode(tag){
    var el = document.createElementNS(svgns, tag);
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
    var svgStopNode = createSvgNode('stop');
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

  function setVectors(vecs, vec, defVal){
    if (vecs === undefined || vecs === null) { vecs = {} }
    if (typeof vecs[vec] == 'string' || vecs[vec] instanceof String){
      if (vecs[vec].match(/\d+%$/)){
        return;
      } else {
        vecs[vec] = parseFloat(vecs[vec]);
      }
    }
    // convert to percentage string
    if (isNaN(vecs[vec])) { vecs[vec] = defVal }
    vecs[vec] = parseFloat(vecs[vec]);
    if (vecs[vec] < 0) { vecs[vec] = 0 }
    if (vecs[vec] > 1) { vecs[vec] = 1 }
    vecs[vec] = "" + vecs[vec]*100 + "%";
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

  function linearGradient(id, gradientStops, svgVector){

    //Validations
    if ( typeof svgVector !== 'object'){
     svgVector = { x1: 0.0, y1: 0.0, x2: 0.0, y2: 1.0 };
    }
    setVectors(svgVector, "x1", 0.0);
    setVectors(svgVector, "y1", 0.0);
    setVectors(svgVector, "x2", 0.0);
    setVectors(svgVector, "y2", 1.0);


    //Options (not configurable at this point)
    var spreadMethod = "pad";

    var svgLinGradNode = createSvgNode('linearGradient');
    svgLinGradNode.setAttribute("id", id);

    svgLinGradNode.setAttribute("x1", svgVector.x1);
    svgLinGradNode.setAttribute("y1", svgVector.y1);
    svgLinGradNode.setAttribute("x2", svgVector.x2);
    svgLinGradNode.setAttribute("y2", svgVector.y2);

    gradientStops.forEach(function(gradStop){
      svgLinGradNode.appendChild(gradStop);
    });

    return svgLinGradNode;

  }

  function addDef(defsContent, parentSelector){
    var svgNode, defsNode;

    var parent = document.querySelector(parentSelector);

    var svgNodes = document.getElementsByTagNameNS(svgns, 'svg');

    var svgFinder = parent.querySelector('svg');

    //if there's no svg section create one
    if (svgFinder === null){
      svgNode = document.createElementNS(svgns, 'svg');
    } else {
      svgNode = document.getElementsByTagNameNS(svgns, 'svg')[0];
    }
    //we have an svgNode now

    var svgDefsFinder = parent.querySelector('svg defs');

    // if there is no defs section create one
    if (svgDefsFinder === null){
      var defsNode = document.createElementNS(svgns, 'defs');
    } else {
      defsNode = document.getElementsByTagNameNS(svgns, 'defs')[0];
    }
    // we have defsNode now

    defsNode.appendChild(defsContent);
    svgNode.appendChild(defsNode);
    parent.appendChild(svgNode);

  }


  // Element Functions
  // -----------------

  svg_gradient_helper.makeGradientSvgStops = makeGradientSvgStops;
  svg_gradient_helper.linearGradient = linearGradient;
  svg_gradient_helper.addDef = addDef;



  // Container for helper functions
  var helpers = svg_gradient_helper.helpers = {};


  // returns a regular document node from a CSS Lookup string,
  // jQuery node, or a regular document node (latter is just pass through)
  helpers.getNode = function(lookup) {

    if( isString(lookup)){
      return document.querySelector(lookup);
    }

    // if lookup is a jQuery node return normal node
    if (typeof jQuery !== 'undefined'  && lookup instanceof jQuery){ return lookup[0] }
    // if lookup is a D3 node return first node
    if (typeof d3 !== 'undefined'  && lookup instanceof d3.selection){
      //flattens array and gets first element
      var flatSelection = [].concat.apply([], lookup);
      return flatSelection[0]
    }

    return lookup;
  };



  // SVG Methods


  return svg_gradient_helper;
})();