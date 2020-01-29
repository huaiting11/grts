function sendAjax(data, url, type,dataType, callback, sync){
    var result = {};
    $.ajax({
        type : type,
        dataType : dataType,
        data : data,
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : url,
        async : false,
        success : function(re, status, xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
            result = re;
            if(callback != undefined){
                callback(re);
            }
        },
        error : function(xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
        }
    });
    return result;
}
function isEmpty(value){
    return (value == undefined || (typeof value == "string" && value == "") || value == null || (typeof value == "number" && value == 0));
}
function topLogin(){
    var users = sendAjax({},"/loginStatus","POST","json");
    var isLogin = users.id !=undefined ? true:false;
	if(isLogin){
		$(".alreadyLoggedIn").css("display","block");
		$(".user_div").mouseover(function(ele){
            $(".alreadyLoggedIn div").show();
		})
        $(".user_div").mouseout (function(ele){
            $(".alreadyLoggedIn div").hide();
        })
	}else{
		$(".notLoggedIn").css("display","block");
	}
	$(".alreadyLoggedIn").find("a").eq(0).click(function(){
        var res = sendAjax("{}","/logout","POST","json");
		$(".notLoggedIn").show();
		$(".alreadyLoggedIn").hide();
		window.location = "login.html";
		
	});
}
