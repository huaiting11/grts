//# sourceURL=exercise.js?_=1579701912549
function exercise(){
    debugger;
    this.init();
}
exercise.prototype={
    init:function () {
        this.$page = $(".paging");
        var options = sendAjax({},"../career/getAll","POST","json");
        console.log(options);
        this.initOptions(options);
        this.page(options[0].id,1);
        this.event();
    },
    page:function(careerId,no){
        var re = sendAjax({careerId:careerId,pageNo:no},"../career/getExercise","POST","json");
        console.log(re);
        if (isEmpty(re)) return;
        var list = re.list;
        $(".tab tr").detach();
        for (var i = 0; i < list.length; i++){
            var item = list[i];
            var row = this.addRows(item,i);
            $(".tab").append(row);
        }
        $(".paging").html(getStr(re.pageNum,re.pages));
        if(re.count == 0){
            $(".count").hide();
        }else {
            $(".count").show();
            this.paging(careerId);
            $("#p_info").find(".total").text(re.total);
            $("#p_info").find(".pageSize").text(re.pageSize);
        }

    },
    addRows:function(item,index){
        var $row = $('<tr><td>2</td><td>Rossye</td><td>1564564564</td><td>name@site.com</td><td>VIP</td><td>' +
            '+ddd</td><td><a>编辑</a><a>删除</a></td></tr>');
        $row.children().eq(0).text(index);
        $row.children().eq(1).text(item.title);
        $row.children().eq(2).text(item.optiona);
        $row.children().eq(3).text(item.optionb);
        $row.children().eq(4).text(item.optionc);
        $row.children().eq(5).text(item.optiond);
        $row.children().eq(6).children().eq(0).click(function () {
            $(".page-wrapper").load("../back/exerciseEdit.html", function(html, status, xhr){
                new exerEdit(item.id);
            })
        });

        return $row;

    },
    paging:function(carrId){
        var that = this;
        var activePage = parseInt(that.$page.find(".activePage").text());
        var lastPage = that.$page.children().length - 2;
        that.$page.children().each(function (dex,ele) {
            $(ele).click(function () {
                if ($(ele).hasClass("activePage")) return;
                if ($(ele).text() == "...") return;
                //上一页
                if (dex == 0 && activePage > 1){
                    that.page(carrId, activePage - 1);
                    return;
                }
                //下一页
                if (dex == lastPage + 1 && activePage < lastPage){
                    that.page(carrId, activePage + 1);
                    return;
                }
                if ($(ele).text() == "") return;
                //其他页
                that.page(carrId, parseInt($(ele).text()));
            });
        });
    },
    initOptions:function (options) {
        for (var i = 0; i < options.length; i++) {
            $option = $('<option>2</option>');
            $option.text(options[i].name);
            $option.attr("id",options[i].id);
            $("#typeList").append($option);
        }
    },
    event:function () {
        var that = this;
        $("#typeList").change(function () {
            var carrId = $('#typeList option:selected').attr("id");
            that.page(carrId,1);
        })
        $(".add").click(function () {
            var carrId = $('#typeList option:selected').attr("id");
            $(".page-wrapper").load("../back/exerciseEdit.html", function(html, status, xhr){
                new exerEdit(null, carrId);
            })
        })
    }
}