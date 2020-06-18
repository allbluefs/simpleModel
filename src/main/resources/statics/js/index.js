var context_path="api"
//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props: {item: {}},
    template: [
        '<li>',
        '	<a v-if="item.type === 0" href="javascript:;">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '		<i class="fa fa-angle-left pull-right"></i>',
        '	</a>',
        '	<ul v-if="item.type === 0" class="treeview-menu">',
        '		<menu-item :item="item" v-for="item in item.children"></menu-item>',
        '	</ul>',

        '	<a v-if="item.type === 1 && item.parentId === 0" :href="\'#\'+item.url">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '	</a>',

        '	<a v-if="item.type === 1 && item.parentId != 0" :href="\'#\'+item.url"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>',
        '</li>'
    ].join('')
});

//iframe自适应
$(window).on('resize', function () {
    var $content = $('.content');
    $content.height($(this).height() - 120);
    $content.find('iframe').each(function () {
        $(this).height($content.height());
    });
}).resize();

//注册菜单组件
Vue.component('menuItem', menuItem);

var vm = new Vue({
    el: '#cwapp',
    data: {
        user: {},
        menuList: {},
        main: "main.html",
        password: '',
        newPassword: '',
        navTitle: "控制台",
        navTitles: new Array(),
        scheduleSrc: ""
    },
    methods: {
        getMenuList: function (event) {
            $.getJSON("sys/menu/nav?_" + $.now(), function (r) {
                vm.menuList = r.menuList;
            });
        },
        getUser: function () {
            $.getJSON("getLoginUserInfo", function (r) {
                vm.user = r;
                console.log(vm.user.username)
            });
        },
        myCalendar: function () {
            vm.scheduleSrc = "modules/shd/schedule.html";
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "我的日程",
                area: ['850px', '550px'],
                shadeClose: false,
                content: jQuery("#scheduleLayer")
            });
        },
        logout:function(){
            $.get("sys/logout",function (r) {
                window.location.href="/api/login.html"
            })
        },
        updatePassword: function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "修改密码",
                area: ['550px', '270px'],
                shadeClose: false,
                content: jQuery("#passwordLayer"),
                btn: ['修改', '取消'],
                btn1: function (index) {
                    var data = "password=" + vm.password + "&newPassword=" + vm.newPassword;
                    $.ajax({
                        type: "POST",
                        url: "sys/user/password",
                        data: data,
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 0) {
                                layer.close(index);
                                layer.alert('修改成功', function (index) {
                                    location.reload();
                                });
                            } else {
                                layer.alert(result.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    created: function () {
        this.getMenuList();
        this.getUser();
    },
    updated: function () {
        //路由
        var router = new Router();
        routerList(router, vm.menuList);
        router.start();
    }
});


function routerList(router, menuList) {
    for (var key in menuList) {
        var menu = menuList[key];
        if (menu.type == 0) {
            routerList(router, menu.children);
        } else if (menu.type == 1) {
            router.add('#' + menu.url, function () {
                var url = window.location.hash;

                //替换iframe的url
                vm.main = url.replace('#', '');

                //导航菜单展开
                $(".treeview-menu li").removeClass("active");
                $("a[href='" + url + "']").parents("li").addClass("active");
                console.log("运行到这里了");
                // if(vm.navTitles.length>0){
                //     vm.navTitles=new Array();
                // }

                // vm.navTitles.splice(0,vm.navTitles.length);
                // var nt = new Object();
                // nt.name =
                // nt.url =  url.replace('#', '');
                // vm.navTitles.push(nt);
                var pa = $("a[href='" + url + "']").parent().parent().parent().find("a")
                var pclass = pa.find("i").attr("class");
                var ptitle = pa.find("span").text();
                createFirstTitle(ptitle, pclass, url.replace('#', ''), $("a[href='" + url + "']").text());
                $(".active").find("ul").show();
            });
        }
    }
}

function createFirstTitle(ptitle, pclass, url, title) {
    vm.navTitles = new Array();
    var pnt = new Object();
    pnt.title = ptitle;
    pnt.class = pclass;
    pnt.url = "#";
    vm.navTitles.push(pnt);
    var nt = new Object();
    nt.title = title;
    nt.url = url;
    vm.navTitles.push(nt);
    createNavTitles();
}

function goPage(url) {
    // vm.main = url;
    // url="#"+url;
    // //导航菜单展开
    $(".active").find("ul").hide();
    $(".active").removeClass("active");
    $("a[href='" + url + "']").parents("li").addClass("active");
    $("a[href='" + url + "']").parents("li").parents("ul").addClass("menu-open");
    $("a[href='" + url + "']").parents("li").parents("ul").parents("li").addClass("active");
    window.location.hash = "#" + url;

}
function goUrl(url) {
    var newNavTitles = new Array();
    $("#mainIframe").attr("src",url)
}

var iframe = document.getElementById("mainIframe");
if (iframe.attachEvent) {
    iframe.attachEvent("onload", function () {
        var href = iframe.contentWindow.location.href;
        var url = href.split(/^(?:[^/]*\/){3}(.*)$/)[1];
        var title = iframe.contentWindow.document.title;
        changeUrl(url, title);
    });
} else {
    iframe.onload = function () {
        var href = iframe.contentWindow.location.href;
        var url = href.split(/^(?:[^/]*\/){3}(.*)$/)[1];
        var title = iframe.contentWindow.document.title;
        changeUrl(url, title);
    };
}

function changeUrl(url, title) {
    if (url == "main.html") {
        return;
    }
    var newNavTitles = new Array();
    for (var i = 0; i < vm.navTitles.length; i++) {
        var nt = vm.navTitles[i];
        newNavTitles.push(nt);
        if (context_path+"/"+nt.url == url) {
            vm.navTitles = newNavTitles;
            createNavTitles();
            return;
        }
    }

    var nt = new Object();
    nt.title = title;
    nt.url = url;
    vm.navTitles.push(nt);
    createNavTitles();
}

function createNavTitles() {
    var titleHtml = "";
    for (var i = 0; i < vm.navTitles.length; i++) {
        var nt = vm.navTitles[i];
        var active = "";
        if (i == (vm.navTitles.length - 1)) {
            active = "active";
        }
        if (i == 0) {
            titleHtml += "<li class=\"\" ><i class=\"" + nt.class + "\" style=\"font-size:20px;position:relative;top:2px;left:-3px;\"></i> &nbsp; " + nt.title + " </li>";
        } else {
            titleHtml += "<li class=\"" + active + " navTitles\"  data-url='" + nt.url + "'>" + nt.title + "</li>"
        }
    }
    $("#nav_title").html(titleHtml);
}

var nowSkin = "";
var selectedBackColor="#428bca";
$(function () {


    $("#nav_title").on("click", '.navTitles', function () {

        // $("#mainIframe").attr("src", $(this).data("url"))
    });
});
var M = new Map();
