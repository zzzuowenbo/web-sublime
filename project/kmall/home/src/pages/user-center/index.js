require('pages/common/nav');
require('pages/common/search');
var _side = require('pages/common/side');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var api = require('api');

var page = {
	init:function(){
		this.renderSide()
	},
	renderSide:function(){
		_side.render('user-center')
	}
}

$(function(){
	page.init()
})
