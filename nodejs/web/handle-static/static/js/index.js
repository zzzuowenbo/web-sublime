;(function($){
	var $input = $('.todo-input');
	$input.on('keydown',function(ev){
		if(ev.keyCode == 13){
			alert('aa');
		}
	})
})(jQuery)