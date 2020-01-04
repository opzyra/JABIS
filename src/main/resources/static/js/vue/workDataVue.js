var workVue = new Vue({
  el: '#workVue',
  data: {
	  category: 0,
	  user: '',
	  work: '',
	  avatar: '',
	  selectDate: new Date().format('yyyy-MM-dd'),
	  name: '',
	  roleName: '',
	  hrtCount: 0,
	  counseCount: 0,
	  studentCount: 0,
	  setMonthCount: 0,
	  percent: 0,
	  monthPercent: 0,
	  setCount: 0,
	  badge: 0,
	  year: 0,
	  month: 0,
	  day: 0,
	  monthParam: 0,
	  yearParam: 0,
	  toDay: null,
	  dateStr: (new Date().getMonth()+1) + '월',
	  dataMonth: [],
	  valueMonth:[],
	  counse: {
	    	idx: 0,
	    	name: '',
	    	studentIdx: 0,
	    	counseDate: null,
	    	writeDate: null,
	    	writeEmail: '',
	    	studyStule: '',
	    	studentStyle: '',
	    	future: '',
	    	parentStyle: '',
	    	parentRequest: '',
	    	studentCounse: '',
	    	parentCounse: '',
    },
    start: null,
    end: null,
  },
  updated: function(){
		// 아이콘 재설정
		LetterAvatar.transform();
	  },
  created: function(){
	this.work = $("#work").val();
	this.user = $("#user").val();
	this.monthParam = $("#monthParam").val();
	this.yearParam = $("#yearParam").val();
	
	this.toDay = new Date();
	this.toDay = new Date(this.toDay.setMonth(this.toDay.getMonth+1));
	
	if(this.yearParam != "" || this.yearParam != null){
		this.toDay = new Date(this.toDay.setYear(this.yearParam));
	}
	
	if(this.monthParam != "" || this.monthParam != null){
		this.toDay = new Date(this.toDay.setMonth(this.monthParam-1));
	}

	this.monthCal(this.toDay);
	axios.get('/api/work', {
		  params:{
			  email: this.work
		  }})
    .then(function(resp){
      workRoot.name = resp.data.name;
      workRoot.avatar = resp.data.avatar;
	  var roleStr = '';
	  if(resp.data.roleCode == 0){
		  roleStr = '담당 과목';
	  }else if(resp.data.roleCode == 1){
		  roleStr = '담임';
	  }else if(resp.data.roleCode == 2){
		  roleStr = '팀장';
	  }else if(resp.data.roleCode == 3){
		  roleStr = '실장';
	  }else if(resp.data.roleCode == 4){
		  roleStr = '원장';
	  }else if(resp.data.roleCode == 5){
		  roleStr = '관리자';
	  }else{
		  roleStr = '알수없음';
	  }
	  workRoot.roleName = roleStr;
	  workRoot.hrtCount = resp.data.hrtCount;
	  workRoot.counseCount = resp.data.counseCount;
	  workRoot.studentCount = resp.data.studentCount;

	  axios.get('/api/work/counse/month', {
		  params:{
			  email: workRoot.work,
			  start: workRoot.start,
			  end: workRoot.end
		  }})
	    .then(function(resp){   	
	    	
	    	workRoot.dataSetting();
	    	workRoot.valueMonth = [];
	    	for(var i = 0; i<workRoot.dataMonth.length; i++){
	    		workRoot.valueMonth.push(0);
	    	}
	    	
	    	for(var i = 0; i<resp.data.length; i++){
	    		var node = resp.data[i];
	    		
	    		node.detail = '<i class="icon fa-sign-out link" onclick="location.href=\'/app/counse/' + node.idx + '\'"></i>'
	    		if(node.writeOk){
	    			node.writeOk = '<i class="text-success icon wb-check"></i>'
	    			workRoot.setMonthCount = workRoot.setMonthCount + 1;
	    			node.write = '<i class="link icon wb-search" onclick="workRoot.openCounse(\'' + node.idx + '\', \'' + node.name + '\')"></i>';

	    		}else{
	    			
	    			node.writeOk = '<i class="text-danger icon wb-close"></i>';
	    			node.writeDate = '-';
	    			node.counseDate = '-';
	    			if(workRoot.user == workRoot.work){
	    				node.write = '<i class="link icon wb-pencil" onclick="location.href=\'/app/counse/create?studentIdx=' + node.idx + '&workDate=' + workRoot.selectDate + '\'"></i>'
	    			}else{
	    				node.write = '-';
	    			}
	    		}
	    		
	    		workRoot.valueSetting(node.writeDate.substr(8));
	    		
	    	}

	    	var option = {
	    		    title: {
	    		        text: '상담일지 현황',
	    		        textStyle: {
	    		        	fontSize: 14
	    		        }
	    		    },
	    		    color: ['#3e8ef7'],
	    		    tooltip : {
	    		        trigger: 'item',
	    		    },
	    		    grid: {
	    		        left: '3%',
	    		        right: '3%',
	    		        bottom: '3%',
	    		        containLabel: true
	    		    },
	    		    xAxis : [
	    		        {
	    		            type : 'category',
	    		            boundaryGap : false,
	    		            data : workRoot.dataMonth
	    		        }
	    		    ],
	    		    yAxis : [
	    		        {
	    		        	show: true,
	    		            type : 'value',
	    		            max: workRoot.hrtCount,
	    		            min: 0
	    		        }
	    		    ],
	    		    series : [
	    		        {
	    		            name:'작성',
	    		            type:'line',
	    		            areaStyle: {normal: {}},
	    		            data: workRoot.valueMonth
	    		        }
	    		    ]
	    		};

	    	myChart.setOption(option);
			myChart.resize();
	    	
	    	
	    	$("#counseMonthList").on('ready.ft.table', function(){
	    		$("#loadingBar").css('display', 'none');
    			ftMonth.rows.load(resp.data);
    			if(resp.data.length == 0){
					$("#panelHeight").height('auto');
				}else if(resp.data.length < 51){
					$("#panelHeight").height(resp.data.length * 45 + 50);
				}else{
					$("#panelHeight").height(50 * 45 + 50);
				}
      	  	});
	    	
	    	workRoot.percent = parseInt((workRoot.setMonthCount / workRoot.hrtCount)*100);
	    	if(isNaN(workRoot.percent)){
	    		workRoot.percent = 0;
	    	}
    		$("#percent").css('width', workRoot.percent + '%');
    		
    		workRoot.monthPercent = parseInt((workRoot.setMonthCount / workRoot.hrtCount)*100);
	    	if(isNaN(workRoot.monthPercent)){
	    		workRoot.monthPercent = 0;
	    	}
    		$("#monthPercent").css('width', workRoot.monthPercent + '%');
    		
    		
	    	
	    }).catch(function(error){
	  	  if(error.response != undefined){
	  		  swal(error.response.data.swal);
	  	  }
	    });
	  
	  
    }).catch(function(error){
  	  if(error.response != undefined){
  		  swal(error.response.data.swal);
  	  }
    });
	
  },
  methods: {
	  monthCal: function(date){
		  this.year = date.getFullYear();
		  this.day = date.getDate();
		  
		  if(this.day < 25){
			  this.month = date.getMonth()+1;  
		  }else{
			  this.month = date.getMonth()+2;
		  }
		  
		  if(this.month == 1){
			  this.start = (this.year - 1) + '-' + '12-25';
			  this.end = this.year + '-' + '01-24';
		  }else if(this.month > 12){
			  this.start = this.year + '-' + (this.month-1 < 10 ? '0' + (this.month-1) : this.month-1) + '-25';
			  this.end = this.year+1 + '-' + '01-24';
		  }else{
			  this.start = this.year + '-' + (this.month-1 < 10 ? '0' + (this.month-1) : this.month-1) + '-25';
			  this.end = this.year + '-' + (this.month < 10 ? '0' + this.month : this.month) + '-24';
		  }
	  },
	  selectMonthRequest: function(){
		  axios.get('/api/work/counse/month', {
			  params:{
				  email: workRoot.work,
				  start: workRoot.start,
				  end: workRoot.end
			  }})
		    .then(function(resp){
		    	
		    	workRoot.dataSetting();
		    	workRoot.valueMonth = [];
		    	workRoot.setMonthCount = 0;
		    	for(var i = 0; i<workRoot.dataMonth.length; i++){
		    		workRoot.valueMonth.push(0);
		    	}
		    	
		    	for(var i = 0; i<resp.data.length; i++){
		    		var node = resp.data[i];
		    		node.detail = '<i class="icon fa-sign-out link" onclick="location.href=\'/app/counse/' + node.idx + '\'"></i>'
		    		if(node.writeOk){
		    			node.writeOk = '<i class="text-success icon wb-check"></i>';
		    			workRoot.setMonthCount = workRoot.setMonthCount + 1;
		    			node.write = '<i class="link icon wb-search" onclick="workRoot.openCounse(\'' + node.idx + '\', \'' + node.name + '\')"></i>';

		    		}else{
		    			node.writeOk = '<i class="text-danger icon wb-close"></i>';
		    			node.writeDate = '-';
		    			node.counseDate = '-';
		    			if(workRoot.user == workRoot.work){
		    				node.write = '<i class="link icon wb-pencil" onclick="location.href=\'/app/counse/create?studentIdx=' + node.idx + '&workDate=' + workRoot.selectDate + '\'"></i>'
		    			}else{
		    				node.write = '-';
		    			}
		    			
		    		}
		    		
		    		workRoot.valueSetting(node.writeDate.substr(8));
		    		
		    	}
		    	
		    	var option = {
		    		    title: {
		    		        text: '상담일지 현황',
		    		        textStyle: {
		    		        	fontSize: 14
		    		        }
		    		    },
		    		    color: ['#3e8ef7'],
		    		    tooltip : {
		    		        trigger: 'item',
		    		    },
		    		    grid: {
		    		        left: '3%',
		    		        right: '3%',
		    		        bottom: '3%',
		    		        containLabel: true
		    		    },
		    		    xAxis : [
		    		        {
		    		            type : 'category',
		    		            boundaryGap : false,
		    		            data : workRoot.dataMonth
		    		        }
		    		    ],
		    		    yAxis : [
		    		        {
		    		        	show: true,
		    		            type : 'value',
		    		            max: workRoot.hrtCount,
		    		            min: 0
		    		        }
		    		    ],
		    		    series : [
		    		        {
		    		            name:'작성',
		    		            type:'line',
		    		            areaStyle: {normal: {}},
		    		            data: workRoot.valueMonth
		    		        }
		    		    ]
		    		};

		    	myChart.setOption(option);
				myChart.resize();

		    	ftMonth.rows.load(resp.data);
		    	
		    	workRoot.monthPercent = parseInt((workRoot.setMonthCount / workRoot.hrtCount)*100);
		    	if(isNaN(workRoot.monthPercent)){
		    		workRoot.monthPercent = 0;
		    	}
	    		$("#monthPercent").css('width', workRoot.monthPercent + '%');
		    	
		    }).catch(function(error){
		  	  if(error.response != undefined){
		  		  swal(error.response.data.swal);
		  	  }
		    });
	  },
	 openCounse: function(idx, name){
		  
		  axios.get('/api/counse/last/' + idx)
	      .then(function(resp){
	    	  
	    	  workRoot.counse = resp.data;
	    	  workRoot.counse.name = name;
	    	  if(resp.data.mode == 0){
	    		  
	    		  $("#modeZero").modal('show');
	    		  
	    	  }else{
	    		  
	    		  $("#modeOne").modal('show');
	    		  
	    	  }
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  gotoStudentMore: function(idx){
			location.href='/app/counse/' + idx;
	  },
	  modifyCounse: function(){
		  location.href = '/app/counse/modify?idx=' + this.counse.idx + '&work=true';
	  },
	  dataSetting: function(){
		  this.dataMonth = [];
		  
		  var lastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
		  var lastDays = 31;
		  if(this.month == 2){
			  if(this.year%4==0&&this.year%100!=0||this.year%400==0){
				  lastDay = 29;
			  }else{
				  lastDay = 28;
			  }
		  }else{
			  lastDay = lastDayList[this.month-1];
		  }

		  for(var i=25; i<=lastDays; i++){
			  var v = (this.month-1 < 10 ? '0' + (this.month-1) : this.month-1) + '.' + i; 
			  this.dataMonth.push(v);
		  }
		  
		  for(var i=1; i<=24; i++){
			  var v = (this.month < 10 ? '0' + this.month : this.month) + '.' + (i < 10 ? '0' + i : i); 
			  this.dataMonth.push(v);
		  }
		  
	  },
	  valueSetting: function(inDay){
		  inDay = parseInt(inDay);
		  var lastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
		  var lastDays = 31;
		  if(this.month == 2){
			  if(this.year%4==0&&this.year%100!=0||this.year%400==0){
				  lastDay = 29;
			  }else{
				  lastDay = 28;
			  }
		  }else{
			  lastDay = lastDayList[this.month-1];
		  }

		  for(var i=25; i<=lastDays; i++){
			  if(inDay == i){
				  this.valueMonth[i-25] += 1;
			  }
		  }
		  
		  for(var i=1; i<=24; i++){
			  if(inDay == i){
				  this.valueMonth[lastDays-25+i] += 1;
			  }
		  }
	  }
  }
})

var workRoot = workVue.$root;