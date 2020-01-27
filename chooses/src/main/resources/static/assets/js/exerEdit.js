//# sourceURL=exerEdit.js?_=1579701690367
function exerEdit(id,carrId) {
    debugger;
    this.id = id;
    this.carrId = carrId;
    this.init();
    this.bindEvent();
}
exerEdit.prototype ={
    init:function () {
        if(this.id != undefined && this.id != null) {
            var carr = sendAjax({id: this.id}, "../career/getById", "POST", "json");
            this.initInput(carr);
        }
    },
    initInput:function (carr) {
        $("#title").val(carr.title);
        $("#optionA").val(carr.optiona);
        $("#optionB").val(carr.optionb);
        $("#optionC").val(carr.optionc);
        $("#optionD").val(carr.optiond);
    },
    bindEvent:function () {
        var that = this;
        $(".btn").click(function () {
            var data ={
                title:$("#title").val(),
                optiona:$("#optionA").val(),
                optionb:$("#optionB").val(),
                optionc:$("#optionC").val(),
                optiond:$("#optionD").val(),
                id:that.id,
                careerId :that.carrId
            }
            var res = sendAjax(data,"../career/saveExer","POST","json");
            if(res){
                alert("编辑成功");
                $(".page-wrapper").load("../back/exercise.html", function(html, status, xhr){
                    new exercise();
                })
            }
        })

    }
}