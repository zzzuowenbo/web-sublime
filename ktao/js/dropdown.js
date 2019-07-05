(function($){
	function Dropdown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.timer = 0;
		this.$layer = this.$elem.find('.dropdown-layer');
		this.activeClass = this.$elem.data('active') + '-active';
		this.init();
	}

	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			this.$layer.showHide(this.options);
			this.$layer.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-' + ev.type);
			}.bind(this));
			if(this.options.eventName == 'click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				})
				$(document).on('click',function(){
					this.hide();
				}.bind(this))
			}else{
			 	this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}		
		},
		show:function(){
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);
			}	
		},
		hide:function(){
			clearTimeout(this.delay);
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	}

	Dropdown.DEFAULTS = {
		js:true,
		mode:'slide',
		delay:300,
		eventName:'click'
	}

	$.fn.extend({
		dropdown:function(options){
			this.each(function(){
				var $elem = $(this);
				options = $.extend({},Dropdown.DEFAULTS,options);
				new Dropdown($elem,options);
			})
		}
	})
})(jQuery)