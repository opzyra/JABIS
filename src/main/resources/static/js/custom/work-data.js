var dateObj = new Date();
var endDate = new Date();

if(dateObj.getDate() >= 25){
	dateObj.setDate(26);
	dateObj.setMonth(dateObj.getMonth()+1);
}


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
	defaultViewDate: dateObj
}).on('changeDate', function(e) {
	workRoot.monthCal(e.date);
	workRoot.selectMonthRequest();
});

$('#month').val(dateObj.format("yyyy.MM"));

$('#pie').asPieProgress({
    namespace: 'pieProgress'
});

var ftMonth = FooTable.init('#counseMonthList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "담당 학생이 없습니다."
});


var myChart = echarts.init(document.getElementById('monthChart'));