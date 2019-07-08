(function($){
	/*顶部导航区域开始*/
	var $dropdown = $('.dropdown');
	// var isloaded = false;
	$dropdown.dropdown({
		js:true,
		mode:'slide'
	});
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			if(!url) return;
			if(!$elem.data('isLoaded')){
				$.getJSON(url,function(data){
					console.log(data);
					var html = '';
					for(var i=0;i<data.length;i++){
						html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
					}
					setTimeout(function(){
						$layer.html(html);
						$elem.data('isLoaded',true);
					},1000);			
				})
			}
			
		}
	});

	/*$('button').on('click',function(){
		$dropdown.dropdown('show');
	});*/
	/*顶部导航区域结束*/

	/*头部区域开始*/
	var $search = $('.search');
	$search.on('getData',function(ev,data){
		var $elem = $(this);
		var $layer = $elem.find('.search-layer');
		var data = data.result;
		var html = createSearchLayer(data,10);
		$elem.search('appendHTML',html);
		if(html == ''){
			$elem.search('hideLayer');
		}else{
			$elem.search('showLayer');
		}
	})
	$search.on('getNoData',function(ev){
		$elem.search('appendHTML','');
		$elem.search('hideLayer');
	})
	$search.search({});
	function createSearchLayer(data,max){
		var html = '';
		for(var i=0;i<data.length;i++){
			if(i>=max) break;
			html += '<li class="search-item">'+data[i][0]+'</li>';
		}
		return html;
	}
	/*头部区域结束*/
})(jQuery)