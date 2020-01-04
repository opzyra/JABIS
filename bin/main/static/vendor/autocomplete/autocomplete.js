/**
A jQuery plugin for search hints

Author: Lorenzo Cioni - https://github.com/lorecioni
*/

(function($) {
	$.fn.autocomplete = function(params) {
		
		//Selections
		var currentSelection = -1;
		var currentProposals = [];
		
		//Default parameters
		params = $.extend({
			hints: [],
			placeholder: 'Search',
			width: 200,
			height: 16,
			showButton: true,
			buttonText: 'Search',
			onSubmit: function(text){},
			onBlur: function(){}
		}, params);

		//Build messagess
		this.each(function() {
			//Container
			var searchContainer = $(this)	

			//Proposals
			var proposals = $('<div></div>')
				.addClass('proposal-box')
				.css('top', 60);
			var proposalList = $('<ul></ul>')
				.addClass('proposal-list');

			proposals.append(proposalList);
			
			searchContainer.keydown(function(e) {
				switch(e.which) {
					case 38: // Up arrow
					e.preventDefault();
					$('ul.proposal-list li').removeClass('selected');
					if((currentSelection - 1) >= 0){
						currentSelection--;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					} else {
						currentSelection = -1;
					}
					
					if(currentSelection%5 == 4) {
						$('.proposal-box').scrollTop($('.proposal-box').scrollTop() - 287);
					}
					
					
					break;
					case 40: // Down arrow
					e.preventDefault();
					if((currentSelection + 1) < currentProposals.length){
						$('ul.proposal-list li').removeClass('selected');
						currentSelection++;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					}
					if(currentSelection%5 == 0) {
						$('.proposal-box').scrollTop((currentSelection/5)*287);
					}
					break;
					case 13: // Enter
						if(currentSelection > -1){
							var text = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).attr('data-name');
							$(this).val(text);
						}
						currentSelection = -1;
						proposalList.empty();
						params.onSubmit($(this).attr('data-name'));
						break;
					case 27: // Esc button
						currentSelection = -1;
						proposalList.empty();
						searchContainer.val('');
						break;
				}
			});
				
			searchContainer.bind("change paste keyup", function(e){
				if(e.which != 13 && e.which != 27 
						&& e.which != 38 && e.which != 40){				
					currentProposals = [];
					currentSelection = -1;
					proposalList.empty();
					if($(this).val() != ''){
						var word = "^" + $(this).val() + ".*";
						proposalList.empty();
						for(var test in params.hints){
							if(params.hints[test].name.match(word)){
								currentProposals.push(params.hints[test].name);
								var grade = params.hints[test].school == '미입력' ? '' :  params.hints[test].grade + '학년';
								var element = $('<li></li>')
									.html('<i class="icon wb-user m-r-5"></i>' + params.hints[test].name + '<smaill class="f-s-11 m-l-10">' + params.hints[test].school + ' ' + grade + '</smaill>')
									.addClass('proposal')
									.attr('data-name', params.hints[test].name)
									.click(function(){
										proposalList.empty();
										searchContainer.val($(this).attr('data-name'));
										navRoot.searchStudent();
									})
									.mouseenter(function() {
										$(this).addClass('selected');
									})
									.mouseleave(function() {
										$(this).removeClass('selected');
									});
								proposalList.append(element);
							}
						}
					}
				}
			});
			
			searchContainer.blur(function(e){
				currentSelection = -1;
				//proposalList.empty();
				params.onBlur();
			});
			
			//searchContainer.append(input);
			searchContainer.after(proposals);		
	
			//$(this).append(searchContainer);	
			

		});

		return this;
	};

})(jQuery);