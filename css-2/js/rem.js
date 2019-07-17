;(function(win,doc){
	var root = doc.getElementsByTagName('html')[0];
	function refresh(){
		var width = doc.body.clientWidth || doc.documentElement.clientWidth;
		var fontSize = width / 10 + 'px';
		root.style.fontSize = fontSize;
	}
	win.addEventListener('DOMContentLoaded',refresh,false);
	win.addEventListener('resize',refresh,false);
})(window,document)