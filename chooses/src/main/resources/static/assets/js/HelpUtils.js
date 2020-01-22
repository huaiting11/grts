function sendAjax(data, url, type,dataType, callback, sync){
    var result = {};
    $.ajax({
        type : type,
        dataType : dataType,
        data : data,
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : url,
        async : false,
        success : function(re, status, xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
            result = re;
            if(callback != undefined){
                callback(re);
            }
        },
        error : function(xhr) {
            if(xhr.getResponseHeader("sessionstatus") == "timeout"){
                window.location.href = "login";
                return;
            }
        }
    });
    return result;
}
function isEmpty(value){
    return (value == undefined || (typeof value == "string" && value == "") || value == null || (typeof value == "number" && value == 0));
}
function getStr(pageNo,last) {
    var str="";
    if(pageNo > 1){
        str="<span></span>";
    }else{
        str="<span></span>";
    }
    if(last < 6){
        if(pageNo >= 6) {
            str +="<span>1</span><span>2</span><span>...</span>";
            if(last >= pageNo + 5) {
                for(var i = pageNo-2; i <= pageNo + 2; i++) {
                    if(pageNo == i) {
                        str +="<span class='activePage'>"+ i +"</span>";
                    }else {
                        str+="<span>"+ i +"</span>";
                    }
                }
                str +="<span>...</span>";
                str +="<span>"+ (last - 1) +"</span>";
                str +="<span>"+ last +"</span>";
                str +="<span></span>";
            }else{
                for(var i = pageNo - 2; i <= last ; i++) {
                    if(pageNo == i) {
                        str += "<span class='activePage'>"+ i +"</span>";
                    }else {
                        str += "<span>"+ i +"</span>";
                    }
                }
                str += "<span></span>";
            }

        }else {
            for(var i = 1; i <= last; i++) {
                if(pageNo == i) {
                    str+="<span class='activePage'>"+ i +"</span>";
                }else {
                    str+="<span>"+ i +"</span>";
                }
            }
            if(pageNo == last) {
                str+="<span></span>";
            }else {
                str+="<span></span>";
            }
        }
    }
    return str;

}
function isEmpty(value){
    return (value == undefined || (typeof value == "string" && value == "") || value == null || (typeof value == "number" && value == 0));
}