var noticeVue = new Vue({
  el: '#noticeVue',
  data: {
	countPage: 0,
	categoryCode: 0,
	query: '',
	order: 'desc',
	currentPage: 1,
	offset: 0,
	limit: 10,
	roleCode: 0,
	boards: []
  },
  created: function(){
	  axios.get('/api/board', 
			  {params: {
				  categoryCode: this.categoryCode,
				  query: this.query,
				  order: this.order,
				  offset: this.offset,
				  limit: this.limit,
				  roleCode: this.roleCode
			  }})
      .then(function(resp){
    	  noticeRoot.boards = resp.data.boards;
    	  noticeRoot.countPage = resp.data.countPage;
    	  $('#pagination').pagination('updateItems', noticeRoot.countPage);
      }).catch(function(error){
    	  
      });
  },
  updated: function(){
	// 아이콘 재설정
	LetterAvatar.transform();
  },
  computed: {
	  isActive: function() {
		  return {
			  desc: this.order == 'desc',
			  viewCount: this.order == 'viewCount',
			  commentsCount: this.order == 'commentsCount'
		  }
	  }  
  },
  methods: {
	  requestPage: function(page){
		  this.currentPage = page;
		  this.offset = (page-1)*10
		  axios.get('/api/board', 
				  {params: {
					  categoryCode: this.categoryCode,
					  query: this.query,
					  order: this.order,
					  offset: this.offset,
					  limit: this.limit,
					  roleCode: this.roleCode
				  }})
	      .then(function(resp){
	    	  noticeRoot.countPage = resp.data.countPage;
	    	  noticeRoot.boards = resp.data.boards;
	    	  $('.list-animate').animateCss('fade-in');
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  requestSearch: function(){
		  axios.get('/api/board', 
				  {params: {
					  categoryCode: this.categoryCode,
					  query: this.query,
					  order: this.order,
					  offset: this.offset,
					  limit: this.limit,
					  roleCode: this.roleCode
				  }})
	      .then(function(resp){
	    	  noticeRoot.countPage = resp.data.countPage;
	    	  noticeRoot.boards = resp.data.boards;
	    	  noticeRoot.currentPage = 1;

	    	  $('.list-animate').animateCss('fade-in');
	    	  $('#pagination').pagination('updateItems', noticeRoot.countPage);
			  $('#pagination').pagination('selectPage', noticeRoot.currentPage);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  requestOrder: function(target){
		  this.order = target
		  axios.get('/api/board', 
				  {params: {
					  categoryCode: this.categoryCode,
					  query: this.query,
					  order: this.order,
					  offset: this.offset,
					  limit: this.limit,
					  roleCode: this.roleCode
				  }})
	      .then(function(resp){
	    	  noticeRoot.countPage = resp.data.countPage;
	    	  noticeRoot.boards = resp.data.boards;
	    	  noticeRoot.currentPage = 1;

	    	  $('.list-animate').animateCss('fade-in');
	    	  $('#pagination').pagination('updateItems', noticeRoot.countPage);
			  $('#pagination').pagination('selectPage', noticeRoot.currentPage);
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  detail: function(idx){
		  location.href='/app/notice/' + idx;
	  }
  }
})

var noticeRoot = noticeVue.$root;