"use strict";

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
});