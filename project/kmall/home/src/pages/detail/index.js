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
                    product.images = product.images.split(',');
                    product.activeImage = product.images[0];
                    var html = _util.render(tpl,product);
                    _this.$elem.html(html);
                }else{
                    _this.$elem.html('<p class="empty-message">您找的商品不存在!</p>');
                }
            }
        })
    },
}

$(function() {
    page.init()
})