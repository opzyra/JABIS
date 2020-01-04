var passwordVue = new Vue({
  el: '#passwordVue',
  data: {
	  originPass: '',
	  newPass: '',
	  confirmPass: '',
	  latest: 0,
  },
  methods: {
	   openPassModal: function(){
		   this.originPass = '';
		   this.newPass = '';
		   this.confirmPass = '';
		   
		   axios.get('/api/member/password/latest')
		      .then(function(resp){
		    	  passwordRoot.latest = resp.data;
		    	  
		    	  $("#passModal").modal('show');
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		    	  
		      });
		   
		   
		   
	   },
	   passwordChange: function(){
		   
		   if(this.originPass == ''){
			   swal("입력 항목 오류", "기존 비밀번호를 입력해주세요.", "error");
			   return;
		   }
		   
		   if(this.newPass == ''){
			   swal("입력 항목 오류", "새 비밀번호를 입력해주세요.", "error");
			   return;
		   }
		   
		   if(this.confirmPass == ''){
			   swal("입력 항목 오류", "새 비밀번호를 다시 한번 입력해주세요.", "error");
			   return;
		   }
		   
		   if(this.newPass.length < 8){
			   swal("입력 항목 오류", "새 비밀번호는 8자리 이상으로 입력해 주세요.", "error");
			   return;
		   }
		   
		   if(this.newPass != this.confirmPass){
			   swal("입력 항목 오류", "새 비밀번호가 일치하지 않습니다.", "error");
			   return;
		   }
		   
		   var param = {};
		   param.originPass = this.originPass;
		   param.newPass = this.newPass;
		   
		   axios.post('/api/member/password', JSON.stringify(param))
		      .then(function(resp){
		    	  swal(resp.data.swal).then(function(){
		    		  axios.post('/api/member/logout', {})
		    	      .then(function(resp){
		    	    	  swal(resp.data.swal).then(function(){
		    	    		  location.href = '/';
		    	    	  })
		    	      })
		    	      .catch(function(error){
		    	    	  location.href = '/';
		    	      }) 
		    	  });
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		    	  
		      });
		   
	   }

  }
})

var passwordRoot = passwordVue.$root;