(function(w){
	function kQuery(selector){
		return new kQuery.prototype.init(selector);
	}
	kQuery.fn = kQuery.prototype = {
		constructor:kQuery,
		init:function(selector){
			if(!selector){//布尔值为false
				return this;
			}
			else if(kQuery.isFunction(selector)){//函数
				this[0] = document;
				this.context = document;
				this.length = 1;
				document.addEventListener('DOMContentLoaded',selector);
				return this;
			}
			else if(kQuery.isString(selector)){//字符串
				if(kQuery.isHTML(selector)){
					var tempDiv = document.createElement('div');
					tempDiv.innerHTML = selector;
					for(var i=0;i<tempDiv.children.length;i++){
						this[i] = tempDiv.children[i]; 
					}
					this.length = tempDiv.children.length;
					return this;
				}else{
					var doms = document.querySelectorAll(selector);
					for(var i = 0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length = doms.length;
					return this;
				}
			}
			else if(kQuery.isArray(selector)){//数组
				for(var i=0;i<selector.length;i++){
					this[i] = selector[i];
				}
				this.length = selector.length;
				return this;
			}
			else{//对象(其他)
				this[0] = selector;
				this.context = document;
				this.length = 1;
				return this;
			}
		},	
		get:function(index){//get方法
			if(index || index == 0){
				if(kQuery.isNumber(index)){
					if(index >= 0){
						return this[index];
					}else{
						return this[this.length + index];
					}
				}
			}else{
				var arr = [];
				for(var i=0;i<this.length;i++){
					arr[i] = this[i];
				}
				return arr;
			}
		}
	}

	//extend方法
	kQuery.extend = kQuery.prototype.extend = function(options){
		for(var key in options){
			this[key] = options[key];
		}
	}
	
	/*
	kQuery.isFunction = function(str){
		return typeof str == "function";
	};
	kQuery.isString = function(str){
		return typeof str == "string";
	}
	kQuery.isHTML = function(str){
		return /<[^<>]+>/.test(str);
	} 
	kQuery.isArray = function(str){
		return typeof str == "object" && (length in str);
	};
	kQuery.isNumber = function(str){
		return typeof str == "number";
	};*/
	kQuery.extend({
		isFunction:function(str){
			return typeof str == "function";
		},
		isString:function(str){
			return typeof str == "string";
		},
		isHTML:function(str){
			return /<[^<>]+>/.test(str);
		},
		isArray:function(str){
			return typeof str == "object" && (length in str);
		},
		isNumber:function(str){
			return typeof str == "number";
		}
	})

	kQuery.fn.init.prototype = kQuery.fn;
	w.kQuery = w.$ = kQuery;
})(window)