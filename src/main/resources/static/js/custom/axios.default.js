var csrfHeader =  document.querySelector('meta[name="csrf-header"]').getAttribute('content');
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.headers.common[csrfHeader] = csrfToken;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.patch['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 4000

axios.interceptors.request.use(function (config) {
	NProgress.set(0.2);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	NProgress.set(1);
    return response;
  }, function (error) {
	  NProgress.set(1);
	  if(error.response === undefined){
		  swal('서버 연결 장애', '서버와 연결이 끊어졌습니다.', 'error')
    	  .then(function(){
    		  location.href='/app/';
    	  })
	  }else if(error.response.status == 403){
		  swal('서버 연결 장애', '서버와 연결이 끊어졌습니다.', 'error')
    	  .then(function(){
    		  location.href='/app/';
    	  })
	  }
    return Promise.reject(error);
  });
