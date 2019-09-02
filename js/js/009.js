window.onload=function(){
	function toChange(){
		var oBox=document.getElementById('box');
		oBox.style.background='pink';
	    oBox.style.width='50px';
	    oBox.style.height='50px';
    }
	var oBox=document.getElementById('box');
	oBox.onclick=toChange;
}
