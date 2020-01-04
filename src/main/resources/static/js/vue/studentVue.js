var studentVue = new Vue({
  el: '#studentVue',
  data: {
	doubleSubmitFlag: false,
	isInit: true,
    name: '',
    status: null,
    school: '',
    grade: 0,
    className: '',
    hrt: '',
    classMode: 0,
    phoneMode: 0,
    allCount: 0,
    standbyCount: 0,
    nowCount: 0,
    deletedCount: 0,
    breakCount: 0,
    schools: ['미입력'],
    hrts: ['미정'],
    classNames:['미배정'],
    classNomal:[],
    classTest:[],
    students: [],
    isMePhone: true,
    isNomalClass: true,
    backClassName: '',
    searched: false,
    print:{
    	name: '',
    	status: null,
    	school: '',
    	grade: '',
    	className: '',
    	hrt: ''
    }
  },
  computed: {
	  isActive: function() {
		  return {
			  all: this.status == null,
			  standby: this.status == 0,
			  now: this.status == 1,
			  deleted: this.status == 2,
			  breaks: this.status == 3
		  }
	  }  
  },
  created: function(){

	  axios.get('/api/student', {
		  params:{
			  name: this.name,
			  status: this.status,
			  school: this.school,
			  grade: this.grade,
			  className: this.className,
			  hrt: this.hrt
		  }})
      .then(function(resp){
    	  studentRoot.allCount = resp.data.allCount;
    	  studentRoot.standbyCount = resp.data.standbyCount;
    	  studentRoot.nowCount = resp.data.nowCount;
    	  studentRoot.deletedCount = resp.data.deletedCount;
    	  studentRoot.breakCount = resp.data.breakCount;
    	  
    	  for(var i=0; i<resp.data.students.length; i++){
    		  var item = resp.data.students[i];

    		  if(jQuery.inArray(item.school, studentRoot.schools) === -1 && item.school != null){
    			studentRoot.schools.push(item.school);
    			  
    		  }
    		  
    		  if(jQuery.inArray(item.hrtName, studentRoot.hrts) === -1 && item.hrtName != null){
    			  studentRoot.hrts.push(item.hrtName);
    			  
    		  }
    		  
    		  if(jQuery.inArray(item.classNomal, studentRoot.classNomal) === -1 && item.classNomal != null){
    			  studentRoot.classNomal.push(item.classNomal);
    			  
    		  }
    		  
    		  if(jQuery.inArray(item.classTest, studentRoot.classTest) === -1 && item.classTest != null){
    			  studentRoot.classTest.push(item.classTest);
    			  
    		  }

    	  }

    	  
    	  
    	  studentRoot.school = $('#schoolParam').val();
    	  studentRoot.grade = $('#gradeParam').val() == '' ? 0 : $('#gradeParam').val();
    	  studentRoot.className = $('#classNameParam').val();
    	  studentRoot.hrt = $('#hrtParam').val();
    	  studentRoot.test = $('#testParam').val();
    	  studentRoot.status = $('#statusParam').val();
    	  
    	  if(studentRoot.test == 1){
    		  studentRoot.isNomalClass = false;
    			if(!$('#testClass').prop('checked')){
    				$('#testClass').trigger('click');
    			}
    	  }
    	  
    	  if(studentRoot.school != ''){
    		  
    		  $("#studentList").on('ready.ft.table', function(){
	    		  $("#loadingBar").css('display', 'none');
	    		  studentRoot.isInit = false;
	    		  studentRoot.schoolFilter(studentRoot.school);
        	  });
    	  }else if(studentRoot.className != ''){
    		  $("#studentList").on('ready.ft.table', function(){
	    		  $("#loadingBar").css('display', 'none');
	    		  studentRoot.isInit = false;
	    		  studentRoot.classFilter(studentRoot.className);
        	  });
    		  
    	  }else if(studentRoot.hrt != ''){
    		  $("#studentList").on('ready.ft.table', function(){
	    		  $("#loadingBar").css('display', 'none');
	    		  studentRoot.isInit = false;
	    		  studentRoot.hrtFilter(studentRoot.hrt);
        	  });
    		  
    	  }else if(studentRoot.status != ''){
    		  $("#studentList").on('ready.ft.table', function(){
	    		  $("#loadingBar").css('display', 'none');
	    		  studentRoot.isInit = false;
	    		  studentRoot.statusFilter(studentRoot.status);
        	  });
    		  
    	  }else{
    		  studentRoot.statusUpdate(null);
    	  }
    	  
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  methods: {
	  refresh: function(reset, backClassName){

		  if(reset){
			  this.school = '';
			  this.grade = 0;
			  this.name = '';
			  this.className = '';
			  this.hrt = '';
		  }
		  
		  if(this.status == 4){
			  this.status = null;
		  }
		  
		  axios.get('/api/student', {
			  params:{
				  name: this.name,
				  status: this.status,
				  school: this.school,
				  grade: this.grade,
				  className: this.className,
				  hrt: this.hrt
			  }})
	      .then(function(resp){
	    	  
	    	  $("#first-helper").css('display', 'none');
	    	  studentRoot.allCount = resp.data.allCount;
	    	  studentRoot.standbyCount = resp.data.standbyCount;
	    	  studentRoot.nowCount = resp.data.nowCount;
	    	  studentRoot.deletedCount = resp.data.deletedCount;
	    	  studentRoot.breakCount = resp.data.breakCount;
	    	  
	    	  for(var i=0; i<resp.data.students.length; i++){
	    		  var item = resp.data.students[i];
	    		  if(item.status == 0){
	    			  item.status = '<span class="text-success">입학예정</span>';
	    		  }else if(item.status == 1){
	    			  item.status = '<span class="text-primary">재원</span>';
	    		  }else if(item.status == 2){
	    			  item.status = '<span class="text-danger">결원</span>';
	    		  }else if(item.status == 3){
	    			  item.status = '<span class="text-warning">휴원</span>';
	    		  }
	    		  
	    		  item.school = item.school == '미입력' ? '<span class="text-danger">미입력</span>' : item.school;
	    		  
	    		  item.address = item.addressApi + ' ' + item.addressInput;
	    		  
	    		  if(studentRoot.isNomalClass){
	    			  item.className = '<span class="nomalClass">' + (item.classNomal === null ? '<span class="text-danger">미배정</span>' : item.classNomal) + '</span>' + '<span class="testClass hidden">' + (item.classTest === null ? '<span class="text-danger">미배정</span>' : '<span class="text-primary">' + item.classTest + '</span>') + '</span>';
	    		  } else {
	    			  item.className = '<span class="nomalClass hidden">' + (item.classNomal === null ? '<span class="text-danger">미배정</span>' : item.classNomal) + '</span>' + '<span class="testClass">' + (item.classTest === null ? '<span class="text-danger">미배정</span>' : '<span class="text-primary">' + item.classTest + '</span>') + '</span>';
	    		  }

	    		  item.hrtName = item.hrtName == null ? '<span class="text-danger">미정</span>' : ('<span>' + item.hrtName + '</span>');
	    		  
	    		  if(studentRoot.isMePhone){
	    			  item.phone = '<a class="mePhone" href="tel:' + item.phone + '">' + item.phone + '</a>' + '<a class="parentPhone text-parent hidden" href="tel:' + item.parentPhone + '">' + item.parentPhone + '</a>';
	    		  }else{
	    			  item.phone = '<a class="mePhone hidden" href="tel:' + item.phone + '">' + item.phone + '</a>' + '<a class="parentPhone text-parent" href="tel:' + item.parentPhone + '">' + item.parentPhone + '</a>';
	    		  }
	    		  
	    		  item.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="studentRoot.gotoStudentMore(' + item.idx + ')"></i>';
	    	  }

	    	  if(studentRoot.isInit){
	    		  $("#studentList").on('ready.ft.table', function(){
		    		  $("#loadingBar").css('display', 'none');
		    		  studentRoot.isInit = false;
			    	  ft.rows.load(resp.data.students);
	        	  });
	    	  }else{
	    		  ft.rows.load(resp.data.students);
	    	  }
	    	  
	    	  
	    	  
	    	  if(backClassName){
	    		  $("#classNames").val(studentRoot.backClassName);
	    	  }else{
	    		  this.backClassName = '';
	    	  }

	    	  studentRoot.print.name = studentRoot.name;
	    	  studentRoot.print.status = studentRoot.status;
	    	  studentRoot.print.school = studentRoot.school;
	    	  studentRoot.print.grade = studentRoot.grade;
	    	  studentRoot.print.className = studentRoot.className;
	    	  studentRoot.print.hrt = studentRoot.hrt;
	    	  studentRoot.searched = true;
	    	  setTimeout(function() {studentRoot.doubleSubmitFlag = false;}, 1000);
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	    	  studentRoot.doubleSubmitFlag = false;
	      })
	  },
	phoneToggle: function(){
		if(this.phoneMode == 0){
			$('.mePhone').css('display', 'inherit');
			$('.parentPhone').css('display', 'none');
			this.phoneMode = 1;
		}else{
			$('.parentPhone').css('display', 'inherit');
			$('.mePhone').css('display', 'none');
			this.phoneMode = 0;
		}
	},
	classToggle: function(){
		if(this.phoneMode == 0){
			$('.nomalClass').css('display', 'inherit');
			$('.testClass').css('display', 'none');
			this.phoneMode = 1;
		}else{
			$('.testClass').css('display', 'inherit');
			$('.nomalClass').css('display', 'none');
			this.phoneMode = 0;
		}
	},
	statusUpdate: function(data){
		if(this.doubleSubmitCheck()) return;
		this.status = data;
		this.refresh(true);
	},
	schoolFilter: function(query){
		if($("#schools").val() == null && !query){
			swal("입력 항목 오류","학교를 선택해 주세요.","error");
			return;
		}else if($("#grade").val() == null && $("#schools").val() != '미입력' && !query){
			swal("입력 항목 오류","학년을 선택해 주세요.","error");
			return;
		}
		
		if(this.doubleSubmitCheck()) return;
		
		this.name = '';
		this.className = '';
		$("#classNames").val(null).trigger("change");
		this.hrt = '';
		$("#hrts").val(null).trigger("change");
		this.selectReset();
		this.refresh();
	},
	hrtFilter: function(query){
		
		if($("#hrts").val() == null && !query){
			swal("입력 항목 오류","담임을 선택해 주세요.","error");
			return;
		}
		
		if(this.doubleSubmitCheck()) return;
		this.school = '';
		this.grade = 0;
		$("#schools").val(null).trigger("change");
		$("#grade").val(null).trigger("change");
		this.name = '';
		this.className = '';
		$("#classNames").val(null).trigger("change");
		this.selectReset();
		this.refresh();
	},
	statusFilter: function(status){
		
		if(this.doubleSubmitCheck()) return;
		this.school = '';
		this.grade = 0;
		$("#schools").val(null).trigger("change");
		$("#grade").val(null).trigger("change");
		this.name = '';
		this.className = '';
		$("#classNames").val(null).trigger("change");
		this.hrt = '';
		$("#hrts").val(null).trigger("change");
		this.selectReset();
		this.refresh();
	},
	classFilter: function(){
		
		if($("#classNames").val() == null){
			swal("입력 항목 오류","반을 선택해 주세요.","error");
			return;
		}
		
		if(this.doubleSubmitCheck()) return;
		if($("#classNames").val() == '미배정일' || $("#classNames").val() == '미배정시'){
			this.className='미배정';
		}
		this.backClassName=$("#classNames").val();
		this.hrt = '';
		this.school = '';
		this.grade = 0;
		this.name = '';
		$("#schools").val(null).trigger("change");
		$("#grade").val(null).trigger("change");
		$("#hrts").val(null).trigger("change");
		this.selectReset();
		this.refresh(false, true);
	},
	doubleSubmitCheck: function(){
	    if(this.doubleSubmitFlag){
	        return this.doubleSubmitFlag;
	    }else{
	        this.doubleSubmitFlag = true;
	        return false;
	    }
	},
	selectReset: function(){
		
		$("#schools").select2("destroy");
		$("#grade").select2("destroy");
		$("#hrts").select2("destroy");
		$("#classNames").select2("destroy");
		
		$("#schools").unbind();
		$("#grade").unbind();
		$("#hrts").unbind();
		$("#classNames").unbind();
		
		$("#schools").select2({
			placeholder: "학교",
		    allowClear: true,
		    width: 160
		}).on('select2:select', function (e) {
			var data = e.params.data.id;
			studentRoot.school = data;
		});

		$("#grade").select2({
			minimumResultsForSearch: -1,
			placeholder: "학년",
		    allowClear: true,
		    width: 100
		}).on('select2:select', function (e) {
			var data = e.params.data.id;
			studentRoot.grade = data;
		});

		$("#hrts").select2({
			placeholder: "담임",
		    allowClear: true,
			width: 160
		}).on('select2:select', function (e) {
			var data = e.params.data.id;
			studentRoot.hrt = data;
		});

		$("#classNames").select2({
			placeholder: "반",
		    allowClear: true,
			width: 160
		}).on('select2:select', function (e) {
			var data = e.params.data.id;
			studentRoot.className = data;
		});
	},
	printExcel: function(){
		 axios({
			  url: '/api/student/excel',
			  method: 'GET',
			  responseType: 'blob',
			  params:{
				  name: this.print.name,
				  status: this.print.status,
				  school: this.print.school,
				  grade: this.print.grade,
				  className: this.print.className,
				  hrt: this.print.hrt
			  }})
	      .then(function(resp){
		       var url = window.URL.createObjectURL(new Blob([resp.data]));
		       var fileName = '학생명부_' + new Date().format('yyyyMMddHHmmss') + '.xls'
	    	   var link = document.createElement('a');
	    	   link.href = url;
	    	   link.setAttribute('download', fileName);
	    	   document.body.appendChild(link);
	    	   link.click();
	    	  
	    	  setTimeout(function() {studentRoot.doubleSubmitFlag = false;}, 1000);
	    	  swal("엑셀 변환 완료", "현재 학생명부가 엑셀로 출력되었습니다.","success");
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal("파일 출력 오류", "파일 출력에 오류가 발생하였습니다.", "error");
	    	  }
	    	  studentRoot.doubleSubmitFlag = false;
	      })
	},
	printList: function(){
		$("#studentList").printThis();
	},
	gotoStudentMore: function(idx){
		location.href='/app/student/' + idx;
	}
  }
})

var studentRoot = studentVue.$root;