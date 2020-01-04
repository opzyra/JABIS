var articleDetailVue = new Vue({
  el: '#articleDetailVue',
  data: {
	 boardIdx: 0,
	 countPage: 0,
	 currentPage: 1,
	 offset: 0,
	 limit: 10,
	 comments: [],
	 commentsContents: ''
  },
  created: function(){
	  var path = window.location.pathname;
	  this.boardIdx = path.substring(path.lastIndexOf('/') + 1);
	  axios.get('/api/comments', {
		  params: {
		  boardIdx:  this.boardIdx,
		  offset: this.offset,
	  	  limit: this.limit
	  }})
      .then(function(resp){
    	  articleDetailRoot.comments = resp.data.comments;
    	  articleDetailRoot.countPage = resp.data.countPage;
    	  
    	  $('.list-animate').animateCss('fade-in');
    	  $('#pagination').pagination('updateItems', articleDetailRoot.countPage);
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  updated: function(){
		// 아이콘 재설정
		LetterAvatar.transform();
  },
  methods: {
	  requestPage: function(page){
		  this.currentPage = page;
		  this.offset = (page-1)*10
		  axios.get('/api/comments', 
				  {params: {
					  boardIdx: this.boardIdx,
					  offset: this.offset,
					  limit: this.limit
				  }})
	      .then(function(resp){
	    	  articleDetailRoot.comments = resp.data.comments;
	    	  articleDetailRoot.countPage = resp.data.countPage;
	    	  $('.list-animate').animateCss('fade-in');
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  requestCommentsWrite: function(){
		  
		  var param = {}; 
		  param.boardIdx = this.boardIdx;
		  param.contents = $('#commentsContent').val().replace(/(\n|\r\n)/g, '<br>');
		  
		  axios.post('/api/comments', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  location.reload();
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  resetCommentsForm: function(){
		  this.commentsContents = '';
		  $('#commentsButton').prop('disabled', true);
	  },
	  checkEmail: function(email){
		  return $('#user').val() == email;
	  },
	  checkRole: function(email){
		  return $('#role').val() > 2 || $('#user').val() == email;
	  },
	  checkWriter: function(){
		return $('#role').val() > 2 || $('#user').val() == $('#writer').val();  
	  },
	  checkRealWriter: function(){
		  return $('#user').val() == $('#writer').val();
	  },
	  modifyArticle: function(){
		  location.href='/app/notice/modify/' + this.boardIdx;
	  },
	  deleteArticle: function(){
		  
		  swal({
			  title: "게시글 삭제",
			  text: "해당 게시글을 삭제하시겠습니까?",
			  icon: "warning",
			  buttons: {
				  confirm: {
					    text: "삭제",
					    value: true,
					    visible: true,
					    className: "",
					    closeModal: true
					  },
				  cancel: {
					    text: "취소",
					    value: false,
					    visible: true,
					    className: "",
					    closeModal: true,
					  }
			  },
			  dangerMode: true
			}).then(function(willDelete){
				if(willDelete){
					
					axios.delete('/api/board/' + articleDetailRoot.boardIdx)
				      .then(function(resp){
				    	  swal(resp.data.swal)
				    	  .then(function(){
				    		  location.href='/app/notice';
				    	  })
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  }
  }
})

var articleDetailRoot = articleDetailVue.$root;