;(function($){
    $.fn.extend({
        pagination:function(options){
            var $elem = this;
            $elem.on('click','a',function(){
                var $this = $(this);
                var currentPage = $elem.find('.active a').html();
                var page = 1;
                var labelText = $this.attr('aria-label');
                if(labelText == "Previous"){
                    page = currentPage - 1;
                }
                else if(labelText == "Next"){
                    page = currentPage*1 + 1;
                }else{
                    page = $this.html();
                }
                if(page == currentPage){
                    return false;
                }
                var url = options.url+"?page="+page
                var id = $elem.data('id')
                if(id){
                    url = url + "&id="+id
                }
                $.ajax({
                    url:url,
                    dataType:"json"
                })
                .done(function(result){
                    if(result.status == 0){
                        $elem.trigger('get-data',result.data);
                    }else{
                        alert('请求失败,请稍后再试')
                    }
                })
                .fail(function(err){
                    alert('请求失败,请稍后再试')
                })
            })
        }
    })
})(jQuery);