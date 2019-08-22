require('pages/common/logo');
require('pages/common/footer');
require('./index.css');

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this;
		$('#btn-submit').on('click',function(){
			_this.submit()
		});
		$('input').on('keyup',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
	},
	submit:function(){
		alert('111')
	}
}

$(function(){
	page.init()
})
