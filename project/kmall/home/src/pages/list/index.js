require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');

var api = require('api');
var _util = require('util');
var tpl = require('./index.tpl');

var page = {
	productsListParams:{
		category:_util.getParamFromUrl('categoryId'),
		keyword:_util.getParamFromUrl('keyword'),
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
    init:function(){
    	this.initPagination();
    	this.bindEvent();
        this.loadProductList();
    },
    initPagination:function(){
        var _this = this;
    	this.$pagination = $('.pagination-box');
    	this.$pagination.on('page-change',function(ev,page){
            _this.productsListParams.page = page;
            _this.loadProductList();
        });
        this.$pagination.pagination();
    },
    bindEvent:function(){
    	var _this = this;
    	$('.sort-item').on('click',function(){
    		var $this = $(this);
    		//默认排序
    		if($this.hasClass('default')){
    			if($this.hasClass('active')){
    				return;
    			}
    			$this.addClass('active')
    			.siblings('.sort-item').removeClass('active');
    			_this.productsListParams.orderBy = 'default';
    		}
    		//价格排序
    		else if($this.hasClass('price')){
    			$this.addClass('active')
    			.siblings('.sort-item').removeClass('active');
    			if($this.hasClass('asc')){
    				$this.removeClass('asc')
    				.addClass('desc')
    				_this.productsListParams.orderBy = 'price_desc';
    			}else if($this.hasClass('desc')){
    				$this.removeClass('desc')
    				.addClass('asc')
    				_this.productsListParams.orderBy = 'price_asc';
    			}
    		}
    		_this.productsListParams.page = 1;
    		_this.loadProductList();
    	})
    },
    loadProductList:function(){
    	var _this = this;
        api.getProductsList({
        	data:this.productsListParams,
            success:function(result){
            	if(result.list.length > 0){
            		var html = _util.render(tpl,{
                    	list:result.list
                	})
                	$('.product-list-box').html(html);
                	_this.$pagination.pagination('render',{
                		current:result.current,
                		total:result.total,
                		pageSize:result.pageSize               		
                	})
            	}else{
            		$('.product-list-box').html('<p class="empty-message">您找的商品不存在!</p>');
            	}
            }
        })
    }
}

$(function(){
    page.init()
})