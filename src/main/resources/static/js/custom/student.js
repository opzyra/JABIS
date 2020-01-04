$("#actionBtn").on('click',function(e){
		$(this).toggleClass('active');
});

$("#schools").on("change", function(e){
	var selectedVal = $(this).val();
	if(selectedVal === '미입력'){
		$("#grade").prop('disabled', true);
		$("#grade").val(null).trigger('change');
		studentRoot.grade = 0;
	}else{
		$("#grade").prop('disabled', false);
	}
})

$("#classNames").on("change", function(e){
	e.stopPropagation();
	var selectedVal = $(this).val();
	var optgroup = $("#classNames").find('option[value=' + selectedVal + ']').parent('.group').attr('label');
	if(optgroup == '일반'){
		studentRoot.isNomalClass = true;
		if($('#testClass').prop('checked')){
			$('#testClass').trigger('click');
		}
		
	}else if(optgroup == '시험기간'){
		studentRoot.isNomalClass = false;
		if(!$('#testClass').prop('checked')){
			$('#testClass').trigger('click');
		}
	}

})

$('#testClass').on('change', function(){
	if($('#testClass').prop('checked')){
		$('.nomalClass').addClass('hidden');
		$('.testClass').removeClass('hidden');
		studentRoot.isNomalClass = false;
	}else{
		$('.nomalClass').removeClass('hidden');
		$('.testClass').addClass('hidden');
		studentRoot.isNomalClass = true;
		
	}
});

$(".mobile-filter").on('click', function(){
	$("#filterBox").toggleClass('filter-box');
});

$("#parentPhone").on('change', function(){
	if($('#parentPhone').prop('checked')){
		$('.mePhone').addClass('hidden');
		$('.parentPhone').removeClass('hidden');
		studentRoot.isMePhone = false;
	}else{
		$('.mePhone').removeClass('hidden');
		$('.parentPhone').addClass('hidden');
		studentRoot.isMePhone = true;
		
	}
});

var ft = FooTable.init('#studentList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "조건에 해당하는 데이터가 없습니다."
});

$("#studentList").on('keydown', '.form-inline', function(e){
	if(e.keyCode == 8){
		$('.fooicon-remove').trigger('click');
	} else if(e.keyCode == 13){
		$('.fooicon-search').trigger('click');
	}
	
});

$("#studentList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});

$("#schools").select2({
	placeholder: "학교",
    allowClear: true,
    width: 160
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	studentRoot.school = data;
});

$("#grade").select2({
	minimumResultsForSearch: -1,
	placeholder: "학년",
    allowClear: true,
    width: 100
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	studentRoot.grade = data;
});

$("#hrts").select2({
	placeholder: "담임",
    allowClear: true,
	width: 160
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	studentRoot.hrt = data;
});

$("#classNames").select2({
	placeholder: "반",
    allowClear: true,
	width: 160
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	studentRoot.className = data;
});