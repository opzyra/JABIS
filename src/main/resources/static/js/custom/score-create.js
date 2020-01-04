$(".mobile-filter").on('click', function(){
	$("#filterBox").toggleClass('filter-box');
});

$("#type").select2({
	placeholder: "상세분류",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	scoreCreateRoot.type = e.params.data.id;
});
$("#mode").select2({
	placeholder: "분류",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	scoreCreateRoot.mode = e.params.data.id;
	scoreCreateRoot.type = null;
	$("#type").val(null).trigger("change");
	
	if(e.params.data.id == 2){
		scoreCreateRoot.typeList = scoreCreateRoot.typeListSet[1];
	}else{
		scoreCreateRoot.typeList = scoreCreateRoot.typeListSet[0];
	}
	$("#type").unbind();
	$("#type").select2("destroy");
	
	$("#type").select2({
		placeholder: "상세분류",
		minimumResultsForSearch: -1
	}).on('select2:select', function (e) {
		scoreCreateRoot.type = e.params.data.id;
	});
});

$("#subjectCode").select2({
	placeholder: "과목",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	scoreCreateRoot.highNesinSubject = e.params.data.id;
	scoreCreateRoot.highNesinSubjectName = e.params.data.text;
}).on('select2:open', function (e) {
	  $(".select2-container--open").addClass('modal-select2');
});

$("#subjectCode2").select2({
	placeholder: "과목",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	scoreCreateRoot.moiSubject = e.params.data.id;
	scoreCreateRoot.moiSubjectName = e.params.data.text;
}).on('select2:open', function (e) {
	  $(".select2-container--open").addClass('modal-select2');
});

$("#year").datepicker({
	format: 'yyyy',
	language: 'ko',
	autoclose: true,
	zIndexOffset: 1501,
	disableTouchKeyboard: true,
	endDate: new Date(),
	minViewMode: 'decade'
}).on('changeDate', function(e) {
	scoreCreateRoot.year = e.date.format('yyyy');
}).on('change', function(){
	if(this.value == ''){
		scoreCreateRoot.year = null;
	}
});



var ft = FooTable.init('#middleNesinList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "데이터가 없습니다."
});

var ftHN = FooTable.init('#highNesinList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "데이터가 없습니다."
});

var ftMI = FooTable.init('#moiList', {
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
}).on('select2:select', function (e) {
	scoreCreateRoot.type = e.params.data.id;
});

function doubleCheck(obj, type){
	var node = $(obj);
	var value = node.val();
	
	var dataIdx = node.attr('data-idx');
	
	if( isNaN( parseFloat( value ) ) ){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	} 
    
	var rgx = /^[^0.][0-9]?(.[0-9]{1,2})?$/;
	
	if(!rgx.test(value) && value > 0 && value < 100){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	}
	
	if(value.indexOf('+') > 0 || value.indexOf('-') > 0 || value.indexOf('*') > 0 || value.indexOf('-') > 0 || value.indexOf('/') > 0 || value.indexOf('%') > 0 || value.indexOf('=') > 0){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	}
	
	if(value > 100){
		value = "100";
	}else if(value == 0){
		value = 0;
	}else if(value.indexOf('.') > 0 ){
		value = parseFloat(value).toFixed(2);
	}
	
	node.val(value);
	
	changeVal(type, value, dataIdx);
	
}

function intCheck(obj, type){
	var node = $(obj);
	var value = node.val();
	
	var dataIdx = node.attr('data-idx');
	
	if( isNaN(value) ){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	}
	
	var rgx = /^[^0][0-9]*$/;
	
	if(!rgx.test(value) && value != 0){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	}
	
	if(value.indexOf('.') > 0 || value.indexOf('+') > 0 || value.indexOf('-') > 0 || value.indexOf('*') > 0 || value.indexOf('-') > 0 || value.indexOf('/') > 0 || value.indexOf('%') > 0 || value.indexOf('=') > 0){
		node.val('');
		changeVal(type, '', dataIdx);
		return;
	}
	
	
	changeVal(type, value, dataIdx);
	
	
}

function changeVal(type, value, dataIdx){
	switch(type){
	case 0:
		scoreCreateRoot.middleNesin[dataIdx].score = value;
		break;
	case 1:
		scoreCreateRoot.middleNesin[dataIdx].deviation = value;
		break;
	case 2:
		scoreCreateRoot.middleNesin[dataIdx].average = value;
		break;
	case 3:
		scoreCreateRoot.middleNesin[dataIdx].applicants = value;
		break;
	}
	
	if(scoreCreateRoot.middleNesin[dataIdx].score === "" || scoreCreateRoot.middleNesin[dataIdx].deviation === "" 
		|| scoreCreateRoot.middleNesin[dataIdx].average === "" || scoreCreateRoot.middleNesin[dataIdx].applicants === ""){
		$("#" + dataIdx).find('.fa-check').addClass('hidden');
		$("#" + dataIdx).find('.fa-ban').removeClass('hidden');
		scoreCreateRoot.validation[dataIdx] = false;
	}else{
		$("#" + dataIdx).find('.fa-ban').addClass('hidden');
		$("#" + dataIdx).find('.fa-check').removeClass('hidden');
		scoreCreateRoot.validation[dataIdx] = true;
		scoreCreateRoot.middleNesin[dataIdx].ranking = r(scoreCreateRoot.middleNesin[dataIdx].score, scoreCreateRoot.middleNesin[dataIdx].average
				, scoreCreateRoot.middleNesin[dataIdx].deviation, scoreCreateRoot.middleNesin[dataIdx].applicants);
		
	}
}


