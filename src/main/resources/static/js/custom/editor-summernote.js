(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/forms/editor-summernote', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.formsEditorSummernote = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  (function () {
    (0, _jquery2.default)("#contents").summernote({
    	lang: 'ko-KR',
    	height: 500,
    	toolbar: [
    	    // [groupName, [list of button]]
    	    ['fontsize', ['fontsize']],
    	    ['style', ['bold', 'italic', 'underline', 'clear','hr']],
    	    ['color', ['color']],
    	    ['para', ['ul', 'ol', 'paragraph']],
    	    ['height', ['height','table']],
    	    ['insert', ['picture','link']],
    	    ['help', ['help']]
    	  ],
	    callbacks: {
		    onImageUpload: function(files, editor, welEditable) {
		       const data = new FormData();
		       data.append("file", files[0]);
		       const maxSize  = 5 * 1024 * 1024    //5MB
			   let fileSize = 0;

			   const browser=navigator.appName;

			   if (browser=="Microsoft Internet Explorer") {
				  const oas = new ActiveXObject("Scripting.FileSystemObject");
				  fileSize = oas.getFile(files[0]).size;
			   } else {
				  fileSize = files[0].size;
			   }
 

			   if(fileSize > maxSize){
				   swal("파일 사이즈 오류", "5MB이하의 파일만 업로드가 가능합니다.", "error");
				   return;
			   }
		       
		       axios({
	                method: 'post',
	                url: '/api/upload/image',
	                data: data,
	                headers: {'Content-Type': 'multipart/form-data', csrfHeader: csrfToken }
	            }).then(function(resp){
	            	//img-responsive
	            	$('#contents').summernote("insertImage", resp.data.url, function ($image) {
	                    $image.css('width', $image.width() / 2);
	                    $image.addClass('img-responsive');
	                });
	            }).catch(function(error){
	            	swal(error.response.data.swal);
	            })
		    	
		      
		    }
		  }
    });
    
  })();


});