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
           var res = sendAjax({telephone:tele,password:pwd},"/user/register","POST","json");
           if(res){
               window.location = "/login.html";
           }
        })
    }
}
$(function () {
    new register();
})