$(function(){
	new job();
})
function job(){
	this.init();
	this.bindEvent();
}
job.prototype ={
	init:function(){
		$(".menu_ul_li_a").eq(3).css("color","#4DA7FF");
		topLogin();
		//var cookiesUser = sessionStorage.getItem("login_user");
		var careerData = sendAjax({},"/exercise/career/"+$("#useId").val(),"GET","json");
		this.userCareer = careerData;
		this.initCarrer(this.userCareer);
        var res = sendAjax({},"/result/"+this.userId+"/"+this.userCareer[0].id,"GET","json");
		this.resultData = res;
		this.initJob(this.resultData);
	},
	initCarrer:function(userCareer){
		var $tab = $(".tab");
		for (var i = 0; i < userCareer.length; i++) {
			var item = userCareer[i];
			if(i==0){
				var $li = $('<li class="tab_direction point"></li>');
			}else{
				var $li = $('<li class="tab_li point"></li>');
			}
			$li.attr("id",item.id);
			$li.text(item.name);
			$tab.append($li);
		}
	},
	initJob:function(resultData){
		var $content = $(".all_content");
		$content.find(".matching_company").detach();
		$content.find(".system_explain").detach();
		var flag = false;
		for (var i = 0; i < resultData.length; i++) {
			flag = true;
			var item = resultData[i];
			var $lgCone = $("#postMatch").clone();
			$lgCone.removeAttr("id").removeAttr("style");
			$lgCone.children().each(function(index,ele){
				if(index == 0){
					//$(this).find(".name").html(item.positionName).attr("href","https://www.lagou.com/jobs/"+item.positionId+".html");
					$(ele).find("p").eq(0).find("a").eq(0).text(item.positionName).attr("href","https://www.lagou.com/jobs/"+item.positionId+".html");
					$(ele).find("p").eq(1).find("span").eq(0).text(item.salary);
					$(ele).find("p").eq(1).find("span").eq(1).text(item.workYear);
					$(ele).find("p").eq(1).find("span").eq(2).text(item.education);
					$(ele).find("p").eq(2).find("span").eq(0).text(item.thirdType);
					
				}else if(index == 1){
					$(ele).find("a").eq(0).text(item.companyFullName).attr("href","https://www.lagou.com/gongsi/"+item.companyId+".html");
					$(ele).find("p").eq(1).find("span").eq(0).text(item.companyLabelList ==null?"":item.companyLabelList);
					$(ele).find("p").eq(0).find("span").eq(0).text(item.industryField);
					$(ele).find("p").eq(0).find("span").eq(2).text(item.companySize);
					$(ele).find("p").eq(0).find("span").eq(1).text(item.financeStage);
					
				//	$(this).find("img").attr("src","https://www.lagou.com/"+item.companyLogo);
				
				}else if(index == 2){
					$(ele).find("img").attr("src","https://www.lagou.com/"+item.companyLogo);
				}
				
			})
			$content.append($lgCone);
		}
		if(!flag){
			var $msg = $("#msg").clone();
			$msg.removeAttr("id").removeAttr("style");
			$msg.find("p").eq(0).html("亲爱的"+this.userName+"同学");
			$msg.find("p").eq(1).html("你没有做题，未给您匹配公司，或者快去看视频提" +
				"升自己的技术之后，再去做题吧,匹配相关的公司吧");
			$content.append($msg);
		}
	},
	bindEvent:function(){
		var that = this;
		$(".tab li").click(function(){
			var carrId = $(this).attr("id");
			var result = sendAjax({},"/result/"+that.userId+"/"+carrId,"GET","json");
			$(".tab li").removeClass("tab_direction").addClass("tab_li");
			$(this).addClass("tab_direction");
			that.initJob(result);
		})
	}
}