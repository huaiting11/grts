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
		$("#logbtn").click(function(){
			var telephone = $("#telephone").val();
			var password = $("#password").val();
			var data={};
			data.telephone=telephone;
			data.password = password;
			var user = sendAjax(data,"/user/login","POST","json");
			sessionStorage.removeItem("login_user");
			if(user.id != undefined){
				 sessionStorage.setItem("login_user",JSON.stringify(user));
				 sessionStorage.setItem("status",user.status);
				 window.location = "/home.html";
			}else{
				var users = sessionStorage.getItem("login_user");
				$(".msg").show();
			}
			
		});
		$("#telephone").focus(function(){
			$(".msg").hide();
			
		});
		$("#password").focus(function(){
			$(".msg").hide();
		})
	}
}