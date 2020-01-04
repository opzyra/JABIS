var ft = FooTable.init('#studentList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "담당 학생이 없습니다."
});

var ftTl = FooTable.init('#teacherList', {
	"paging": {
		"limit": 5
	},
	"filtering": {
		"delay": -1,
		"placeholder": "검색어를 입력해주세요."
	},
	"empty": "담임 강사가 없습니다."
});

document.addEventListener('DOMContentLoaded', function(){

    Typed.new("#typed", {
        stringsElement: document.getElementById('typed-strings'),
        typeSpeed: 80,
        startDelay: 1000,
        backDelay: 1000,
        loop: true,
        contentType: 'html', // or text
    });

});
