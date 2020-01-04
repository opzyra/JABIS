var leaveVue = new Vue({
  el: '#leaveVue',
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

	  axios.get('/api/leave', {
		  params:{
			  start: this.start,
	  		  end: this.end
		  }
	  })
      .then(function(resp){  	  
    	  
    	  for(var i=0; i<resp.data.length; i++){
    		  var node = resp.data[i];
    		  node.hrtCount = node.hrtCount + node.list.length;
    		  var percent = parseInt((node.list.length / node.hrtCount)*100);
    		  var str = '';
  	    	  if(isNaN(percent)){
  	    		percent = 0;
  	    	  }
  	    	  
  	    	  if(percent == 0){
  	    		str = '<span class="text-success">' + percent + '%</span>';
  	    	  }else{
  	    		str = '<span class="text-danger">' + percent + '%</span>';
  	    	  }
  	    	  
    		  node.leaveRate = str;
    		  node.listName = '';
    		  node.leaveCount = node.list.length;
    		  for(var j=0; j<node.list.length; j++) {
    			  node.listName += '<div class="inline-block"><button class="btn btn-warning btn-icon btn-outline btn-round btn-xs p-5 m-5" onclick="leaveRoot.gotoStudentMore(' + node.list[j].studentIdx + ')" type="button"><span>' + node.list[j].studentName + '</span><i aria-hidden="true" class="icon fa-search m-l-5"></i></button></div>';
    		  }

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
	  gotoStudentMore: function(idx){
			location.href='/app/student/' + idx;
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
		  axios.get('/api/leave', {
			  params:{
				  start: this.start,
		  		  end: this.end
			  }
		  })
	      .then(function(resp){  	  
	    	  
	    	  for(var i=0; i<resp.data.length; i++){
	    		  var node = resp.data[i];
	    		  node.hrtCount = node.hrtCount + node.list.length;
	    		  var percent = parseInt((node.list.length / node.hrtCount)*100);
	    		  var str = '';
	  	    	  if(isNaN(percent)){
	  	    		percent = 0;
	  	    	  }
	  	    	  
	  	    	  if(percent == 0){
	  	    		str = '<span class="text-success">' + percent + '%</span>';
	  	    	  }else{
	  	    		str = '<span class="text-danger">' + percent + '%</span>';
	  	    	  }
	  	    	  
	    		  node.leaveRate = str;
	    		  node.listName = '';
	    		  node.leaveCount = node.list.length;
	    		  for(var j=0; j<node.list.length; j++) {
	    			  node.listName += '<div class="inline-block"><button class="btn btn-warning btn-icon btn-outline btn-round btn-xs p-5 m-5" onclick="leaveRoot.gotoStudentMore(' + node.list[j].studentIdx + ')" type="button"><span>' + node.list[j].studentName + '</span><i aria-hidden="true" class="icon fa-search m-l-5"></i></button></div>';
	    		  }

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
  }
})

var leaveRoot = leaveVue.$root;