$("#actionBtn").on('click',function(e){
		$(this).toggleClass('active');
});

$("#gradeCode").select2({
	minimumResultsForSearch: -1,
	placeholder: "구분",
    width: 180
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	siblingRoot.gradeCode = data;
});

$("#grade").select2({
	minimumResultsForSearch: -1,
	placeholder: "학년",
    width: 80
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	siblingRoot.grade = data;
});

$("#studentName").select2({
	minimumResultsForSearch: -1,
	placeholder: "이름",
    width: 180
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	siblingRoot.studentIdx = data;
});

var ft = FooTable.init('#siblingList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "검색결과가 없습니다."
});

$("#siblingList").on('keydown', '.form-inline', function(e){
	if(e.keyCode == 8){
		$('.fooicon-remove').trigger('click');
	} else if(e.keyCode == 13){
		$('.fooicon-search').trigger('click');
	}
	
});

$("#siblingList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});


