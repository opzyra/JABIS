var counseModifyVue = new Vue({
  el: '#counseModifyVue',
  data: {
	  idx: 0,
	  mode: 0,
	  work: false,
	  tab: 0,
	  tabMaster: false,
	  btnText: '다음',
	  today: '',
	  counseDate: null,
	  studentIdx: 0,
	  count: 0,
	  name: '',
	  school: '',
	  grade: 0,
	  sibling: [],
	  future: '',
	  studyStyle: '',
	  studentStyle: '',
	  parentStyle: '',
	  parentRequest: '',
	  studentCounse: '',
	  parentCounse: '',
	  siblingEdit: 0,
  },
  updated: function(){
	  LetterAvatar.transform();  
  },
  created: function(){
	  var d = new Date();
	  var date_format_str = d.getFullYear().toString()+"."+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"."+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
	  this.today = date_format_str;
	  
	  this.mode = $("#mode").val();
	  this.idx = $("#idx").val();
	  this.work = $("#work").val();
	  
	  axios.get('/api/counse/detail/' + this.idx)
      .then(function(resp){
    	  counseModifyRoot.mode = resp.data.mode;
    	  counseModifyRoot.studentIdx = resp.data.studentIdx;
    	  counseModifyRoot.counseDate = resp.data.counseDate;
    	  counseModifyRoot.future = resp.data.future;
    	  counseModifyRoot.studyStyle = resp.data.studyStyle != null ? resp.data.studyStyle.replace(/<br\s?\/?>/g,"\n") : null;
    	  counseModifyRoot.studentStyle = resp.data.studentStyle != null ? resp.data.studentStyle.replace(/<br\s?\/?>/g,"\n") : null;
    	  counseModifyRoot.parentStyle = resp.data.parentStyle != null ? resp.data.parentStyle.replace(/<br\s?\/?>/g,"\n") : null;
    	  counseModifyRoot.parentRequest = resp.data.parentRequest != null ? resp.data.parentRequest.replace(/<br\s?\/?>/g,"\n") : null;
    	  counseModifyRoot.studentCounse = resp.data.studentCounse != null ? resp.data.studentCounse.replace(/<br\s?\/?>/g,"\n") : null;
    	  counseModifyRoot.parentCounse = resp.data.parentCounse != null ? resp.data.parentCounse.replace(/<br\s?\/?>/g,"\n") : null;
    	  $('#datepicker').datepicker('update', new Date(counseModifyRoot.counseDate));
    	  
    	  if(counseModifyRoot.mode == 1){
    		  $("#FirstMode").prop('disabled', true);
    	  }else{
    		  $("#NomalMode").prop('disabled', true);
    	  }
    	  
    	  axios.get('/api/counse/' + counseModifyRoot.studentIdx)
          .then(function(resp){
        	  counseModifyRoot.name = resp.data.counse.name;
        	  counseModifyRoot.school = resp.data.counse.school;
        	  counseModifyRoot.grade = resp.data.counse.grade;
        	  counseModifyRoot.sibling = resp.data.counse.sibling;
  
          }).catch(function(error){
        	  if(error.response != undefined){
        		  swal(error.response.data.swal)
        		  .then(function(){
        			  history.back();
        		  });
        	  }
          });
    	  
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal)
    		  .then(function(){
    			  history.back();
    		  });
    	  }
      });
	  
	  
	  
	  
	  
  },
  methods: {
	  submitAction: function(){
		  if(this.tab == 0){
			  if(this.mode == 0){
				  if(this.future == '' || this.future == null){
					swal("입력 항목 오류", "장래희망을 입력해주세요.", "error");  
				  }else if(this.studyStyle == '' || this.studyStyle == null){
					  swal("입력 항목 오류", "공부 방법을 입력해주세요.", "error");
				  }else if(this.studentStyle == '' || this.studentStyle == null){
					  swal("입력 항목 오류", "학생 성향을 입력해주세요.", "error");
				  }else{
					  this.tabSwitch(1, true);
				  }
			  }else if(this.mode == 1){
				  if(this.studentCounse == '' || this.studentCounse == null){
					swal("입력 항목 오류", "학생 상담 내용을 입력해주세요.", "error");  
				  }else{
					  this.btnText = '수정';
					  this.tabSwitch(1, true);
				  }
			  }
			  
		  }else if(this.tab == 1){
			  if(this.mode == 0){
				  if(this.parentStyle == '' || this.parentStyle == null){
					swal("입력 항목 오류", "학부모 성향을 입력해주세요.", "error");  
				  }else if(this.parentRequest == '' || this.parentRequest == null){
					  swal("입력 항목 오류", "학부모 요청사항을 입력해주세요.", "error");
				  }else{
					  this.tabSwitch(2, true);
					  this.btnText = '수정';
				  }
			  }else if(this.mode == 1){
				  if(this.parentCounse == '' || this.parentCounse == null){
					swal("입력 항목 오류", "학부모 상담 내용을 입력해주세요.", "error");
				  }else if(this.studentCounse == '' || this.studentCounse == null){
					  swal("입력 항목 오류", "학생 상담 내용을 입력해주세요.", "error");
					  return;
				  }else if(this.counseDate == null){
					  swal("입력 항목 오류","상담일시를 선택해주세요.","error")
					  return;
				  }
				  
				  // 통과
				  this.modifyCounse();
			  }
			  
		  }else{
			  
			  if(this.counseDate == null){
				  swal("입력 항목 오류","상담일시를 선택해주세요.","error")
				  return;
			  }
			  
			  if(this.mode == 0){
				  if(this.future == '' || this.future == null){
					  swal("입력 항목 오류", "장래희망을 입력해주세요.", "error");
					  return;
				  }
				  if(this.studyStyle == '' || this.studyStyle == null){
					  swal("입력 항목 오류", "공부 방법을 입력해주세요.", "error");
					  return;
				  }
				  if(this.studentStyle == '' || this.studentStyle == null){
					  swal("입력 항목 오류", "학생 성향을 입력해주세요.", "error");
					  return;
				  }
				  
				  if(this.parentStyle == '' || this.parentStyle == null){
					  swal("입력 항목 오류", "학부모 성향을 입력해주세요.", "error");
					  return;
				  }
				  
				  if(this.parentRequest == '' || this.parentRequest == null){
					  swal("입력 항목 오류", "학부모 요청사항을 입력해주세요.", "error");
					  return;
				  }
				  
			  }
			  
			  // 통과
			  this.modifyCounse();
			  
		  }
	  },
	  tabSwitch: function(param, submit){
		  if(!this.tabMaster && !submit){
			  //swal("입력 항목 오류", "하단의 다음 버튼으로 이동해주세요.", "error");
			  this.submitAction();
			  return;  
		  }
		  
		  this.tab = param;
		  $('.tab-ul').find('li').removeClass('tab-selected').eq(param).addClass('tab-selected');
		  
		  if(this.tab == 0){
			  this.btnText = '다음';
		  }else if(this.tab == 1){
			  if(this.mode == 0){
				  this.btnText = '다음';
			  }else if(this.mode == 1){
				  this.btnText = '수정';
				  this.tabMaster = true;
			  }
			  
		  }else if(this.tab == 2){
			  this.btnText = '수정';
			  this.tabMaster = true;
		  }
	  	},
	  siblingModify: function(){
		  this.siblingEdit = 1;
	  },
	  modifyCounse: function(){
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.idx = this.idx;
		  param.mode = this.mode;
		  param.counseDate = new Date(this.counseDate).format('yyyy-MM-dd');;
		  param.future = this.future;
		  param.studyStyle = this.studyStyle != null ? this.studyStyle.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.studentStyle = this.studentStyle != null ? this.studentStyle.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.parentStyle = this.parentStyle != null ? this.parentStyle.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.parentRequest = this.parentRequest != null ? this.parentRequest.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.studentCounse = this.studentCounse != null ? this.studentCounse.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.parentCounse = this.parentCounse != null ? this.parentCounse.replace(/(\n|\r\n)/g, '<br>') : null;
		  param.siblingEdit = this.siblingEdit;
		  param.sibling = this.sibling;
		  
		  axios.patch('/api/counse', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  if(counseModifyRoot.work == "true"){
	    			  location.href='/app/work';
	    		  }else{
	    			location.href='/app/counse/' + counseModifyRoot.studentIdx;
	    		  }
	    		  
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  deleteCounse: function(){
		  swal({
			  title: "삭제 확인",
			  text: "해당 상담 일지를 삭제하시겠습니까?",
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
					axios.delete('/api/counse/' + counseModifyRoot.idx)
					  .then(function(resp){
						  swal(resp.data.swal).then(function(){
							  if(counseModifyRoot.work == "true"){
				    			  location.href='/app/work';
				    		  }else{
				    			location.href='/app/counse/' + counseModifyRoot.studentIdx;
				    		  }
			    		  });
					  }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  }
  }
})

var counseModifyRoot = counseModifyVue.$root;
