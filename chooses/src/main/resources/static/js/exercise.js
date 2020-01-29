function exercise(){
	this.init();
}
exercise.prototype ={
    init: function(){
		$(".menu_ul_li_a").eq(2).css("color","#4DA7FF");
		topLogin();
		this.cout();
		this.userId = $("#useId").val();
		var careerData = sendAjax({},"/exercise/career/"+$("#useId").val(),"GET","json");
		this.userCareer = careerData;
		this.initCarrer(this.userCareer);
		var exercise = sendAjax({},"/exercise/"+this.userCareer[0].id,"GET","json");
		this.exerList  = exercise;
		this.currentIndex = 0;
		this.initExercise(this.exerList[0]);
		this.selectCarrId = this.userCareer[0].id;
		this.bindEvents();
		
	},
	initCarrer:function(userCareer){
		var $tab = $(".tab");
		for (var i = 0; i < userCareer.length; i++) {
			var item = userCareer[i];
			var $li = $('<li class="tab_li point"></li>');
			if(i==0){
				$li.addClass("selectBlue");
			}
			$li.attr("id",item.id);
			$li.text(item.name);
			$tab.append($li);
		}
	},
	initExercise:function(exercise){
		$(".options_subject").text(this.currentIndex+1+"."+exercise.title);
	    $(".options_abcd").detach();
		var arr=["optiona","optionb","optionc","optiond","A:","B:","C:","D:"];
		var $ul =$('<ul class="options_abcd"></ul>');
		for(var i = 0; i < 4; i++){
			var $li = $('<li></li>');
			var option = arr[i]
			var options = arr[i+4];
			$li.text(options+exercise[option]);
			$ul.append($li);
		}
		$(".options_subject").after($ul);
	},
	changeExer:function(){
		var that = this;
		$(".options_Choice li input").removeAttr("checked");
		$(".options_Choice li input").each(function (index,ele) {
			var option = $(ele).val();
			if(option=== that.exerList[that.currentIndex].userOption){
				$(ele).prop("checked",true);
			}
		})
		var index = that.currentIndex+1;
		$(".Progress_img div").width(28*index);
		$(".Progress_text").text(index+"/15");
	},
	bindEvents :function () {
		var that = this;
		$(".tab_li").click(function () {
			var isChange = confirm("切换类型，之前数据丢失");
			if(isChange){
				var carrId = $(this).attr("id");
				that.selectCarrId = carrId;
				var exercise = sendAjax({},"/exercise/"+carrId,"GET","json");
				that.exerList  = exercise;
				that.currentIndex = 0;
				var index = that.currentIndex+1;
				$(".Progress_img div").width(28*index);
				$(".Progress_text").text(index+"/15");
				that.initExercise(that.exerList[0]);
				$(".options_Choice li input").removeAttr("checked");
				$(".tab_li").removeClass("selectBlue");
				$(this).addClass("selectBlue");
				that.stop();
				that.cout();
			}
		});
		// 上一题
		$(".center_left_image img").click(function () {
			if(that.currentIndex == 0){
				alert("已经是第一题");
				return;
			}else{
				that.currentIndex = that.currentIndex-1;
				that.initExercise(that.exerList[that.currentIndex]);
			}
			that.changeExer();

		});
		//下一题
		$(".center_right_image img").click(function (){
			if(that.currentIndex == that.exerList.length-1){
				alert("已经是最后一题");
				return
			}else{
				that.currentIndex = that.currentIndex+1;
				that.initExercise(that.exerList[that.currentIndex]);
			}
			that.changeExer();
		});
		$(".options_Choice li input").click(function(){
			$(".options_Choice li input").removeAttr("checked");
			$(this).prop("checked",true);
			var option = $(this).val();
			that.exerList[that.currentIndex].userOption= option;
			console.log(that.exerList[that.currentIndex]);
		});
		$("#saveBtn").click(function () {
			// 循环遍历数组
			var flag = false;
			var total =0;
			for (var i = 0; i < that.exerList.length; i++) {
				var item = that.exerList[i];
				if(!flag){
					if(item.userOption == undefined){
						var flag =  confirm("还有题目未做完，是否提交");
						if(flag){ //继续提交
						    
							continue;
						}else{
							break;
						}
					}else{
						if(item.answer === item.userOption){
							total = total +1;
						}
					}
				}
			}
			var score = 6.7 * total;
			var data = {};
			data.score = 100;
			data.carrId = that.selectCarrId;
			data.userId = that.userId;
			var res = sendAjax(data,"/exercise/saveScore","POST","json");
			if(res==="yes"){

			}else{
				alert("no");
			}
			
		});
	},
	cout:function(){
		var starttime = new Date();
		var that = this;
		that.time = setInterval(function () {
		  var nowtime = new Date();
		  var time = starttime - nowtime;
		  var day = parseInt(time / 1000 / 60 / 60 / 24);
		  var hour = parseInt(time / 1000 / 60 / 60 % 24);
		  var minute = parseInt(time / 1000 / 60 % 60);
		  var seconds = parseInt(time / 1000 % 60);
		  $('.time').html( that.changeNum(hour)  + ": " + that.changeNum(minute) + ": " + that.changeNum(seconds) );
		}, 1000); 
		// setInterval(that.timer(that,starttime),1000);
	},
	stop:function(){
		clearInterval(this.time);
		$('.time').html( "00: " +"00: " + "00" );
	},
	changeNum:function(num){
		num = -num;
		if(num < 10){
			num ="0"+ num;
		}else{
			num =""+num;
		}
		return num;
	}
}

$(function(){
	new exercise();
});