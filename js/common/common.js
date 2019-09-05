/*异步请求方法 ajaxRequest()
* @url 接口请求地址
* @method 接口请求传值方式 默认POST
* @param 传参
* @callBack 成功回调函数
 */
function ajaxRequest(url, method, param,token, callBack) {
    var pathurl = ajaxRoot + url; //'/rand/'+Math.random(1);
    var currentAjax = $.ajax({
        type: method || 'POST',
        url: pathurl,
        beforeSend: function (request) {
            if(!token) return false
            request.setRequestHeader("Authorization", 'bearer ' + $.cookie("loginToken"));
        },
        data: param || {},
        dataType: 'json',
        contentType: 'application/json',
        timeout: 20000,
        success: function (data) {
            //回调函数
            callBack(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == 'timeout') {
                top.dhxMessage({
                    type: 4,
                    text: '系统开小差，请尝试重试！'
                });
            } else if (textStatus == 'abort') {
                //已取消加载
            } else {
                if ($('.dhtmlx-alert-error', top.document).length < 1) {
                    top.dhtmlx.message({
                        title: '提示',
                        type: "alert-error",
                        text: '请求数据失败，请检查您的网络和服务器情况！'
                    })
                }
                console.error('调试URL请求:' + url);
            }
        }
    });
    return currentAjax;
}

/*退出登录 logout()
* 
 */
function logout () {
    window.location.replace("/index.html")
}





