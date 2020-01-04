$("#actionBtn").on('click',function(e){
		$(this).toggleClass('active');
});

var myAllScoreChart = echarts.init(document.getElementById('allScoreChart'));
var myAllSubjectChart = echarts.init(document.getElementById('allSubjectChart'));
var myAllRatingChart = echarts.init(document.getElementById('allRatingChart'));
var myMoiChart0 = echarts.init(document.getElementById('highMoiChart0'));
var myMoiChart1 = echarts.init(document.getElementById('highMoiChart1'));
var myMoiChart2 = echarts.init(document.getElementById('highMoiChart2'));
setInterval(function() {
	myAllScoreChart.resize();
	myAllSubjectChart.resize();
	myAllRatingChart.resize();
	myMoiChart0.resize();
	myMoiChart1.resize();
	myMoiChart2.resize();
}, 1000);

$("#datepicker").datepicker({
	format: 'yyyy.mm.dd',
	language: 'ko',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: new Date()
}).on('changeDate', function(e) {
	studentOneRoot.updateStatusDate = e.date;
}).on('change', function(){
	if(this.value == ''){
		studentOneRoot.updateStatusDate = null;
	}
});
