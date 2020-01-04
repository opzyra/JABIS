var hrtListVue = new Vue({
  el: '#hrtListVue',
  data: {
    memberCount: 0,
    studentAllCount: 0,
    studentNoneCount: 0,
    query: '',
    offset: 0,
    limit: 10,
    currentPage: 1,
    countPage: 0,
    hrt: [],
    hrtAll: [],
    hrtNoneStudent: [],
    modalTitle:'',
    modalMember: ''
  },
  created: function(){
	  axios.get('/api/hrt',{
		  params: {
		  query: this.query,
		  currentPage: this.currentPage,
		  limit: this.limit
	  }})
      .then(function(resp){
    	  hrtListRoot.memberCount = resp.data.memberCount;
    	  hrtListRoot.studentAllCount = resp.data.studentAllCount;
    	  hrtListRoot.studentNoneCount = resp.data.studentNoneCount;
    	  hrtListRoot.hrt = resp.data.hrt;
    	  hrtListRoot.hrtAll = resp.data.hrtAll;
    	  hrtListRoot.countPage = resp.data.countPage;
    	  
    	  $('#pagination').pagination('updateItems', hrtListRoot.countPage);
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  methods: {
	  refresh: function(){
		  axios.get('/api/hrt',{
			  params: {
			  query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  hrtListRoot.memberCount = resp.data.memberCount;
	    	  hrtListRoot.studentAllCount = resp.data.studentAllCount;
	    	  hrtListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  hrtListRoot.hrt = resp.data.hrt;
	    	  hrtListRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#pagination').pagination('updateItems', hrtListRoot.countPage);
			  $('#pagination').pagination('selectPage', hrtListRoot.currentPage);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  requestPage: function(page){
		  this.currentPage = page;
		  axios.get('/api/hrt',{
			  params: {
		      query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  hrtListRoot.memberCount = resp.data.memberCount;
	    	  hrtListRoot.studentAllCount = resp.data.studentAllCount;
	    	  hrtListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  hrtListRoot.hrt = resp.data.hrt;
	    	  hrtListRoot.countPage = resp.data.countPage;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  search: function(){
		  this.currentPage = 1;
		  axios.get('/api/hrt',{
			  params: {
		      query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  hrtListRoot.memberCount = resp.data.memberCount;
	    	  hrtListRoot.studentAllCount = resp.data.studentAllCount;
	    	  hrtListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  hrtListRoot.hrt = resp.data.hrt;
	    	  hrtListRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#pagination').pagination('updateItems', hrtListRoot.countPage);
			  $('#pagination').pagination('selectPage', hrtListRoot.currentPage);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  noneStudentModal: function(memberEmail){
		  if(memberEmail){
			  $('#teacherList').val(memberEmail).trigger('change');  
			  this.modalMember = memberEmail;
		  }else{
			  var first = $("#teacherList").find('option').eq(0).val();
			  $('#teacherList').val(first).trigger('change');  
			  this.modalMember = first;
		  }
		  this.modalTitle = '담임 배정';
		  axios.get('/api/hrt/none')
	      .then(function(resp){
	    	  hrtListRoot.hrtNoneStudent = resp.data;
	    	  
	    	  $("#noneStudentModal").modal('show').on('shown.bs.modal', function (e) {
	    		  $('#studentList').multiSelect('refresh');
		    	  $('#studentList').multiSelect('deselect_all');
	    	  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
		  
	  },
	  updateNoneStudent: function(paramIdx){
		  axios.patch('/api/hrt/' + paramIdx)
	      .then(function(resp){
	    	  hrtListRoot.refresh();
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  updateStudent: function(){
		  var studentList = $("#studentList").val();
		  if(studentList.length == 0){
			  swal('입력 항목 오류', '배정할 학생을 선택해주세요.', 'error');
			  return;
		  }
		  var param = {};
		  param.email = this.modalMember;
		  param.idxList = $("#studentList").val();
		  axios.post('/api/hrt', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#noneStudentModal").modal('hide');
	    		  hrtListRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal).then(function(){
	    			  $("#noneStudentModal").modal('hide');
		    		  hrtListRoot.refresh();
	    		  });
	    		 
	    	  }
	      });
	  }
  }
})

var hrtListRoot = hrtListVue.$root;