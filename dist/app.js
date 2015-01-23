"use strict";

// having issues with cors...
// swellData = 'http://magicseaweed.com/api/oZe0sCL4Fdw6lb4f6c0cQbdMqKN710Yh/forecast/?spot_id=3683';


var xhrAsPromise = new Promise(function (resolve, reject) {
  var request = new XMLHttpRequest(),
      swellData = "src/swell-data.json";

  request.open("get", swellData, true);
  request.onload = function (load) {
    resolve(JSON.parse(load.target.response));
  };
  request.responseType = "application/json";
  request.send();
});

Rx.Observable.fromPromise(xhrAsPromise).subscribe(function (waves) {
  console.log(waves);
});


var btnDemo = document.getElementById("btn-demo"),
    btnOther = document.getElementById("btn-other");

var btnPressesDemo = Rx.DOM.fromEvent(btnDemo, "click"),
    btnPressesOther = Rx.DOM.fromEvent(btnOther, "click");


Rx.Observable.combineLatest(btnPressesDemo, btnPressesOther, function (demoEvent, otherEvent) {
  return { demoEvent: demoEvent, otherEvent: otherEvent };
}).filter(function (item) {
  var diff = item.demoEvent.timeStamp - item.otherEvent.timeStamp,
      after = diff > 0 ? true : false,
      close = Math.abs(diff) < 2000;
  return after && close;
}).subscribe(function () {
  for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  console.log(items);
}, function () {}, function () {
  console.log("we're all done here");
});