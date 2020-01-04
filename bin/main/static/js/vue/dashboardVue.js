var dashbaordVue = new Vue({
  el: '#dashbaordVue',
  data: {
	  today: null,
	  userName:null,
	  user: null,
	  role: null,
	  roleName: '',
	  notice: [],
	  start: '',
	  startStudent: '',
	  end: '',
	  endStduent: '',
	  studentCount: 0,
	  teacherCount: 0,
	  todayCounse: 0,
	  monthCounse: 0,
	  accessCount: 0,
	  notification: [],
	  studentLatest: [],
  },
  created: function(){
	  this.today = new Date().format("yyyy.MM.dd HH:mm:ss");
	  this.userName = $("#userName").val();
	  this.user = $("#user").val();
	  this.role = $("#role").val();
	  this.monthCal();
	  this.monthCalZero(new Date().getFullYear(), new Date().getMonth()+1);
	  this.studentListRead();
	  this.teacherListRead(); 
	  this.studentLatestRead();
	  
	  this.noticeRead();
	  if(this.role == 0){
		  this.roleName = '선생님';
	  }else if(this.role == 1){
		  this.roleName = '선생님';
	  }else if(this.role == 2){
		  this.roleName = '팀장님';
	  }else if(this.role == 3){
		  this.roleName = '실장님';
	  }else if(this.role == 4){
		  this.roleName = '원장님';
	  }else if(this.role == 5){
		  this.roleName = '님';
	  }
  },
  methods: {
	  studentMore: function(){
		  location.href='/app/student/list?hrt=' + this.userName;
	  },
	  studentLatestRead: function(){
		  axios.get('/api/student/latest', {
			  params:{
				  start: this.startStudent,
		  		  end: this.endStudent
			  }})
	      .then(function(resp){
	    	  
	    	  for(var i=0; i<resp.data.length; i++){
	    		  var node = resp.data[i];
	    		  if(node.status == 0){
	    			  node.status = '<span class="text-success">입학예정</span>';
	    		  }else if(node.status == 1){
	    			  node.status = '<span class="text-primary">재원</span>';
	    		  }else if(node.status == 2){
	    			  node.status = '<span class="text-danger">결원</span>';
	    		  }else if(node.status == 3){
	    			  node.status = '<span class="text-warning">휴원</span>';
	    		  }
	    		  
	    		  node.classNomal = node.classNomal === null ? '<span class="text-danger">미배정</span>' : '<span>' + node.classNomal + '</span>';
	    		  
	    		  node.classTest = node.classTest === null ? '<span class="text-danger">미배정</span>' : '<span>' + node.classTest + '</span>';
	    		  
	    		  node.address = node.addressApi + ' ' + node.addressInput;

	    		  node.hrtName = node.hrtName == null ? '<span class="text-danger">미정</span>' : ('<span>' + node.hrtName + '</span>');
	    		  
	    		  node.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="studentRoot.gotoStudentMore(' + node.idx + ')"></i>';
	    	  }
	    	  
	    	  dashbaordRoot.studentLatest = resp.data;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	    	  
	      })
	  },
	  gotoStudentMore: function(idx){
			location.href='/app/student/' + idx;
	  },
	  studentListRead: function(){
		  axios.get('/api/student', {
			  params:{
				  name: '',
				  status: 1,
				  school: '',
				  grade: 0,
				  className: '',
				  hrt: this.userName
			  }})
	      .then(function(resp){
	    	  dashbaordRoot.studentCount = resp.data.nowCount;
	    	  for(var i=0; i<resp.data.students.length; i++){
	    		  var node = resp.data.students[i];
	    		  if(node.status == 0){
	    			  node.status = '<span class="text-success">입학예정</span>';
	    		  }else if(node.status == 1){
	    			  node.status = '<span class="text-primary">재원</span>';
	    		  }else if(node.status == 2){
	    			  node.status = '<span class="text-danger">결원</span>';
	    		  }else if(node.status == 3){
	    			  node.status = '<span class="text-warning">휴원</span>';
	    		  }
	    		  
	    		  node.school = node.school == '미입력' ? '<span class="text-danger">미입력</span>' : node.school;
	    		  
	    		  node.address = node.addressApi + ' ' + node.addressInput;
	    		  node.classNomal = '<span class="nomalClass">' + (node.classNomal === null ? '<span class="text-danger">미배정</span>' : node.classNomal) + '</span>' + '<span class="testClass hidden">' + (node.classTest === null ? '<span class="text-danger">미배정</span>' : '<span class="text-primary">' + node.classTest + '</span>') + '</span>';
	    		  node.classTest = '<span class="nomalClass hidden">' + (node.classNomal === null ? '<span class="text-danger">미배정</span>' : node.classNomal) + '</span>' + '<span class="testClass">' + (node.classTest === null ? '<span class="text-danger">미배정</span>' : '<span class="text-primary">' + node.classTest + '</span>') + '</span>';

	    		  node.hrtName = node.hrtName == null ? '<span class="text-danger">미정</span>' : ('<span>' + node.hrtName + '</span>');
	    		  
	    		  node.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="dashbaordRoot.gotoStudentMore(' + node.idx + ')"></i>';
	    	  }
	    	  
	    	  $("#studentList").on('ready.ft.table', function(){
	    		  $("#loadingBar1").css('display', 'none');
	    		  ft.rows.load(resp.data.students);
	    	  });
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	    	  
	      })
	  },
	  teacherListRead: function(){
		  axios.get('/api/teacher', {
			  params:{
				  start: this.start,
		  		  end: this.end
			  }
		  })
	      .then(function(resp){    	  
	    	  dashbaordRoot.teacherCount = resp.data.length;
	    	  var sumDayCounse = 0;
	    	  var sumMonthCounse = 0;
	    	  var sumHrtCount = 0;
	    	  var sumAccessCount = 0;
	    	  var imsi = new Date();
	    	  var todayDate = new Date(imsi.setHours(0, 0, 0));
	    	  for(var i=0; i<resp.data.length; i++){
	    		  var node = resp.data[i];
	    		  sumDayCounse += (node.counseCount >= 1 ? 1 : 0);
	    		  sumMonthCounse += node.monthCount;
	    		  sumHrtCount += node.hrtCount;
	    		  if(todayDate <= new Date(node.accessLastDate)){
	    			  sumAccessCount += 1;
	    		  }
	    		  
	    		  node.counseCount = node.counseCount == 0 ? '<i class="text-danger icon wb-close"></i>' : '<span class="text-success">' + node.counseCount + '</span>'
	    		  node.work = '<i class="icon wb-zoom-in link" onclick="location.href=\'/app/data/counse/detail?email=' + node.email + '&year=' + dashbaordRoot.end.substring(0,4) + '&month=' + dashbaordRoot.end.substring(5,7) + '\'"></i>'
	    		  node.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="dashbaordRoot.gotoStudentList(\'' + node.name + '\')"></i>';
	    		  var percent = parseInt((node.monthCount / node.hrtCount)*100);
	    		  var str = '';
	  	    	  if(isNaN(percent)){
	  	    		percent = 0;
	  	    	  }
	  	    	  
	  	    	  if(percent >= 0 && percent < 30){
	  	    		  str = '<span class="text-danger">' + percent + '%</span>';
	  	    	  }else if(percent >= 30 && percent < 50){
	  	    		  str = '<span class="text-warning">' + percent + '%</span>';
	  	    	  }else if(percent >=50 && percent < 80){
	  	    		  str = '<span class="text-info">' + percent + '%</span>';
	  	    	  }else if(percent >=80 && percent < 100){
	  	    		str = '<span class="text-primary">' + percent + '%</span>';
	  	    	  }else{
	  	    		str = '<span class="text-success">' + percent + '%</span>';
	  	    	  }
	  	    	  
	    		  node.month = str;

	    	  }

	    	   dashbaordRoot.todayCounse = parseInt(sumDayCounse/resp.data.length*100);
		    	if(isNaN(dashbaordRoot.todayCounse)){
		    		dashbaordRoot.todayCounse = 0;
		    	}
	    		$("#todayCounse").css('width', dashbaordRoot.todayCounse + '%');
	    	  
	    		dashbaordRoot.monthCounse = parseInt(sumMonthCounse/sumHrtCount*100);
		    	if(isNaN(dashbaordRoot.monthCounse)){
		    		dashbaordRoot.monthCounse = 0;
		    	}
	    		$("#monthCounse").css('width', dashbaordRoot.monthCounse + '%');
	    		
	    		dashbaordRoot.accessCount = parseInt(sumAccessCount/dashbaordRoot.teacherCount*100);
		    	if(isNaN(dashbaordRoot.accessCount)){
		    		dashbaordRoot.accessCount = 0;
		    	}
	    		$("#accessCount").css('width', dashbaordRoot.accessCount + '%');
	    		
	    	  $("#teacherList").on('ready.ft.table', function(){
	    		  $("#loadingBar2").css('display', 'none');
	    		  ftTl.rows.load(resp.data);
	    	  });

	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  noticeRead: function(){
		  axios.get('/api/board/latest', {
			  params:{
				  roleCode: this.role
			  }})
	      .then(function(resp){
	    	  dashbaordRoot.notice = resp.data;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	    	  
	      })
	  },
	  gotoStudentMore: function(idx){
			location.href='/app/student/' + idx;
	  },
	  gotoTeacherMore: function(idx){
			location.href='/app/teacher/list';
	  },
	  gotoNoticeDetail: function(idx){
			location.href='/app/notice/' + idx;
	  },
	  gotoStudentList: function(name){
		  location.href='/app/student/list?hrt=' + name;
	  },
	  monthCal: function(){
		  var dateObj = new Date();
		  
		  var year = dateObj.getFullYear();
		  var day = dateObj.getDate();
		  var month = dateObj.getMonth()+1;

		  if(day >= 25){
			  month += 1;
		  }
		  
		  if(month == 1){
			  this.start = (year - 1) + '-' + '12-25';
			  this.end = year + '-' + '01-24';
		  }else if(month > 12){
			  this.start = year + '-' + (month-1 < 10 ? '0' + (month-1) : month-1) + '-25';
			  this.end = year+1 + '-' + '01-24';
		  }else{
			  this.start = year + '-' + (month-1 < 10 ? '0' + (month-1) : month-1) + '-25';
			  this.end = year + '-' + (month < 10 ? '0' + month : month) + '-24';
		  }
	  },
	  monthCalZero: function(year, month){
		  if(month == 12){
			  this.startStudent = year + '-' + '12-01';
			  this.endStudent = (year + 1) + '-' + '01-01';
		  }else{
			  this.startStudent = year + '-' + (month < 10 ? '0' + month : month) + '-01';
			  this.endStudent = year + '-' + (month+1 < 10 ? '0' + (month+1) : month+1) + '-01';
		  }
	  }
  }
})

var dashbaordRoot = dashbaordVue.$root;