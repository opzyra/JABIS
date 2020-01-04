var dateObj = teacherRoot.toDay;
var endDate = new Date();

if(endDate.getDate() >= 25){
	endDate = new Date(endDate.setMonth(new Date().getMonth()+1));
}

$('#month').datepicker({
	format: 'yyyy.mm',
	language: 'ko',
	minViewMode: 'months',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: endDate,
	defaultViewDate: new Date(dateObj.format('YYYY-MM-DD'))
}).on('changeDate', function(e) {
	location.href = '/app/data/counse?year=' + e.date.getFullYear() + '&month=' + parseInt(e.date.getMonth()+1);
});

$('#month').val(dateObj.format("YYYY.MM"));

var ft = FooTable.init('#teacherList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "데이터가 없습니다."
});

$("#teacherList").on('keydown', '.form-inline', function(e){
	if(e.keyCode == 8){
		$('.fooicon-remove').trigger('click');
	} else if(e.keyCode == 13){
		$('.fooicon-search').trigger('click');
	}
	
});

$("#teacherList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});

