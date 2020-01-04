var scoreCreateVue = new Vue({
  el: '#scoreCreateVue',
  data: {
	  mode: 0,
	  first: false,
	  tab: 0,
	  today: '',
	  year: '',
	  studentIdx: 0,
	  count: 0,
	  name: '',
	  school: '',
	  grade: 0,
	  gradeCode: 0,
	  type: null,
	  subjectList: [],
	  validation: [false, false, false, false, false, false],
	  middleNesin:[
		  {
			  text: '국어',
			  subjectCode: 1,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:0,
			  ranking:0
		  },
		  {
			  text: '영어',
			  subjectCode: 2,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:0,
			  ranking:0
		  },
		  {
			  text: '수학',
			  subjectCode: 3,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:'',
			  ranking:0
		  },
		  {
			  text: '과학',
			  subjectCode: 4,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:0,
			  ranking:0
		  },
		  {
			  text: '사회',
			  subjectCode: 5,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:0,
			  ranking:0
		  },
		  {
			  text: '역사',
			  subjectCode: 6,
			  score:'',
			  average:'',
			  deviation:'',
			  applicants:0,
			  ranking:0
		  }
	  ],
	  typeList: [],
	  typeListSet:[
		  [{
			  value: 0,
			  text: '입학 전 성적'
		  },{
			  value: 1,
			  text: '1학기 중간고사'
		  },{
			  value: 2,
			  text: '1학기 기말고사'
		  },{
			  value: 3,
			  text: '2학기 중간고사'
		  },{
			  value: 4,
			  text: '2학기 기말고사'
		  }],
		  [{
			  value: 0,
			  text: '입학 전 성적'
		  },{
			  value: 5,
			  text: '3월 모의고사'
		  },{
			  value: 6,
			  text: '4월 모의고사'
		  },{
			  value: 7,
			  text: '5월 모의고사'
		  },{
			  value: 8,
			  text: '6월 평가원'
		  },{
			  value: 9,
			  text: '7월 모의고사'
		  },{
			  value: 10,
			  text: '8월 모의고사'
		  },{
			  value: 11,
			  text: '9월 평가원'
		  },{
			  value: 12,
			  text: '10월 모의고사'
		  },{
			  value: 13,
			  text: '수능'
		  }]
	  ],
	  highNesinSubject: '',
	  highNesinSubjectName: '',
	  highNesinScore: '',
	  highNesinRating: '',
	  highNesinUnit: '',
	  highNesin:[],
	  moiSubject: '',
	  moiSubjectName: '',
	  moiScore: '',
	  moiRating: '',
	  moi: [],
  },
  updated: function(){
	  LetterAvatar.transform();  
  },
  created: function(){
	  var d = new Date();
	  var date_format_str = d.getFullYear().toString()+"."+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"."+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
	  this.today = date_format_str;
	  this.year = new Date().getFullYear();

	  this.studentIdx = $("#studentIdx").val();
	  this.mode = $("#modeParam").val();
	  this.first = $("#first").val();
	  
	  if(this.mode == 0 || this.mode == 1){
		  this.typeList = this.typeListSet[0];
		}else{
			this.typeList = this.typeListSet[1];
		}
	  
	  axios.get('/api/student/' + this.studentIdx)
      .then(function(resp){
    	  scoreCreateRoot.name = resp.data.name;
    	  scoreCreateRoot.school = resp.data.school;
    	  scoreCreateRoot.grade = resp.data.grade;
    	  scoreCreateRoot.gradeCode = resp.data.gradeCode;
    	  
    	  $("#type").unbind();
    	  $("#type").select2("destroy");
    		
    		$("#type").select2({
    			placeholder: "상세분류",
    			minimumResultsForSearch: -1
    		}).on('select2:select', function (e) {
    			scoreCreateRoot.type = e.params.data.id;
    		});
    		
    		if(scoreCreateRoot.first){
    			 $("#type").val('0').trigger('change');
    			 scoreCreateRoot.type = 0;
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
	  createMiddleNesin: function(){
		  
		  if(this.type == null){
			  swal("입력 항목 오류", "분류를 선택해주세요.", "error");
			  return;
		  }
		  
		  if($.inArray(false, this.validation) != -1){
			  swal("입력 항목 오류", "입력하지 않은 항목이 있습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.mode = this.mode;
		  param.year = this.year;
		  param.type = this.type;
		  param.middleNesin = this.middleNesin;
		  
		  axios.post('/api/score/middle/nesin', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  if(scoreCreateRoot.first){
	    			  location.href = '/app/student/' + scoreCreateRoot.studentIdx;
	    		  }else{
	    			 location.href='/app/score?studentIdx=' + scoreCreateRoot.studentIdx + '&mode=' + scoreCreateRoot.mode;
	    		  }
	    		  
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  createHighNesin: function(){
		  if(this.type == null){
			  swal("입력 항목 오류", "분류를 선택해주세요.", "error");
			  return;
		  }
		  
		  if(this.highNesin.length == 0){
			  swal("입력 항목 오류", "입력된 과목이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.mode = this.mode;
		  param.year = this.year;
		  param.type = this.type;
		  param.highNesin = this.highNesin;
		  
		  axios.post('/api/score/high/nesin', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  if(scoreCreateRoot.first){
	    			  location.href = '/app/student/' + scoreCreateRoot.studentIdx;
	    		  }else{
	    			  location.href='/app/score?studentIdx='+scoreCreateRoot.studentIdx + '&mode=' + scoreCreateRoot.mode;
	    		  }
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  createMoi: function(){
		  if(this.type == null){
			  swal("입력 항목 오류", "분류를 선택해주세요.", "error");
			  return;
		  }
		  
		  if(this.moi.length == 0){
			  swal("입력 항목 오류", "입력된 과목이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.mode = this.mode;
		  param.year = this.year;
		  param.type = this.type;
		  param.moi = this.moi;
		  
		  axios.post('/api/score/high/moi', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  if(scoreCreateRoot.first){
	    			  location.href = '/app/student/' + scoreCreateRoot.studentIdx;
	    		  }else{
	    			  location.href='/app/score?studentIdx='+scoreCreateRoot.studentIdx + '&mode=' + scoreCreateRoot.mode;
	    		  }
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  openHighNesinModal: function(){
		  
		  axios.get('/api/subject/all')
	      .then(function(resp){
	    	  scoreCreateRoot.subjectList = resp.data;
	    	  
	    	  scoreCreateRoot.highNesinSubject = '';
	    	  scoreCreateRoot.highNesinSubjectName = '';
	    	  scoreCreateRoot.highNesinScore = '';
	    	  scoreCreateRoot.highNesinRating =  '';
	    	  scoreCreateRoot.highNesinUnit = '';
	    	  $("#subjectCode").val(null).trigger('change');
	    	  $("#subjectCode").select2('destroy');
			  $("#subjectCode").unbind();
	    	  
	    	  $("#subjectCode").select2({
	    			placeholder: "과목",
	    			minimumResultsForSearch: -1
	    		}).on('select2:select', function (e) {
	    			scoreCreateRoot.highNesinSubject = e.params.data.id;
	    			scoreCreateRoot.highNesinSubjectName = e.params.data.text;
	    		}).on('select2:open', function (e) {
	    			  $(".select2-container--open").addClass('modal-select2');
	    		});
	    	  
	    	  
	    	  $("#highNesinModal").modal('show');
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal)
	    		  .then(function(){
	    			  history.back();
	    		  });
	    	  }
	      });
	  },
	  openMoiModal: function(){
		  axios.get('/api/subject/all')
	      .then(function(resp){
	    	  scoreCreateRoot.subjectList = resp.data;
	    	  
	    	  scoreCreateRoot.moiSubject = '';
	    	  scoreCreateRoot.moiSubjectName = '';
	    	  scoreCreateRoot.moiScore = '';
	    	  scoreCreateRoot.moiRating =  '';
	    	  
	    	  $("#subjectCode2").val(null).trigger('change');
	    	  $("#subjectCode2").select2('destroy');
			  $("#subjectCode2").unbind();
	    	  
	    	  $("#subjectCode2").select2({
	    			placeholder: "과목",
	    			minimumResultsForSearch: -1
	    		}).on('select2:select', function (e) {
	    			scoreCreateRoot.moiSubject = e.params.data.id;
	    			scoreCreateRoot.moiSubjectName = e.params.data.text;
	    		}).on('select2:open', function (e) {
	    			  $(".select2-container--open").addClass('modal-select2');
	    		});;
	    	  
	    	  
	    	  $("#moiModal").modal('show');
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal)
	    		  .then(function(){
	    			  history.back();
	    		  });
	    	  }
	      });
	  },
	  addHighNesin: function(){
		  
		  var check = this.checkIsSubject(this.highNesinSubjectName);
		  
		  if(this.highNesinSubject === ''){
			  swal("입력 항목 오류", "과목을 선택해주세요.", "error");
			  return;
		  }else if(check){
			  swal("입력 항목 오류", "동일한 교과목이 이미 있습니다.", "error");
			  return;
		  }else if(this.highNesinScore === ''){
			  swal("입력 항목 오류", "원점수을 입력해주세요.", "error");
			  return;
		  }else if(this.highNesinRating === ''){
			  swal("입력 항목 오류", "등급을 입력해주세요.", "error");
			  return;
		  }else if(this.highNesinUnit === ''){
			  swal("입력 항목 오류", "단위수를 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.status = '<span class="link" onclick="scoreCreateRoot.deleteHighNesin(' + this.highNesin.length + ', this)"><i class="icon wb-trash"><i></span>';
		  
		  param.highNesinSubject = this.highNesinSubject;
		  param.highNesinSubjectName = this.highNesinSubjectName;
		  param.highNesinScore = this.highNesinScore;
		  param.highNesinRating = this.highNesinRating;
		  param.highNesinUnit = this.highNesinUnit;
		  this.highNesin.push(param);
		  
		  ftHN.rows.add(param);
		  $("#highNesinModal").modal('hide');
	  },
	  addMoi: function(){
		  
		  var check = this.checkIsMoiSubject(this.moiSubjectName);
		  
		  if(this.moiSubject === ''){
			  swal("입력 항목 오류", "과목을 선택해주세요.", "error");
			  return;
		  }else if(check){
			  swal("입력 항목 오류", "동일한 교과목이 이미 있습니다.", "error");
			  return;
		  }else if(this.moiScore === ''){
			  swal("입력 항목 오류", "원점수을 입력해주세요.", "error");
			  return;
		  }else if(this.moiRating === ''){
			  swal("입력 항목 오류", "등급을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.status = '<span class="link" onclick="scoreCreateRoot.deleteMoi(' + this.moi.length + ', this)"><i class="icon wb-trash"><i></span>';
		  
		  param.moiSubject = this.moiSubject;
		  param.moiSubjectName = this.moiSubjectName;
		  param.moiScore = this.moiScore;
		  param.moiRating = this.moiRating;
		  
		  this.moi.push(param);
		  
		  ftMI.rows.add(param);
		  $("#moiModal").modal('hide');
	  },
	  deleteHighNesin: function(idx, obj){
          
		  swal({
			  title: "삭제 확인",
			  text: "해당 성적을 삭제하시겠습니까?",
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
					scoreCreateRoot.highNesin.splice(idx,1);
					ftHN.rows.delete(idx);
				}
			});
		  
		  
	  },
	  deleteMoi: function(idx, obj){
          
		  swal({
			  title: "삭제 확인",
			  text: "해당 성적을 삭제하시겠습니까?",
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
					scoreCreateRoot.moi.splice(idx,1);
					ftMI.rows.delete(idx);
				}
			});

	  },
	  checkIsSubject: function(subjectName){
		  for(var i = 0; i<scoreCreateRoot.highNesin.length; i++){
			  if(scoreCreateRoot.highNesin[i].highNesinSubjectName == subjectName){
				  return true;
			  }
		  }
		  return false;
	  },
	  checkIsMoiSubject: function(subjectName){
		  for(var i = 0; i<scoreCreateRoot.moi.length; i++){
			  if(scoreCreateRoot.moi[i].highNesinSubjectName == subjectName){
				  return true;
			  }
		  }
		  return false;
	  }
  }
})

var scoreCreateRoot = scoreCreateVue.$root;
