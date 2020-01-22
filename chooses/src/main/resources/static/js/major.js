function major(){
	this.init();
}
major.prototype={
	init:function(){
		$(".menu_ul_li_a").eq(1).css("color","#4DA7FF");
		topLogin();
		var cookiesUser = sessionStorage.getItem("login_user");
		this.userId = JSON.parse(cookiesUser).id;
		var status =  sessionStorage.getItem("status");
		if(status == 0){
			window.location = "/information.html";
			return;
		}
		var careerData = sendAjax({},"/exercise/career/"+this.userId,"GET","json");
		this.userCareer = careerData;
		this.initCarrer(this.userCareer);
		this.bindEvent();
	},
	initCarrer:function(userCareer){
		var $menu = $(".menu");
		for (var i = 0; i < userCareer.length; i++) {
			var item = userCareer[i];
			var $li = $('<li class="menu_li point">UI设计师</li>');
			$li.attr("index",i);
			if(i==0){
				$li.addClass("font_blue");
			}
			$li.attr("id",item.id);
			$li.text(item.name);
			$menu.append($li);
		}
		this.initData(this.userCareer[0]);
	},
	bindEvent:function(){
		var that = this;
		$(".menu_li").click(function(){
			$(".menu_li").removeClass("font_blue");
			$(this).addClass("font_blue");
			var index = $(this).attr("index");
			var item =  that.userCareer[index];
			that.initData(item);
		})
	},
	initData:function(data){
		$("#des").html(data.description);
		$("#dis").html(data.distribution);
		$("#req").html(data.require);
	}
}
$(function(){
	new major();
})