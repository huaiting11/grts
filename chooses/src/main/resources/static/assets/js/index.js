$(function(){
	var that = this;
	function loadRight(url, callback, content){
	    if(isEmpty(content)){
	        content = ".page-wrapper";
	    }
	    $(content).load(url, function(html, status, xhr){
	        callback(html, status, xhr);
	    })
	};
	function hashFun(hash){
		switch(hash){
			case "#user":
				loadRight("/back/user.html",function () {
					new user();
				});break;
			case "#video":loadRight("/back/video.html",function () {
				 new video();
			});break;
			case "#exercise":loadRight("/back/exercise.html",function () {
				new exercise();
			});break;
			case "#career":loadRight("/back/career.html",function () {
				new career();
			});break;
			case '#org':loadRight("org/index",function (xhr, a, b, c) {
				new org();
			});break;
			case '#collectInfo':loadRight("pro/collect/index?node=信息收集阶段",function () {
				//new project();
				new infoEnter(null, true, 1);
			});break;
			case '#allList':loadRight("project/index",function () {
				new alllist("项目总体列表");
			});break;
			case '#allList1':loadRight("pro/collect/stagelist",function () {
				new alllist("信息收集阶段",true);
			});break;
			case '#allList2':loadRight("pro/collect/stagelist",function () {
				new alllist("规划设计阶段");
			});break;
			case '#allList3':loadRight("pro/collect/stagelist",function () {
				new alllist("物资采购阶段");
			});break;
			case '#allList4':loadRight("pro/collect/stagelist",function () {
				new alllist("建设实施阶段");
			});break;
			case '#allList5':loadRight("pro/collect/stagelist",function () {
				new alllist("业务拓展阶段");
			});break;
			case '#settings': loadRight("settings",function () {
				new settings();
				/*isLoadFinish("static/css/setting.css",function () {
					new settings();
				});*/
			});break;
			case '#position':loadRight("position/index",function () {
				new Position();
			});break;
			case '#team':loadRight("team",function () {
				new team();
				/*isLoadFinish("static/css/team.css",function () {

				});*/
			});break;
		}
	};
	$(window).click(function(event){
		var tag = event.target;
		tag = $(tag).closest("a[atype='switch']");
		if(tag.length > 0){
			if(!isEmpty(tag) && $(tag).attr("atype") === "switch"){
				hashFun(tag[0].hash);
			}
		}
	});
	$("#logout").click(function () {
		sendAjax({},"/logout","POST","json");
		window.location = "/home.html";

	});
	function initData() {
		var user = sendAjax({},"/loginStatus","POST","json");
		that.userId = user.id;
		$("#user").text(user.name);
	};
	$("#modify").click(function () {
		alert(that.userId);
	})
	initData();
})