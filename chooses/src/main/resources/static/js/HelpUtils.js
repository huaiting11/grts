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
	var users = sessionStorage.getItem("login_user");
	var isLogin = users!=null ? true:false;
	if(isLogin){
		$(".alreadyLoggedIn").css("display","block");
		$(".alreadyLoggedIn").find("img").click(function(ele){
			
			//$(".alreadyLoggedIn div").css("display","block");
			if($(".alreadyLoggedIn div").css('display') === 'none'){
				$(".alreadyLoggedIn").find("img").attr("src","../img/up_blue.png");
				$(".alreadyLoggedIn div").show();
			}else{
			  $(".alreadyLoggedIn").find("img").attr("src","../img/down_blue.png");
			   $(".alreadyLoggedIn div").hide();
			}
		})
	}else{
		$(".notLoggedIn").css("display","block");
	}
	$(".alreadyLoggedIn").find("a").eq(1).click(function(){
		sessionStorage.removeItem("login_user");
		$(".notLoggedIn").show();
		$(".alreadyLoggedIn").hide();
		window.location = "login.html";
		
	});
}
