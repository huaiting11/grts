//# sourceURL=user.js?_=1572336402851
function user(){
	this.init();
}
user.prototype={
	init:function(){
		this.$page = $(".paging");
		var option = sendAjax({},"../user/getSchool","POST","json");
		this.initTable(option);
		this.page(option[0],1);
		this.event();
	},
	initTable:function (option) {
		for (let i = 0; i < option.length; i++) {
			var $option = $('<option></option>');
			$option.text(option[i]);
			$("#schoolList").append($option);
		}
	},
	page:function(schoolName,no){
		var that = this;
		var re = sendAjax({schoolName:schoolName,pageNo:no},"../users/getUser","POST","json");
		if (isEmpty(re)) return;
		var list = re.list;
		$(".tab tr").detach();
		for (var i = 0; i < list.length; i++){
			var item = list[i];
			var row = this.addRows(item);
			$(".tab").append(row);
		}
		$(".paging").html(getStr(re.pageNum,re.pages));
		if(re.count == 0){
			$(".count").hide();
		}else {
			$(".count").show();
			this.paging(schoolName);
			$("#p_info").find(".total").text(re.total);
			$("#p_info").find(".pageSize").text(re.pageSize);
		}
	},
	paging:function(schoolName){
		var that = this;
		var activePage = parseInt(that.$page.find(".activePage").text());
		var lastPage = that.$page.children().length - 2;
		that.$page.children().each(function (dex,ele) {
			$(ele).click(function () {
				if ($(ele).hasClass("activePage")) return;
				if ($(ele).text() == "...") return;
				//上一页
				if (dex == 0 && activePage > 1){
					that.page(schoolName, activePage - 1);
					return;
				}
				//下一页
				if (dex == lastPage + 1 && activePage < lastPage){
					that.page(schoolName, activePage + 1);
					return;
				}
				if ($(ele).text() == "") return;
				//其他页
				that.page(schoolName, parseInt($(ele).text()));
			});
		});
	},
	addRows:function(item){
		var $row = $('<tr>' +
			' <td>2</td>' +
			' <td>Rossye</td>' +
			' <td>1564564564</td>' +
			'<td>name@site.com</td>' +
			' <td>专业</td>' +
			' <td>学校</td>' +
			' </tr>');
		$row.children().eq(0).text(item.id);
		$row.children().eq(1).text(item.name);
		$row.children().eq(2).text(item.telephone);
		$row.children().eq(3).text();
		$row.children().eq(4).text(item.professional);
		$row.children().eq(5).text(item.school);
		return $row;

	},
	event:function () {
		var that = this;
		$("#schoolList").change(function () {
			var vs = $('#schoolList option:selected').val();
			that.page(vs,1);
		})
	}
}