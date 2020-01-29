$(function(){
	new login();
})
function login(){
	this.init();
	this.bindEvent();
}
login.prototype={
	init:function(){
		topLogin();
	},
	bindEvent:function(){
		$("#loginBtn").click(function(){
			var telephone = $("#telephone").val();
			var password = $("#password").val();
			var data={};
			data.username=telephone;
			data.password = password;
			var user = sendAjax(data,"/login","POST","json");
			if(user.id != undefined){

				 window.location = "/home.html";
			}else{
				$("#firstDiv").children().eq(1).find(".prompt").show();
			}
			
		});
		$("#telephone").focus(function(){
			$("#firstDiv").children().eq(1).find(".prompt").hide();
			
		});
		$("#password").focus(function(){
			$("#firstDiv").children().eq(1).find(".prompt").hide();
		})
	}
}