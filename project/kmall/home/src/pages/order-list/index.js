require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');

var _side = require('pages/common/side');
var tpl = require('./index.tpl');
var _util = require('util');
var api = require('api');

var page = {
    ordersListParams:{
        page:_util.getParamFromUrl('page') || 1
    },    
    init:function(){
        this.renderSide();
        this.initPagination();
        this.loadOrderList();
    },
    renderSide:function(){
        _side.render('order-list')
    },
    initPagination:function(){
        var _this = this;
        this.$pagination = $('.pagination-box');
        this.$pagination.on('page-change',function(ev,page){
            _this.ordersListParams.page = page;
            _this.loadOrderList();
        })
        this.$pagination.pagination();
    },
    loadOrderList:function(){
        var _this = this;
        api.getOrdersList({
            data:this.ordersListParams,
            success:function(result){
                console.log(result);
                if(result.list.length > 0){
                    result.list.forEach(function(order){
                        order.createdTime = new Date(order.createdAt).toLocaleString()
                    })
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.order-box').html(html);
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    $('.order-box').html('<p class="empty-message">您还没有订单!</p>')
                }
            }
        })
    }
}

$(function() {
    page.init()
})