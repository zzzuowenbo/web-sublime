require('pages/common/logo');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var api = require('api');

var formErr = {
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text()
	},
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	}
}

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
		var formData = {
			username:$.trim($("[name='username']").val()),
			password:$.trim($("[name='password']").val())
		}
		var validateResult = this.validate(formData);
		if(validateResult.status){
			formErr.hide();
			/*$.ajax({
				url:'/sessions/users',
				method:'post',
				data:formData,
				dataType:'json',
				success:function(result){
					if(result.code == 0){
						window.location.href = "/"
					}else{
						formErr.show(result.message)
					}
				},
				error:function(err){
					formErr.show('网络错误,请稍后再试!')
				}
			})*/
			api.login({
				data:formData,
				success:function(data){
					window.location.href = _util.getParamFromUrl('redirect') || '/'
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		}
		else{
			formErr.show(validateResult.msg)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确';
			return result;
		}
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确';
			return result;
		}
		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})
