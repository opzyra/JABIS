var navVue = new Vue({
  el: '#navVue',
  data: {
	  students: [],
	  searchQuery: '',
	  notification: [],
	  newNotification: [],
	  newCount: 0,
	  firstKey: false,
  },
  created: function(){
	  
	  axios.get('/api/notification/latest')
	  .then(function(resp){
		  navRoot.notification = resp.data;
		  for(var i =0; i<resp.data.length; i++){
			 var node = resp.data[i];
			 if(node.read == 0){
				 navRoot.newCount += 1;
				 navRoot.newNotification.push(node);
			 }
		  }
      })
      .catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      })
  },
  methods: {
	  logoutApi: function(){
	      axios.post('/api/member/logout', {})
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
	    		  location.href = '/';
	    	  })
	      })
	      .catch(function(error){
	    	  location.href = '/';
	      })
	    },
	    searchStudent: function(){
	    	this.restSearch().fail(function() {
	    		swal("데이터 없음", "검색하신 학생의 정보가 없습니다.", "error");
	    	})
	    },
	    studentList: function(){
	    	
	    	if(this.firstKey) return;
	    	axios.get('/api/student/names',{
				  params: {
					email: ''  
				  }})
		      .then(function(resp){
		    	  $("#navSearch").autocomplete({
					hints: resp.data
		    	  });
		    	  navRoot.firstKey = true;
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
	    },
	    restSearch: function(){
	    	var deferred = $.Deferred();
	    	axios.get('/api/student/names',{
				  params: {
					email: ''  
				  }})
		      .then(function(resp){
		    	  navRoot.students = resp.data;
		    	  navRoot.students.map(function(x){
	    				if(x.name == $('#navSearch').val()){
	    					location.href='/app/student/' + x.idx;
	    					deferred.resolve();
	    				}
	    			})
	    			deferred.reject();
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		    	  deferred.reject();
		      });
	    	return deferred.promise();
	    },
	    readNotification: function(idx, index){
	    	if(this.notification[index].read == 0){
	    		var param = {};
				  param.idx = idx;
				  
				  axios.patch('/api/notification', JSON.stringify(param))
			      .then(function(resp){
			    	  navRoot.notification[index].read = 1;
			    	  navRoot.newCount -= 1;
			    	  //navRoot.newNotification.delete(index, 1);
			      })
			      .catch(function(error){
			    	  if(error.response != undefined){
			    		  swal(error.response.data.swal);
			    	  }
			      });
	    	}
	    	  
	    },
	    readAllNotification: function(){
	    	axios.patch('/api/notification/all')
		      .then(function(resp){
		    	  for(var i =0; i<navRoot.notification.length; i++){
		    		  navRoot.notification[i].read = 1;
		    	  }
		    	  navRoot.newCount = 0;
		    	  swal("모든 알림 확인","모든 알림이 확인처리 되었습니다.", "success");
		      })
		      .catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
	    	
	    }
	    
    
  }
})

var navRoot = navVue.$root;