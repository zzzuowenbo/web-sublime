var api = require('api');
var _util = require('util');
var modalTpl = require('./modal.tpl');

module.exports = {
	show:function(){
		this.$elem = $('.modal-box');
		this.loadModal();
		this.bindEvent();
	},
	loadModal:function(){
		var html = _util.render(modalTpl);
		this.$elem.html(html);
	},
	hideModal:function(){
		this.$elem.empty();
	},
	bindEvent:function(){
		var _this = this;
		this.$elem.on('click','.close',function(){
			_this.hideModal();
		})
		this.$elem.on('click','.modal-container',function(ev){
			ev.stopPropagation();
		})
	}
}