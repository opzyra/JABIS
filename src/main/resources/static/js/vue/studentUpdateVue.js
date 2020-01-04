var studentUpdateVue = new Vue({
  el: '#studentUpdateVue',
  data: {
	today: '',
	studentIdx: 0,
    schoolSearchQuery:'',
    schoolList: [],
    name: '',
    gender: '0',
    status: '0',
    phone: '',
    elSchool: '',
    mdSchool: '',
    hiSchool: '',
    grade: '1',
    parentPhone: '',
    zoneCode: '',
    addressApi: '',
    addressInput: '',
    car: '0',
    recommend: '',
    sibling: [],
    deleteIdx: [],
	siblingSchoolSearchQuery:'',
	siblingSchoolList: [],
	siblingSchool: '',
	siblingRelation: '형',
	siblingName: '',
	siblingGrade: '1',
	siblingGradeCode: 0,
	hrtAll: [],
	hrtEmail: ''
  },
  created: function(){
	  var d = new Date();
	  var date_format_str = d.getFullYear().toString()+"."+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"."+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
	  this.today = date_format_str;
	  
	  this.studentIdx = $("#studentIdx").val();
	  
	  axios.get('/api/hrt',{
		  params: {
		  query: '',
		  currentPage: 1,
		  limit: 1
	  }})
      .then(function(resp){
    	  studentUpdateRoot.hrtAll = resp.data.hrtAll;

      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
	  
	  axios.get('/api/student/update/' + this.studentIdx)
      .then(function(resp){
    	  studentUpdateRoot.name = resp.data.name;
    	  studentUpdateRoot.gender = resp.data.gender;
    	  studentUpdateRoot.status = resp.data.status;
    	  studentUpdateRoot.phone = resp.data.phone;
    	  studentUpdateRoot.parentPhone = resp.data.parentPhone;
    	  studentUpdateRoot.elSchool = resp.data.eschool;
    	  studentUpdateRoot.mdSchool = resp.data.mschool;
    	  studentUpdateRoot.hiSchool = resp.data.hschool;
    	  studentUpdateRoot.grade = resp.data.grade;
    	  studentUpdateRoot.zoneCode = resp.data.zoneCode;
    	  studentUpdateRoot.addressApi = resp.data.addressApi;
    	  studentUpdateRoot.addressInput = resp.data.addressInput;
    	  studentUpdateRoot.car = resp.data.car;
    	  studentUpdateRoot.recommend = resp.data.recommend;
    	  studentUpdateRoot.sibling = resp.data.sibling;
    	  studentUpdateRoot.hrtEmail = resp.data.hrtEmail;
    	  
    	  $('#sibling').bootstrapTable({
    	      locale:'ko-KR',
    	      data: studentUpdateRoot.sibling,
    	      showRefresh: true,
    	      iconSize: 'outline',
    	      toolbar: '#siblingToolbar',
    	      icons: {
    	        refresh: 'wb-refresh',
    	        toggle: 'wb-order',
    	        columns: 'wb-list-bulleted'
    	      }
    	    });
      })
      .catch(function(error){
    	  if(error.response !== undefined){
    		  swal(error.response.data.swal);
    	  }
      });
	  
  },
  methods: {
	  schoolSearch: function(){
		  
		  if(this.schoolSearchQuery.length < 3 || this.schoolSearchQuery === '학교'){
			  swal("입력 항목 오류","학교명은 3글자 이상 입력해주세요.","error");
			  return;
		  }else{
			  axios.get('/api/school/' + this.schoolSearchQuery)
		      .then(function(resp){
		    	  if(resp.data.length == 0){
		    		  $("#searchResult").css('display', 'inherit').animateCss('fade-In');
		    		  $("#schoolNotResult").css('display', 'inherit');
		    	  } else {
		    		  $("#schoolNotResult").css('display', 'none');
		    		  $("#searchResult").css('display', 'inherit').animateCss('fade-In');
		    	  }
		    	  studentUpdateRoot.schoolList = resp.data;
		      })
		      .catch(function(error){
		    	  if(error.response !== undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      })
		  }
		  
      
    },
    siblingSchoolSearch: function(e){
		  if(this.siblingSchoolSearchQuery.length < 3 || this.siblingSchoolSearchQuery === '학교'){
			  swal("입력 항목 오류","학교명은 3글자 이상 입력해주세요.","error");
			  return;
		  }else{
			  axios.get('/api/school/' + this.siblingSchoolSearchQuery)
		      .then(function(resp){
		    	  if(resp.data.length == 0){
		    		  $("#siblingSearchResult").css('display', 'inherit').animateCss('fade-In');
		    		  $("#siblingSchoolNotResult").css('display', 'inherit');
		    	  } else {
		    		  $("#siblingSchoolNotResult").css('display', 'none');
		    		  $("#siblingSearchResult").css('display', 'inherit').animateCss('fade-In');
		    	  }
		    	  studentUpdateRoot.siblingSchoolList = resp.data;
		      })
		      .catch(function(error){
		    	  if(error.response !== undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      })
		  }
		  
    
  },
    schoolSelect: function(item){
    	switch(item.type){
    	case "02":
    		this.elSchool = item.name;
    		break;
    	case "03":
    		this.mdSchool = item.name;
    		break;
    	case "04":
    		this.hiSchool = item.name;
    		break;
    	default:
    		this.hiSchool = item.name;
    	}
    	$("#searchResult").css('display', 'none');
    	this.schoolSearchQuery = '';
    },
    siblingSchoolSelect: function(item, gradeCode){
    	$("#siblingSearchResult").css('display', 'none');
    	this.siblingSchool = item.name;
    	this.schoolSearchQuery = '';
    	switch(item.type){
    	case "02":
    		this.siblingGradeCode = 1;
    		break;
    	case "03":
    		this.siblingGradeCode = 2;
    		break;
    	case "04":
    		this.siblingGradeCode = 3;
    		break;
    	default:
    		this.siblingGradeCode = 0;
    	}
    },
    schoolReset: function(type){
    	switch(type){
    	case "02":
    		this.elSchool = '';
    		break;
    	case "03":
    		this.mdSchool = '';
    		break;
    	case "04":
    		this.hiSchool = '';
    		break;
    	case "sibling":
    		this.siblingSchool = '';
    	default:
    	}
    },
    siblingModalOpen: function(){
    	$("#siblingModal").modal('show');
    	this.siblingSchoolSearchQuery = '';
        this.siblingSchoolList = [];
        this.siblingSchool = '';
        this.siblingRelation = '형';
        $("#siblingRelation").val("형").trigger('change');
        this.siblingName = '';
        this.siblingGrade = '1';
        $("#siblingGrade").val("1").trigger('change');
    },
    siblingAdd: function(){
    	if(this.siblingName.length == 0){
    		swal("입력 항목 오류","이름을 입력해주세요.","error");
    		return;
    	}else if(this.siblingSchool.length == 0){
    		swal("입력 항목 오류","학교를 선택해주세요.","error");
    		return;
    	}
    	var param = {
        		siblingRelation: this.siblingRelation,
        		siblingName: this.siblingName,
        		siblingSchool: this.siblingSchool,
        		siblingGrade: this.siblingGrade,
        		siblingGradeCode: this.siblingGradeCode,
        		siblingUpdated: false
        	};
    	this.sibling.push(param);
    	$('#sibling').bootstrapTable('load', this.sibling);
    	$("#siblingModal").modal('hide');
    },
    siblingDelete: function(){
    	var checked = $(".bootstrap-table .selected");
    	for(var i =0; i < checked.length; i++){
    		var idx = $(checked[i]).find('.hidden').text();
    		var dataIdx = $(checked[i]).attr('data-index');
    		if(idx != undefined || idx != '-'){
    			this.deleteIdx.push(idx);
    		}
    		this.sibling.splice(dataIdx, 1, null);
    		$(checked[i]).parents('tr').remove();
    	}
    	var newSibling = [];
    	for(var i =0; i<this.sibling.length; i++){
    		if(this.sibling[i] != null){
    			newSibling.push(this.sibling[i]);
    		}
    	}
    	this.sibling = newSibling;
    	$('#sibling').bootstrapTable('load', this.sibling);
    },
    requestStudentUpdate: function(){
    	var param = {};
    	param.studentIdx = this.studentIdx;
    	param.name = this.name;
    	param.gender = this.gender;
    	param.status = this.status;
    	param.elSchool = this.elSchool;
    	param.mdSchool = this.mdSchool;
    	param.hiSchool = this.hiSchool;
    	param.grade = this.grade;
    	param.phone = this.phone;
    	param.parentPhone = this.parentPhone;
    	param.zoneCode = this.zoneCode;
    	param.addressApi = this.addressApi;
    	param.addressInput = this.addressInput;
    	param.car = this.car;
    	param.recommend = this.recommend;
    	param.sibling = this.sibling;
    	param.deleteIdx = this.deleteIdx;
    	
    	param.hrtEmail = this.hrtEmail;
    	
    	
    	axios.patch('/api/student', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
	    		  location.href='/app/student/' + studentUpdateRoot.studentIdx;
	    	  })
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
    	
    },
//    resetForm: function(){
//		  $('#studentCreateButton').prop('disabled', true).addClass('disabled');
//		  resetFieldError($('#studentCreateForm'));
//		  this.schoolSearchQuery = '';
//		    this.name =  '';
//		    this.gender = '0';
//		    this.status = '0';
//		    this.phone = '';
//		    this.eSchool = '';
//		    this.mSchool = '';
//		    this.hSchool =  '';
//		    this.grade = '1';
//		    this.parentPhone = '';
//		    this.zoneCode = '';
//		    this.addressApi = '';
//		    this.addressInput = '';
//			this.siblingSchoolSearchQuery='';
//			this.siblingSchoolList= [];
//			this.siblingSchool= '';
//			this.siblingRelation= '형';
//			this.siblingName= '';
//			this.siblingGrade= '1';
//			$('#status').val('0').trigger('change');
//			$('#grade').val('1').trigger('change');
//    }
  }
  
})

var studentUpdateRoot = studentUpdateVue.$root;