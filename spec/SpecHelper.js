function setUpDomTestArea(domId, callback){

    var main = document.getElementsByTagName("body")[0];
    var domFragment = document.createDocumentFragment();
    var containerFrag = domFragment.appendChild( document.createElement('div'));
    var containerId = domId;
    containerFrag.setAttribute('id', containerId);
    main.appendChild(containerFrag);
    var domTesting = document.getElementById(domId)

    return domTesting;
}

function tearDownDomTestArea(domId){
  var testArea = document.getElementById(domId);
  testArea.parentNode.removeChild(testArea);
}
