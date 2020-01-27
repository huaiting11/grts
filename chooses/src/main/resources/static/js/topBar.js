function topBar(){
	this.init();
	this.bindEvent();
}
topBar.prototype={
	init:function(){
		var users = sendAjax({},"/loginStatus","POST","json");
		this.isLogin = users.id !=undefined ? true:false;
		if(this.isLogin){
			if(users.name != undefined){
				$(".alreadyLoggedIn").find("button").html(users.name);
			}
			$("#useId").val(users.id);
		}
	},
	bindEvent:function(){
		var that = this;
		$(".menu_ul").find(".menu_ul_li_a").click(function(){
			that.goToPage($(this),that);
		})
		$(".picBox").find("span").eq(0).click(function(){
			$('#modifyPwd').modal('show')
		});
	},
	goToPage:function(ele,that){
		if(ele.text() ==="首页"){
			window.location = "/home.html";
		}else if(ele.text() === "能力测试"){
			window.location = "/exercise.html";
		}else if(ele.text() === "能力成长"){
			window.location = "/grow.html";
		}else if(ele.text() === "个人信息"){
			window.location = "/information.html";
		}else if(ele.text() === "专业方向匹配"){
			window.location = "/major.html?";
		}else if(ele.text()=== "职业方向匹配"){
			window.location = "/job.html";
		}
	}
}
$(function(){
	new topBar();
})