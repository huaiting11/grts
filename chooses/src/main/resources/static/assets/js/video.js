//# sourceURL=video.js?_=1572777523732
function video(){
	debugger;
	this.init();
	this.bindEvent();
}
video.prototype={
	init:function(){
		this.$page = $(".paging");
		this.type = sendAjax({},"http://127.0.0.1:8081/video/ability/type","GET","json").abilityType;
		this.initSelected(this.type);
		this.typeId = this.type[0].id;
		this.page({},1);
	},
	
	page:function (data,no) {
		var that = this;
		var data2 = {};
		if(data != undefined){
			data2 = data;
		}
		data2.pageNo = no;
		data2.pageSize=15;
		var re  = sendAjax({},"http://127.0.0.1:8081/video/"+this.typeId+"/"+1+"/"+15,"GET","json");
		var dataList = re.page;
		if (isEmpty(dataList)) return;
		var list = dataList.list;
		$(".it").find(".videoD").detach();
		for (var i = 0; i < list.length; i++){
			var item = list[i];
			var row = "";
			row = this.addRows(item);
			$(".it").append(row);
		} 
		$(".paging").html(getStr(dataList.pageNum,dataList.pages));
		if(dataList.count == 0){
			$(".count").hide();
		}else {
			$(".count").show();
			this.paging();
			$("#p_info").find(".total").text(dataList.total);
			$("#p_info").find(".pageSize").text(dataList.pageSize);
		}

	},
	addRows:function (data) {
		/*
		<div class="video">
			<div class="video_img">
				<video src="video/44.mp4" controls="controls"></video>
			</div>
			<div class="video_explain">
				<p></p>
				<div>
					<button type="submit" class="btn btn-default del" >删除</button>
					<button type="submit" class="btn btn-default del" >删除</button>
				</div>
			</div>
		</div>*/
		var videoStr='<div class="video"><div class="video_img"><video src="video/44.mp4" controls="controls"></video></div><div class="video_explain">'+
		'<p contenteditable="true"></p><div class="btn"><button type="submit" class="btn btn-default del" >删除</button> <button type="submit" class="btn btn-default submit">提交</button></div></div></div>';
		var $video = $(videoStr);
		//$video= $('<video class="videoD"  controls="controls"></video>');
		http://pz19akg48.bkt.clouddn.com/lka22aUKe_P1pc-QV_otf6AGfgla
		$video.find("video").attr("src","http://pz19akg48.bkt.clouddn.com/"+data.key).attr("id",data.id).attr("key",data.key);
		$video.find(".video_explain").find("p").eq(0).html(data.description);
		return $video;
	},
	paging:function(){
	        var that = this;
	        var activePage = parseInt(that.$page.find(".activePage").text());
	        var lastPage = that.$page.children().length - 2;
	        that.$page.children().each(function (dex,ele) {
	            $(ele).click(function () {
	                if ($(ele).hasClass("activePage")) return;
	                if ($(ele).text() == "...") return;
	                //上一页
	                if (dex == 0 && activePage > 1){
	                    that.page(undefined, activePage - 1);
	                    return;
	                }
	                //下一页
	                if (dex == lastPage + 1 && activePage < lastPage){
	                    that.page(undefined, activePage + 1);
	                    return;
	                }
	                if ($(ele).text() == "") return;
	                //其他页
	                that.page(undefined, parseInt($(ele).text()));
	            });
	        });
	    },
	bindEvent:function(){
		var that = this;
		$("#videoData").submit(function(event) {
			var formData = new FormData(this);
			//var token  =  sendAjax({},"http://127.0.0.1:8081/auth/get","GET","json");
			//$("[name='token']").val(token);
			$.ajax({
				async: false,
				type: "POST",
				url: "http://upload-z2.qiniup.com/",
				data: formData,
				dataType: "JSON",
				mimeType: "multipart/form-data",
				contentType: false,
				cache: false,
				processData: false,
				success: function(data) {
					if (data.hash != undefined && data.key != undefined) {
						var des = $("#des").val();
						var reqData = {};
						reqData.abilityId = that.typeId;
						reqData.key =  data.key;
						reqData.description =  des;
						var res = sendAjax(reqData,"http://127.0.0.1:8081/video/key/","POST","json");
						if(res.success){
							alert("上传成功");
						}
					} else {
						alert(data.error);
					}
				},
				error:function  () {
					alert("上传失败");
				}
			});
			return false;
		});
		$(".form-control").change(function(){
			that.typeId = $(this).children('option:selected').val();
			alert(that.typeId);
		});
		$(".del").click(function(){
			alert($(this).parents(".video_explain").prev().find("video").attr("id"));
		});
		$(".submit").click(function(){
			var videoId = $(this).parents(".video_explain").prev().find("video").attr("id");
			var des = $(this).parents("btn").prev().html();
			alert(des);
		});
	},
	initSelected:function (types) {
		for (var i = 0; i < types.length; i++) {
			var item = types[i];
			var $option = $("<option></option>");
			$option.attr("id",item.id).html(item.name).val(item.id);
			$("#typeList select").append($option);
		}
		
	}
}
$(function() {
	new video();
})
