require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var api = require('api');
var _util = require('util');
var tpl = require('./index.tpl');

var page = {
    paymentsParams:{
        orderNo:_util.getParamFromUrl('orderNo')
    },    
    init:function(){
    	this.timer = 0;
        this.$elem = $('.payment-box');
        this.loadPayments();
    },
    loadPayments:function(){
    	var _this = this;
    	if(this.paymentsParams.orderNo){
    		api.getPayments({
    			data:{
    				orderNo:_this.paymentsParams.orderNo
    			},
    			success:function(payment){
    				var html = _util.render(tpl,payment);
    				_this.$elem.html(html);
    				_this.listenPaymentsStatus();
    			},
    			error:function(){
    				_this.$elem.html('<p class="empty-message">获取支付信息失败,请稍后再试!</p>');
    			}
    		})
    	}
    	else{
    		this.$elem.html('<p class="empty-message">没有订单,请重新跳转页面!</p>')
    	}
    },
    listenPaymentsStatus:function(){
    	var _this = this;
    	this.timer = setInterval(function(){
    		api.getPaymentsStatus({
    			data:{
    				orderNo:_this.paymentsParams.orderNo
    			},
    			success:function(result){
    				if(result){
    					clearInterval(_this.timer);
    					window.location.href = './result.html?type=payment&orderNo='+_this.paymentsParams.orderNo;
    				}
    			}
    		})
    	},1000)
    }
}

$(function() {
    page.init()
})