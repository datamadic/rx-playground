"use strict";

// having issues with cors...
// swellData = 'http://magicseaweed.com/api/oZe0sCL4Fdw6lb4f6c0cQbdMqKN710Yh/forecast/?spot_id=3683';


/**
 * Show the button logging only after the promise has returned
 */

var xhrAsPromise = new Promise(function (resolve, reject) {
  var request = new XMLHttpRequest(),
      swellData = "src/swell-data.json";

  request.open("get", swellData, true);
  request.onload = function (load) {
    setTimeout(function () {
      resolve(JSON.parse(load.target.response));
    }, 5 * 1000);
  };
  request.responseType = "application/json";
  request.send();
});


var btnDemo = document.getElementById("btn-demo"),
    btnOther = document.getElementById("btn-other");

var btnPressesDemo = Rx.DOM.fromEvent(btnDemo, "click"),
    btnPressesOther = Rx.DOM.fromEvent(btnOther, "click"),
    xhrReturn = Rx.Observable.fromPromise(xhrAsPromise);


Rx.Observable.combineLatest(btnPressesDemo, btnPressesOther, xhrReturn, function (demoEvent, otherEvent) {
  return { demoEvent: demoEvent, otherEvent: otherEvent };
}).filter(function (item) {
  var diff = item.demoEvent.timeStamp - item.otherEvent.timeStamp,
      after = diff > 0 ? true : false,
      close = Math.abs(diff) < 2000;
  return after && close;
}).map(function (aggregatedEvents) {
  return aggregatedEvents.demoEvent;
}).subscribe(function () {
  for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  console.log(items);
});