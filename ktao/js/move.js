(function($){
	function init($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));
	}

	function to(x,y,callback){
		x = (typeof x == "number") ? x : this.currentX;
		y = (typeof y == "number") ? y : this.currentY;
		// console.log(x,y);
		if(this.currentX == x && this.currentY == y) return;
		this.$elem.trigger('move');
		// console.log("move...");
		typeof callback == 'function' && callback();
		this.currentX = x;
		this.currentY = y;
	}

	function Slicent($elem){
		init.call(this,$elem);
	}
	Slicent.prototype = {
		constructor:Slicent,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem.css({
					left:x,
					top:y
				});
				this.$elem.trigger('moved');
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}

	function Js($elem){
		init.call(this,$elem);
	}
	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
		 			left:x,
					top:y
				},function(){
					this.$elem.trigger('moved');
				}.bind(this));
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}

	function getmove($elem,options){
		var move = null;
		if(options.js){
			move = new Js($elem);
		}else{
			move = new Slicent($elem);
		}
		// return move;
		return{
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		};
	}

	var DEFAULTS = {
		js:true,
	}

	//封装showHide插件
	$.fn.extend({
		move:function(options,x,y){
			return this.each(function(){//单例模式
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!moveObj){
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj);
				}
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y);
				}
			})
		}
	})
})(jQuery)