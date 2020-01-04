$('#pagination').pagination({
    items: subjectRoot.countPage,
    currentPage: subjectRoot.currentPage,
    onInit: function () {
        // fire first page loading
    },
    onPageClick: function (page, evt) {
    	if(evt != undefined){
    		subjectRoot.requestPage(page);
    	}
    }
});
$('#classList').select2({
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	classListRoot.modalClass = data;
});
$("#type").select2({
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	classListRoot.modalType = data;
});