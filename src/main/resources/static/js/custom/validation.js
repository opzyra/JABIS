(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/forms/validation', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.formsValidation = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';
  
  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // 로그인 항목 체크
  // ------------------------
  (function () {
    (0, _jquery2.default)('#loginForm').formValidation({
      framework: "bootstrap4",
      button: {
        selector: '#loginButton',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: '이메일을 입력해주세요.'
            },
            regexp: {
                regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: '이메일 형식이 올바르지 않습니다.'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: '비밀번호를 입력해주세요.'
            }
          }
        },
        rememberMe:{
        	
        }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',

        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    }).on('success.form.fv', function(e) {
    	e.preventDefault();
    	loginVue.$root.loginApi();
    })
  })();

  //회원가입 항목 체크
  // ------------------------
  (function () {
	    (0, _jquery2.default)('#registerForm').formValidation({
	      framework: "bootstrap4",
	      button: {
	        selector: '#registerButton',
	        disabled: 'disabled'
	      },
	      icon: null,
	      fields: {
    	   name: {
	          validators: {
	            notEmpty: {
	              message: '이름을 입력해주세요.'
	            },
	            regexp: {
                    regexp: /^[가-힣]+$/,
                    message: '이름이 올바르지 않습니다. 한글로 입력해주세요.'
                }
	          }
	        },  
	        email: {
	          validators: {
	            notEmpty: {
	              message: '이메일을 입력해주세요.'
	            },
	            regexp: {
	                regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
	                message: '이메일 형식이 올바르지 않습니다.'
	            }
	          }
	        },
	        password: {
	          validators: {
	            notEmpty: {
	              message: '비밀번호를 입력해주세요.'
	            },
	            stringLength: {
	                min: 8,
	                message: '비밀번호는 8자리 이상 입력해주세요.'
	            }
	          }
	        },
	        passwordCheck: {
	          validators: {
	            notEmpty: {
	              message: '비밀번호를 다시 한번 입력해주세요.'
	            },
		        identical: {
		        	field: 'password',
	                message: '비밀번호가 일치하지 않습니다.'
	            }
	          }
	        },
	        phone:{
        	 validators: {
	            notEmpty: {
	              message: '연락처를 입력해주세요.'
	            },
	            regexp: {
	                regexp: /^\d{3}-\d{3,4}-\d{4}$/,
	                message: '연락처 입력시 -을 입력해주세요.'
	            }
        	 }
	        },
	        term: {
	            validators: {
	              notEmpty: {
	                message: '약관에 동의해주세요.'
	              }
	            }
	          }
	      },
	      err: {
	        clazz: 'invalid-feedback'
	      },
	      control: {
	        // The CSS class for valid control
	        valid: 'is-valid',

	        // The CSS class for invalid control
	        invalid: 'is-invalid'
	      },
	      row: {
	        invalid: 'has-danger'
	      }
	    }).on('success.form.fv', function(e) {
	    	e.preventDefault();
	    	registerVue.$root.registerApi();
	    });
	  })();
  
  //비밀번호 찾기 항목 체크
  // ------------------------
  (function () {
	    (0, _jquery2.default)('#forgotPasswordForm').formValidation({
	      framework: "bootstrap4",
	      button: {
	        selector: '#forgotPasswordButton',
	        disabled: 'disabled'
	      },
	      icon: null,
	      fields: {
    	   email: {
	          validators: {
	            notEmpty: {
	              message: '이메일을 입력해주세요.'
	            },
	            regexp: {
	                regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
	                message: '이메일 형식이 올바르지 않습니다.'
	            }
	          }
	        }
	      },
	      err: {
	        clazz: 'invalid-feedback'
	      },
	      control: {
	        // The CSS class for valid control
	        valid: 'is-valid',

	        // The CSS class for invalid control
	        invalid: 'is-invalid'
	      },
	      row: {
	        invalid: 'has-danger'
	      }
	    });
	  })();
  
  // 게시글 작성 유효성 검사
  // ------------------------
  (function () {
	    (0, _jquery2.default)('#articleEditForm').formValidation({
	      framework: "bootstrap4",
	      button: {
	        selector: '#articleEditButton',
	        disabled: 'disabled'
	      },
	      icon: null,
	      fields: {
    	   title: {
	          validators: {
	            notEmpty: {
	              message: '제목을 입력해 주세요.'
	            }
	          }
	        },
	       authLevel: {
	          validators: {
	            notEmpty: {
	              message: '열람 제한 권한을 설정해 주세요.'
	            }
	          }
	        }
	      },
	      err: {
	        clazz: 'invalid-feedback'
	      },
	      control: {
	        // The CSS class for valid control
	        valid: 'is-valid',

	        // The CSS class for invalid control
	        invalid: 'is-invalid'
	      },
	      row: {
	        invalid: 'has-danger'
	      }
	    }).on('success.form.fv', function(e) {
	    	e.preventDefault();
	    	articleEditVue.$root.requestEdit();
	    });
	  })();
  
  // 게시글 수정 유효성 검사
  // ------------------------
  (function () {
	    (0, _jquery2.default)('#articleModifyForm').formValidation({
	      framework: "bootstrap4",
	      button: {
	        selector: '#articleEditButton',
	        disabled: 'disabled'
	      },
	      icon: null,
	      fields: {
    	   title: {
	          validators: {
	            notEmpty: {
	              message: '제목을 입력해 주세요.'
	            }
	          }
	        },
	       authLevel: {
	          validators: {
	            notEmpty: {
	              message: '열람 제한 권한을 설정해 주세요.'
	            }
	          }
	        }
	      },
	      err: {
	        clazz: 'invalid-feedback'
	      },
	      control: {
	        // The CSS class for valid control
	        valid: 'is-valid',

	        // The CSS class for invalid control
	        invalid: 'is-invalid'
	      },
	      row: {
	        invalid: 'has-danger'
	      }
	    }).on('success.form.fv', function(e) {
	    	e.preventDefault();
	    	articleModifyVue.$root.requestEdit();
	    });
	  })();
  
  	
  // 댓글 항목 체크
  // ------------------------
  (function () {
    (0, _jquery2.default)('#commentsForm').formValidation({
      framework: "bootstrap4",
      button: {
        selector: '#commentsButton',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        contents: {
          validators: {
            notEmpty: {
              message: '내용을 입력해 주세요.'
            }
          }
        }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',

        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    }).on('success.form.fv', function(e) {
    	e.preventDefault();
    	articleDetailRoot.requestCommentsWrite();
    })
  })();
  
  //학생 등록 항목 체크
  // ------------------------
  (function () {
    (0, _jquery2.default)('#studentCreateForm').formValidation({
      framework: "bootstrap4",
      button: {
        selector: '#studentCreateButton',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: '이름을 입력해주세요.'
            }
          }
        },
        phone: {
            validators: {
              notEmpty: {
                message: '본인 연락처을 입력해주세요.'
              },
	          regexp: {
	                regexp: /^\d{3}-\d{3,4}-\d{4}$/,
	                message: '연락처 입력시 -을 입력해주세요.'
	            }
            }
          },
          parentPhone: {
              validators: {
                notEmpty: {
                  message: '학부모 연락처을 입력해주세요.'
                },
  	          regexp: {
  	                regexp: /^\d{3}-\d{3,4}-\d{4}$/,
  	                message: '연락처 입력시 -을 입력해주세요.'
  	            }
              }
            },
        addressInput: {
            validators: {
              notEmpty: {
                message: '주소를 입력해주세요.'
              }
            }
          },
	      recommend:{
	    	  validators: {
	    		  stringLength: {
		                max: 100,
		                message: '최대 100자까지 입력할 수 있습니다.'
		            }
	    	  }
	      }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',

        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    }).on('success.form.fv', function(e) {
    	e.preventDefault();
    	// 기타 항목 검사
    	var zoneCode = $("#zoneCode").val();
    	var eSchool = $("#eSchool").val();
    	var mSchool = $("#mSchool").val();
    	var hSchool = $("#hSchool").val();
    	if(zoneCode.length == 0){
    		swal("입력 항목 오류", "우편번호 찾기를 통해 주소를 입력해주세요.", "error");
    		$("#studentCreateButton").prop('disabled', false);
    		$("#studentCreateButton").removeClass('disabled');
    	}else if(eSchool == undefined || mSchool == undefined || hSchool == undefined){
    		var str = "";
    		if(eSchool == undefined) str += "초등학교 ";
    		if(mSchool == undefined) str += "중학교 ";
    		if(hSchool == undefined) str += "고등학교";
    		swal({
    			  title: "입력 항목 경고",
    			  text: str + " 정보가 없습니다. 계속 진행하시겠습니까?",
    			  icon: "warning",
    			  buttons: {
    				  confirm: {
    					    text: "등록",
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
    			})
    			.then(function(willDelete){
    			  if (willDelete) {
    				  studentCreateRoot.requestStudentCreate();
    			  } else {
    				  $("#studentCreateButton").prop('disabled', false);
    		    	  $("#studentCreateButton").removeClass('disabled');
    			  }
    			});
    	}else{
    		studentCreateRoot.requestStudentCreate();
    	}
    })
  })();
  
  //학생 수정 항목 체크
  // ------------------------
  (function () {
    (0, _jquery2.default)('#studentUpdateForm').formValidation({
      framework: "bootstrap4",
      button: {
        selector: '#studentUpdateButton',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: '이름을 입력해주세요.'
            }
          }
        },
        phone: {
            validators: {
              notEmpty: {
                message: '본인 연락처을 입력해주세요.'
              },
	          regexp: {
	                regexp: /^\d{3}-\d{3,4}-\d{4}$/,
	                message: '연락처 입력시 -을 입력해주세요.'
	            }
            }
          },
          parentPhone: {
              validators: {
                notEmpty: {
                  message: '학부모 연락처을 입력해주세요.'
                },
  	          regexp: {
  	                regexp: /^\d{3}-\d{3,4}-\d{4}$/,
  	                message: '연락처 입력시 -을 입력해주세요.'
  	            }
              }
            },
        addressInput: {
            validators: {
              notEmpty: {
                message: '주소를 입력해주세요.'
              }
            }
          },
	      recommend:{
	    	  validators: {
	    		  stringLength: {
		                max: 100,
		                message: '최대 100자까지 입력할 수 있습니다.'
		            }
	    	  }
	      }
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',

        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      }
    }).on('success.form.fv', function(e) {
    	e.preventDefault();
    	// 기타 항목 검사
    	var zoneCode = $("#zoneCode").val();
    	var eSchool = $("#eSchool").val();
    	var mSchool = $("#mSchool").val();
    	var hSchool = $("#hSchool").val();
    	if(zoneCode.length == 0){
    		swal("입력 항목 오류", "우편번호 찾기를 통해 주소를 입력해주세요.", "error");
    		$("#studentCreateButton").prop('disabled', false);
    		$("#studentCreateButton").removeClass('disabled');
    	}else if(eSchool == undefined || mSchool == undefined || hSchool == undefined){
    		var str = "";
    		if(eSchool == undefined) str += "초등학교 ";
    		if(mSchool == undefined) str += "중학교 ";
    		if(hSchool == undefined) str += "고등학교";
    		swal({
    			  title: "입력 항목 경고",
    			  text: str + " 정보가 없습니다. 계속 진행하시겠습니까?",
    			  icon: "warning",
    			  buttons: {
    				  confirm: {
    					    text: "등록",
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
    			})
    			.then(function(willDelete){
    			  if (willDelete) {
    				  studentUpdateRoot.requestStudentUpdate();
    			  } else {
    				  $("#studentUpdateButton").prop('disabled', false);
    		    	  $("#studentUpdateButton").removeClass('disabled');
    			  }
    			});
    	}else{
    		studentUpdateRoot.requestStudentUpdate();
    	}
    })
  })();
  
  
  
});

var setFieldError = function(form, field, data){
	$(form).find('.is-valid, .has-danger, .has-success').each(function(){
		$(this).removeClass('is-valid').removeClass('has-danger').removeClass('has-success'); 
	});
	$(field).addClass('is-invalid');
		swal(data).then(function(){
		$(field).focus();
	});
}

var resetFieldError = function(form){
	$(form).find('.is-valid, .has-danger, .has-success, .is-invalid').each(function(){
		$(this).removeClass('is-valid').removeClass('is-invalid').removeClass('has-danger').removeClass('has-success'); 
	});
	$(form).find('.invalid-feedback').each(function(){
		$(this).css('display', 'none');
	});
}