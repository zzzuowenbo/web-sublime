(function($){
	function init($elem,hiddenCallback){
		if($elem.is(':hidden')){
			$elem.data('status','hidden');
			typeof hiddenCallback == 'function' && hiddenCallback();
		}else{
			$elem.data('status','shown');
		}
	}
	function show($elem,callback){
		if($elem.data('status') == 'show') return;
		if($elem.data('status') == 'shown') return;
		$elem.trigger('show').data('status','show');
		typeof callback == 'function' && callback();
	}
	function hide($elem,callback){
		if($elem.data('status') == 'hide') return;
		if($elem.data('status') == 'hidden') return;
		$elem.trigger('hide').data('status','hide');
		typeof callback == 'function' && callback();
	}

	var slient = {
		init:function($elem){
			init($elem);
		},
		show:function($elem){
			show($elem,function(){
				$elem.show();
				$elem.trigger('shown').data('status','shown');
			})
		},
		hide:function($elem){
			hide($elem,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');
			})
		}
	}

	var js = {
		fade:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'fadeIn');
			},
			hide:function($elem){
				js._hide($elem,'fadeOut');
			}
		},
		slide:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'slideDown');
			},
			hide:function($elem){
				js._hide($elem,'slideUp');
			}
		},
		slideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
				})
			},
			show:function($elem){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
				})
			}
		},
		fadeSlideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				})
			},
			show:function($elem){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				})
			}
		}
	}
	js._init = function($elem){
		$elem.removeClass('transition');
		init($elem);
	}
	js._show = function($elem,mode){
		show($elem,function(){
			$elem
			.stop()
			[mode](function(){
				$elem.trigger('shown').data('status','shown');
			})
		})
	}
	js._hide = function($elem,mode){
		hide($elem,function(){
			$elem
			.stop()
			[mode](function(){
				$elem.trigger('hidden').data('status','hidden');
			})
		})
	}
	js._customInit = function($elem,options){
		$elem.removeClass('transition');
		var styles = {};
		for(var key in options){
			styles[key] = $elem.css(key);
		}
		$elem.data('styles',styles)
		init($elem,function(){
			$elem.css(options)
		})
	}
	js._customShow = function($elem){
		$elem.show()
		show($elem,function(){
			$elem
			.stop()
			.animate($elem.data('styles'),function(){
				$elem.trigger('shown').data('status','shown');
			})
		})
	}
	js._customHide = function($elem,options){
		hide($elem,function(){
			$elem
			.stop()
			.animate(options,function(){
				$elem.trigger('hidden').data('status','hidden');
			})
		})
	}

	function getShowHide($elem,options){
		var showhideFn = slient;
		if(options.js){
			showhideFn = js[options.mode];
		}
		showhideFn.init($elem);
		return{
			show:showhideFn.show,
			hide:showhideFn.hide
		}
	}

	var DEFAULTS = {
		js:true,
		mode:'fade'
	}

	//封装showHide插件
	$.fn.extend({
		showHide:function(options){
			return this.each(function(){//单例模式
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj');
				if(!showHideObj){
					options = $.extend({},DEFAULTS,options);
					showHideObj = getShowHide($elem,options);
					$elem.data('showHideObj',showHideObj);
				}
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($elem);
				}
			})
		}
	})
})(jQuery)