;(function($){
	var $input = $('.todo-input');
	var $list = $('.todo-list');

	// 添加
	$input.on('keydown',function(ev){
		if(ev.keyCode == 13){
			$.ajax({
				url:"/item/add",
                type:'post',
                dataType:'json',
                data:{
                    task:$input.val()
                },
                success:function(result){
                    if(result.code == 0){
                    	var data = result.data;
                    	var $dom = $(`<li class="todo-item" data-id="${data.id}">${data.task}</li>`);
                    	$list.append($dom);
                    	$input.val('');
                    }else{
                    	alert(result.message);
                    }
                }
			})
		}
	})

	// 删除
	$list.on('click','li',function(){
		var $this = $(this);
		$.ajax({
			url:'/item/del'+$this.data('id'),
			dataType:'json',
			success:function(result){
				if(result.code == 0){
					$this.remove();
				}else{
					alert(result.message);
				}
			}
		})
	})
})(jQuery)