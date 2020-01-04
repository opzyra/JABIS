var articleModifyVue = new Vue({
  el: '#articleModifyVue',
  data: {
	backcontents: $('#contents').html(),
	categoryCode:0,
	title:$('#title').val(),
	authLevel: $('#authLevel').attr('data'),
	contents: $('#contents').html(),
	idx: 0
  },
  created: function(){
	  var path = window.location.pathname;
	  this.idx = path.substring(path.lastIndexOf('/') + 1);
  },
  methods: {
	  resetForm: function(){
		  $('#articleEditForm')[0].reset();
		  articleModifyVue.authLevel = null;
		  $('#contents').summernote('code', articleModifyVue.backcontents);
		  $('.selectpicker').selectpicker('refresh');
		  $('#articleEditButton').prop('disabled', true).addClass('disabled');
		  resetFieldError($('#articleEditForm')[0]);
	  },
	  requestEdit: function(){
		  var code = $('#contents').summernote('code');
		  if(code === '' || code === '<p><br></p>'){
			  swal('내용 입력 오류', '게시글의 내용을 입력해주세요.', 'error');
			  return;
		  }
		  
		  this.contents = code;
		  
		  var param = {};
		  param.categoryCode = this.categoryCode;
		  param.title = this.title;
		  param.authLevel = this.authLevel;
		  param.contents = this.contents;
		  param.idx = this.idx;
		  
		  axios.patch('/api/board/' + this.idx, JSON.stringify(param))
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
		  
	  },
	  checkWriter: function(){
			return $('#role').val() > 2 || $('#user').val() == $('#writer').val();  
	  },
	  checkRealWriter: function(){
		  return $('#user').val() == $('#writer').val();
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

var articleModifyVue = articleModifyVue.$root;