
var btnDemo = document.getElementById('btn-demo'),
		btnOther = document.getElementById('btn-other');

var btnPressesDemo = Rx.DOM.fromEvent(btnDemo, 'click'),
		btnPressesOther = Rx.DOM.fromEvent(btnOther, 'click');


Rx.Observable.combineLatest(btnPressesDemo, btnPressesOther, (demoEvent, otherEvent) =>{
		return {demoEvent, otherEvent}
	})
	.filter(item => {
		var diff = item.demoEvent.timeStamp - item.otherEvent.timeStamp,
				after = diff > 0 ? true : false,
				close = Math.abs(diff) < 2000;
		return (after && close)
	})
	.subscribe((...items) => {
		console.log(items);
	});



