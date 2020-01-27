function careerEdit(id) {
    this.id = id;
    this.init();
    this.bindEvent();
}
careerEdit.prototype={
    init:function () {
        if(this.id != undefined && this.id != null){
            var career = sendAjax({id:this.id},"../career/getCareerById","POST","json");
            this.initOpiton(career);
        }
    },
    initOpiton:function (career) {
        $("#name").val(career.name);
        $("#des").val(career.description);
        $("#dis").val(career.distribution);
        $("#req").val(career.require);
    },
    bindEvent:function () {
        var that = this;
        $("#btn").click(function () {
            var data={
                id:that.id,
                name : $("#name").val(),
                description:$("#des").val(),
                distribution:$("#dis").val(),
                require:$("#req").val()
            }
            var res = sendAjax(data,"../career/saveCareer","POST","json");
            if(res){

            }
        })
    }
}