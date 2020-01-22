function topBar(){
	this.init();
	this.bindEvent();
}
topBar.prototype={
	init:function(){
		var users = sessionStorage.getItem("login_user");
		this.isLogin = users!=null ? true:false;
		if(this.isLogin){
			var name = JSON.parse(users).name;
			if(name != undefined){
				$(".alreadyLoggedIn").find("button").html(name);
			}
		}
	},
	bindEvent:function(){
		var that = this;
		$(".menu_ul").find(".menu_ul_li_a").click(function(){
			that.goToPage($(this),that);
		})
		$(".alreadyLoggedIn").find("a").eq(0).click(function(){
			alert("修改密码");
		});
	},
	goToPage:function(ele,that){
		var status = sessionStorage.getItem("status");
		if(that.isLogin){
			if(ele.text() ==="首页"){
				window.location = "/home.html";
			}else if(ele.text() === "能力测试"){
				window.location = "/exercise.html?status="+status;
			}else if(ele.text() === "能力成长"){
				window.location = "/grow.html";
			}else if(ele.text() === "个人信息"){
				window.location = "/information.html";
			}else if(ele.text() === "专业方向匹配"){
				window.location = "/major.html?status="+status;
			}else if(ele.text()=== "职业方向匹配"){
				window.location = "/job.html?status="+status;
			}
		}else{
			if(ele.text() ==="首页"){
				window.location = "/home.html";
			}else if(ele.text() === "能力测试"){
				
				window.location = "/login.html";
			}else if(ele.text() === "能力成长"){
				window.location = "/login.html";
			}else if(ele.text() === "个人信息"){
				window.location = "/login.html";
			}
		}
	}
}
$(function(){
	new topBar();
})