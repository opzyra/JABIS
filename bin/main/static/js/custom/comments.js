function modifyComments(node){
	
	$('.comments-view').css('display', 'inherit');
	$('.comments-modify').css('display', 'none');
	var parentNode = $(node).parents('.comment-title').next(); 
	parentNode.find('.comments-view').css('display', 'none');
	parentNode.find('.comments-modify').css('display', 'inherit');
	parentNode.find('.comments-modify-text').val(parentNode.find('.comments-view').html().trim().split('<br>').join('\n'));
}

function cancleModify(){
	$('.comments-view').css('display', 'inherit');
	$('.comments-modify').css('display', 'none');
}

function modifyAction(node){
	var parentNode = $(node).parents('.comment-content');
	var createIn = {};
	createIn.idx = $(node).attr('data-idx');
	createIn.contents = parentNode.find('.comments-modify-text').val().replace(/(\n|\r\n)/g, '<br>');
	axios.patch('/api/comments/' + createIn.idx, JSON.stringify(createIn))
    .then(function(resp){
    	cancleModify();
    	parentNode.find('.comments-view').html(createIn.contents);
    }).catch(function(error){
  	  if(error.response != undefined){
  		  swal(error.response.data.swal);
  	  }
    });

}

function deleteComments(node){
	swal({
	  title: "댓글 삭제",
	  text: "해당 댓글을 삭제하시겠습니까?",
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
			var idx = $(node).attr('data-idx');
			axios.delete('/api/comments/' + idx)
		    .then(function(resp){
		    	swal(resp.data.swal).then(function(){
		    		location.reload();
		    	})
		    }).catch(function(error){
		  	  if(error.response != undefined){
		  		  swal(error.response.data.swal);
		  	  }
		    });
		}
	});
	
}