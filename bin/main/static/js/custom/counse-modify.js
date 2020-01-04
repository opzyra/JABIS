$("#datepicker").datepicker({
	format: 'yyyy.mm.dd',
	language: 'ko',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: new Date()
}).on('changeDate', function(e) {
	counseModifyRoot.counseDate = e.date;
}).on('change', function(){
	if(this.value == ''){
		counseModifyRoot.counseDate = null;
	}
});
