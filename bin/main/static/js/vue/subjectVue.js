var subjectVue = new Vue({
  el: '#subjectVue',
  data: {
	offset: 0,
	limit: 10,
	currentPage: 1,
    countPage: 0,
	subject: [],
	name: '',
	description: '',
	updateIdx: 0,
	updateOldName: '',
	updateName: '',
	updateDescription: '',
	modifyMode: false,
	orderMode: false,
	dragger: null,
  },
  created: function(){
	  axios.get('/api/subject', {
		  params:{
			  offset: 0,
			  limit: 10
		  }})
      .then(function(resp){
    	  subjectRoot.subject = resp.data.subject;
    	  subjectRoot.countPage = resp.data.countPage;
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  computed: {
	  
  },
  methods: {
	  refresh: function(){
		  axios.get('/api/subject', {
			  params:{
				  offset: this.offset,
				  limit: this.limit
			  }})
	      .then(function(resp){
	    	  subjectRoot.subject = resp.data.subject;
	    	  subjectRoot.countPage = resp.data.countPage;
	    	  
	    	  $('#pagination').pagination('updateItems', subjectRoot.countPage);
			  $('#pagination').pagination('selectPage', subjectRoot.currentPage);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  requestPage: function(page){
		  this.currentPage = page;
		  this.offset = (page-1)*10
		  axios.get('/api/subject', {
			  params:{
				  offset: this.offset,
				  limit: this.limit
			  }})
	      .then(function(resp){
	    	  subjectRoot.subject = resp.data.subject;
	    	  subjectRoot.countPage = resp.data.count;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  openModalAddSubject: function(){
		  this.name = '';
		  this.description = '';
		  $("#addSubject").modal('show');
	  },
	  addSubject: function(){
		  
		  if(this.name == ''){
			  swal("입력 항목 오류", "과목명을 입력해주세요.", "error");
			  return;
		  }else if(this.description == ''){
			  swal("입력 항목 오류", "설명을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.name = this.name;
		  param.description = this.description;
		  axios.post('/api/subject', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#addSubject").modal('hide');
    			  subjectRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  openModalUpdateSubject: function(idx, name){
		  this.updateIdx = idx;
		  this.updateOldName = name;
		  this.updateName = '';
		  this.updateDescription = '';
		  $("#updateSubject").modal('show');
	  },
	  updateSubject: function(){
		  if(this.updateDescription == '' && this.updateName == ''){
			  swal("입력 항목 오류", "변동사항이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.idx = this.updateIdx;
		  param.name = this.updateName;
		  param.description = this.updateDescription;
		  axios.patch('/api/subject/' + this.updateIdx, JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
    			  $("#updateSubject").modal('hide');
    			  subjectRoot.refresh();
    		  });
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  subjectModifyMode: function(){
		  if(this.orderMode){
			  swal({
				  title: "순서 변경 취소",
				  text: "과목 순서 변경 중 입니다. 수정 작업시 자동 취소됩니다.",
				  icon: "warning",
				  buttons: {
					  confirm: {
						    text: "계속",
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
						subjectRoot.modifyMode= true;
						subjectRoot.orderMode= false;
						subjectRoot.dragger.destroy();
						$(".sindu_handle").removeClass('sindu_handle');
						swal("과목 수정", "수정하려는 과목의 연필 아이콘을 클릭하여 변경하세요.", "info");
					}
				});
		  }else{
			    subjectRoot.modifyMode= true;
				subjectRoot.orderMode= false;
				$(".sindu_handle").removeClass('sindu_handle');
				swal("과목 수정", "수정하려는 과목의 연필 아이콘을 클릭하여 변경하세요.", "info");
		  }
	  },
	  orderModifyMode: function(){
		  
		  if(this.modifyMode){
			  swal({
				  title: "과목 수정 취소",
				  text: "과목 수정 중 입니다. 순서 변경 작업시 자동 취소됩니다.",
				  icon: "warning",
				  buttons: {
					  confirm: {
						    text: "계속",
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
						subjectRoot.modifyMode= false;
						subjectRoot.orderMode= true;
						subjectRoot.dragger = tableDragger(document.querySelector("#drag"), { mode: "row", onlyBody: true });
						swal("과목 순서 변경", "순서를 변경하려는 과목을 드래그하여 변경하세요.", "info");
					}
				});
		  }else{
			  subjectRoot.modifyMode= false;
				subjectRoot.orderMode= true;
				subjectRoot.dragger = tableDragger(document.querySelector("#drag"), { mode: "row", onlyBody: true });
				swal("과목 순서 변경", "순서를 변경하려는 과목을 드래그하여 변경하세요.", "info");
		  }
		  
		  
	  },
	  orderModifySuccess: function(){
		  var node = $('#drag tbody tr');
		  var list = [];
		  for(var i = 0; i<node.length; i++){
			  var dataset = {};
			  dataset.idx = $(node[i]).attr('data-idx');
			  dataset.order = i+1;
			  list.push(dataset);
		  }
		  
		  var param = {};
		  param.subject = list;
		  
		  axios.patch('/api/subject/order', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  subjectRoot.orderMode= false;
				  subjectRoot.dragger.destroy();
				  $(".sindu_handle").removeClass('sindu_handle');
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  cancleMode: function(){
		  if(this.orderMode){
			  subjectRoot.dragger.destroy();
				$(".sindu_handle").removeClass('sindu_handle');
		  }
		  this.modifyMode= false;
		  this.orderMode= false;
		  swal("작업 취소", "모든 작업이 취소되었습니다.", "success");
	  },
	  subjectModifySuccess: function(){
		  if(this.orderMode){
			  subjectRoot.dragger.destroy();
				$(".sindu_handle").removeClass('sindu_handle');
		  }
		  this.modifyMode= false;
		  this.orderMode= false;
		  swal("수정 완료", "과목정보가 수정 되었습니다.", "success");
	  }
  }
})

var subjectRoot = subjectVue.$root;