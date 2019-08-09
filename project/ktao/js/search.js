(function($){
	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key] = val;
			this.count++;
		},
		getData:function(key){
			return this.data[key];
		}
	}

	function Search($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');
		this.timer = 0;
		this.jqXHR = null;
		this.isLoadedHTML = false;
		this.init();
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}

	Search.prototype = {
		constructor:Search,
		init:function(){
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(!this.getInputVal()){
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		autocomplete:function(){
			this.$searchLayer.showHide(this.options);
			if(this.options.delayGetData){
				this.$searchInput.on('input',function(){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.delayGetData)
				}.bind(this));
			}else{
				this.$searchInput.on('input',$.proxy(this.getData,this));
			}
			$(document).on('click',function(){
				this.hideLayer();
			}.bind(this));
			this.$searchInput.on('focus',function(){
				if(this.getInputVal()){
					this.showLayer();
				}			
			}.bind(this));
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			});	
			var _this = this;
			this.$elem.on('click','.search-item',function(){
				var val = $(this).html();
				_this.setInputVal(val);
				_this.submit();
			})
		},
		getData:function(){
			console.log("get data...");
			if(!this.getInputVal()){
				this.hideLayer();
				return;
			}
			if(this.jqXHR){
				this.jqXHR.abort();
			}

			if(cache.getData(this.getInputVal())){
				var cacheData = cache.getData(this.getInputVal())
				this.$elem.trigger('getData',cacheData);
				return;
			}
			console.log('trigger data...');

			this.jqXHR = $.ajax({
				url:this.options.url + this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'
			})

			.done(function(data){
				/*console.log(data);
				var html = '';
				for(var i=0;i<data.result.length;i++){
					html += '<li>'+data.result[i][0]+'</li>';
				}
				this.appendHTML(html);
				if(html == ''){
					this.hideLayer();
				}else{
					this.showLayer();
				}*/
				this.$elem.trigger('getData',data);	
				cache.addData(this.getInputVal(),data);		
			}.bind(this))
			.fail(function(err){
				this.$elem.trigger('getNoData');
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this))
		},
		appendHTML:function(html){
			this.$searchLayer.html(html);
			this.isLoadedHTML = !!html;
		},
		showLayer:function(){
			if(!this.isLoadedHTML) return;
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		setInputVal:function(val){
			this.$searchInput.val(val);
		}
	}

	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slide',
		delayGetData:200
	}

	$.fn.extend({
		search:function(options,val){
			this.each(function(){
				var $elem = $(this);
				var search = $elem.data('search');
				if(!search){
					options = $.extend({},Search.DEFAULTS,options);
					search = new Search($elem,options);
					$elem.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options](val);
				}
			})
		}
	})
})(jQuery)