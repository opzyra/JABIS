var scoreUpdateMnesinVue = new Vue({
  el: '#scoreUpdateMnesinVue',
  data: {
	  mode: 0,
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
	  middleNesin:[],
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
	  var scoreBind = $('.score-bind');
	  for(var i = 0; i<scoreBind.length; i++){
	  	$(scoreBind[i]).attr('value', scoreBind[i].value);
	  }
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
    	  scoreUpdateMnesinRoot.name = resp.data.name;
    	  scoreUpdateMnesinRoot.school = resp.data.school;
    	  scoreUpdateMnesinRoot.grade = resp.data.grade;
    	  scoreUpdateMnesinRoot.gradeCode = resp.data.gradeCode;
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
    	  scoreUpdateMnesinRoot.year = resp.data.year;
    	  scoreUpdateMnesinRoot.type = resp.data.type;
    	  $("#type").val(resp.data.type).trigger('change');
    	  
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal)
    		  .then(function(){
    			  history.back();
    		  });
    	  }
      });
	  
	  axios.get('/api/score/middle/nesin/' + this.scoreIdx)
      .then(function(resp){
    	  for(var i = 0; i<resp.data.length; i++){
    		  resp.data[i].text = resp.data[i].name;
    		  resp.data[i].updated = false;
    	  }
    	  scoreUpdateMnesinRoot.middleNesin = resp.data;
    	  
    	  
    	  
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
	  updateMiddleNesin: function(){
		  
		  if(this.type == null){
			  swal("입력 항목 오류", "분류를 선택해주세요.", "error");
			  return;
		  }
		  
		  if($.inArray(false, this.validation) != -1){
			  swal("입력 항목 오류", "입력하지 않은 항목이 있습니다.", "error");
			  return;
		  }
		  
		  if(!this.updated){
			  swal("입력 항목 오류", "변동사항이 없습니다.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.studentIdx = this.studentIdx;
		  param.mode = this.mode;
		  param.year = this.year;
		  param.type = this.type;
		  param.middleNesin = this.middleNesin;
		  
		  axios.patch('/api/score/middle/nesin', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal)
	    	  .then(function(){
	    		  location.href='/app/score?studentIdx='+ scoreUpdateMnesinRoot.studentIdx  + '&mode=' + scoreUpdateMnesinRoot.mode;
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  deleteMiddleNesin: function(){
		  
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
					axios.delete('/api/score/' + scoreUpdateMnesinRoot.scoreIdx)
					  .then(function(resp){
						  swal(resp.data.swal).then(function(){
							  location.href='/app/score?studentIdx='+ scoreUpdateMnesinRoot.studentIdx  + '&mode=' + scoreUpdateMnesinRoot.mode;
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

var scoreUpdateMnesinRoot = scoreUpdateMnesinVue.$root;
