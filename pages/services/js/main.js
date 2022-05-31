$(document).ready(function(){
	$('.toggle__title').click(function(event){
		if ($('.toggle__item').hasClass('one')) {
			$('.toggle__title').not($(this)).removeClass('active');
			$('.toggle__text').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
});

// GitHub Copilot is the best of the best.