var articleEditVue = new Vue({
  el: '#articleEditVue',
  data: {
	categoryCode:0,
  	title: '',
  	authLevel: null,
  	contents: ''
  },
  methods: {
	  resetForm: function(){
		  $('#articleEditForm')[0].reset();
		  articleEditRoot.authLevel = null;
		  $('#contents').summernote('reset');
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
		  
		  axios.post('/api/board', JSON.stringify(param))
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
  }
})

var articleEditRoot = articleEditVue.$root;