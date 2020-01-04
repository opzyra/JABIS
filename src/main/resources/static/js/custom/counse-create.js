$("#datepicker").datepicker({
	format: 'yyyy.mm.dd',
	language: 'ko',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: new Date()
}).on('changeDate', function(e) {
	counseCreateRoot.counseDate = e.date;
}).on('change', function(){
	if(this.value == ''){
		counseCreateRoot.counseDate = null;
	}
});

$("#datepicker").datepicker('update', counseCreateRoot.workDate);