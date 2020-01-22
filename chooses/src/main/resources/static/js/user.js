function user(){
	this.bindEvent();
}
user.prototype={
	bindEvent:function(){
		/*$.ajax({
            url:"http://127.0.0.1:8081/user/index",
            success:function (data) {
                
            }
        })*/
       res = sendAjax({},"http://127.0.0.1:8081/user/index","GET","json");
	}
}
$(function(){
	new user();
})
