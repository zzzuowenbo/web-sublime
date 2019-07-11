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

	function loadImage(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			typeof success == 'function' && success(imgUrl);
		}
		image.onerror = function(){
			typeof error == 'function' && error(imgUrl);
		}
		image.src = imgUrl;
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

	/*轮播图区域开始*/
	var $coursel = $('.carousel .carousel-wrap');
	$coursel.item = {};
	$coursel.totalNum = $coursel.find('.carousel-img').length-1;
	$coursel.totalLoadedNum = 0;
	$coursel.loadFn = null;
	$coursel.on('coursel-show',$coursel.loadFn = function(ev,index,elem){
		if(!$coursel.item[index]){
			$coursel.trigger('coursel-load',[index,elem]);
		}
	});
	$coursel.on('coursel-load',function(ev,index,elem){
		console.log(index);
		var $elem = $(elem);
		var $img = $elem.find('.carousel-img');
		var imgUrl = $img.data('src');
		loadImage(imgUrl,function(){
			$img.attr('src',imgUrl);
		},function(){
			$img.attr('src','images/focus-carousel/placeholder.png');
		});
		$coursel.item[index] = 'isLoaded';
		$coursel.totalLoadedNum++;
		if($coursel.totalLoadedNum > $coursel.totalNum){
			$coursel.trigger('coursel-loaded');
		}
	});
	$coursel.on('coursel-loaded',function(){
		$coursel.off('coursel-show',$coursel.loadFn);
	});
	$coursel.coursel({});
	/*轮播图区域结束*/

	/*今日热销区域开始*/
	var $todaysCoursel = $('.todays .carousel-wrap');
	$todaysCoursel.item = {};
	$todaysCoursel.totalNum = $todaysCoursel.find('.carousel-img').length-1;
	$todaysCoursel.totalLoadedNum = 0;
	$todaysCoursel.loadFn = null;
	$todaysCoursel.on('coursel-show',$todaysCoursel.loadFn = function(ev,index,elem){
		if(!$todaysCoursel.item[index]){
			$todaysCoursel.trigger('coursel-load',[index,elem]);
		}
	});
	$todaysCoursel.on('coursel-load',function(ev,index,elem){
		console.log(index);
		var $elem = $(elem);
		var $imgs = $elem.find('.carousel-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','images/focus-carousel/placeholder.png');
			});
		});
		$todaysCoursel.item[index] = 'isLoaded';
		$todaysCoursel.totalLoadedNum++;
		if($todaysCoursel.totalLoadedNum > $todaysCoursel.totalNum){
			$todaysCoursel.trigger('coursel-loaded');
		}
	});
	$todaysCoursel.on('coursel-loaded',function(){
		$todaysCoursel.off('coursel-show',$todaysCoursel.loadFn);
	});
	$todaysCoursel.coursel({});
	/*今日热销区域结束*/
})(jQuery)