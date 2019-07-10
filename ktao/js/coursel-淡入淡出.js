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
			if(this.options.slide){

			}else{
				this.$elem.addClass('fade');
				this.$courselItem.eq(this.now).show();
				this.$courselBtn.eq(this.now).addClass('active');
				this.$elem.hover(function(){
					this.$courselControl.show();
				}.bind(this),function(){
					this.$courselControl.hide();
				}.bind(this));
				this.$courselItem.showHide(this.options);
				this.$elem.on('click','.control-left',function(){
					this._fade(this._getCorrectIndex(this.now-1));
				}.bind(this));
				this.$elem.on('click','.control-right',function(){
					this._fade(this._getCorrectIndex(this.now+1));					
				}.bind(this));
				if(this.options.autoplay){
					this.autoplay();
					this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
				}
				var _this = this;
				this.$courselBtn.on('click',function(){
					var index = _this.$courselBtn.index(this);
					_this._fade(index);
				});
			}
		},
		_fade:function(index){
			if(index == this.now) return;
			console.log(index);
			this.$courselItem.eq(this.now).showHide('hide');
			this.$courselItem.eq(index).showHide('show');
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
		slide:false,
		activeIndex:0,
		js:true,
		mode:'fade',
		autoplay:1000
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