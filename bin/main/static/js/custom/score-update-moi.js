$(".mobile-filter").on('click', function(){
	$("#filterBox").toggleClass('filter-box');
});
$("#mode").select2({
	placeholder: "분류",
	minimumResultsForSearch: -1
})

$("#type").select2({
	placeholder: "상세분류",
	minimumResultsForSearch: -1
})

$("#year").asSpinner({
	min: 2000,
	max: 9999,
	step: 1,
}); 

$("#subjectCode").select2({
	placeholder: "과목",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	scoreUpdateMoiRoot.highNesinSubject = e.params.data.id;
	scoreUpdateMoiRoot.highNesinSubjectName = e.params.data.text;
}).on('select2:open', function (e) {
	  $(".select2-container--open").addClass('modal-select2');
});

var ftHN = FooTable.init('#highMoiList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "데이터가 없습니다."
});

$("#year").val(new Date().getFullYear());

$("#type").select2({
	placeholder: "상세분류",
	minimumResultsForSearch: -1
})

function highNesinScoreCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN( parseFloat( value ) ) ){
		node.val('');
		scoreUpdateMoiRoot.highMoiScore = '';
		return;
	} 
    
	var rgx = /^[^0.][0-9]?[0-9]?(.[0-9]{1,2})?$/;
	
	if(!rgx.test(value) && value > 0 && value < 100){
		node.val('');
		scoreUpdateMoiRoot.highMoiScore = '';
		return;
	}
	
	if(value.indexOf('+') > 0 || value.indexOf('-') > 0 || value.indexOf('*') > 0 || value.indexOf('-') > 0 || value.indexOf('/') > 0 || value.indexOf('%') > 0 || value.indexOf('=') > 0){
		node.val('');
		scoreUpdateMoiRoot.highMoiScore = '';
		return;
	}
	
	if(value > 100){
		value = "100";
	}else if(value == 0){
		value = 0;
	}else if(value < 0){
		value = 0;
	}else if(value.indexOf('.') > 0 ){
		value = parseFloat(value).toFixed(2);
	}
	
	node.val(value);
	scoreUpdateMoiRoot.highMoiScore = value;
	
}

function highNesinRatingCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN(value) ){
		node.val('');
		scoreUpdateMoiRoot.highMoiRating = '';
		return;
	}
	
	var rgx = /^[1-9]$/;
	
	if(!rgx.test(value)){
		node.val('');
		scoreUpdateMoiRoot.highMoiRating = '';
		return;
	}
	
	scoreUpdateMoiRoot.highMoiRating = value;
	
}

function highNesinUpdateScoreCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN( parseFloat( value ) ) ){
		node.val('');
		scoreUpdateMoiRoot.highMoiUpdateScore = '';
		return;
	} 
    
	var rgx = /^[^0.][0-9]?[0-9]?(.[0-9]{1,2})?$/;
	
	if(!rgx.test(value) && value > 0 && value < 100){
		node.val('');
		scoreUpdateMoiRoot.highMoiUpdateScore = '';
		return;
	}
	
	if(value.indexOf('+') > 0 || value.indexOf('-') > 0 || value.indexOf('*') > 0 || value.indexOf('-') > 0 || value.indexOf('/') > 0 || value.indexOf('%') > 0 || value.indexOf('=') > 0){
		node.val('');
		scoreUpdateMoiRoot.highMoiUpdateScore = '';
		return;
	}
	
	if(value > 100){
		value = "100";
	}else if(value == 0){
		value = 0;
	}else if(value < 0){
		value = 0;
	}else if(value.indexOf('.') > 0 ){
		value = parseFloat(value).toFixed(2);
	}
	
	node.val(value);
	scoreUpdateMoiRoot.highMoiUpdateScore = value;
	
}

function highNesinUpdateRatingCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN(value) ){
		node.val('');
		scoreUpdateMoiRoot.highMoiUpdateRating = '';
		return;
	}
	
	var rgx = /^[1-9]$/;
	
	if(!rgx.test(value)){
		node.val('');
		scoreUpdateMoiRoot.highMoiUpdateRating = '';
		return;
	}
	
	scoreUpdateMoiRoot.highMoiUpdateRating = value;
	
}