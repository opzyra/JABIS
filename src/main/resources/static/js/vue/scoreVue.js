var scoreVue = new Vue({
  el: '#scoreVue',
  data: {
	studentIdx: 0,
    name: '',
    school:'-',
    grade: 0,
    gradeCode: 0,
    hrtName: '-',
    typeName: '',
    mode: 0,
    students: [],
    myStudents: [],
    selected: false,
    dataSelected: false,
    isAll: false,
    chartShow: 0,
    scoreIdx: 0,
    score: [],
    scoreDetail: [],
    highAverage: 0,
    isMobile: false,
  },
  created: function(){
	  this.isMobile = isMobile();
	  var stdx = $("#studentIdx").val();
	  this.mode = $("#modeParam").val();
	  this.allStudentName().then(function(){
		  $("#name").val(stdx).trigger('change');
		  scoreRoot.students.map(function(x){
				if(x.idx == stdx){
					scoreRoot.school = x.school;
					scoreRoot.grade = x.grade;
					scoreRoot.gradeCode = x.gradeCode;
					scoreRoot.hrtName = x.hrtName;
					scoreRoot.name = x.name;
				}
			})
	  });
	  this.myStudentName();
	  
  },
  mounted: function(){
	  var stdx = $("#studentIdx").val();
	  this.studentIdx = stdx;
	  if(stdx !== ""){
		  this.studentIdx = stdx;
		  this.searchScore();
	  }
  },
  computed: {
	  isActive: function() {
		  return {
			  mNesin: this.mode == 0,
			  hNesin: this.mode == 1,
			  hMoi: this.mode == 2,
		  }
	  }  
  },
  methods: {
	  allStudentName: function(){
		  var deferred = $.Deferred();
		  axios.get('/api/student/names',{
			  params: {
				email: ''  
			  }})
	      .then(function(resp){
	    	  $("#name").val(null).trigger('change');
	    	  scoreRoot.students = resp.data;
	    	  
	    	  if($("#studentIdx").val() != scoreRoot.studentIdx){
	    		  scoreRoot.studentIdx = null;
	    		  scoreRoot.school = '-';
	    		  scoreRoot.hrtName = '-';
	    		  scoreRoot.grade = 0;
	    		  scoreRoot.gradeCode = 0;
	    	  }
	    	  
	    	  $("#name").unbind();
	    	  $("#name").select2("destroy");
	    	  $("#name").select2({
	    			placeholder: "이름",
	    		    allowClear: true,
	    			width: 235
	    		}).on('select2:select', function (e) {
	    			scoreRoot.selected = false;
	    			scoreRoot.studentIdx = e.params.data.id;
	    			scoreRoot.name = e.params.data.text;
	    			scoreRoot.students.map(function(x){
	    				if(x.idx == e.params.data.id){
	    					scoreRoot.school = x.school;
	    					scoreRoot.grade = x.grade;
	    					scoreRoot.gradeCode = x.gradeCode;
	    					scoreRoot.hrtName = x.hrtName;
	    					if(x.gradeCode == 1 || x.gradeCode == 2) {
	    						scoreRoot.mode = 0;
	    					}else {
	    						scoreRoot.mode = 1;
	    					}
	    				}
	    			})
	    		});
	    	  deferred.resolve();
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  return deferred.promise();
	  },
	  myStudentName: function(){
		  axios.get('/api/student/names',{
			  params: {
				email: $("#user").val()  
			  }})
	      .then(function(resp){
	    	  scoreRoot.myStudents = resp.data;
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  myStudentScore: function(idx){
		  this.studentIdx = idx;
		  $("#name").val(idx).trigger('change');
		  scoreRoot.students.map(function(x){
				if(x.idx == idx){
					scoreRoot.school = x.school;
					scoreRoot.grade = x.grade;
					scoreRoot.gradeCode = x.gradeCode;
					scoreRoot.hrtName = x.hrtName;
					if(x.gradeCode == 1 || x.gradeCode == 2) {
						scoreRoot.mode = 0;
					}else {
						scoreRoot.mode = 1;
					}
					
				}
			})
		  scoreRoot.students.map(function(x){
			  if(x.idx == scoreRoot.studentIdx){
				  scoreRoot.name = x.name;  
			  }  
		  })
		  this.searchScore();
	  },
	  switchStatus: function(status){
		  if(this.mode == status){
			  return;
		  }
		  this.mode = status;
		  this.dataSelected = false;
		  $("#scoreList").val(null).trigger('change');
		  this.searchScore();
		  
	  },
	  searchScore: function(){
		  if(this.studentIdx == 0){
			  swal("입력 항목 오류","학생 이름을 선택해주세요.","error");
			  return;
		  }
		  
		  axios.get('/api/score',{
			  params: {
				studentIdx: this.studentIdx,
				mode: this.mode
			  }})
	      .then(function(resp){

	    	  scoreRoot.score = resp.data;
	    	  scoreRoot.selected = true;
	    	  scoreRoot.scoreDetail = [];
	    	  scoreRoot.selectReset();
	    	  
	    	  if(scoreRoot.score.length == 0){
	    		  scoreRoot.dataSelected = false;
	    		  swal({
	    			  title: "데이터 없음",
	    			  text: "새로운 데이터를 등록하시겠습니까?",
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
	    			}).then(function(willDelete){
	    				if(willDelete){
	    					location.href='/app/score/create?studentIdx=' + scoreRoot.studentIdx + '&mode=' + scoreRoot.mode;
	    				}
	    			});
	    		  return;
	    	  }
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
		  
	  },
	  getScore: function(idx){
		  var api = '/api/score';
		  if(this.mode==0){
			  api += '/middle/nesin/' + idx;
		  }else if(this.mode==1){
			  api += '/high/nesin/' + idx;
		  }else{
			  api += '/high/moi/' + idx;
		  }
		  
		  axios.get(api)
	      .then(function(resp){
	    	  
	    	  
	    	  
	    	  if(scoreRoot.mode == 0){
	    		 scoreRoot.scoreDetail = resp.data;
	    		 scoreRoot.middleChartSet(scoreRoot.scoreDetail);
	    	  }else if(scoreRoot.mode == 1){
	    		  scoreRoot.scoreDetail = resp.data.highNesin;
	    		  scoreRoot.highAverage = resp.data.highAverage;
	    		  
	    		  scoreRoot.highChartSet(scoreRoot.scoreDetail);
	    	  }else{
	    		  scoreRoot.scoreDetail = resp.data;
	    		  scoreRoot.moiChartSet(scoreRoot.scoreDetail);
	    	  }
	    	  
	    	  
	    	  
	      }).catch(function(error){
	    	  if(error.response != undefined){
	    		  swal(error.response.data.swal);
	    	  }
	      });
	  },
	  getAllScore: function(){
		  if(this.mode==0){
			  axios.get('/api/score/middle/nesin/all/' + this.studentIdx)
		      .then(function(resp){

		    	  scoreRoot.middleAllChartSet(resp.data);
		    	  
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
			  
		  }else if(this.mode==1){
			  
			  this.highAllChartSet(this.score);
			  
		  }else{
			  
			  axios.get('/api/score/high/moi/all/' + this.studentIdx)
		      .then(function(resp){
		    	  
		    	  scoreRoot.moiAllChartSet(resp.data);
		    	  
		      }).catch(function(error){
		    	  if(error.response != undefined){
		    		  swal(error.response.data.swal);
		    	  }
		      });
			  
		  }
		  
		  
		  
	  },
	  selectReset: function(){

		  $("#scoreList").select2('destroy');
		  $("#scoreList").unbind();
		  
		  $("#scoreList").select2({
				placeholder: "성적 데이터",
				minimumResultsForSearch: -1
		  }).on('select2:select', function (e) {
			    scoreRoot.dataSelected = true;
				scoreRoot.typeName = e.params.data.text;
				scoreRoot.scoreIdx = e.params.data.id;
				if(e.params.data.id == 0){
					scoreRoot.getAllScore(e.params.data.id);
					scoreRoot.isAll = true;
				}else{
					scoreRoot.getScore(e.params.data.id);
					scoreRoot.isAll = false;
				}
		  });

	  },
	  middleChartSet: function(data){
		  
		  var option = {
				  title: {
				        text: '과목별 점수'
				    },
			    color:['#c23531','#2f4554'],
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
			    xAxis : [
			        {
			            type : 'category',
			            data : [],
			            
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type: 'value',
			            scale: true,
			            max: 100,
			            min: 0,
			            interval: 10,
			            boundaryGap: [0.2, 0.2]
			        }
			    ],
			    series : [
			        {
			            name:'원점수',
			            type:'bar',
			            barWidth: '60%',
			            data:[],
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            }
			        },
			        {
			            name:'과목평균',
			            type:'line',
			            data:[],
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            },
			        }
			    ]
			};

		  for(var loop=0; loop<data.length; loop++){
			  // 과목명 추가
			  option.xAxis[0].data.push(data[loop].name);
			  
			  // 원점수 추가
			  option.series[0].data.push(data[loop].score);
			  
			  // 과목평균 추가
			  option.series[1].data.push(data[loop].average);
		  }

		  myChart.setOption(option);
		  myChart.resize();
		  
	  },
	  highChartSet: function(data){		  
		  var option = {
		    title: {
		        text: '등급 현황'
		    },
		    color:['#3e8ef7'],
		    tooltip: {
		    	show: false
		    },
		    legend: {},
		    radar: {
		        name: {
		            textStyle: {
		                color: '#000',
		                borderRadius: 3,
		                padding: [3, 5],
		                fontSize: 12
		           }
		        },
		        indicator: []
		    },
		    series: [{
		        type: 'radar',
		        data : [
		            {
		                value : []
		            }
		        ]
		    }]
		};
		  for(var loop=0; loop<data.length; loop++){
			  // 과목명 추가
			  var indicator = { name: '', max: 1, min: 9};
			  indicator.name = data[loop].name + '(' + data[loop].rating + '등급)'; 
			  option.radar.indicator.push(indicator);
			  
			  // 등급
			  option.series[0].data[0].value.push(data[loop].rating);
		  }
		  
		  //모바일에 따라 크기 조정
		  if(isMobile()) {
		  
			  option.radar.radius = 60;
			  
		  }
		  
		  myHighRatingChart.setOption(option);
		  myHighRatingChart.resize();
		  
	  },
	  moiChartSet: function(data){		  
		  var option = {
		    title: {
		        text: '등급 현황'
		    },
		    color:['#3e8ef7'],
		    tooltip: {
		    	show: false
		    },
		    legend: {},
		    radar: {
		        name: {
		            textStyle: {
		                color: '#000',
		                borderRadius: 3,
		                padding: [3, 5],
		                fontSize: 12
		           }
		        },
		        indicator: []
		    },
		    series: [{
		        type: 'radar',
		        data : [
		            {
		                value : []
		            }
		        ]
		    }]
		};
		  for(var loop=0; loop<data.length; loop++){
			  // 과목명 추가
			  var indicator = { name: '', max: 1, min: 9};
			  indicator.name = data[loop].name + '(' + data[loop].rating + '등급)'; 
			  option.radar.indicator.push(indicator);
			  
			  // 등급
			  option.series[0].data[0].value.push(data[loop].rating);
		  }
		  
		  //모바일에 따라 크기 조정
		  if(isMobile()) {
		  
			  option.radar.radius = 60;
			  
		  }
		  
		  myMoiRatingChart.setOption(option);
		  myMoiRatingChart.resize();
		  
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
	  createScore: function(){
		  location.href='/app/score/create?studentIdx=' + this.studentIdx + '&mode=' + this.mode;
	  },
	  pdfScore: function(){
		  $('html').animate({scrollTop : 0}, 400, function(){
			  html2canvas(document.getElementById('scoreVue'), {
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
				        var modeName = '';
				        if(scoreRoot.mode == 0){
				        	modeName = '중등부 내신';
				        }else if(scoreRoot.mode == 1){
				        	modeName = '고등부 내신';
				        }else{
				        	modeName = '모의고사';
				        }
				        var fileName = scoreRoot.name + '_' + modeName + '_' + scoreRoot.typeName + '.pdf';
				        doc.save(fileName);
				  }
				});
		  });
		  
	  },
	  updateScore: function(){
		  if(this.mode == 0){
			  location.href='/app/score/update/mnesin?studentIdx=' + this.studentIdx + '&scoreIdx=' + this.scoreIdx;
		  }else if(this.mode == 1){
			  location.href='/app/score/update/hnesin?studentIdx=' + this.studentIdx + '&scoreIdx=' + this.scoreIdx;
		  }else{
			  location.href='/app/score/update/moi?studentIdx=' + this.studentIdx + '&scoreIdx=' + this.scoreIdx;
		  }
	  }
  }
})

var scoreRoot = scoreVue.$root;