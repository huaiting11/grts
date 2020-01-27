function register() {
    this.init();
    this.bindEvent();
}
register.prototype={
    init:function () {
        topLogin();
    },
    bindEvent:function () {
        $("#regBtn").click(function () {
           var tele =  $("#telephone").val();
           var pwd = $("#password").val();
           var verCode =$("#sendVerifyCode").val();
           var res = sendAjax({telephone:tele,password:pwd,verCode:verCode},"/user/register","POST","json");
           if(res === "success"){
               window.location = "/login.html";
           }else{

           }
        });
        /*$("#telephone").blur(function () {
            var res = sendAjax({telephone: $("#telephone").val()},"/user/isTelephone","POST","json");
            if(res){
                alert("用户已经存在");
            }
        })*/
        $(".sendVerifyCode").click(function () {
            var res = sendAjax({telephone: $("#telephone").val()},"/user/sendVerifyCode","POST","json");
            if(!res){
                alert("发送验证码失败");
                return ;
            }

        })
    }
}
$(function () {
    new register();
})