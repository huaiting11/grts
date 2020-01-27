function career() {
    this.init();
    this.bindEvent();
}
career.prototype={
    init:function () {
        var career = sendAjax({},"../career/getAll","POST","json");
        this.inTable(career);

    },
    inTable:function (career) {
        for (var i = 0; i < career.length; i++) {
            var $row = this.addRows(career[i],i);
            $(".tab").append($row);

        }
    },
    addRows:function(item,index){
        var $row = $('<tr><td>2</td><td>Rossye</td> <td>1564564564</td><td><a>编辑</a><a>删除</a> </td></tr>');
        $row.children().eq(0).text(index+1);
        $row.children().eq(1).text(item.name);
        $row.children().eq(2).text(item.description);
        $row.children().eq(3).children().eq(0).click(function () {
            $(".page-wrapper").load("../back/careerEdit.html", function(html, status, xhr){
                new careerEdit(item.id);
            })
        });
        $row.children().eq(3).children().eq(1).click(function () {

        });
        return $row;
    },
    bindEvent:function () {
        $(".add").click(function () {
            $(".page-wrapper").load("../back/careerEdit.html", function(html, status, xhr){
                new careerEdit();
            })
        })
    }

}