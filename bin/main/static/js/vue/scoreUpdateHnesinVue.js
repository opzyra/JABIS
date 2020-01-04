var scoreUpdateHnesinVue = new Vue({
  el: '#scoreUpdateHnesinVue',
  data: {
	  mode: 1,
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
	  updated: false,
	  scoreIdx: 0,
	  subjectList: [],
	  validation: [true, true, true, true, true, true],
	  highNesinSubject: '',
	  highNesinSubjectName: '',
	  highNesinScore: '',
	  highNesinRating: '',
	  highNesinUnit: '',
	  highNesin:[],
	  highNesinOrigin: [],
	  highNesinUpdateIdx: 0,
	  highNesinUpdateSubject: '',
	  highNesinUpdateSubjectName: '',
	  highNesinUpdateScore: '',
	  highNesinUpdateRating: '',
	  highNesinUpdateUnit: '',
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
	  ]
  },
  updated: function(){
	  LetterAvatar.transform();  
  },
  mounted: function(){
	  
  },
  created: function(){
	  var d = new Date();
	  var date_format_str = d.getFullYear().toString()+"."+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"."+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
	  this.today = date_format_str;
	  this.year = new Date().getFullYear();

	  this.studentIdx = $("#studentIdx").val();
	  this.scoreIdx = $("#scoreIdx").val();
	  this.typeList = this.typeListSet[0];
	  
	  axios.get('/api/student/' + this.studentIdx)
      .then(function(resp){
    	  scoreUpdateHnesinRoot.name = resp.data.name;
    	  scoreUpdateHnesinRoot.school = resp.data.school;
    	  scoreUpdateHnesinRoot.grade = resp.data.grade;
    	  scoreUpdateHnesinRoot.gradeCode = resp.data.gradeCode;
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal)
    		  .then(function(){
    			  history.back();
    		  });
    	  }
      });

	  axios.get('/api/score/' + this.scoreIdx)
      .then(function(resp){
    	  scoreUpdateHnesinRoot.year = resp.data.year;
    	  scoreUpdateHnesinRoot.type = resp.data.type;
    	  scoreUpdateHnesinRoot.mode = resp.data.mode;
    	  $("#type").val(resp.data.type).trigger('change');
    	  
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal)
    		  .then(function(){
    			  history.back();
    		  });
    	  }
      });
	  
	  axios.get('/api/score/high/nesin/' + this.scoreIdx)
      .then(function(resp){
    	  var data = []
    	  for(var i = 0; i<resp.data.highNesin.length; i++){
    		  resp.data.highNesin[i].status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateHnesinRoot.updateHighNesinModal('+ i + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateHnesinRoot.deleteHighNesin(' + i + ', this, ' + resp.data.highNesin[i].scoreIdx + ', ' + resp.data.highNesin[i].subjectCode + ')"></i>'
    		  resp.data.highNesin[i].newScore = false;
    		  resp.data.highNesin[i].update = false;
    		  data.push(resp.data.highNesin[i]);
    	  }
    	  
    	  scoreUpdateHnesinRoot.highNesin = resp.data.highNesin;
    	  scoreUpdateHnesinRoot.highNesinOrigin = data;

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
	  	openHighNesinModal: function(){
		  
		  axios.get('/api/subject/all')
	      .then(function(resp){
	    	  scoreUpdateHnesinRoot.subjectList = resp.data;
	    	  
	    	  scoreUpdateHnesinRoot.highNesinSubject = '';
	    	  scoreUpdateHnesinRoot.highNesinSubjectName = '';
	    	  scoreUpdateHnesinRoot.highNesinScore = '';
	    	  scoreUpdateHnesinRoot.highNesinRating =  '';
	    	  scoreUpdateHnesinRoot.highNesinUnit = '';
	    	  $("#subjectCode").val(null).trigger('change');
	    	  $("#subjectCode").select2('destroy');
			  $("#subjectCode").unbind();
	    	  
	    	  $("#subjectCode").select2({
	    			placeholder: "과목",
	    			minimumResultsForSearch: -1
	    		}).on('select2:select', function (e) {
	    			scoreUpdateHnesinRoot.highNesinSubject = e.params.data.id;
	    			scoreUpdateHnesinRoot.highNesinSubjectName = e.params.data.text;
	    		}).on('select2:open', function (e) {
	    			  $(".select2-container--open").addClass('modal-select2');
	    		});;
	    	  
	    	  
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
	  addHighNesin: function(){
		  
		  if(this.highNesinSubject === ''){
			  swal("입력 항목 오류", "과목을 선택해주세요.", "error");
			  return;
		  }else if(this.checkSubject(this.highNesinSubjectName)){
			  //과목 중복 체크
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
		  
		  
		  param.status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateHnesinRoot.updateHighNesinModal(' + this.highNesin.length + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateHnesinRoot.deleteHighNesin(' + this.highNesin.length + ', this)"></i>';
		  param.name = this.highNesinSubjectName;
		  param.score = this.highNesinScore;
		  param.rating = this.highNesinRating;
		  param.unit = this.highNesinUnit;
		  param.subjectCode = this.highNesinSubject;
		  param.scoreIdx =  this.scoreIdx;
		  param.newScore = true;
		  param.update = false;
		  
		  this.highNesin.push(param);
		  
		  ftHN.rows.add(param);
		  $("#highNesinModal").modal('hide');
	  },
	  deleteHighNesin: function(idx, obj, scoreIdx, subjectIdx){
          
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
					if(scoreIdx != undefined || subjectIdx != undefined){
						  // 저장된 데이터를 삭제하는 경우
						axios.delete('/api/score/high/nesin/' + scoreIdx + '/' + subjectIdx)
						  .then(function(resp){
							  swal(resp.data.swal).then(function(){
								  scoreUpdateHnesinRoot.highNesin.splice(idx,1);
								  ftHN.rows.delete(idx);
				    		  });
						  }).catch(function(error){
					    	  if(error.response != undefined){
					    		  swal(error.response.data.swal);
					    	  }
					      });
						
						
						  
					  }else{
						  //사용자가 추가한 데이터를 삭제하는 경우
						  scoreUpdateHnesinRoot.highNesin.splice(idx,1);
						  ftHN.rows.delete(idx);
					  }
					
					
				}
			});
	  },
	  updateHighNesinModal: function(idx, obj){
		  
		  this.highNesinUpdateIdx = idx;
    	  this.highNesinUpdateSubject = this.highNesin[idx].subjectCode;
    	  this.highNesinUpdateSubjectName = this.highNesin[idx].name;
    	  this.highNesinUpdateScore = this.highNesin[idx].score;
    	  this.highNesinUpdateRating = this.highNesin[idx].rating;
    	  this.highNesinUpdateUnit = this.highNesin[idx].unit;
		  
    	  $("#highNesinUpdateSubjectName").val(this.highNesinUpdateSubjectName);
    	  
		  $('#highNesinUpdateModal').modal('show');  

		  
	  },
	  updateHighNesin: function(){
		  
		  if(this.highNesinUpdateScore === ''){
			  swal("입력 항목 오류", "원점수을 입력해주세요.", "error");
			  return;
		  }else if(this.highNesinUpdateRating === ''){
			  swal("입력 항목 오류", "등급을 입력해주세요.", "error");
			  return;
		  }else if(this.highNesinUpdateUnit === ''){
			  swal("입력 항목 오류", "단위수를 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};

		  param.status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateHnesinRoot.updateHighNesinModal(' + this.highNesinUpdateIdx + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateHnesinRoot.deleteHighNesin(' + this.highNesinUpdateIdx + ', this)"></i>';
		  param.name = this.highNesinUpdateSubjectName;
		  param.score = this.highNesinUpdateScore;
		  param.rating = this.highNesinUpdateRating;
		  param.unit = this.highNesinUpdateUnit;
		  param.subjectCode = this.highNesinUpdateSubject;
		  
		  this.highNesin[this.highNesinUpdateIdx].score = this.highNesinUpdateScore;
		  this.highNesin[this.highNesinUpdateIdx].rating = this.highNesinUpdateRating;
		  this.highNesin[this.highNesinUpdateIdx].unit = this.highNesinUpdateUnit;
		  this.highNesin[this.highNesinUpdateIdx].update = true;
		  
		  ftHN.rows.update(this.highNesinUpdateIdx, param);
		  $("#highNesinUpdateModal").modal('hide');
	  },
	  okHighNesin: function(){
		  
		  if(this.highNesin.length == 0){
			  swal("입력 항목 오류", "등록된 성적이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.idx = this.scoreIdx;
		  param.highNesin = this.highNesin;
		  
		  axios.patch('/api/score/high/nesin', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  location.href='/app/score?studentIdx='+ scoreUpdateHnesinRoot.studentIdx + '&mode=' + scoreUpdateHnesinRoot.mode;
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
		  
		  
		  
	  },
	  checkSubject: function(subjectName){
		  for(var i = 0; i<scoreUpdateHnesinRoot.highNesin.length; i++){
			  if(scoreUpdateHnesinRoot.highNesin[i].name == subjectName){
				  return true;
			  }
		  }
		  return false;
	  },
	  deleteScore: function(){
		  swal({
			  title: "삭제 확인",
			  text: "해당 성적 정보를 모두 삭제하시겠습니까?",
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
					axios.delete('/api/score/' + scoreUpdateHnesinRoot.scoreIdx)
					  .then(function(resp){
						  swal(resp.data.swal).then(function(){
							  location.href='/app/score?studentIdx='+ scoreUpdateHnesinRoot.studentIdx + '&mode=' + scoreUpdateHnesinRoot.mode;
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

var scoreUpdateHnesinRoot = scoreUpdateHnesinVue.$root;
