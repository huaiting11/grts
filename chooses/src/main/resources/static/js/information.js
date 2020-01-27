function information(){
	this.init();
}
information.prototype = {
	init:function(){
		$(".menu_ul_li_a").eq(5).css("color","#4DA7FF");
		topLogin();
		//this.userId = sendAjax({},"","POST","json").id;
		var res = sendAjax({},"user/"+$("#useId").val(),"GET","json");
		this.user = res;
		console.log(this.user);
		// 只能看，不能填写
		if(this.user.status != 0){
			$(".select").attr("disabled","disabled");
			$(".evaluation_textarea").attr("disabled","disabled");
			$("#city_4").citySelect({
				prov:this.user.prov, 
				city:this.user.city,
				dist:this.user.dist,
				nodata:"none"
			});
			
			$(".submit").hide();
			$("[name='evaluation']").val(this.user.evaluation);
			$("[name='name']").val(this.user.name);
			$("[name='hobby']").val(this.user.hobby);
			$("[name='professional']").val(this.user.professional);
			$("[name='age']").val(this.user.age);
			$("[name='school']").val(this.user.school);
			var sex = this.user.sex == 1;
			if(sex){
				$("[name='sex']").find("option").eq(0).attr("selected",true);
			}else{
				$("[name='sex']").find("option").eq(1).attr("selected",true);
			}
			
		}
		$(".account").find("div").eq(0).html(this.user.name);
		var telephone = [];
		for(var i = 0; i < 3; i++){
			var arr=  [0,3,7,3,7,12]
			telephone.push(this.user.telephone.substring(arr[i],arr[i+3]));
		}
		$(".account").find("span").html(telephone[0]+"-"+ telephone[1]+"-"+telephone[2]);
		this.bindEvent();
	},
	bindEvent:function(){
		var that= this;
		$(".submit").click(function(){
			if($("[name='name']").val() == ""){
				$("[name='name']").css("border","1px solid red");
				return;
			}else if($("[name='age']").val() =="" || isNaN($("[name='age']").val())){
				if(isNaN($("[name='age']").val())){
					$("[name='age']").val("请输入数字");
				}
				$("[name='age']").css("border","1px solid red");
				return;
			}else if($("[name='school']").val() == ""){
				$("[name='school']").css("border","1px solid red");
				return;
			}else if($("[name='professional']").val() == ""){
				$("[name='professional']").css("border","1px solid red");
				return;
			}else if($("[name='hobby']").val() ==""){
				$("[name='hobby']").css("border","1px solid red");
				return;
			}else if($("[name='evaluation']").val() == ""){
				$("[name='evaluation']").css("border","1px solid red");
				return;
			}
			var user={};
	        user.id=that.userId;
			user.evaluation= $("[name='evaluation']").val();
			user.hobby=$("[name='hobby']").val();
			user.professional= $("[name='professional']").val();
			user.age= $("[name='age']").val();
			user.school= $("[name='school']").val();
			user.sex =$("[name='sex']").val();
			user.prov =$(".prov").val();
			user.dist =$(".dist").val();
			user.city =$(".city").val();
			user.status = 1;
			user.name = $("[name='name']").val();
			sendAjax(user,"user/updateInfo","POST","json");
			sessionStorage.setItem("status","1");
			$(".select").attr("disabled","disabled");
			$(".evaluation_textarea").attr("disabled","disabled");
			$(this).hide();
		});
		$(".div_select").find("input").focus(function(){
			$(this).css("border","1px solid #E8E8E8");
		})
		$(".evaluation_textarea").focus(function(){
			$(this).css("border","1px solid #E8E8E8");
		})
		$("[name='age']").focus(function(){
			$(this).val("");
		})

	}
	
}
$(function(){
	 //sendAjax();
	 if(false){
		 window.location.href="/page/login.html";
	 }else{
		  $("#city_4").citySelect({
		 	prov:"四川", 
		 	city:"成都",
		 	dist:"锦江区",
		 	nodata:"none"
		 });
		 new information();
	 }
	 
})