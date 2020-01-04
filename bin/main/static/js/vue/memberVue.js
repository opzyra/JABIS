var memberVue = new Vue({
  el: '#memberVue',
  data: {
	role: 0,
	email: null,
	doubleSubmitFlag: false,
    status: null,
    allCount: 0,
    authCount: 0,
    readyCount: 0,
    banCount: 0,
    deleteCount: 0,
    deleteStatus: 0,
    enabledCode: null,
    member: [],
    target:{
    	name: null,
    	email: null,
    	role: null,
    	roleCode: null,
    	roleName: null,
    	subject: null,
    	subjectCode: 0,
    	status: null
    },
    changeRole: null,
    changeSubject: null,
    today: '',
  },
  computed: {
	  isActive: function() {
		  return {
			  all: this.status == null,
			  auth: this.status == 0,
			  ready: this.status == 1,
			  ban: this.status == 2,
			  delete: this.status == 3
		  }
	  }  
  },
  created: function(){
	  this.role = $("#role").val();
	  this.email = $("#email").val();
	  this.today = new Date().format("yyyy.MM.dd HH:mm:ss");
	  axios.get('/api/member/count')
      .then(function(resp){
    	  memberRoot.allCount = resp.data.allCount;
    	  memberRoot.authCount = resp.data.authCount;
    	  memberRoot.readyCount = resp.data.readyCount;
    	  memberRoot.banCount = resp.data.banCount;
    	  memberRoot.deleteCount = resp.data.deleteCount;
    	  
    	  $("#memberList").on('ready.ft.table', function(){
    		  memberRoot.refresh(true);
    	  });
    	  
      }).catch(function(error){
    	  if(error.response != undefined){
    		  swal(error.response.data.swal);
    	  }
      });
  },
  methods: {
	  countReset: function(){
		  axios.get('/api/member/count')
	      .then(function(resp){
	    	  memberRoot.allCount = resp.data.allCount;
	    	  memberRoot.authCount = resp.data.authCount;
	    	  memberRoot.readyCount = resp.data.readyCount;
	    	  memberRoot.banCount = resp.data.banCount;
	    	  memberRoot.deleteCount = resp.data.deleteCount;

	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });  
	  },
	  statusUpdate: function(status){
		  
		  if(this.doubleSubmitCheck()) return;
		  
		  this.status = status;
		  
		  if(this.status == 0){
			 this.enabledCode = 0;
			 this.deleteStatus = 0;
		  }else if(this.status == 1){
			  this.enabledCode = 1;
			  this.deleteStatus = 0;
		  }else if(this.status == 2){
			  this.enabledCode = 2;
			  this.deleteStatus = 0;
		  }else if(this.status == 3){
			  this.enabledCode = null;
			  this.deleteStatus = 1;
		  }else{
			  this.enabledCode = null;
			  this.deleteStatus = 0;
		  }
		  
		  this.refresh();
		  
	  },
	  doubleSubmitCheck: function(){
		    if(this.doubleSubmitFlag){
		        return this.doubleSubmitFlag;
		    }else{
		        this.doubleSubmitFlag = true;
		        return false;
		    }
	  },
	  openRoleModal: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode >= this.role){
			  swal("권한 오류", "해당 사용자의 직책을 변경할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  if(this.target.enabledCode == 2){
			  swal("계정 상태 오류", "해당 사용자는 사용제한 상태입니다.", "error");
			  return;
		  }
		  
		  $("#roleList").val(null).trigger('changer');
		  this.changeRole = null;
		  $("#roleList").select2("destroy");
    	  $("#roleList").unbind();
    	  $("#roleList").select2({
    			placeholder: "직책",
    			minimumResultsForSearch: -1
    		}).on('select2:select', function (e) {
    			memberRoot.changeRole = e.params.data.id;
    		}).on('select2:open', function (e) {
    			  $(".select2-container--open").addClass('modal-select2');
    		});
    	  
		  $("#roleModal").modal('show');
	  },
	  chanegRole: function(){

		  if(this.changeRole == null){
			  swal("입력 항목 오류", "변경할 직책을 선택해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.email = this.target.email;
		  param.roleCode = this.changeRole;
		  
		  axios.patch('/api/member/role', JSON.stringify(param))
	      .then(function(resp){
	          swal(resp.data.swal).then(function(){
	        	  $("#roleModal").modal('hide');
	        	  memberRoot.refresh();
	          });
	      })
	      .catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  openSubjectModal: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode > this.role){
			  swal("권한 오류", "해당 사용자의 담당 과목을 변경할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  if(this.target.enabledCode == 2){
			  swal("계정 상태 오류", "해당 사용자는 사용제한 상태입니다.", "error");
			  return;
		  }
		  
		  this.changeSubject == null;
		  $("#subjectList").val(null).trigger('changer');
		  $("#subjectList").select2("destroy");
    	  $("#subjectList").unbind();
    	  $("#subjectList").select2({
    			placeholder: "과목",
    			minimumResultsForSearch: -1
    		}).on('select2:select', function (e) {
    			memberRoot.changeSubject = e.params.data.id;
    		}).on('select2:open', function (e) {
    			  $(".select2-container--open").addClass('modal-select2');
    		});
		  $("#subjectModal").modal('show');
	  },
	  chanegSubject: function(){
		  
		  if(this.changeSubject == null){
			  swal("입력 항목 오류", "변경할 과목을 선택해주세요.", "error");
			  return;
		  }
		  
		  var param = {};
		  param.email = this.target.email;
		  param.subjectCode = this.changeSubject;
		  
		  axios.patch('/api/member/subject', JSON.stringify(param))
	      .then(function(resp){
	          swal(resp.data.swal).then(function(){
	        	  $("#subjectModal").modal('hide');
	        	  memberRoot.refresh();
	          });
	      })
	      .catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  resetPassword: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode > this.role){
			  swal("권한 오류", "해당 사용자의 비밀번호를 초기화할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  if(this.target.enabledCode == 2){
			  swal("계정 상태 오류", "해당 사용자는 사용제한 상태입니다.", "error");
			  return;
		  }
		  
		  swal({
			  title: "비밀번호 초기화",
			  text: this.target.name + "님의 비밀번호를 초기화 하시겠습니까?",
			  icon: "warning",
			  buttons: {
				  confirm: {
					    text: "초기화",
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
					var param = {};
					param.email = memberRoot.target.email;
					param.password = null;
					
					axios.patch('/api/member/password', JSON.stringify(param))
				      .then(function(resp){
				    	  swal("비밀번호 초기화 완료", memberRoot.target.name + "님의 비밀번호는 " + resp.data + "로 초기화되었습니다.", "success");
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  },
	  banAbled: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode > this.role){
			  swal("권한 오류", "해당 사용자의 사용제한을 변경할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  swal({
			  title: "계정 비활성화",
			  text: "계정을 비활성화하면 담임 배정 정보가 모두 초기화 됩니다.",
			  icon: "warning",
			  buttons: {
				  confirm: {
					    text: "비활성화",
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
					var param = {};
					param.email = memberRoot.target.email;
					param.enabledCode = 2;
					
					axios.patch('/api/member/ban', JSON.stringify(param))
				      .then(function(resp){
				    	  swal(resp.data.swal).then(function(){
				    		  memberRoot.countReset();
				    		  memberRoot.refresh();
				    	  });
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  },
	  banDisabled: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode > this.role){
			  swal("권한 오류", "해당 사용자의 사용제한을 변경할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  swal({
			  title: "계정 활성화",
			  text: this.target.name + "님의 계정을 활성화 하시겠습니까?",
			  icon: "warning",
			  buttons: {
				  confirm: {
					    text: "활성화",
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
					var param = {};
					param.email = memberRoot.target.email;
					param.enabledCode = 1;
					
					axios.patch('/api/member/ban', JSON.stringify(param))
				      .then(function(resp){
				    	  swal(resp.data.swal).then(function(){
				    		  memberRoot.countReset();
				    		  memberRoot.refresh();
				    	  });
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});
	  },
	  deleteMember: function(idx){
		  this.target = this.member[idx];
		  
		  if(this.target.roleCode > this.role){
			  swal("권한 오류", "해당 사용자를 삭제할 권한이 없습니다.", "error");
			  return;
		  }
		  
		  swal({
			  title: "계정 삭제 경고",
			  text: this.target.name + "님과 관련된 정보가 모두 삭제됩니다.",
			  icon: "error",
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
					swal({
	        			  content: {
	        				    element: "input",
	        				    attributes: {
	        				      placeholder: "비밀번호를 입력해주세요.",
	        				      type: "password",
	        				    },
	        			  },
	        			  button: {
	        			    text: "인증",
	        			    closeModal: false,
	        			  },
	        			})
	        			.then(function(inPass){
	        			  if (inPass == '' || !inPass){
	        				  swal("입력 항목 오류", "비밀번호를 입력해주세요.", "error");
	        				  throw null;
	        			  }
	        			  return axios.post('/api/member/check', {
	        				  password: inPass
	        			  })
	        			})
	        			.then(function(resp){
	        				axios.delete('/api/member/' + memberRoot.target.email)
		  				      .then(function(resp){
		  				    	  swal(resp.data.swal).then(function(){
		  				    		  memberRoot.countReset();
		  				    		  memberRoot.refresh();
		  				    	  });
		  				      }).catch(function(error){
		  				    	  if(error.response != undefined){
		  				    		  swal(error.response.data.swal);
		  				    	  }
		  				      });
	      		      	}).catch(function(err){
	      		      		swal.stopLoading();
	      		      		
		      		      	if(err.response != undefined){
					    		  swal(err.response.data.swal);
					    	  }
	      		      	})
					
					
				}
			});
		  
	  },
	  refresh: function(reset){
		  
		  if(reset){
			  this.deleteStatus = 0;
			  this.enabledCode = null;
		  }
		  
		  axios.get('/api/member', {
			  params:{
				  deleteStatus: this.deleteStatus,
				  enabledCode: this.enabledCode
			  }})
	      .then(function(resp){
	    	  
	    	  for(var i = 0; i<resp.data.length; i++){
	    		  var node = resp.data[i];
	    		  
	    		  var roleStr = '';
	    		  if(node.roleCode == 0){
	    			  roleStr = '담당 과목';
	    		  }else if(node.roleCode == 1){
	    			  roleStr = '담임';
	    		  }else if(node.roleCode == 2){
	    			  roleStr = '팀장';
	    		  }else if(node.roleCode == 3){
	    			  roleStr = '실장';
	    		  }else if(node.roleCode == 4){
	    			  roleStr = '원장';
	    		  }else if(node.roleCode == 5){
	    			  roleStr = '관리자';
	    		  }else{
	    			  roleStr = '알수없음';
	    		  }
	    		  
	    		  var subjectStr = '';
	    		  if(node.subjectCode == 0){
	    			  subjectStr = '미정';
	    		  }else if(node.subjectCode == 1){
	    			  subjectStr = '국어';
	    		  }else if(node.subjectCode == 2){
	    			  subjectStr = '영어';
	    		  }else if(node.subjectCode == 3){
	    			  subjectStr = '수학';
	    		  }else if(node.subjectCode == 4){
	    			  subjectStr = '과학';
	    		  }else if(node.subjectCode == 5){
	    			  subjectStr = '사회';
	    		  }else{
	    			  subjectStr = '역사';
	    		  }
	    		  
	    		  var statusStr = '';
	    		  if(node.enabledCode == 0){
	    			  statusStr = '<span class="text-success">정상</span>';
	    		  }else if(node.enabledCode == 1){
	    			  statusStr = '<span class="text-primary">미인증</span>'
	    		  }else{
	    			  statusStr = '<span class="text-danger">사용 제한</span>'
	    		  }
	    		  
	    		  if(node.deleteStatus){
	    			  statusStr = '<span class="text-warning">삭제</span>'
	    		  }
	    		  
	    		  node.roleName = roleStr;
	    		  
	    		  node.role = '<span class="link" onclick="memberRoot.openRoleModal(' + i + ')">' + roleStr + '</span>';
	    		  node.subjectName = subjectStr;
	    		  node.subject = '<span class="link" onclick="memberRoot.openSubjectModal(' + i + ')">' + (node.subjectCode == 0 ? '<span class="text-danger">미정</span>' : subjectStr) + '</span>'
	    		  node.status = statusStr;
	    		  
	    		  node.passReset = '<i class="link icon wb-unlock" onclick="memberRoot.resetPassword(' + i + ')"></i>';
	    		  if(node.enabledCode == 0 || node.enabledCode == 1){
	    			  node.ban = '<i class="text-danger link icon fa-ban" onclick="memberRoot.banAbled(' + i + ')"></i>'
	    		  }else{
	    			  node.ban = '<i class="text-success link icon wb-check" onclick="memberRoot.banDisabled(' + i + ')"></i>'
	    		  }
	    		  node.delete = '<i class="link icon wb-trash" onclick="memberRoot.deleteMember(' + i + ')"></i>'
	    		   
	    	  }
	    	  memberRoot.member = resp.data;
	    	  $("#loadingBar").css('display', 'none');
	    	  ft.rows.load(resp.data);
	    	  setTimeout(function() {memberRoot.doubleSubmitFlag = false;}, 1000);
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  }
  }
})

var memberRoot = memberVue.$root;