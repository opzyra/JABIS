var registerVue = new Vue({
  el: '#registerVue',
  data: {
	  name:'',
	  email:'',
	  password:'',
	  phone:''
  },
  methods: {
	  registerApi: function(){
		  
	  var param = {};
	  param.name = this.name;
	  param.email = this.email;
	  param.password = this.password;
	  param.phone = this.phone;
	  
      axios.post('/api/member/register', JSON.stringify(param))
      .then(function(resp){
    	  swal(resp.data.swal)
    	  .then(function(){
    		  location.href = '/login/';
    	  }).catch(function(){
    		  if(error.response === undefined){
	    		  swal(error.response.data.swal);
	    	  }
    	  })
      })
      .catch(function(error){
          const resp = error.response.data;
          if(resp){
        	  switch(resp.status){
        	  case 409: // 이메일 중복
        		  setFieldError('#registerForm', '#email', error.response.data.swal);
        		  break;
        	  default:
        		  swal(error.response.data.swal);
        	  }
          }
          
      })
    },
    term: function(){
    	swal("서비스 준비중", "해당 서비스는 준비중입니다.", "warning");
    }
  }
})