module.exports = {
    validate:function(value,type){
        //非空验证
        if(type == 'require'){
            return !!value
        }
        //用户名验证
        if(type == 'username'){
            return /^[a-z][a-z0-9_]{2,5}$/.test(value)
        }
        //密码验证
        if(type == 'password'){
            return /^\w{3,6}$/.test(value)
        } 
        //手机验证
        if(type == 'phone'){
            return /^1[3589]\d{9}$/.test(value)
        } 
        //邮箱验证
        if(type == 'email'){
            return /^\w+@\w+\.\w{2,6}$/.test(value)
        }       
    },
    showErrorMsg:function(msg){
        alert(msg)
    },
    showSuccessMsg:function(msg){
        alert(msg)
    },
    goLogin:function(){
        window.location.href = "/user-login.html"
    }
}