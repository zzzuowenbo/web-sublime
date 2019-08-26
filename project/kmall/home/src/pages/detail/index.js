require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var api = require('api');
var _util = require('util');
var tpl = require('./index.tpl');

var page = {
    productsDetailParams:{
        id:_util.getParamFromUrl('productId')
    },    
    init:function(){
        this.$elem = $('.detail-box');
        this.bindEvent();
        this.productsDetail();
    },
    bindEvent:function(){
        var _this = this; 
        this.$elem.on('mouseenter','.product-small-img-item',function(){
            var $this = $(this);
            //小图片样式切换
            $this.addClass('active')
            .siblings('.product-small-img-item').removeClass('active')
            //大图切换地址
            var imgSrc = $this.find('img').attr('src');
            $('.product-main-img img').attr('src',imgSrc);
        })
        this.$elem.on('click','.count-btn',function(){
            var $this = $(this);
            var $input = $('.count-input');
            var current = parseInt($input.val());
            //增加数量
            if($this.hasClass('plus')){
                $input.val(current == _this.stock ? _this.stock : current+1);
            }
            //减少数量
            else if($this.hasClass('minus')){
                $input.val(current == 1 ? 1 : current-1);
            }
        })
        this.$elem.on('click','.add-cart-btn',function(){
            api.addCarts({
                data:{
                    productId:_this.productsDetailParams.id,
                    count:$('.count-input').val()
                },
                success:function(){
                    _util.goResult('addCart')
                }
            })
        })
    },
    productsDetail:function(){
        if(!this.productsDetailParams.id){
            return;
        }
        var _this = this;
        api.getProductsDetail({
            data:this.productsDetailParams,
            success:function(product){
                if(product){
                    _this.stock = product.stock;
                    product.images = product.images.split(',');
                    product.activeImage = product.images[0];
                    var html = _util.render(tpl,product);
                    _this.$elem.html(html);
                }else{
                    _this.$elem.html('<p class="empty-message">您找的商品不存在!</p>');
                }
            }
        })
    }
}

$(function() {
    page.init()
})