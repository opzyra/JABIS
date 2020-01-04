var studentOneVue = new Vue({
  el: '#studentOneVue',
  data: {
	isMobile: false,
    studentIdx: 0,
    student: {
    	name: '',
    	school: '',
    	grade: 0,
    	regDate: '',
    	leaveDate: '',
    	classNomal: '',
    	classTest: '',
    	phone: '',
    	parentPhone: '',
    	addressApi: '',
    	addressInput: '',
    	eSchool: '',
    	mSchool: '',
    	hSchool: '',
    	hrtName: '',
    	sibling: []
    },
    counse: [],
    lastCounse: {
    	counseDate: '',
    	future: '',
    	studyStyle: '',
    	studentStyle: '',
    	parentRequest: '',
    	parentStyle: '',
    	idx: 0
    },
    mode: 0,
    chartShow: 0,
    mNesinNoData: false,
    hNesinNoData: false,
    hMoiNoData: false,
    updateStatus: '',
    updateStatusDate: null,
  },
  created: function(){
	  this.isMobile = isMobile();
	  this.studentIdx = $("#studentIdx").val();
	  axios.get('/api/student/one/' + this.studentIdx)
	  .then(function(resp){

		  studentOneRoot.student = resp.data.student;
		  studentOneRoot.counse = resp.data.counse;
		  
		  if(studentOneRoot.counse.length > 1 && studentOneRoot.counse[studentOneRoot.counse.length-1].mode == 0){
			 studentOneRoot.lastCounse = studentOneRoot.counse[studentOneRoot.counse.length-1];
			 studentOneRoot.counse.pop();
		  }else if(studentOneRoot.counse.length > 1 && studentOneRoot.counse[studentOneRoot.counse.length-1].mode == 1){
			  
		  }else{
			  studentOneRoot.lastCounse = studentOneRoot.counse[0];
			  studentOneRoot.counse = [];
		  }
		  
		  if(resp.data.student.gradeCode <= 2){
			  
			  studentOneRoot.getAllScore(0);
			  setTimeout(function(){
				  $('#scoreTab li:eq(0) a').tab('show');
			  },500)
		  }else if(resp.data.student.gradeCode == 3){
			  
			  studentOneRoot.getAllScore(1);
			  setTimeout(function(){
				  $('#scoreTab li:eq(1) a').tab('show');
			  },500)
			  
		  }
		  
	  }).catch(function(error){
    	  if(error.response != undefined){
    		  if(error.response.status == 500){
    			  location.href='/app/error';
    		  }else{
    			  swal(error.response.data.swal); 
    		  }
    	  }
      });
  },
  updated: function(){
	  LetterAvatar.transform();  
  },
  computed: {
	   
  },
  methods: {
	  counseWrite: function(){
		  location.href='/app/counse/create?studentIdx=' + this.studentIdx;
	  },
	  counseMore: function(){
		  location.href = '/app/counse/' + this.studentIdx;
	  },
	  scoreWrite: function(){
		  location.href = '/app/score/create?studentIdx=' + this.studentIdx + '&mode=' + this.mode;
	  },
	  scoreMore: function(){
		  location.href = '/app/score?studentIdx=' + this.studentIdx + '&mode=' + this.mode;
	  },
	  studentList: function(type){
		  switch(type){
		  case 'classNomal':
			  location.href = '/app/student/list?className=' + urlencode(this.student.classNomal) + '&test=0';
			  break;
		  case 'classTest':
			  location.href = '/app/student/list?className=' + urlencode(this.student.classTest) + '&test=1';
			  break;
		  case 'hrt':
			  location.href = '/app/student/list?hrt=' + urlencode(this.student.hrtName);
			  break;
		  }
	  },
	  updateStudent: function(){
		location.href='/app/student/update/' + this.studentIdx;  
	  },
	  updateStatusModal: function(){
		this.updateStatusDate = null;
		$('#datepicker').datepicker('clearDates');
		$('#statusModal').modal('show');
	  },
	  updateStatusProcess: function(){
		if(this.updateStatusDate == null){
			swal("입력 항목 오류", "최초 등록일을 입력해주세요.", "error");
			return;
		}
		
		var param = {};
		param.idx = this.studentIdx;
		param.status = 1;
		param.regDate = this.updateStatusDate;
		
		axios.patch('/api/student/status', JSON.stringify(param))
	      .then(function(resp){
	    	  swal(resp.data.swal).then(function(){
	    		  location.reload();
	    	  });
	      })
	      .catch(function(error){
	    	  if(error.response !== undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      })
		
	  },
	  deleteStudent: function(){
		  swal({
			  title: "삭제 확인",
			  text: "해당 학생의 모든 정보가 삭제되며 복구가 불가능합니다.",
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
					axios.delete('/api/student/' + studentOneRoot.studentIdx)
				      .then(function(resp){
				    	  swal(resp.data.swal)
				    	  .then(function(){
				    		  location.href = '/app/student/list';
				    	  })
				      }).catch(function(error){
				    	  if(error.response != undefined){
				    		  swal(error.response.data.swal);
				    	  }
				      });
				}
			});  
	  },
	  pdfStudent: function(){
		  $('html').animate({scrollTop : 0}, 400, function(){
			  html2canvas(document.getElementById('studentOneVue'), {
				  onrendered: function(canvas) {
				 
				    // 캔버스를 이미지로 변환
				    var imgData = canvas.toDataURL('image/png');
				     
				    var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
				    var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
				    var imgHeight = canvas.height * imgWidth / canvas.width;
				    var heightLeft = imgHeight;
				     
				        var doc = new jsPDF('p', 'mm');
				        var position = 0;
				         
				        // 첫 페이지 출력
				        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
				        heightLeft -= pageHeight;
				         
				        // 한 페이지 이상일 경우 루프 돌면서 출력
				        while (heightLeft >= 20) {
				          position = heightLeft - imgHeight;
				          doc.addPage();
				          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
				          heightLeft -= pageHeight;
				        }
				 
				        // 파일 저장
				        var fileName = studentOneRoot.student.name + '.pdf';
				        doc.save(fileName);
				  }
				});
			  
		  });
		  
	  },
	  getAllScore: function(param){
		  this.mode = param;
		  if(this.mode==0){
			  axios.get('/api/score/middle/nesin/all/' + this.studentIdx)
		      .then(function(resp){
		    	  
		    	  if(resp.data.length == 0){
		    		  studentOneRoot.mNesinNoData = true;
		    	  }else{
		    		  studentOneRoot.middleAllChartSet(resp.data);  
		    		  studentOneRoot.mNesinNoData = false;
		    	  }
		    	  
		    	  
		    	  
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
			  
		  }else if(this.mode==1){
			  
			  axios.get('/api/score',{
				  params: {
					studentIdx: this.studentIdx,
					mode: this.mode
				  }})
		      .then(function(resp){
		    	  
		    	  if(resp.data.length == 0){
		    		  studentOneRoot.hNesinNoData = true;
		    	  }else{
		    		  studentOneRoot.highAllChartSet(resp.data);
		    		  studentOneRoot.hNesinNoData = false;
		    	  }
		    	  
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
			  
			  
			  
			  
		  }else if(this.mode==2){
			  
			  axios.get('/api/score/high/moi/all/' + this.studentIdx)
		      .then(function(resp){
		    	  
		    	  if(resp.data.length == 0){
		    		  studentOneRoot.hMoiNoData = true;
		    	  }else{
		    		  studentOneRoot.moiAllChartSet(resp.data);
		    		  studentOneRoot.hMoiNoData = false;
		    	  }
		    	  
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
			  
		  }else{
			  
		  }
		  
		  
		  
	  },
	  moiAllChartSet: function(data){
		  var years =[];
		  var sort = [];
		  for(var i = 0; i<data.length; i++){
			  if(jQuery.inArray(data[i].year, years) === -1){
				  years.push(data[i].year);
				  sort.push({
					  year: data[i].year,
					  score:[]
				  })
			  }
		  }
		  
		  for(var i=0; i<years.length; i++){
			  for(var j = 0; j<data.length; j++){
				  // 해당 년도가 같은 경우
				  if(years[i] == data[j].year){
					  sort[i].score.push({
						  text: data[j].text,
					  	  list: data[j].highMoi
					  });
				  }
			  }
		  }
		  
		  for(var i = 0; i<sort.length; i++){
			  
			  var option = {
						title: {
					        text: '과목별 통계'
					    },
				        legend: {
				        	top: 40
				        },
				        grid: {
				        	top: 100,
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
				        tooltip: {
				        	show: true,
				        	trigger: 'axis',
					        axisPointer : {            
					            type : 'shadow'        
					        }
				        },
				        dataset: {
				            source: [
				                ['type']
				            ]
				        },
				        xAxis: {type: 'category'},
				        yAxis: {
				            type: 'value',
				            scale: true,
				            max: 9,
				            min: 1,
				            inverse : true,
				            interval: 1,
				            boundaryGap: [0.2, 0.2],
				            gridIndex: 0
				        },
				        series: [
				        	
				        ]
				    };
			  
			  option.title.text = sort[i].year + ' 년도';
				
				for(var j = 0; j<sort[i].score.length; j++){
					option.dataset.source[0].push(sort[i].score[j].text);
					for(var k = 0; k<sort[i].score[j].list.length; k++){
						if(jQuery.inArray(sort[i].score[j].list[k].name, option.dataset.source[k+1]) === -1){
							option.dataset.source.push([]);
							option.dataset.source[k+1].push(sort[i].score[j].list[k].name);
							option.dataset.source[k+1].push(sort[i].score[j].list[k].rating);
							option.series.push({
				                type: 'line', smooth: false, seriesLayoutBy: 'row',
				                label: {
				                    normal: {
				                        show: true,
				                        position: 'top'
				                    }
				                }
				            });
						}else{
							option.dataset.source[k+1].push(sort[i].score[j].list[k].rating);
						}
					}
				}

				if(i == 0){
					this.chartShow = 0;
					myMoiChart2.setOption(option);
				}else if(i == 1){
					this.chartShow = 1;
					myMoiChart1.setOption(option);
				}else{
					this.chartShow = 2;
					myMoiChart0.setOption(option);
				}
				
		  }
		  
		  
	  },
	  middleAllChartSet: function(data){
		  
		  var option = {
			  title: {
			        text: '학기별 통계'
			    },
		    legend: {
		    	orient: 'vertical',
		        right: 'left'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            
		            type : 'shadow'        
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    dataset: {
		        source: [
		            ['year'],
		            ['국어'],
		            ['영어'],
		            ['수학'],
		            ['과학'],
		            ['사회'],
		            ['역사']
		        ]
		    },
		    xAxis: {type: 'category'},
		    yAxis: {
	            type: 'value',
	            scale: true,
	            max: 100,
	            min: 0,
	            interval: 10,
	            boundaryGap: [0.2, 0.2]
	        },
		    // Declare several bar series, each will be mapped
		    // to a column of dataset.source by default.
		    series: []
		};
		  
		for(var i = 0; i<data.length; i++){
			// 년도별 구분 설정
			option.dataset.source[0].push(data[i].text);
			var series = {
		            type: 'bar',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'inside'
		                }
		            }
		        };
			option.series.push(series);
			for(var j = 0; j<data[i].middleNesin.length; j++){
				option.dataset.source[j+1].push(data[i].middleNesin[j].score);
			}
		}

		myAllScoreChart.setOption(option);
		myAllScoreChart.resize();
		 
		var option = {
				title: {
			        text: '과목별 통계'
			    },
		        legend: {
		        	selected:{
		        		'국어' : true,
		        		'영어' : false,
		        		'수학' : false,
		        		'과학' : false,
		        		'사회' : false,
		        		'역사' : false,
		        	},
		        	top: 40
		        },
		        grid: {
		        	top: 100,
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
		        tooltip: {
		            trigger: 'axis'
		        },
		        dataset: {
		            source: [
		                ['year'],
		                ['국어'],
		                ['영어'],
		                ['수학'],
		                ['과학'],
		                ['사회'],
		                ['역사']
		            ]
		        },
		        xAxis: {type: 'category'},
		        yAxis: {
		            type: 'value',
		            scale: true,
		            max: 100,
		            min: 0,
		            interval: 20,
		            boundaryGap: [0.2, 0.2],
		            gridIndex: 0
		        },
		        series: [
		        	{
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            },
		            {
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            },
		            {
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            },
		            {
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            },
		            {
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            },
		            {
		                type: 'line', smooth: false, seriesLayoutBy: 'row',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top'
		                    }
		                }
		            }
		        ]
		    };
		
		for(var i = 0; i<data.length; i++){
			option.dataset.source[0].push(data[i].text);
			for(var j = 0; j<data[i].middleNesin.length; j++){
				option.dataset.source[j+1].push(data[i].middleNesin[j].score);
			}
		}

		myAllSubjectChart.setOption(option);
		myAllSubjectChart.resize();
		  
	  },
	  highAllChartSet: function(data){
		  var option = {
					title: {
				        text: '평균 내신 등급'
				    },
			        legend: {
			        	show: false
			        },
			        color: ['#3e8ef7'],
			        grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
			        tooltip: {
			            trigger: 'axis'
			        },
			        dataset: {
			            source: [
			                ['year'],
			                ['평균 내신 등급']
			            ]
			        },
			        xAxis: {type: 'category'},
			        yAxis: {
			            type: 'value',
			            scale: true,
			            max: 9,
			            min: 1,
			            inverse : true,
			            interval: 1,
			            boundaryGap: [0.2, 0.2],
			            gridIndex: 0
			        },
			        series: [
			        	{
			                type: 'line', smooth: false, seriesLayoutBy: 'row',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'top'
			                    }
			                }
			            }
			        ]
			    };
		    var reverse = data.reverse();
			for(var i = 0; i<reverse.length; i++){
				option.dataset.source[0].push(reverse[i].text);
				option.dataset.source[1].push(reverse[i].highAverage);
			}

			myAllRatingChart.setOption(option);
			myAllRatingChart.resize();
	  },
	  telPhone: function(tel){
		  return 'tel:' + tel; 
	  } 
  }
})

var studentOneRoot = studentOneVue.$root;