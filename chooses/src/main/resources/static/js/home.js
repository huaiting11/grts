$(function(){
	new home();
})
function home(){
	this.init();
}
home.prototype={
	init:function(){
		$(".menu_ul_li_a").eq(0).css("color","#4DA7FF");
		topLogin();
	}
}