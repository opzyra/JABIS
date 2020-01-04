var counseCreateVue = new Vue({
  el: '#counseCreateVue',
  data: {
	  mode: 0,
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
	  gradeCode: 0,
	  sibling: [],
	  future: '',
	  studyStyle: '',
	  studentStyle: '',
	  parentStyle: '',
	  parentRequest: '',
	  studentCounse: '',
	  parentCounse: '',
	  siblingEdit: 0,
	  workDate: null,
	  workRedirect: false,
  },
  updated: function(){
	  LetterAvatar.transform();  
  },
  created: function(){
	  var d = new Date();
	  var date_format_str = d.getFullYear().toString()+"."+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"."+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
	  this.today = date_format_str;
	  
	  this.workDate = $("#workDate").val();
	  this.studentIdx = $("#studentIdx").val();
	  
	  if(this.workDate != null && this.workDate.length != 0){
		  this.counseDate = this.workDate;
		  this.workRedirect = true;
	  }
	  
	  axios.get('/api/counse/' + this.studentIdx)
      .then(function(resp){
    	  counseCreateRoot.name = resp.data.counse.name;
    	  counseCreateRoot.school = resp.data.counse.school;
    	  counseCreateRoot.grade = resp.data.counse.grade;
    	  counseCreateRoot.gradeCode = resp.data.counse.gradeCode;
    	  counseCreateRoot.sibling = resp.data.counse.sibling;
    	  counseCreateRoot.count = resp.data.count;
    	  
    	  if(counseCreateRoot.count > 0){
    		  $("#FirstMode").prop('disabled', true);
    		  counseCreateRoot.mode = 1;
    	  }else{
    		  $("#NomalMode").prop('disabled', true);
    		  counseCreateRoot.mode = 0;
    	  }
    	  
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
					  this.btnText = '작성';
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
					  this.btnText = '작성';
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
				  this.createCounse();
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
			  this.createCounse();
			  
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
				  this.btnText = '작성';
				  this.tabMaster = true;
			  }
			  
		  }else if(this.tab == 2){
			  this.btnText = '작성';
			  this.tabMaster = true;
		  }
	  },
	  siblingModify: function(){
		  this.siblingEdit = 1;
	  },
	  createCounse: function(){
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.mode = this.mode;
		  param.counseDate = this.counseDate;
		  param.future = this.future;
		  param.studyStyle = this.studyStyle.replace(/(\n|\r\n)/g, '<br>');
		  param.studentStyle = this.studentStyle.replace(/(\n|\r\n)/g, '<br>');
		  param.parentStyle = this.parentStyle.replace(/(\n|\r\n)/g, '<br>');
		  param.parentRequest = this.parentRequest.replace(/(\n|\r\n)/g, '<br>');
		  param.studentCounse = this.studentCounse.replace(/(\n|\r\n)/g, '<br>');
		  param.parentCounse = this.parentCounse.replace(/(\n|\r\n)/g, '<br>');
		  param.siblingEdit = this.siblingEdit;
		  param.sibling = this.sibling;
		  
		  axios.post('/api/counse', JSON.stringify(param))
	      .then(function(resp){
	    	  if(counseCreateRoot.mode == 0){
	    		  swal({
					  title: "상담 등록 완료",
					  text: "입학전 성적을 등록 하시겠습니까?",
					  icon: "success",
					  buttons: {
						  confirm: {
							    text: "등록",
							    value: true,
							    visible: true,
							    className: "",
							    closeModal: false
							  },
						  cancel: {
							    text: "취소",
							    value: false,
							    visible: true,
							    className: "",
							    closeModal: true,
							  }
					  },
					  closeOnClickOutside: false
					}).then(function(willdone){
						if(willdone){
							if(counseCreateRoot.gradeCode <= 2){
								var mode = 0;
							}else{
								var mode = 1;
							}
							location.href='/app/score/create?studentIdx=' + counseCreateRoot.studentIdx + '&mode=' + mode + '&first=true';
						}else{
							if(counseCreateRoot.workRedirect){
		    	    			  location.href='/app/work';
		    	    		  }else{
		    	    			  location.href='/app/counse/' + counseCreateRoot.studentIdx;
		    	    		  }
						}
					});
    		  }else{
    			  swal(resp.data.swal).then(function(){
    	    		  if(counseCreateRoot.workRedirect){
    	    			  location.href='/app/work';
    	    		  }else{
    	    			  location.href='/app/counse/' + counseCreateRoot.studentIdx;
    	    		  }
    	    	  })
    		  } 
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  }
  }
})

var counseCreateRoot = counseCreateVue.$root;
