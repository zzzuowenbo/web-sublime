;(function($){
    var $register = $('#register');
    var $login = $('#login');
    $('#go-register').on('click',function(){
        $login.hide();
        $register.show();
    })
    $('#go-login').on('click',function(){
        $register.hide();
        $login.show();       
    })
    //用户名以字母开头包含数字和下划线的3-10位字符
    var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i;
    //密码为3-6位任意字符
    var passwordReg = /^\w{3,6}$/;

    /*注册*/
    $('#sub-register').on('click',function(){
        var username = $register.find('[name=username]').val();
        var password = $register.find('[name=password]').val();
        var repassword = $register.find('[name=repassword]').val();
        var errMsg = '';
        var $err = $register.find('.err');
        if(!usernameReg.test(username)){
            errMsg = '用户名以字母开头包含数字和下划线的3-10位字符';
        }
        else if(!passwordReg.test(password)){
            errMsg = '密码为3-6位任意字符';
        }
        else if(password != repassword){
            errMsg = '两次密码不一致';
        }
        if(errMsg){
            $err.html(errMsg);
            return
        }
        else{
            $err.html('')
            $.ajax({
                url:'/user/register',
                type:'POST',
                dataType:'json',
                data:{
                    username:username,
                    password:password
                }
            })
            .done(function(result){
                // console.log(result);
                if(result.status == 0){//成功
                    $('#go-login').trigger('click');
                }else{//失败返回提示消息
                    $err.html(result.message);
                }
            })
            .fail(function(err){
                $err.html("请求失败,请稍后再试")
            })
        }
    })

    /*登录*/
    $('#sub-login').on('click',function(){
        var username = $login.find('[name=username]').val();
        var password = $login.find('[name=password]').val();
        var errMsg = '';
        var $err = $login.find('.err');
        if(!usernameReg.test(username)){
            errMsg = '用户名以字母开头包含数字和下划线的3-10位字符';
        }
        else if(!passwordReg.test(password)){
            errMsg = '密码为3-6位任意字符';
        }
        if(errMsg){
            $err.html(errMsg);
            return
        }
        else{
            $err.html('')
            $.ajax({
                url:'/user/login',
                type:'POST',
                dataType:'json',
                data:{
                    username:username,
                    password:password
                }
            })
            .done(function(result){
                // console.log(result);
                if(result.status == 0){//成功
                    /*$login.hide();
                    $('#user-info span').html(result.data.username);
                    $('#user-info').show();*/
                    window.location.reload();
                }else{//失败返回提示消息
                    $err.html(result.message);
                }
            })
            .fail(function(err){
                $err.html("请求失败,请稍后再试")
            })
        }
    })

    /*退出*/
    /*$('#logout').on('click',function(){
        $.ajax({
            url:'/user/logout'
        })
        .done(function(result){
            window.location.href = '/'
        })
        .fail(function(err){
            $('#user-info err').html("请求失败,请稍后再试")
        })
    })*/
})(jQuery);