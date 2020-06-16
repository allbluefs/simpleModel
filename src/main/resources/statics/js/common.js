//jqGrid的配置信息
$.jgrid.defaults.width = 1000;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$.extend($.jgrid.defaults, {
    loadError: function (xhr, status, error) {
        alert("请求失败！");
    }
});

var baseURL = "../../";
var apiUrl = "http://127.0.0.1:8081/api"
//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost:8080/index.html?id=123
// T.p('id') --> 123;
var url = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};
T.p = url;

//登录token
var token = getToken()
//jquery全局配置
$.ajaxSetup({
    dataType: "json",
    cache: false,
    headers: {
        "token": token
    }
});

//jqgrid全局配置
$.extend($.jgrid.defaults, {
    ajaxGridOptions: {
        headers: {
            "token": token
        }
    }
});


//重写alert
window.alert = function (msg, callback) {
    if (parent.layer) {
        parent.layer.msg(msg, {time: 2000}, function () {
        })
        if (typeof (callback) === "function") {
            callback("ok");
        }
    } else {
        layer.msg(msg, {time: 2000}, function () {
        })
        if (typeof (callback) === "function") {
            callback("ok");
        }
    }

}

//重写confirm式样框
window.confirm = function (msg, callback) {
    if (parent.layer) {
        parent.layer.confirm(msg, {closeBtn: 0, btn: ['确定', '取消']},
            function () {//确定事件
                if (typeof (callback) === "function") {
                    callback("ok");
                }
            });
    } else {
        layer.confirm(msg, {closeBtn: 0, btn: ['确定', '取消']},
            function () {//确定事件
                if (typeof (callback) === "function") {
                    callback("ok");
                }
            });
    }

}

//选择一条记录ID
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if (selectedIDs.length > 1) {
        alert("只能选择一条记录");
        return;
    }

    return selectedIDs[0];
}

//选择多条记录ID
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    return grid.getGridParam("selarrrow");
}

//选择多条记录数据
function getSelectRowsData() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var ids = grid.getGridParam("selarrrow");
    var dataArr = new Array();
    for (var i = 0; i < ids.length; i++) {
        var rowData = grid.getRowData(ids[i]);
        rowData.id = ids[i];
        dataArr.push(rowData)
    }
    return dataArr;
}

//判断是否为空
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

//判断是否为空
function isBlank(value) {
    return !value || !/\S/.test(value)
}

/**
 * 将字符串解析成日期Long类型
 */
function parseTime(str, fmt) {
    return parseDate(str, fmt).getTime();
}

/**
 * 将字符串解析成日期
 * @param str 输入的日期字符串，如'2014-09-13'
 * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
 * @returns 解析后的Date类型日期
 */
function parseDate(str, fmt) {
    fmt = fmt || 'yyyy-MM-dd';
    var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
    fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function (m, $1, $2, $3, $4, idx, old) {
        str = str.replace(new RegExp($1 + '(\\d{' + $2.length + '})' + $4), function (_m, _$1) {
            obj[$3] = parseInt(_$1);
            return '';
        });
        return '';
    });
    obj.M--; // 月份是从0开始的，所以要减去1
    var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
    if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
    return date;
}

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
function formatDate(date, fmt) {
    date = date == undefined ? new Date() : date;
    date = typeof date == 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
        {
            'y': date.getFullYear(), // 年份，注意必须用getFullYear
            'M': date.getMonth() + 1, // 月份，注意是从0-11
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for (var i in obj) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = obj[i] + '';
            if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length == 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
}

document.onkeydown = function (e) { // 回车提交表单
// 兼容FF和IE和Opera
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        try {
            if ($(".ui-pg-input")) {
                var now = Number($(".ui-pg-input").val());
                var max = Number($("#sp_1_jqGridPager").text());
                if (now > max) {
                    $(".ui-pg-input").val(max)
                }
                if (now < 0) {
                    now = 0;
                }
            }
        } catch (e) {

        }

    }
}

//跳转到指定导航菜单
function goNav(url) {
    window.parent.goPage(url);
}

//禁用右键菜单
document.oncontextmenu = function (event) {
    event.preventDefault();
};

function getToken() {
    if(isBrowser()){
        return getBrowser().getToken();
    } else {
        return localStorage.getItem("token");
    }
}

function isBrowser() {
    if (typeof jsCallCef != 'undefined') {
        return true;
    }
    return false;
}

function getBrowser() {
    if (typeof jsCallCef != 'undefined') {
        return jsCallCef;
    }
}
