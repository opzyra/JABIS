$(document).ready(function($) {
	$('#pagination').pagination({
	    items: articleDetailRoot.countPage,
	    currentPage: articleDetailRoot.currentPage,
	    onInit: function () {

	    },
	    onPageClick: function (page, evt) {
	    	articleDetailRoot.requestPage(page);
	    }
	});

	$("#actionBtn").on('click',function(e){
		$(this).toggleClass('active');
	});
});
