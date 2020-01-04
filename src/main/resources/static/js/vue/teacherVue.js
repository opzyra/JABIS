var teacherVue = new Vue({
  el: '#teacherVue',
  data: {
	allCount: 0,
	start: null,
	end: null,
	role: null,
	yearParam: null,
	monthParam: null,
	toDay: '',
  },
  created: function(){
	  
	  this.role = $("#role").val();
	  
	  this.monthParam = $("#monthParam").val();
	  this.yearParam = $("#yearParam").val();
	
	  if(this.yearParam != "" && this.yearParam != null && this.monthParam != "" && this.monthParam != null){
	  	this.toDay = moment().year(this.yearParam).month(this.monthParam-1).date(1)
	  } else {
		var tmpDate = moment()
		this.toDay = tmpDate
		if(tmpDate.date() >= 25) {
			tmpDate.add(1, 'M')
		}else{
			tmpDate.date(1)
		}
	  }

	  this.monthCal(this.toDay);

	  axios.get('/api/teacher', {
		  params:{
			  start: this.start,
	  		  end: this.end
		  }
	  })
      .then(function(resp){
    	  
    	  if(resp.data != null){
    		  teacherRoot.allCount = resp.data.length;
    	  }
    	  
    	  
    	  for(var i=0; i<resp.data.length; i++){
    		  var node = resp.data[i];
    		  node.counseCount = node.counseCount == 0 ? '<i class="text-danger icon wb-close"></i>' : '<span class="text-success">' + node.counseCount + '</span>'
    		  node.work = '<i class="icon wb-zoom-in link" onclick="location.href=\'/app/data/counse/detail?email=' + node.email + '&year=' + teacherRoot.end.substring(0,4) + '&month=' + teacherRoot.end.substring(5,7) + '\'"></i>'
    		  node.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="teacherRoot.gotoStudentList(\'' + node.name + '\')"></i>';
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

    	  $("#teacherList").on('ready.ft.table', function(){
    		  $("#loadingBar").css('display', 'none');
    		  ft.rows.load(resp.data);
    	  });

      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
	  
  },
  methods: {
	  gotoStudentList: function(name){
		  location.href='/app/student/list?hrt=' + name;
	  },
	  monthCal: function(date){
		  var year = date.format('YYYY');
		  var month = date.format('M');
		  var date = date.format('D');
		  
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
	  selectMonthRequest: function(){
		  axios.get('/api/teacher', {
			  params:{
				  start: this.start,
		  		  end: this.end
			  }
		  })
	      .then(function(resp){
		  if(resp.data != null){
    		  teacherRoot.allCount = resp.data.length;
    	  }
    	  
    	  for(var i=0; i<resp.data.length; i++){
    		  var node = resp.data[i];
    		  node.counseCount = node.counseCount == 0 ? '<i class="text-danger icon wb-close"></i>' : '<span class="text-success">' + node.counseCount + '</span>'
    		  node.work = '<i class="icon wb-zoom-in link" onclick="location.href=\'/app/data/counse/detail?email=' + node.email + '&year=' + teacherRoot.end.substring(0,4) + '&month=' + teacherRoot.end.substring(5,7) + '\'"></i>'
    		  node.more = '<i aria-hidden="true" class="icon wb-zoom-in link" onclick="teacherRoot.gotoStudentList(\'' + node.name + '\')"></i>';
    		  var percent = parseInt((node.monthCount / node.hrtCount)*100);
    		  var str = '';
  	    	  if(isNaN(percent)){
  	    		percent = 0;
  	    	  }
  	    	  
  	    	  if(percent == 0){
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

    	  ft.rows.load(resp.data);
    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
  }
})

var teacherRoot = teacherVue.$root;