function r(score, average, deviation, applicants) {

	if(applicants == 0){
		return 0;
	}
	
  	var res=0;
	  var A1=0;
    var AA=0.0;
    var Fx=0.0;
    var Fx01=0.0;
    var x=0.0;
    var x01=0.0;
    var t=0.0;
     var t01=0.0;
    var Qx=0.0;
    var Qx01=0.0;
    var perc=0.0;
     var top=0.0;
    
    var b1 = 0.31938153;
    var b2 = -0.356563782;
    var b3 = 1.781477937;
    var b4 = -1.821255978;
    var b5 = 1.330274429;
    var r = 0.2316419;
    
    
	var AAA = parseInt(score*100.0); 
	var BBB = parseInt(average*100.0);
	var CCC = parseInt(deviation*100.0); 
	var D = parseInt(applicants);

	var A=AAA/100.0;
	var B=BBB/100.0;
	var C=CCC/100.0;	
		
	stdVal=(A-B)/C;	
	stdVal01=(A + 1.0 - B ) / C;	
	
	 with(Math)
    {
        x = abs(stdVal);
        x01 = abs(stdVal01);

        // Density function
        Fx = 1/sqrt(2*PI)*exp(-pow(x,2)/2);
       Fx01 = 1/sqrt(2*PI)*exp(-pow(x01,2)/2);

        // Compute tail area (Qx) using polynomial approximation
        t = 1/(1+r*x);
       t01 = 1/(1+r*x01);

        Qx = Fx*(b1*t + b2*pow(t,2) + b3*pow(t,3) + b4*pow(t,4) + b5*pow(t,5));
        Qx01 = Fx01*(b1*t01 + b2*pow(t01,2) + b3*pow(t01,3) + b4*pow(t01,4) + b5*pow(t01,5));

        if(stdVal < 0)
            Qx = 1 - Qx;
            
       if(stdVal01 < 0)
           Qx01 = 1 - Qx01;
    }

// Percentile from tail area
     perc = (1-Qx)*100;
   
   
   perc = (1-Qx)*100;
   
   res1=Math.round(perc*100)/100;
  
  rank=Qx01*D+1 ;
  
 if(res1 > 99.5 )

	 ranknumb=Math.round((100.0-res1)*1000)/1000.0 ;
	// ranknumb=' < 1' ;
     
 else 

  ranknumb=Math.round(100.0-res1) ;


  var res=Math.round(rank);
  
   if( res < 0.5)
       res=1;
    
   if(A >= 100)
       res=1;   
 
 

 	return res;	
	
	
}

function highNesinScoreCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN( parseFloat( value ) ) ){
		node.val('');
		scoreCreateRoot.highNesinScore = '';
		return;
	} 
    
	var rgx = /^[^0.][0-9]?[0-9]?(.[0-9]{1,2})?$/;
	
	if(!rgx.test(value) && value > 0 && value < 100){
		node.val('');
		scoreCreateRoot.highNesinScore = '';
		return;
	}
	
	if(value.indexOf('+') > 0 || value.indexOf('-') > 0 || value.indexOf('*') > 0 || value.indexOf('-') > 0 || value.indexOf('/') > 0 || value.indexOf('%') > 0 || value.indexOf('=') > 0){
		node.val('');
		scoreCreateRoot.highNesinScore = '';
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
	scoreCreateRoot.highNesinScore = value;
	
}

function highNesinRatingCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN(value) ){
		node.val('');
		scoreCreateRoot.highNesinRating = '';
		return;
	}
	
	var rgx = /^[1-9]$/;
	
	if(!rgx.test(value)){
		node.val('');
		scoreCreateRoot.highNesinRating = '';
		return;
	}
	
	scoreCreateRoot.highNesinRating = value;
	
}

function highNesinUnitCheck(obj){
	var node = $(obj);
	var value = node.val();
	
	if( isNaN(value) ){
		node.val('');
		scoreCreateRoot.highNesinUnit = '';
		return;
	}
	
	var rgx = /^[1-9]$/;
	
	if(!rgx.test(value)){
		node.val('');
		scoreCreateRoot.highNesinUnit = '';
		return;
	}
	
	scoreCreateRoot.highNesinUnit = value;
	
}