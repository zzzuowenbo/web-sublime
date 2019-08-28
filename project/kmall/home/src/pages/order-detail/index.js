require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var _side = require('pages/common/side');
var tpl = require('./index.tpl');
var _util = require('util');
var api = require('api');

var page = {
    ordersDetailParams:{
        orderNo:_util.getParamFromUrl('orderNo') || ''
    },    
    init:function(){
        this.$elem = $('.order-box');
        this.renderSide();
        this.loadOrderDetail();
        this.bindEvent();
    },
    renderSide:function(){
        _side.render('order-list')
    },
    loadOrderDetail:function(){
        var _this = this;
        api.getOrdersDetail({
            data:this.ordersDetailParams,
            success:function(order){
                _this.renderOrder(order)
            }
        })
    },
    renderOrder(order){
        if(order){
            order.createdTime = new Date(order.createdAt).toLocaleString();
            order.canPay = order.canCancel = order.status == 10;
            var html = _util.render(tpl,order);
            this.$elem.html(html);
        }else{
            this.$elem.html('<p class="empty-message">您找的订单去火星了!</p>')
        }
    },
    bindEvent:function(){
        var _this = this;
        this.$elem.on('click','.btn-cancel',function(){
            if(_util.showConfirm('您确定要取消该订单吗?')){
                var $this = $(this);
                api.updateOrdersStatus({
                    data:{
                        orderNo:$this.data('order-no'),
                        status:20
                    },
                    success:function(order){
                        _this.renderOrder(order)
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg)
                    }
                })
            }
        })
    }
}

$(function() {
    page.init()
})