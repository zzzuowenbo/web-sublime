var api = require('api');
var _util = require('util');
var modalTpl = require('./modal.tpl');
var _city = require('util/city');

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

module.exports = {
	show:function(){
		this.$elem = $('.modal-box');
		this.loadModal();
		this.bindEvent();
		this.loadProvinces();
	},
	loadModal:function(){
		var html = _util.render(modalTpl);
		this.$elem.html(html);
	},
	loadProvinces:function(){
		var provinces = _city.getProvinces();
        var provincesSelectOptions = this.getSelectOptions(provinces);
        var $provinceSelect = this.$elem.find('.province-select');
        $provinceSelect.html(provincesSelectOptions);
	},
	loadCities:function(provinceName){
		var cities = _city.getCities(provinceName);
		var citiesSelectOptions = this.getSelectOptions(cities);
        var $citySelect = this.$elem.find('.city-select');
        $citySelect.html(citiesSelectOptions);
	},
	getSelectOptions:function(arr){
		var html = '<option value="">请选择</option>';
		for(var i = 0,length=arr.length;i<length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		return html;
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
		this.$elem.on('change','.province-select',function(){
			 _this.loadCities($(this).val());
		})
		this.$elem.find('#btn-submit').on('click',function(){
            _this.submit();
        })
        this.$elem.find('input').on('keyup',function(ev){
            if (ev.keyCode == 13) {
                _this.submit();
            }
        }) 
	},
	submit:function(){
        var formData ={
            name:$.trim($('[name="name"]').val()),
            province:$.trim($('[name="province"]').val()),
            city:$.trim($('[name="city"]').val()),
            address:$.trim($('[name="address"]').val()),
            phone:$.trim($('[name="phone"]').val()),
            zip:$.trim($('[name="zip"]').val())
        }
        var validateResult = this.validate(formData);
        if(validateResult.status){
            formErr.hide();
            api.addShippings({
                data:formData,
                success:function(shippings){
                    console.log(shippings);
                },
                error:function(){
                    _util.showErrorMsg('添加地址失败,请稍后再试!');
                }
            })
        }
        else{
            formErr.show(validateResult.msg);
        }
    },
    validate: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.name,'require')){
            result.msg = "用户姓名不能为空";
            return result;
        }
        if (!_util.validate(formData.province,'require')){
            result.msg = "省份不能为空";
            return result;
        }
        if (!_util.validate(formData.city,'require')){
            result.msg = "城市不能为空";
            return result;
        }
        if (!_util.validate(formData.address,'require')){
            result.msg = "详细地址不能为空";
            return result;
        }        
        if (!_util.validate(formData.phone,'require')){
            result.msg = "电话号码不能为空";
            return result;
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = "电话号码格式不正确";
            return result;
        }                
        result.status = true;
        return result;
    }
}