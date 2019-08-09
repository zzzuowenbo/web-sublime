(function($){
	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$tabItems = this.$elem.find('.tab-item');
		this.$tabPanels = this.$elem.find('.tab-panel');
		this.$itemLength = this.$tabItems.length;
		this.now = this._getCorrectIndex(this.options.activeIndex);
		this.timer = 0;
		this.init();
	}

	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this = this;
			this.$tabItems.eq(this.now).addClass('tab-item-active');
			this.$tabPanels.eq(this.now).show();
			this.$tabPanels.showHide(this.options);
			this.$elem.trigger('tab-show',[this.now,this.$tabPanels.eq(this.now)]);
			this.$tabPanels.on('show',function(ev){
				_this.$elem.trigger('tab-show',[_this.$tabPanels.index(this),this]);
			})
			var eventType = '';
			if(this.options.eventName == 'click'){
				eventType = 'click';
			}else{
				eventType = 'mouseenter';
			}
			this.$elem.on(eventType,'.tab-item',function(){
				var index = _this.$tabItems.index(this);
				_this._toggle(index);
			});
			if(this.options.autoplay){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
			}
		},
		_toggle:function(index){
			this.$tabItems.eq(this.now).removeClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('hide');
			this.$tabItems.eq(index).addClass('tab-item-active');
			this.$tabPanels.eq(index).showHide('show');
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
				this._toggle(this._getCorrectIndex(this.now+1));
			}.bind(this),this.options.autoplay)
		},
		paused:function(){
			clearInterval(this.timer);
		}
	}

	Tab.DEFAULTS = {
		activeIndex:0,
		js:false,
		mode:'fade',
		eventName:'click',
		// autoplay:1000
		autoplay:0
	}

	$.fn.extend({
		tab:function(options){
			this.each(function(){
				var $elem = $(this);
				var tab = $elem.data('tab');
				if(!tab){
					options = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($elem,options);
					$elem.data('tab',tab);
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}
			})
		}
	})
})(jQuery)