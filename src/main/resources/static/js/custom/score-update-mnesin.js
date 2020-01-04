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

$("#year").val(new Date().getFullYear());

$("#type").select2({
	placeholder: "상세분류",
	minimumResultsForSearch: -1
})

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
	scoreUpdateMnesinRoot.updated = true;
	scoreUpdateMnesinRoot.middleNesin[dataIdx].updated = true;
	
	switch(type){
	case 0:
		scoreUpdateMnesinRoot.middleNesin[dataIdx].score = value;
		break;
	case 1:
		scoreUpdateMnesinRoot.middleNesin[dataIdx].deviation = value;
		break;
	case 2:
		scoreUpdateMnesinRoot.middleNesin[dataIdx].average = value;
		break;
	case 3:
		scoreUpdateMnesinRoot.middleNesin[dataIdx].applicants = value;
		break;
	}
	
	if(scoreUpdateMnesinRoot.middleNesin[dataIdx].score === "" || scoreUpdateMnesinRoot.middleNesin[dataIdx].deviation === "" 
		|| scoreUpdateMnesinRoot.middleNesin[dataIdx].average === "" || scoreUpdateMnesinRoot.middleNesin[dataIdx].applicants === ""){
		$("#" + dataIdx).find('.fa-check').addClass('hidden');
		$("#" + dataIdx).find('.fa-ban').removeClass('hidden');
		scoreUpdateMnesinRoot.validation[dataIdx] = false;
	}else{
		$("#" + dataIdx).find('.fa-ban').addClass('hidden');
		$("#" + dataIdx).find('.fa-check').removeClass('hidden');
		scoreUpdateMnesinRoot.validation[dataIdx] = true;
		scoreUpdateMnesinRoot.middleNesin[dataIdx].ranking = r(scoreUpdateMnesinRoot.middleNesin[dataIdx].score, scoreUpdateMnesinRoot.middleNesin[dataIdx].average
				, scoreUpdateMnesinRoot.middleNesin[dataIdx].deviation, scoreUpdateMnesinRoot.middleNesin[dataIdx].applicants);
		
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