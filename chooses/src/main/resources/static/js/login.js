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
			data.username=telephone;
			data.password = password;
			var user = sendAjax(data,"/login","POST","json");
			if(user.id != undefined){

				 window.location = "/home.html";
			}else{
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