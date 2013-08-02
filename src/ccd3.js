window.ccd3 = (function() {

  // Constructor Function
  function Ccd3(els) {

  }

  // Container for main object
  var ccd3 = {};

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

  return ccd3;
})();