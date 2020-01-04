$('#pagination').pagination({
    items: hrtListRoot.countPage,
    currentPage: hrtListRoot.currentPage,
    onInit: function () {
    	
    },
    onPageClick: function (page, evt) {
    	if(evt != undefined){
    		hrtListRoot.requestPage(page);
    	}
    	
    }
});
$('#teacherList').select2({
	minimumResultsForSearch: -1
}).on('select2:select', function (e) {
	var data = e.params.data.id;
	hrtListRoot.modalMember = data;
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

$("#fakeId").show();
window.setTimeout(function () {
    $("#fakeId").hide();
},1);