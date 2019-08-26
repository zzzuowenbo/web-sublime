require('pages/common/nav');
require('pages/common/search');
var _side = require('pages/common/side');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var api = require('api');

var formErr = {
    hide: function() {
        $('.error-item')
        .hide()
        .find('.error-msg')
        .text('')
    },
    show: function(msg) {
        $('.error-item')
        .show()
        .find('.error-msg')
        .text(msg)
    }
}

var page = {
    init:function(){
        this.renderSide();
        this.bindEvent();
    },
    renderSide:function(){
        _side.render('user-update-password');
    },    
    bindEvent:function(){
        var _this = this;       
        $('#btn-submit').on('click',function(){
            _this.submit();
        })
        $('.side-content input').on('keyup',function(ev){
            if(ev.keyCode == 13){
                _this.submit();
            }
        })
    },
    submit:function(){
        var formData = {
            password: $.trim($('[name="password"]').val()),
            repassword: $.trim($('[name="repassword"]').val())
        }
        var validateResult = this.validate(formData);
        if(validateResult.status){
            formErr.hide();
            api.updateUsers({
                data: formData,
                success:function(data){
                    //window.location.href = './result.html?type=updatePassword';
                    _util.goResult('updatePassword');
                },
                error:function(msg){
                    formErr.show(msg); 
                }
            })
        }
        else{
            formErr.show(validateResult.msg);
        }
    },
    validate:function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_util.validate(formData.password,'require')){
            result.msg = "密码不能为空";
            return result;
        }
        if(!_util.validate(formData.password,'password')){
            result.msg = "密码格式不正确";
            return result;
        }
        if(formData.password != formData.repassword){
            result.msg = "两次密码不一致";
            return result;           
        }               
        result.status = true;
        return result;
    }
}

$(function() {
    page.init()
})