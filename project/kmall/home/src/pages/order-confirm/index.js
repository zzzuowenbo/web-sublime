require('pages/common/search');
require('pages/common/footer');
require('pages/common/nav');
require('./index.css');

var api = require('api');
var _util = require('util');
var shippingTpl = require('./shipping.tpl');
var productTpl = require('./product.tpl');
var _modal = require('./modal.js');

var page = { 
    init:function(){
        this.selectedShippingId = '';
        this.$shippingBox = $('.shipping-box');
        this.$productBox = $('.product-box');
        this.loadShippingList();
        this.loadProductList();
        this.bindEvent();
    },
    loadShippingList:function(){
        var _this = this;
        api.getShippingsList({
            success:function(shippings){
                /*var html = _util.render(shippingTpl,{
                    shippings:shippings
                });
                _this.$shippingBox.html(html);*/
                _this.renderShipping(shippings);
            }
        })
    },
    renderShipping:function(shippings){
        var _this = this;
        shippings.forEach(function(shipping){
            if(shipping._id == _this.selectedShippingId){
                shipping.active = true;
            }
        })
        var html = _util.render(shippingTpl,{
            shippings:shippings
        });
        this.$shippingBox.html(html);
    },
    loadProductList:function(){
        var _this = this;
        api.getOrdersProducts({
            success:function(result){
                if(result.cartList.length > 0){
                    var html = _util.render(productTpl,result);
                    _this.$productBox.html(html); 
                }else{
                    _this.$productBox.html('<p class="empty-message">购物车中还没有选中的商品!</p>')  
                }
            },
            error:function(){
                _this.$productBox.html('<p class="empty-message">获取商品列表好像出错了,请稍后再试!</p>') 
            }
        })
    },
    bindEvent:function(){
        var _this = this;
        this.$shippingBox.on('get-shippings',function(ev,shippings){
            _this.renderShipping(shippings)
        })
        this.$shippingBox.on('click','.shipping-add',function(){
            _modal.show()
        })
        this.$shippingBox.on('click','.shipping-delete',function(ev){
            ev.stopPropagation();
            if(_util.showConfirm('您确定要删除该条地址吗?')){
                var $this = $(this);
                var shippingId = $this.parents('.shipping-item').data('shipping-id');
                api.deleteShippings({
                    data:{
                        id:shippingId
                    },
                    success:function(shippings){
                        _this.renderShipping(shippings);
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg);
                    }
                })
            }
        })
        this.$shippingBox.on('click','.shipping-edit',function(ev){
            ev.stopPropagation();
            var $this = $(this);
            var shippingId = $this.parents('.shipping-item').data('shipping-id');
            api.getShippingsDetail({
                data:{
                    id:shippingId
                },
                success:function(shipping){
                    _modal.show(shipping)
                }
            })
        })
        this.$shippingBox.on('click','.shipping-item',function(){
            var $this = $(this);
            $this.addClass('active')
            .siblings('.shipping-item').removeClass('active');
            _this.selectedShippingId = $this.data('shipping-id');
        })
        this.$productBox.on('click','.btn-submit',function(){
            if(_this.selectedShippingId){
                api.addOrders({
                    data:{
                        shippingId:_this.selectedShippingId
                    },
                    success:function(order){
                        window.location.href = "./payment.html?orderNo="+order.orderNo;
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg);
                    }
                })
            }
            else{
                _util.showErrorMsg('请选择地址后再提交!');
            }
        })
    }
}

$(function() {
    page.init()
})