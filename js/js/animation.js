//匀速动画封装函数
function animation(obj,attr,iTarget){
    //防止用户多次点击
    clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	//获取当前该属性的值
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == "opacity"){//判断是否为透明度属性,将其转为百分制
			current = Math.round(current*100);
		}
		if(current < iTarget){//运动方向取值
        	iSpeed = 6;
		}else{
			iSpeed = -6;
		}
		if(Math.abs(iTarget - current) < Math.abs(iSpeed)){//动画的终止条件
        	if(attr == "opacity"){//判断是否为透明度属性
           		obj.style[attr] = 1;
        	}else{
            	obj.style[attr] = iTarget + "px";
        	}				
        	clearInterval(obj.timer);
		}else{//动画不终止
			if(attr == "opacity"){//判断是否为透明度属性
				obj.style[attr] = (current + iSpeed) / 100;
			}else{
            	obj.style[attr] = current + iSpeed +"px";
			}				
		}
    },30);		
}
 
//获取垂直方向上的滚动距离
function getScroll(){
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

//获取水平方向上的滚动距离
function getScrollLeft(){
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}

//综合动画完善
function animate(obj,options,isLinear,fnEnd){
		//默认情况下做匀速动画
		if(isLinear == undefined){
			isLinear = true;
		}
		//防止用户多次点击
    	clearInterval(obj.timer);
    	//初始化速度
    	var iSpeed = 0;
		obj.timer = setInterval(function(){
			//是否终止所有动画
			var isStopAll = true;
			for(attr in options){
				//判断是否终止当前动画
				var isStopCurrent = false;
				//获取当前该属性的值
				var current = parseFloat(getComputedStyle(obj,false)[attr]);
				//处理透明度取值
				if(attr == "opacity"){
					current = Math.round(current*100);
				}
				//判断是匀速还是减速动画
				if(isLinear){//匀速动画
					//匀速动画取值
	                if(current < options[attr]){
	        			iSpeed = 6;
					}else{
						iSpeed = -6;
					}
					//动画的终止条件
					if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
						//处理透明度和非透明度的取值
			        	if(attr == "opacity"){
			           		obj.style[attr] = 1;
			        	}else{
			            	obj.style[attr] = options[attr] + "px";
			        	}
			        	//终止当前动画
			        	isStopCurrent = true;				
					}else{
						//还有动画没有执行完毕，不能终止所有动画
						isStopAll = false;
					}
				}else{//减速动画
					//减速动画取值
					iSpeed = (options[attr] - current)/10;
					iSpeed = iSpeed>0 ?	Math.ceil(iSpeed) : Math.floor(iSpeed);
					//减速动画终止条件
					if(!iSpeed){
						//终止当前动画
	            		isStopCurrent = true;
					}else{
						//还有动画没有执行完毕，不能终止所有动画
						isStopAll = false;
					}
				}
				if(!isStopCurrent){//动画执行过程
					//处理透明度和非透明度的动画执行过程
					if(attr == "opacity"){
						obj.style[attr] = (current + iSpeed) / 100;
					}else{
	                   	obj.style[attr] = current + iSpeed + "px";
					}	
				}	
			}
			if(isStopAll){//所有动画执行完毕
				//清除定时器
				clearInterval(obj.timer);
				typeof fnEnd == "function" && fnEnd();
			}						
		},30);		
    }