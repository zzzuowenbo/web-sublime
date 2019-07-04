//购物车效果
isCart();
function isCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoading = document.querySelector('.top .cart .cart-content .loading');
	var oText = document.querySelector('.top .cart .cart-content .text');
	oCart.onmouseenter = function(){
		oLoading.style.display = "block";
		animate(oCartContent,{height:100},true,function(){
			oLoading.style.display = "none";
			oText.style.display = "block";
		});
	}
	oCart.onmouseleave = function(){
		animate(oCartContent,{height:0},true,function(){
			oLoading.style.display = "none";
			oText.style.display = "none";
		});
	}
}
//显示导航栏下内容
isNav();
function isNav(){
	var aNavItem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var hideTimer = null;
	var loadingTime = null;
	var oContainer = oNavContent.querySelector('.container');
	for(var i=0;i<aNavItem.length-2;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = "1px solid #ccc";
			animate(oNavContent,{height:220},false,function(){
				oNavContent.style.overflow = "visible";
			});
			oContainer.innerHTML = '<div class="loading"></div>';
			var index = this.index;
			clearTimeout(loadingTime);
			//动态加载数据
			loadingTime = setTimeout(function(){
				loadData(index);
			},800);		
		}
		aNavItem[i].onmouseleave = function(){
			/*hideTimer = setTimeout(function(){
				oNavContent.style.overflow = "hidden";
				animate(oNavContent,{height:0},false,function(){
					oNavContent.style.borderTop = "none";
				});
			},300);*/
			hideNav();						
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		hideNav();
	}
	//加载数据函数
	function loadData(index){
		var data = aNavItemData[index];
		var html = '';
		html += '<ul>'
		for(var i=0;i<data.length;i++){
			html +=		'<li>';
	    	html +=         '<a href="'+data[i].url+'">';
	    	html +=            '<div class="img-box">';
	    	html +=              '<img src="'+data[i].src+'" alt="">';
	    	html +=            '</div>';
	    	html +=            '<p class="header-nav-name">'+data[i].name+'</p>';
	    	html +=            '<p class="header-nav-price">'+data[i].price+'元</p>';
	    	if(data[i].tag){
	    		html +=            '<span class="tag">'+data[i].tag+'</span>';
	    	}	    	
	    	html +=         '</a>';
	    	html +=     '</li>';
		}		
        html += '</ul>'
		oContainer.innerHTML = html;
	}
	//隐藏列表共通函数
	function hideNav(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = "hidden";
			animate(oNavContent,{height:0},false,function(){
				oNavContent.style.borderTop = "none";
			});
		},300);
	}
}
//轮播图
isCoursel();
function isCoursel(){
	new Coursel({
		id:"box",
		width:1228,
		height:462,
		img:["./img/b1.jpg","./img/b2.jpg","./img/b3.jpg"],
		playtime:1000
	});
}
//显示左侧面板内容
isHandle();
function isHandle(){
	var oLeftItem = document.querySelectorAll('.home .big .left .list-left');
	var oLeftContent = document.querySelector('.home .big .big-box .left-content');
	var oBigBox = document.querySelector('.home .big .big-box');
	for(var i=0;i<oLeftItem.length;i++){
		oLeftItem[i].index = i;
		oLeftItem[i].onmouseenter = function(){
			for(var j=0;j<oLeftItem.length;j++){
				oLeftItem[j].className = "list-left";
			}
			oLeftContent.style.display = "block";
			this.className = "list-left active";
			loadData(this.index);
		}
	}
	oBigBox.onmouseleave = function(){
		for(var j=0;j<oLeftItem.length;j++){
			oLeftItem[j].className = "list-left";
		}
		oLeftContent.style.display = "none";
	}
	function loadData(index){
		var data = oLeftItemData[index];
		var html = "";
		html += '<ul>';
		for(var i=0;i<data.length;i++){
			html +=     '<li>';
        	html +=         '<a href="'+data[i].url+'">';
        	html +=            '<img src="'+data[i].src+'" alt="">';
        	html +=            '<span>'+data[i].name+'</span>';
        	html +=         '</a>';
        	html +=     '</li>';
		}       
        html += '</ul>';
        oLeftContent.innerHTML = html;
	}
}
//倒计时部分
isCountDown();
function isCountDown(){
	var oTimerNum = document.querySelectorAll('.flash .flash-clock-num');
	var endTime = new Date("2019-06-04 23:59:59");
	var timer = null;
	function handleTimer(){
		var allSeconds = parseInt((endTime.getTime() - Date.now())/1000);
		if(allSeconds <= 0){
			allSeconds = 0;
			clearInterval(timer);
		}
		var hours = parseInt(allSeconds / 3600);
		var minutes = parseInt(allSeconds % 3600 / 60);
		var seconds = allSeconds % 3600 % 60;
		oTimerNum[0].innerHTML = to2Str(hours);
		oTimerNum[1].innerHTML = to2Str(minutes);
		oTimerNum[2].innerHTML = to2Str(seconds);
	}
	timer = setInterval(handleTimer,1000);	
	handleTimer();
	function to2Str(num){
		return num>=10 ? ""+num : "0"+num;
	}
}
//小米闪购左右滑动
isMove();
function isMove(){
	var oSpan = document.querySelectorAll('.flash .iconfont');
	var oRightName = document.querySelector('.flash .right-name');
	oSpan[1].onclick = function(){
		oRightName.style.marginLeft = "-978px";
	}
	oSpan[0].onclick = function(){
		oRightName.style.marginLeft = "0";
	}
}
//家电选项卡
isElec();
function isElec(){
	var oElecItem = document.querySelectorAll('.elec .elec-item');
	var oProductName = document.querySelector('.elec .product-name');
	loadData(0);
	for(var i=0;i<oElecItem.length;i++){
		oElecItem[i].index = i;
		oElecItem[i].onmouseenter = function(){
			for(var j=0;j<oElecItem.length;j++){
				oElecItem[j].className = "elec-item";
			}
			this.className = "elec-item elec-active";
			loadData(this.index);
		}		
	}
	function loadData(index){
		var data = oElecItemData[index];
		var html = "";
		for(var i=0;i<data.length-1;i++){
			html += '<li class="right-list right-list-bd">';
	        html +=     '<a href="'+data[i].url+'">';
	        html +=         '<img src="'+data[i].src+'" alt="">';
	        html +=         '<p class="right-list-name">'+data[i].name+'</p>';
	        html +=         '<p class="right-list-des">'+data[i].des+'</p>';
	        html +=         '<strong>'+data[i].strong+'元</strong>';
	        html +=         '<del>'+data[i].del+'元</del>';
	        html +=    '</a>';
	        if(data[i].flag){
	        	html +=     '<span class="flag '+data[i].flag.class+'">'+data[i].flag.name+'</span>';
	        }
	        if(data[i].views){
	        	html +=     '<div class="views">';
			    html +=         '<p class="commen">'+data[i].views.commen+'</p>';
			    html +=         '<p class="author">'+data[i].views.author+'</p>';
			    html +=     '</div>';
	        }	       
	        html += '</li>';
		}
		var lastData = data[data.length-1];
		html += '<li class="product-both">'
        html +=     '<div class="both-top">'
        html +=         '<p class="both-top-name">'+lastData.topname+'</p>'
        html +=         '<strong>'+lastData.strong+'</strong>'
        html +=         '<img src="'+lastData.src+'" alt="">'
        html +=     '</div>'
        html +=     '<div class="both-bottom">'
        html +=         '<p class="watch-more">'+lastData.watchmore+'</p>'
        html +=         '<p class="hotter">'+lastData.hotter+'</p>'
        html +=         '<i class="iconfont">'+lastData.icon+'</i>'
        html +=     '</div>'
        html += '</li>'
		oProductName.innerHTML = html;
	}
}