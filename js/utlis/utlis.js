/**
 * 去除空格的方法
 * @param str
 * @param type
 * all-所有空格,
 * preBehind-前后空格
 * previous-前面空格,
 * behind-后面空格
 */
function trim(str, type) {
    switch (type) {
        case 'all':
            return str.replace(/\s+/g, "");
        case 'preBehind':
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 'previous':
            return str.replace(/(^\s*)/g, "");
        case 'behind':
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}


/**
 * 字母大小写切换
 * @param str
 * @param type
 * FirstUpper - 首字母大写
 * FirstLower - 首字母小写
 * AllToggle - 全部大小写转换
 * AllUpper - 全部大写
 * AllLower - 全部小写
 */
function changeCase(str, type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
        return itemText;
    }

    switch (type) {
        case 'FirstUpper':
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
        case 'FirstLower':
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1);
            });
        case 'AllToggle':
            return ToggleCase(str);
        case 'AllUpper':
            return str.toUpperCase();
        case 'AllLower':
            return str.toLowerCase();
        default:
            return str;
    }
}


/**
 * 检测字符串类型
 * @param str
 * @param type
 */
function checkType(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8|9][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]+$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}


/**
 * 检测密码强度
 * @param str
 * @returns {number}
 */
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv;
    }
    if (/[0-9]/.test(str)) {
        nowLv++;
    }
    if (/[a-z]/.test(str)) {
        nowLv++;
    }
    if (/[A-Z]/.test(str)) {
        nowLv++;
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++;
    }
    return nowLv;

}


/**
 * 随机生成指定长度的字符串
 * @param length
 * @returns {string}
 */
function random(length) {
    var str = Math.random().toString(36).substr(2);
    if (str.length >= length) {
        return str.substr(0, length);
    }
    str += random(length - str.length);
    return str;
}



/**
 * 统计给定字符串中,目标字符串出现的次数
 * @param str
 */
function countStr(str, target) {
    return str.split(target).length - 1;
}


/**
 * 格式化处理字符串
 * @param str
 * @param size-位数,默认3位
 * @param delimiter-连接符,默认为','
 */
function formatText(str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
}


/**
 * 找出字符串中最长的单词
 * @param str
 * @param splitType
 */
function longestWord(str, splitType) {
    var _splitType = splitType || /\s+/g,
        _max = 0, _item = '';
    var strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max < item.length) {
            _max = item.length;
            _item = item;
        }
    });
    return { el: _item, max: _max };
}


/**
 * 严格的身份证校验
 * @param str
 */
function isCardID(sId) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        return ("你输入的身份证长度或格式错误")
    }
    //身份证城市
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
        return ('你的身份证地区非法')
    }

    // 出生日期验证
    var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
        d = new Date(sBirthday)
    if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        return ('身份证上的出生日期非法')
    }

    // 身份证号码校验
    var sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432"
    for (var i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
        return ('你输入的身份证号非法')
    }

    return "有效的身份证"
}

/**
 * 中文正则
 * @param str
 */
function regCN(string) {
    var valid = /[\u4E00-\u9FA5]/;
    return valid.test(string)
}

/**
* 用户名正则
* @param str
*/
function regUname(string) {
    var valid = /^[a-zA-Z0-9_-]{4,16}$/;
    return valid.test(string)
}

/**
* Email正则
* @param str
*/
function regEmail(string) {
    var valid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return valid.test(string)
}

/**
* 手机号码正则
* @param str
*/
function regIpone(string) {
    var valid = /^1[34578]\d{9}$/;
    return valid.test(string)
}

/**
* 中国邮政编码正则
* @param str
*/
function regLplate(string) {
    var valid = /[1-9]\d{5}(?!\d)/;
    return valid.test(string)
}

/**
* URL正则
* @param str
*/
function regURL(string) {
    var valid = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return valid.test(string)
}

/**
* QQ号码正则
* @param str
*/
function regQQ(string) {
    var valid = /^[1-9][0-9]{4,10}$/;
    return valid.test(string)
}

/**
* 微信号正则
* @param str
*/
function regWX(string) {
    var valid = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return valid.test(string)
}

/**
* 车牌号正则
* @param str
*/
function regLplate(string) {
    var valid = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return valid.test(string)
}

/**
 * 获取浏览器参数
 * @param str
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}



