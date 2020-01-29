function register() {
    this.init();
    this.bindEvent();
}
register.prototype={
    init:function () {
        this.message ="";
        topLogin();
    },
    bindEvent:function () {
        var that = this;
        $("#telephone").keyup(function () {
            if($("#telephone").val().length == 11){
                var flag =  that.isMobileNumber($("#telephone").val());
                var res = sendAjax({telephone: $("#telephone").val()},"/register/isTelephone","POST","json");
                if(res){
                    $(this).parent().next().text("*该手机号已经存在").show();
                }else if(!flag){
                    $(this).parent().next().text(that.message).show();
                }
            }

        });
        $("#telephone").keydown(function () {
            $(this).parent().next().hide();
        });
        $("#obtainVcode").click(function () {
            that.getVerifyCode($(this));
        })
        $("#nextBtn").click(function () {
            var message = sendAjax({verCode:$("#verCode").val()},"register/checkVerCode","POST","json");
            if(message.msg === "success"){
                $("#firstDiv").hide();
                $("#nextInfo").show();
            }else{
                $("#obtainVcode").parent().next().text("*验证码错误").show()
            }

        });
        $("#putBtn").click(function() {
            if ($("#fullName").val().length == 0) {
                $("#fullName").parent().next().show();
                return
            }
            if ($("#password").val().length == 0) {
                $("#password").parent().next().show();
                return
            }
            var tele =  $("#telephone").val();
            var pwd = $("#password").val();
            var nickName =$("#fullName").val();
            var res = sendAjax({telephone:tele,password:pwd,nickName:nickName},"/register/register","POST","json");
            if(res.msg === "success"){
                window.location = "/login.html";
            }else{

            }
        });
    },
    getVerifyCode:function(item){
        var that = this;
        if($("#telephone").parent().next().is(":hidden")){
            if($("#telephone").val().length == 11){
                var res = sendAjax({telephone: $("#telephone").val()},"/register/sendVerifyCode","POST","json");
                if(!res){
                    $(this).parent().next().text("*验证码发送失败").show();
                }else{
                    item.unbind();
                    var c = 59;
                    item.text("60秒后重新发送");
                    var e = setInterval(function() {
                        if (c == 0) {
                            clearInterval(e);
                            item.text("重新发送");
                            item.click(function() {
                                that.getVerifyCode ($(this));
                            });
                            return
                        }
                        item.text(c + "秒后重新发送");
                        c--
                    }, 1000)
                }
            }else{
                $("#telephone").parent().next().text("*请输入11位手机号码").show()
            }
        }
    },
    isMobileNumber:function (phone) {
        var flag = false;
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (phone == '') {
            this.message = "*手机号码不能为空！";
        } else if (phone.length != 11) {
            this.message = "*请输入11位手机号码！";
        } else if (!myreg.test(phone)) {
            this.message = "*请输入有效的手机号码！";
        } else {
            flag = true;
        }
        return flag;
    }
}
$(function () {
    new register();
})