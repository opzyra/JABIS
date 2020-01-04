var scoreUpdateMoiVue = new Vue({
  el: '#scoreUpdateMoiVue',
  data: {
	  mode: 2,
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
	  highMoiSubject: '',
	  highMoiSubjectName: '',
	  highMoiScore: '',
	  highMoiRating: '',
	  highMoiUnit: '',
	  highMoi:[],
	  highMoiOrigin: [],
	  highMoiUpdateIdx: 0,
	  highMoiUpdateSubject: '',
	  highMoiUpdateSubjectName: '',
	  highMoiUpdateScore: '',
	  highMoiUpdateRating: '',
	  highMoiUpdateUnit: '',
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
	  this.typeList = this.typeListSet[1];
	  
	  axios.get('/api/student/' + this.studentIdx)
      .then(function(resp){
    	  scoreUpdateMoiRoot.name = resp.data.name;
    	  scoreUpdateMoiRoot.school = resp.data.school;
    	  scoreUpdateMoiRoot.grade = resp.data.grade;
    	  scoreUpdateMoiRoot.gradeCode = resp.data.gradeCode;
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
    	  scoreUpdateMoiRoot.year = resp.data.year;
    	  scoreUpdateMoiRoot.type = resp.data.type;
    	  scoreUpdateMoiRoot.mode = resp.data.mode;
    	  $("#type").val(resp.data.type).trigger('change');
    	  
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal)
    		  .then(function(){
    			  history.back();
    		  });
    	  }
      });
	  
	  axios.get('/api/score/high/moi/' + this.scoreIdx)
      .then(function(resp){
    	  var data = []
    	  for(var i = 0; i<resp.data.length; i++){
    		  resp.data[i].status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateMoiRoot.updateHighMoiModal('+ i + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateMoiRoot.deleteHighMoi(' + i + ', this, ' + resp.data[i].scoreIdx + ', ' + resp.data[i].subjectCode + ')"></i>'
    		  resp.data[i].newScore = false;
    		  resp.data[i].update = false;
    		  data.push(resp.data[i]);
    	  }
    	  
    	  scoreUpdateMoiRoot.highMoi = resp.data;
    	  scoreUpdateMoiRoot.highMoiOrigin = data;

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
	  	openHighMoiModal: function(){
		  
		  axios.get('/api/subject/all')
	      .then(function(resp){
	    	  scoreUpdateMoiRoot.subjectList = resp.data;
	    	  
	    	  scoreUpdateMoiRoot.highMoiSubject = '';
	    	  scoreUpdateMoiRoot.highMoiSubjectName = '';
	    	  scoreUpdateMoiRoot.highMoiScore = '';
	    	  scoreUpdateMoiRoot.highMoiRating =  '';
	    	  
	    	  $("#subjectCode").val(null).trigger('change');
	    	  $("#subjectCode").select2('destroy');
			  $("#subjectCode").unbind();
	    	  
	    	  $("#subjectCode").select2({
	    			placeholder: "과목",
	    			minimumResultsForSearch: -1
	    		}).on('select2:select', function (e) {
	    			scoreUpdateMoiRoot.highMoiSubject = e.params.data.id;
	    			scoreUpdateMoiRoot.highMoiSubjectName = e.params.data.text;
	    		}).on('select2:open', function (e) {
	    			  $(".select2-container--open").addClass('modal-select2');
	    		});;
	    	  
	    	  
	    	  $("#highMoiModal").modal('show');
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal)
	    		  .then(function(){
	    			  history.back();
	    		  });
	    	  }
	      });
	  },
	  addHighMoi: function(){
		  
		  if(this.highMoiSubject === ''){
			  swal("입력 항목 오류", "과목을 선택해주세요.", "error");
			  return;
		  }else if(this.checkSubject(this.highMoiSubjectName)){
			  //과목 중복 체크
			  swal("입력 항목 오류", "동일한 교과목이 이미 있습니다.", "error");
			  return;
		  }else if(this.highMoiScore === ''){
			  swal("입력 항목 오류", "원점수을 입력해주세요.", "error");
			  return;
		  }else if(this.highMoiRating === ''){
			  swal("입력 항목 오류", "등급을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  
		  
		  param.status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateMoiRoot.updateHighMoiModal(' + this.highMoi.length + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateMoiRoot.deleteHighMoi(' + this.highMoi.length + ', this)"></i>';
		  param.name = this.highMoiSubjectName;
		  param.score = this.highMoiScore;
		  param.rating = this.highMoiRating;
		  param.unit = this.highMoiUnit;
		  param.subjectCode = this.highMoiSubject;
		  param.scoreIdx =  this.scoreIdx;
		  param.newScore = true;
		  param.update = false;
		  
		  this.highMoi.push(param);
		  
		  ftHN.rows.add(param);
		  $("#highMoiModal").modal('hide');
	  },
	  deleteHighMoi: function(idx, obj, scoreIdx, subjectIdx){
          
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
						axios.delete('/api/score/high/moi/' + scoreIdx + '/' + subjectIdx)
						  .then(function(resp){
							  swal(resp.data.swal).then(function(){
								  scoreUpdateMoiRoot.highMoi.splice(idx,1);
								  ftHN.rows.delete(idx);
				    		  });
						  }).catch(function(error){
					    	  if(error.response != undefined){
					    		  swal(error.response.data.swal);
					    	  }
					      });
						
						
						  
					  }else{
						  //사용자가 추가한 데이터를 삭제하는 경우
						  scoreUpdateMoiRoot.highMoi.splice(idx,1);
						  ftHN.rows.delete(idx);
					  }
					
					
				}
			});
	  },
	  updateHighMoiModal: function(idx, obj){
		  
		  this.highMoiUpdateIdx = idx;
    	  this.highMoiUpdateSubject = this.highMoi[idx].subjectCode;
    	  this.highMoiUpdateSubjectName = this.highMoi[idx].name;
    	  this.highMoiUpdateScore = this.highMoi[idx].score;
    	  this.highMoiUpdateRating = this.highMoi[idx].rating;
		  
    	  $("#highMoiUpdateSubjectName").val(this.highMoiUpdateSubjectName);
    	  
		  $('#highMoiUpdateModal').modal('show');  

		  
	  },
	  updateHighMoi: function(){
		  
		  if(this.highMoiUpdateScore === ''){
			  swal("입력 항목 오류", "원점수을 입력해주세요.", "error");
			  return;
		  }else if(this.highMoiUpdateRating === ''){
			  swal("입력 항목 오류", "등급을 입력해주세요.", "error");
			  return;
		  }
		  
		  var param = {};

		  param.status = '<i class="icon wb-edit m-r-10 link" onclick="scoreUpdateMoiRoot.updateHighMoiModal(' + this.highMoiUpdateIdx + ', this)"></i><i class="icon wb-trash link" onclick="scoreUpdateMoiRoot.deleteHighMoi(' + this.highMoiUpdateIdx + ', this)"></i>';
		  param.name = this.highMoiUpdateSubjectName;
		  param.score = this.highMoiUpdateScore;
		  param.rating = this.highMoiUpdateRating;
		  param.subjectCode = this.highMoiUpdateSubject;
		  
		  this.highMoi[this.highMoiUpdateIdx].score = this.highMoiUpdateScore;
		  this.highMoi[this.highMoiUpdateIdx].rating = this.highMoiUpdateRating;
		  this.highMoi[this.highMoiUpdateIdx].update = true;
		  
		  ftHN.rows.update(this.highMoiUpdateIdx, param);
		  $("#highMoiUpdateModal").modal('hide');
	  },
	  okHighMoi: function(){
		  
		  if(this.highMoi.length == 0){
			  swal("입력 항목 오류", "등록된 성적이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.idx = this.scoreIdx;
		  param.highMoi = this.highMoi;
		  
		  axios.patch('/api/score/high/moi', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  location.href='/app/score?studentIdx='+ scoreUpdateMoiRoot.studentIdx + '&mode=' + scoreUpdateMoiRoot.mode;
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
		  
		  
		  
	  },
	  checkSubject: function(subjectName){
		  for(var i = 0; i<scoreUpdateMoiRoot.highMoi.length; i++){
			  if(scoreUpdateMoiRoot.highMoi[i].name == subjectName){
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
					axios.delete('/api/score/' + scoreUpdateMoiRoot.scoreIdx)
					  .then(function(resp){
						  swal(resp.data.swal).then(function(){
							  location.href='/app/score?studentIdx='+ scoreUpdateMoiRoot.studentIdx + '&mode=' + scoreUpdateMoiRoot.mode;
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

var scoreUpdateMoiRoot = scoreUpdateMoiVue.$root;
