var ft = FooTable.init('#memberList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "검색결과가 없습니다."
});

$("#memberList").on('keydown', '.form-inline', function(e){
	if(e.keyCode == 8){
		$('.fooicon-remove').trigger('click');
	} else if(e.keyCode == 13){
		$('.fooicon-search').trigger('click');
	}
	
});

$("#memberList").on('submit', '.form-inline', function(e){
	e.preventDefault();
});

$("#roleList").select2({
	placeholder: "직책",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	memberRoot.changeRole = e.params.data.id;
}).on('select2:open', function (e) {
	  $(".select2-container--open").addClass('modal-select2');
});

$("#subjectList").select2({
	placeholder: "과목",
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	memberRoot.changeSubject = e.params.data.id;
}).on('select2:open', function (e) {
	  $(".select2-container--open").addClass('modal-select2');
});