$("#name").select2({
	placeholder: "이름",
    allowClear: true,
	width: 235
}).on('select2:select', function (e) {
	scoreRoot.selected = false;
	scoreRoot.studentIdx = e.params.data.id;
	scoreRoot.name = e.params.data.text;
	scoreRoot.students.map(function(x){
		if(x.idx == e.params.data.id){
			scoreRoot.school = x.school;
			scoreRoot.grade = x.grade;
			scoreRoot.gradeCode = x.gradeCode;
			scoreRoot.hrtName = x.hrtName;
			if(x.gradeCode == 1 || x.gradeCode == 2) {
				scoreRoot.mode = 0;
			}else {
				scoreRoot.mode = 1;
			}
		}
	})
});

$("#scoreList").select2({
	placeholder: "성적 데이터",
	minimumResultsForSearch: -1,
}).on('select2:select', function (e) {
	scoreRoot.dataSelected = true;
	scoreRoot.typeName = e.params.data.text;
	scoreRoot.scoreIdx = e.params.data.id;
	if(e.params.data.id == 0){
		scoreRoot.getAllScore(e.params.data.id);
		scoreRoot.isAll = true;
	}else{
		scoreRoot.getScore(e.params.data.id);
		scoreRoot.isAll = false;
		
	}
});


$("#scoreList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});

var myChart = echarts.init(document.getElementById('chart'));
var myAllScoreChart = echarts.init(document.getElementById('allScoreChart'));
var myAllSubjectChart = echarts.init(document.getElementById('allSubjectChart'));
var myHighRatingChart = echarts.init(document.getElementById('highRatingChart'));
var myAllRatingChart = echarts.init(document.getElementById('allRatingChart'));
var myMoiRatingChart = echarts.init(document.getElementById('moiRatingChart'));
var myMoiChart0 = echarts.init(document.getElementById('highMoiChart0'));
var myMoiChart1 = echarts.init(document.getElementById('highMoiChart1'));
var myMoiChart2 = echarts.init(document.getElementById('highMoiChart2'));
setInterval(function() {
	myChart.resize();
	myAllScoreChart.resize();
	myAllSubjectChart.resize();
	myHighRatingChart.resize();
	myAllRatingChart.resize();
	myMoiRatingChart.resize();
	myMoiChart0.resize();
	myMoiChart1.resize();
	myMoiChart2.resize();
}, 1000);

function toggleButton(){
	$("#actionBtn").toggleClass('active');
}