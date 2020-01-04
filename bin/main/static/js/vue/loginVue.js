var loginVue = new Vue({
  el: '#loginVue',
  data: {
	  email:$('#email').val(),
      password:'',
      rememberMe: $("#rememberMe").prop("checked")
  },
  methods: {
	  loginApi: function(){
		  
	  var param = {};
	  param.email = this.email;
	  param.password = this.password;
	  param.rememberMe = this.rememberMe;
	  
      axios.post('/api/member/login', JSON.stringify(param))
      .then(function(resp){
          location.href = '/app/';
      })
      .catch(function(error){
          const resp = error.response.data;
          if(resp){
        	  switch(resp.status){
        	  case 404: // 아이디 없음
        	  case 403: // 권한 오류
        		  setFieldError('#loginForm', '#email', error.response.data.swal);
        		  break;
        	  case 401: // 비밀번호 불일치
        		  setFieldError('#loginForm', '#password', error.response.data.swal);
        		  break;
        	  case 405: // 계정 인증
        		  swal({
        			  text: error.response.data.swal.text,
        			  icon: error.response.data.swal.icon,
        			  content: {
        				    element: "input",
        				    attributes: {
        				      placeholder: "인증코드 6자리 입력",
        				      type: "text",
        				    },
        			  },
        			  button: {
        			    text: "인증",
        			    closeModal: false,
        			  },
        			})
        			.then(function(authStr){
        			  if (!authStr) throw null;
        			  return axios.patch('/api/member/auth', {
        				  email: $("#email").val(),
        				  authStr: authStr.toUpperCase()
        			  })
        			})
        			.then(function(resp){
        				$('#loginButton').prop('disabled', false).removeClass('disabled');
        				swal(resp.data.swal);
      		      	}).catch(function(err){
      		      		swal.stopLoading();
      		      		$('#loginButton').prop('disabled', false).removeClass('disabled');
      		      		if(err){
      		      			swal(err.response.data.swal);
      		      		}else{
      		      			swal(error.response.data.swal);
      		      		}
      		      	})
        		  break;
        	  default:
        		  swal(error.response.data.swal);
        	  }
          }
          
      })
    },
    restorePassword: function(){
    	swal("관리자에게 문의", "임시 비밀번호를 발급 받아 새로운 비밀번호를 설정하세요.", "warning");
    }
  }
})

var loginRoot = loginVue.$root;