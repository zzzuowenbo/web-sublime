(function($){
	function Coursel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$courselItem= this.$elem.find('.carousel-item');
		this.$courselBtn= this.$elem.find('.btn-item');
		this.$courselControl= this.$elem.find('.control');
		this.$itemLength = this.$courselItem.length;
		this.now = this._getCorrectIndex(this.options.activeIndex);
		this.timer = 0;
		this.init();
	}

	Coursel.prototype = {
		constructor:Coursel,
		init:function(){
			this.$courselItem.trigger("coursel-show",[this.now,this.$courselItem.eq(this.now)]);
			var _this = this;
			if(this.options.slide){
				this.$elem.addClass('slide');
				this.$courselItem.eq(this.now).css({left:0});
				this.itemWidth = this.$courselItem.eq(this.now).width();			
				this.$courselItem.move(this.options);
				this._tab = this._toggle;
				this.$courselItem.on('move',function(ev){
					var index = _this.$courselItem.index(this);
					if(_this.now != index){
						_this.$courselItem.trigger("coursel-show",[index,this]);
					}
				});
			}else{
				this.$elem.addClass('fade');
				this.$courselItem.eq(this.now).show();
				this.$courselBtn.eq(this.now).addClass('active');
				this.$courselItem.showHide(this.options);
				this._tab = this._fade;
				this.$courselItem.on('show',function(ev){
					var index = _this.$courselItem.index(this);
					_this.$courselItem.trigger("coursel-show",[index,this]);
				});
			}
			// 共通部分
			this.$courselBtn.eq(this.now).addClass('active');
			this.$elem.hover(function(){
				this.$courselControl.show();
			}.bind(this),function(){
				this.$courselControl.hide();
			}.bind(this));
			this.$elem.on('click','.control-left',function(){
				this._tab(this._getCorrectIndex(this.now-1),-1);
			}.bind(this));
			this.$elem.on('click','.control-right',function(){
				this._tab(this._getCorrectIndex(this.now+1),1);					
			}.bind(this));
			if(this.options.autoplay){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
			}
			this.$courselBtn.on('click',function(){
				var index = _this.$courselBtn.index(this);
				_this._tab(index);
			});
		},
		_fade:function(index){
			if(index == this.now) return;
			// console.log(index);
			this.$courselItem.eq(this.now).showHide('hide');
			this.$courselItem.eq(index).showHide('show');
			this.$courselBtn.eq(this.now).removeClass('active');
			this.$courselBtn.eq(index).addClass('active');
			this.now = index;
		},
		_toggle:function(index,direction){
			if(index == this.now) return;
			if(index > this.now){
				direction = 1;
			}else{
				direction = -1;
			}
			this.$courselItem.eq(index).css({left:direction*this.itemWidth});
			this.$courselItem.eq(this.now).move('x',-1*direction*this.itemWidth);
			this.$courselItem.eq(index).move('x',0);
			this.$courselBtn.eq(this.now).removeClass('active');
			this.$courselBtn.eq(index).addClass('active');
			this.now = index;
		},
		_getCorrectIndex:function(num){
			if(num >= this.$itemLength) return 0;
			if(num < 0) return this.$itemLength-1;
			return num;
		},
		autoplay:function(){
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				this.$courselControl.eq(1).trigger('click');
			}.bind(this),this.options.autoplay)
		},
		paused:function(){
			clearInterval(this.timer);
		}
	}

	Coursel.DEFAULTS = {
		slide:true,
		activeIndex:0,
		js:true,
		mode:'fade',
		// autoplay:1000
		autoplay:0
	}

	$.fn.extend({
		coursel:function(options){
			this.each(function(){
				var $elem = $(this);
				var coursel = $elem.data('coursel');
				if(!coursel){
					options = $.extend({},Coursel.DEFAULTS,options);
					coursel = new Coursel($elem,options);
					$elem.data('coursel',coursel);
				}
				if(typeof coursel[options] == 'function'){
					coursel[options]();
				}
			})
		}
	})
})(jQuery)