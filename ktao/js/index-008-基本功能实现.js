(function($){
	// 一次数据加载函数开始
	function loadHtmlOnce($elem,callback){
		var url = $elem.data('load');
		if(!url) return;
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);			
			})
		}
	}
	// 一次数据加载函数结束

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

	//加载一次数据开始
	function getDataOnce($elem,url,callback){
		var data = $elem.data('data');
		if(!data){
			$.getJSON(url,function(resdData){
				callback(resdData);
				$elem.data('data',resdData);
			})
		}else{
			callback(data);
		}
	}
	//加载一次数据结束

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
	// 轮播图与今日热销懒加载共通部分开始
	function courselLazyLoad($elem){
		var item = {};
		var totalNum = $elem.find('.carousel-img').length-1;
		var totalLoadedNum = 0;
		var loadFn = null;
		$elem.on('coursel-show',loadFn = function(ev,index,elem){
			if(!item[index]){
				$elem.trigger('coursel-load',[index,elem]);
			}
		});
		$elem.on('coursel-load',function(ev,index,elem){
			// console.log(index);
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
			item[index] = 'isLoaded';
			totalLoadedNum++;
			if(totalLoadedNum > totalNum){
				$elem.trigger('coursel-loaded');
			}
		});
		$elem.on('coursel-loaded',function(){
			$elem.off('coursel-show',loadFn);
		});
	}
	// 轮播图与今日热销懒加载共通部分结束

	var $coursel = $('.carousel .carousel-wrap');
	courselLazyLoad($coursel);
	$coursel.coursel({});
	/*轮播图区域结束*/

	/*今日热销区域开始*/
	var $todaysCoursel = $('.todays .carousel-wrap');
	courselLazyLoad($todaysCoursel);
	$todaysCoursel.coursel({});
	/*今日热销区域结束*/

	/*楼层部分开始*/
	// 楼层懒加载部分开始
	function floorImgLazyLoad($elem){
		var item = {};
		var totalNum = $elem.find('.floor-img').length-1;
		var totalLoadedNum = 0;
		var loadFn = null;
		$elem.on('tab-show',loadFn = function(ev,index,elem){
			if(!item[index]){
				$elem.trigger('tab-load',[index,elem]);
			}
		});
		$elem.on('tab-load',function(ev,index,elem){
			console.log(index);
			var $elem = $(elem);
			var $imgs = $elem.find('.floor-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','images/focus-carousel/placeholder.png');
				});
			});
			item[index] = 'isLoaded';
			totalLoadedNum++;
			if(totalLoadedNum > totalNum){
				$elem.trigger('tab-loaded');
			}
		});
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',loadFn);
		});
	}
	// 楼层懒加载部分结束

	// 楼层html懒加载部分开始
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeaderHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>'
		return html;
	}

	function buildFloorHeaderHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-hd">';
		html +=	'	<h2 class="floor-title fl">';
		html +=	'		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
		html +=	'		<span class="floor-title-text">'+oneFloorData.text+'</span>';
		html +=	'	</h2>';
		html +=	'	<ul class="tab-item-wrap fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
			html +=	'<li class="fl">';
			html +=	'	<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
			html +=	'</li>';
			if(i != oneFloorData.tabs.length - 1){
				html +=	'<li class="fl tab-divider"></li>';
			}
		}
		html +=	'	</ul>';
		html +=	'</div>';
		return html;
	}

	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0;i<oneFloorData.items.length;i++){
			html +=	'	<ul class="tab-panel clearfix">';
			for(var j = 0;j<oneFloorData.items[i].length;j++){
				html +=	'		<li class="floor-item fl">';
				html +=	'			<p class="floor-item-pic">';
				html +=	'				<a href="#">';
				html +=	'					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html +=	'				</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-name">';
				html +=	'				<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+' </p>';
				html +=	'		</li>';
			}
			html +=	'	</ul>';
		}
		html +=	'</div>';
		return html;
	}

	function floorHtmlLazyLoad(){
		var item = {};
		var totalNum = $floor.length-1;
		var totalLoadedNum = 0;
		var loadFn = null;
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			if(!item[index]){
				$doc.trigger('floor-load',[index,elem]);
			}
		});
		$doc.on('floor-load',function(ev,index,elem){
			console.log(index);
			getDataOnce($doc,'data/floor/floorData.json',function(data){
				var html = buildFloorHtml(data[index]);
				$(elem).html(html);
				floorImgLazyLoad($(elem));
				$(elem).tab({});
			})
			item[index] = 'isLoaded';
			totalLoadedNum++;
			if(totalLoadedNum > totalNum){
				$doc.trigger('floor-loaded');
			}
		});
		$doc.on('floor-loaded',function(){
			$doc.off('floor-show',loadFn);
		});
	}
	// 楼层html懒加载部分结束

	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop());
	}
	var $floor = $('.floor');
	var $win = $(window);
	var $doc = $(document);
	floorHtmlLazyLoad();
	/*$doc.on('floor-show',function(ev,index,elem){
		console.log(index,elem);
	})*/
	function timeToShow(){
		$floor.each(function(index,elem){
		// floorImgLazyLoad($(this));
			if(isVisible($(elem))){
				$doc.trigger('floor-show',[index,elem]);
			}		
		})
	}
	$win.on('load scroll resize',function(){
		clearTimeout($floor.showTimer);
		$floor.showTimer = setTimeout(timeToShow,200);
	})
	/*$floor.on('tab-show',function(ev,index,elem){
		console.log(index,elem);
	});*/
	// $floor.tab({});
	/*楼层部分结束*/
})(jQuery)