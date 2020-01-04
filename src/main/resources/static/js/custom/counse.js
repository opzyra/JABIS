$("#datepicker").datepicker({
	format: 'yyyy.mm.dd',
	language: 'ko',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: new Date()
}).on('changeDate', function(e) {
    if(e.target.id == 'start'){
    	counseRoot.start = e.date.format('yyyy-MM-dd');
    }else{
    	counseRoot.end = e.date.format('yyyy-MM-dd');
    }
});

$("#name").select2({
	placeholder: "이름",
	width: 235
}).on('select2:select', function (e) {
	counseRoot.studentIdx = e.params.data.id;
	counseRoot.name = e.params.data.text;
});

var ft = FooTable.init('#counseList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "검색결과가 없습니다."
});

$("#counseList").on('keydown', '.form-inline', function(e){
	if(e.keyCode == 8){
		$('.fooicon-remove').trigger('click');
	} else if(e.keyCode == 13){
		$('.fooicon-search').trigger('click');
	}
	
});

$("#counseList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});


