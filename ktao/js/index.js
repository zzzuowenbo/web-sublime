(function($){
	// 一次数据加载函数
	function loadHtmlOnce($elem,callback){
		var url = $elem.data('load');
		if(!url) return;
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);			
			})
		}
	}

	/*顶部导航区域开始*/
	var $topDropdown = $('.top .dropdown');
	$topDropdown.dropdown({
		js:true,
		mode:'slide'
	});
	//数据加载
	$topDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildTopLayer);
		}
	});
	// 头部下拉列表一次数据加载
	function buildTopLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		var html = '';
		for(var i=0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
		}
		setTimeout(function(){
			$layer.html(html);
			$elem.data('isLoaded',true);
		},1000);
	}
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

	/*分类列表开始*/
	var $categoryDropdown = $('.focus .dropdown');
	$categoryDropdown.dropdown({
		js:true,
		mode:'fade'
	});
	$categoryDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildCategoryLayer);
		}
	});
	// 左侧下拉列表一次数据加载
	function buildCategoryLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		var html = '';
		for(var i=0;i<data.length;i++){
			html += '<dl class="category-details">'
			html +=		'<dt class="category-details-title fl">'
			html +=			'<a href="#" class="category-details-title-link">'+data[i].title+'</a>'
			html +=		'</dt>'
			html +=		'<dd class="category-details-item fl">'
			for(var j=0;j<data[i].items.length;j++){
				html +=			'<a href="#" class="link">'+data[i].items[j]+'</a>'
			}
			html +=		'</dd>'
			html +=	'</dl>'
		}
		setTimeout(function(){
			$layer.html(html);
			$elem.data('isLoaded',true);
		},1000);
	}
	/*分类列表结束*/

	var $coursel = $('.carousel .carousel-wrap');
	$coursel.coursel({});
})(jQuery)