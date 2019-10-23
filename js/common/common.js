/*异步请求方法 ajaxRequest()
* @url 接口请求地址
* @method 接口请求传值方式 默认POST
* @param 传参
* @callBack 成功回调函数
 */
function ajaxRequest(url, method, param, token, callBack) {
    var pathurl = ajaxRoot + url; //'/rand/'+Math.random(1);
    var currentAjax = $.ajax({
        type: method || 'POST',
        url: pathurl,
        beforeSend: function (request) {
            if (token) {
                request.setRequestHeader("Authorization", 'bearer ' + token);
            }

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
            console.error('调试URL请求:' + url);
        }
    });
    return currentAjax;
}

// 图片上传ajax
function ajaxRequestImg(url, param, token, callBack) {
    var pathurl = ajaxRoot + url; //'/rand/'+Math.random(1);
    var currentAjax = $.ajax({
        data: param || {},
        type: "POST",
        url: pathurl,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {//data是返回的hash,key之类的值，key是定义的文件名
            callBack(data)

        },
        error: function () {
            console.error('调试URL请求:' + url);
        }
    });

    return currentAjax;
}


/*退出登录 logout()
* 
 */
function logout() {
    window.location.replace("/index.html")
}


/** 格式 YYYY/yyyy/YY/yy 表示年份  
  * MM/M 月份  
  * W/w 星期  
  * dd/DD/d/D 日期  
  * hh/HH/h/H 时间  
  * mm/m 分钟  
  * ss/SS/s/S 秒  
**/
//---------------------------------------------------  
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
    str = str.replace(/M/g, this.getMonth());


    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}
/*
    解析浏览器参数
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*layui form select 动态渲染 linkage()
* 
 */

function linkage(url, form, $p) {
    var html = [];
    var organizationId;
    $.ajax({
        type: "get",
        url: url,
        success: function (res) {
            var list = res.data;
            $.each(list, function (i, item) {
                var item = item;
                if (i == 0) {
                    organizationId = item.id;
                    console.log(organizationId)
                }
                var value = (item.id) || (item.organizationId);
                var str = (item.hospital) || (item.organizationName)
                html.push('<option value="' + value + '" >' + str + '</option>');
            })
            $p.append(html.join(","))
            form.render('select')
        }
    })
}

function layerLoading (layer,win) {
    return win.layer.load(1, { shade: [0.5, '#393D49'] });
}

function closeLayer(layerindex,win){
    win.layer.close(layerindex)
}
