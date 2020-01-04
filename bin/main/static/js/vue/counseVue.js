var counseVue = new Vue({
  el: '#counseVue',
  data: {
	isInit: true,
	studentIdx: 0,
	search: false,
    name: '',
    start: null,
    end: null,
    students: [],
    myStudents: [],
    listCount: 0,
    listCounse: [],
    counse: {
    	idx: 0,
    	studentIdx: 0,
    	counseDate: null,
    	writeDate: null,
    	writeEmail: '',
    	studyStule: '',
    	studentStyle: '',
    	future: '',
    	parentStyle: '',
    	parentRequest: '',
    	studentCounse: '',
    	parentCounse: '',
    }
  },
  created: function(){
	  this.studentIdx = $("#studentIdx").val();
	  this.allStudentName();
	  this.myStudentName();
  },
  methods: {
	  allStudentName: function(){
		  axios.get('/api/student/names',{
			  params: {
				email: ''  
			  }})
	      .then(function(resp){
	    	  $("#name").val(null).trigger('change');
	    	  counseRoot.students = resp.data;
	    	  
	    	  
	    	  $("#name").select2("destroy");
	    	  $("#name").select2({
	    			placeholder: "이름",
	    		    allowClear: true,
	    			width: 235
	    		}).on('select2:select', function (e) {
	    			counseRoot.studentIdx = e.params.data.id;
	    			counseRoot.name = e.params.data.text;
	    		});

	    	  if(counseRoot.studentIdx != 0){
	    		  counseRoot.searchCounse();
	    		  
	    		  $("#name").val(studentIdx).trigger('change');
	    		  
	    		  counseRoot.students.map(function(x){
	    			  if(x.idx == counseRoot.studentIdx){
	    				  counseRoot.name = x.name;  
	    			  }  
	    		  }) 
	    	  }else{
	    		 counseRoot.studentIdx = null;
	    		 if(counseRoot.isInit){
		    		  $("#counseList").on('ready.ft.table', function(){
		    			  $("#loadingBar").css('display', 'none');
				    	  counseRoot.isInit = false;
		    		  })
		    	  }
	    		 
	    	  }
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  myStudentName: function(){
		  axios.get('/api/student/names',{
			  params: {
				email: $("#user").val()  
			  }})
	      .then(function(resp){
	    	  counseRoot.myStudents = resp.data;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  myStudentCounse: function(idx){
		  this.studentIdx = idx;
		  $("#name").val(idx).trigger('change');
		  
		  counseRoot.students.map(function(x){
			  if(x.idx == counseRoot.studentIdx){
				  counseRoot.name = x.name;  
			  }  
		  })
		  this.searchCounse();
	  },
	  searchCounse: function(){
		  if(this.studentIdx == 0){
			  swal("입력 항목 오류","학생 이름을 선택해주세요.","error");
			  return;
		  }
		  
		  axios.get('/api/counse',{
			  params: {
				studentIdx: this.studentIdx,
				start: this.start,
				end: this.end
			  }})
	      .then(function(resp){
	    	  
	    	  counseRoot.listCount = resp.data.length;
	    	  counseRoot.search = true;
	    	  
	    	  if(counseRoot.listCount == 0){
	    		  ft.rows.load(resp.data);
	    		  swal({
	    			  title: "데이터 없음",
	    			  text: "새로운 데이터를 등록하시겠습니까?",
	    			  icon: "warning",
	    			  buttons: {
	    				  confirm: {
	    					    text: "등록",
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
	    					location.href='/app/counse/create?studentIdx=' + counseRoot.studentIdx;
	    				}
	    			});
	    		  return;
	    	  }

	    	  
	    	  for(var i=0; i<resp.data.length; i++){
	    		  var node = resp.data[i];
	    		  
	    		  node.more = '<i aria-hidden="true" class="link icon wb-zoom-in" onclick="counseRoot.openCounse(' + node.idx + ',' + node.mode + ')"></i>';
	    		  
	    		  node.modify = '<i aria-hidden="true" class="link icon wb-edit" onclick="counseRoot.modifyCounse(' + node.idx + ')"></i>';
	    		  
	    		  node.title = node.mode == 0 ? counseRoot.name + '의 입학 상담 기록' : counseRoot.name + '의 일반 상담 기록';
	    		  
	    		  node.mode = node.mode == 0 ? '<span class="text-danger">입학 상담</span>' : '일반 상담';
	    		  
	    	  }
	    	  if(counseRoot.isInit){
	    		  $("#counseList").on('ready.ft.table', function(){
		    		  $("#loadingBar").css('display', 'none');
			    	  ft.rows.load(resp.data);
			    	  counseRoot.isInit = false;
	    		  })
	    	  }else{
	    		  ft.rows.load(resp.data);
	    	  }
	    	  
	    	  
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  openCounse: function(idx, mode){
		  
		  axios.get('/api/counse/detail/' + idx)
	      .then(function(resp){
	    	  
	    	  counseRoot.counse = resp.data;

	    	  if(mode == 0){
	    		  
	    		  $("#modeZero").modal('show');
	    		  
	    	  }else{
	    		  
	    		  $("#modeOne").modal('show');
	    		  
	    	  }
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  linkCreate: function(){
		  location.href= '/app/counse/create?studentIdx=' + this.studentIdx;
	  },
	  modifyCounse: function(idx){
		  location.href = '/app/counse/modify?idx=' + idx;
	  }
  }
})

var counseRoot = counseVue.$root;