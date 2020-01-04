var classListVue = new Vue({
  el: '#classListVue',
  data: {
	status: 'nomal',
    classCount: 0,
    studentAllCount: 0,
    studentNoneCount: 0,
    query: '',
    offset: 0,
    limit: 10,
    currentPage: 1,
    countPage: 0,
    list:[],
    classNoneStudent: [],
    modalTitle:'',
    modalClass: '',
    modalText: '반 개설',
    modalType: '',
    modalClassName: '',
    modalUpdateOriginClassName: '',
    modalUpdateClassName:'',
    modifyMode: false,
  },
  created: function(){
	  axios.get('/api/class/nomal',{
		  params: {
		  query: this.query,
		  currentPage: this.currentPage,
		  limit: this.limit
	  }})
      .then(function(resp){
    	  classListRoot.classCount = resp.data.classCount;
    	  classListRoot.studentAllCount = resp.data.studentAllCount;
    	  classListRoot.studentNoneCount = resp.data.studentNoneCount;
    	  classListRoot.list = resp.data.list;
    	  classListRoot.countPage = resp.data.countPage;
    	  
    	  $('#pagination').pagination('updateItems', classListRoot.countPage);
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  computed: {
	  isActive: function() {
		  return {
			  nomal: this.status == 'nomal',
			  test: this.status == 'test'
		  }
	  }  
  },
  methods: {
	  refresh: function(){
		  if(this.status == 'nomal'){
			  var api = '/api/class/nomal';
		  }else{
			  var api = '/api/class/test';
		  }
		  axios.get(api,{
			  params: {
			  query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  classListRoot.classCount = resp.data.classCount;
	    	  classListRoot.studentAllCount = resp.data.studentAllCount;
	    	  classListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  classListRoot.list = resp.data.list;
	    	  classListRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#pagination').pagination('updateItems', classListRoot.countPage);
	    	  $('#pagination').pagination('selectPage', classListRoot.currentPage);
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  requestPage: function(page){
		  this.currentPage = page;
		  if(this.status == 'nomal'){
			  var api = '/api/class/nomal';
		  }else{
			  var api = '/api/class/test';
		  }
		  axios.get(api,{
			  params: {
		      query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  classListRoot.classCount = resp.data.classCount;
	    	  classListRoot.studentAllCount = resp.data.studentAllCount;
	    	  classListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  classListRoot.list = resp.data.list;
	    	  classListRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#classList').select2("destroy");
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  search: function(){
		  this.currentPage = 1;
		  if(this.status == 'nomal'){
			  var api = '/api/class/nomal';
		  }else{
			  var api = '/api/class/test';
		  }
		  axios.get(api,{
			  params: {
		      query: this.query,
			  currentPage: this.currentPage,
			  limit: this.limit
		  }})
	      .then(function(resp){
	    	  classListRoot.classCount = resp.data.classCount;
	    	  classListRoot.studentAllCount = resp.data.studentAllCount;
	    	  classListRoot.studentNoneCount = resp.data.studentNoneCount;
	    	  classListRoot.list = resp.data.list;
	    	  classListRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#pagination').pagination('updateItems', classListRoot.countPage);
			  $('#pagination').pagination('selectPage', classListRoot.currentPage);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  noneStudentModal: function(className){
		  $('#classList').select2("destroy");
		  $('#classList').select2({
  			minimumResultsForSearch: -1
  		}).on('select2:select', function (e) {
  			var data = e.params.data.id;
  			classListRoot.modalClass = data;
  		});
		  if(className){
			  $('#classList').val(className).trigger('change');  
			  this.modalClass = className;
		  }else{
			  var first = $("#classList").find('option').eq(0).val();
			  $('#classList').val(first).trigger('change');  
			  this.modalClass = first;
		  }
		  
		  if(this.status == 'nomal'){
			  this.modalTitle = '반 배정 (일반)';
			  var api = '/api/class/nomal/none';
		  }else{
			  this.modalTitle = '반 배정 (시험기간)';
			  var api = '/api/class/test/none';
		  }
		  axios.get(api)
	      .then(function(resp){
	    	  classListRoot.classNoneStudent = resp.data;
	    	  
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
		  if(this.status == 'nomal'){
			  var api = '/api/class/nomal/';
		  }else{
			  var api = '/api/class/test/';
		  }
		  axios.patch(api + paramIdx)
	      .then(function(resp){
	    	  classListRoot.refresh();
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
		  param.name = this.modalClass;
		  param.idxList = $("#studentList").val();
		  
		  if(this.status == 'nomal'){
			  var api = '/api/class/nomal';
		  }else{
			  var api = '/api/class/test';
		  }
		  
		  axios.post(api, JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#noneStudentModal").modal('hide');
	    		  classListRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal).then(function(){
	    			  $("#noneStudentModal").modal('hide');
		    		  classListRoot.refresh();
	    		  });
	    		 
	    	  }
	      });
	  },
	  switchStatus: function(mode){
		  if(this.status == mode) return;
		  this.status = mode;
		  this.currentPage = 1;
		  this.refresh();
	  },
	  addClassModal: function(){
		  if(this.status == 'nomal'){
			  $("#type").val('0').trigger('change');
			  this.modalType = '0';
			  
		  }else{
			  $("#type").val('1').trigger('change');
			  this.modalType = '1';
		  }
		  this.modalText = '반 개설';
		  this.modalClassName = '';
		  $("#addClass").modal('show');
	  },
	  updateClassModal: function(originName){
		  this.modalUpdateOriginClassName = originName;
		  $("#updateClass").modal('show');
	  },
	  updateClassname: function(){
		  if(this.modalUpdateClassName.length == 0){
			  swal("입력 항목 오류","변경할 반의 이름을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.originName = this.modalUpdateOriginClassName;
		  param.className = this.modalUpdateClassName;
		  
		  axios.patch("/api/class", JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#updateClass").modal('hide');
	    		  classListRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal).then(function(){
		    		  classListRoot.refresh();
	    		  });
	    		 
	    	  }
	      });
		  
	  },
	  addClass: function(){
		  
		  if(this.modalClassName.length == 0){
			  swal("입력 항목 오류","개설될 반의 이름을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.type = this.modalType;
		  param.className = this.modalClassName;
		  
		  axios.post("/api/class", JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#addClass").modal('hide');
	    		  classListRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal).then(function(){
		    		  classListRoot.refresh();
	    		  });
	    		 
	    	  }
	      });
		  
	  },
	  deleteClass: function(className){
		  swal({
			  title: "삭제 확인",
			  text: "배정되있는 학생이 모두 미배정 상태가 됩니다.",
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
					axios.delete('/api/class/' + className)
				      .then(function(resp){
				    	  swal(resp.data.swal)
				    	  .then(function(){
				    		  classListRoot.refresh();
				    	  })
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  },
	  modifyClassMode: function(){
		  this.modifyMode = true;
		  swal("반 수정", "수정하려는 반의 오른쪽 아이콘을 클릭하여 수정 하세요.", "info");
	  }
  }
})

var classListRoot = classListVue.$root;