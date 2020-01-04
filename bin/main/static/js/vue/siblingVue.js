var siblingVue = new Vue({
  el: '#siblingVue',
  data: {
	  doubleSubmitFlag: false,
	  search: false,
	  gradeCode: null,
	  grade: null,
	  status: null,
	  studentIdx: null,
	  student: [],
	  sibling:[],
	  count: 0,
	  isInit: true,
	  idx: 0,
	  updateName: '',
	  oldMemo: '',
	  updateMemo: '',
  },
  created: function(){
	  axios.get('/api/sibling/count')
      .then(function(resp){
    	  siblingRoot.count = resp.data;
    	  $("#grade").val(null).trigger('change');
		  $("#gradeCode").val(null).trigger('change');
		  
		  siblingRoot.allSibling();
		  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  methods: {
	  doubleSubmitCheck: function(){
		    if(this.doubleSubmitFlag){
		        return this.doubleSubmitFlag;
		    }else{
		        this.doubleSubmitFlag = true;
		        return false;
		    }
		},
	  requestSibling: function(flag){
		  if(this.doubleSubmitCheck()) return;
		  
		  axios.get('/api/sibling', {
			  params:{
				  gradeCode: this.gradeCode,
				  grade: this.grade,
				  status: this.status,
				  studentIdx: this.studentIdx
			  }})
	      .then(function(resp){

	    	  for(var m=0; m<resp.data.length; m++){
	    		  var node = resp.data[m];
	    		  node.edit = '<i class="link icon wb-edit" onclick="siblingRoot.openUpdateMemoModal(' + m + ')"></i>'
	    		  node.parentPhone = '<a class="mePhone" href="tel:' + node.parentPhone + '">' + node.parentPhone + '</a>'
	    	  }
	    	  
	    	  if(siblingRoot.isInit){
	    		  
	    		  for(var k=0; k<resp.data.length; k++){
		    		  if(siblingRoot.studentNameCheck(resp.data[k].studentName)){
		    			  // 중복하지 않는 경우
		    			  var param = {};
		    			  param.studentIdx = resp.data[k].studentIdx;
		    			  param.studentName = resp.data[k].studentName;
		    			  
		    			  siblingRoot.student.push(param);
		    			  
		    		  }
		    	  }
	    		  
	    		  $("#siblingList").on('ready.ft.table', function(){
					  $("#loadingBar").css('display', 'none');
					  ft.rows.load(resp.data);
					  siblingRoot.isInit=false;
		    	  });
	    	  }else{
	    		  ft.rows.load(resp.data);
	    	  }
	    	  
	    	  siblingRoot.sibling = resp.data;
	    	 
	    	  siblingRoot.search = true;
	    	  if(flag){
	    		  $("#grade").val(null).trigger('change');
	    		  $("#gradeCode").val(null).trigger('change');
	    		  $("#studentName").val(null).trigger('change');
	    	  }
	    	  setTimeout(function() {siblingRoot.doubleSubmitFlag = false;}, 1000);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	    	  siblingRoot.doubleSubmitFlag = false;
	      })
	  },
	  searchSibling: function(){
		  if(this.gradeCode == null){
			  swal("입력 항목 오류","구분을 선택해주세요.","error");
			  return;
		  }else if(this.grade == null){
			  swal("입력 항목 오류","학년을 선택해주세요.","error");
			  return;
		  }
		  
		  $("#studentName").val(null).trigger('change');
		  this.studentIdx = null;
		  
		  
		  this.requestSibling();
		  
	  },
	  studentSiblingSearch: function(){
		  if(this.studentIdx == null){
			  swal("입력 항목 오류","학원생을 선택해주세요.","error");
			  return;
		  }
		  
		  $("#grade").val(null).trigger('change');
		  $("#gradeCode").val(null).trigger('change');
		  this.gradeCode = null;
		  this.grade = null;
		  
		  this.requestSibling();
	  },
	  allSibling: function(){
		  this.gradeCode = null;
		  this.grade = null;
		  this.status = null;
		  this.studentIdx = null;
		  this.requestSibling(true);
	  },
	  printList: function(){
			$("#siblingList").printThis();
	  },
	  studentNameCheck: function(param){
		  for(var i =0; i<siblingRoot.student.length; i++){
			  if(siblingRoot.student[i].studentName == param){
				  return false;
			  }
		  }
		  return true;
	  },
	  openUpdateMemoModal: function(index){
		  var target = this.sibling[index];
		  this.idx = target.idx;
		  this.updateName = target.name;
		  this.oldMemo = target.memo;
		  this.updateMemo = '';
		  $('#updateMemo').modal('show');
		  
	  },
	  requestUpdateMemo: function(){
		  
		  var param = {};
		  param.idx = this.idx;
		  param.memo = this.updateMemo;
		  
		  axios.patch('/api/sibling/memo', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  $('#updateMemo').modal('hide');
	    		  siblingRoot.requestSibling();
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  }
  }
})

var siblingRoot = siblingVue.$root;