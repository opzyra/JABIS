$('#pagination').pagination({
    items: classListRoot.countPage,
    currentPage: classListRoot.currentPage,
    onInit: function () {
        // fire first page loading
    },
    onPageClick: function (page, evt) {
    	if(evt != undefined){
    		classListRoot.requestPage(page);
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

$('#studentList').multiSelect({
	  selectableHeader: "<input type='text' class='search-input form-control m-b-5' autocomplete='off' placeholder='검색..'>",
	  selectionHeader: "<input type='text' class='search-input form-control m-b-5' autocomplete='off' placeholder='검색..'>",
	  afterInit: function(ms){
	    var that = this,
	        $selectableSearch = that.$selectableUl.prev(),
	        $selectionSearch = that.$selectionUl.prev(),
	        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
	        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

	    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
	    .on('keydown', function(e){
	      if (e.which === 40){
	        that.$selectableUl.focus();
	        return false;
	      }
	    });

	    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
	    .on('keydown', function(e){
	      if (e.which == 40){
	        that.$selectionUl.focus();
	        return false;
	      }
	    });
	  },
	  afterSelect: function(){
	    this.qs1.cache();
	    this.qs2.cache();
	  },
	  afterDeselect: function(){
	    this.qs1.cache();
	    this.qs2.cache();
	  }
	});