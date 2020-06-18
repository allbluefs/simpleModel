var MenuSys = {
    id: "menuTableSys",
    table: null,
    layerIndex: -1
};
var MenuApp = {
    id: "menuTableApp",
    table: null,
    layerIndex: -1
};
/**
 * 初始化表格的列
 */
MenuSys.initSysColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '菜单ID', field: 'menuId', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '上级菜单', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {
            title: '图标', field: 'icon', align: 'center', valign: 'middle', sortable: true, width: '80px',
            formatter: function (item, index) {
                return item.icon == null ? '' : '<i class="' + item.icon + ' fa-lg"></i>';
            }
        },
        {
            title: '类型', field: 'type', align: 'center', valign: 'middle', sortable: true, width: '100px',
            formatter: function (item, index) {
                if (item.type === 0) {
                    return '<span class="label label-primary">目录</span>';
                }
                if (item.type === 1) {
                    return '<span class="label label-success">菜单</span>';
                }
                if (item.type === 2) {
                    return '<span class="label label-warning">按钮</span>';
                }
            }
        },
        {title: '排序号', field: 'orderNum', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '菜单URL', field: 'url', align: 'center', valign: 'middle', sortable: true, width: '160px'},
        {title: '授权标识', field: 'perms', align: 'center', valign: 'middle', sortable: true}]
    return columns;
};
MenuApp.initAppColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '菜单ID', field: 'menuId', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '上级菜单', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {
            title: '类型', field: 'type', align: 'center', valign: 'middle', sortable: true, width: '100px',
            formatter: function (item, index) {
                if (item.type === 0) {
                    return '<span class="label label-primary">功能</span>';
                }
                if (item.type === 1) {
                    return '<span class="label label-success">API</span>';
                }
            }
        },
        {title: '排序号', field: 'orderNum', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '授权标识', field: 'perms', align: 'center', valign: 'middle', sortable: true}]
    return columns;
};



var ztree;
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};
var vm = new Vue({
    el: '#cwapp',
    data: {
        showList: true,
        title: null,
        menu: {
            parentName: null,
            parentId: 0,
            type: 1,
            orderNum: 0,
        },
        menuType: 1//1系统菜单 2 APP菜单
    },
    methods: {

        initSysTable: function () {
            var colunms = MenuSys.initSysColumn();
            var table = new TreeTable(MenuSys.id, baseURL + "sys/menu/list", colunms);
            table.setExpandColumn(2);
            table.setIdField("menuId");
            table.setCodeField("menuId");
            table.setParentCodeField("parentId");
            table.setExpandAll(false);
            table.init();
            MenuSys.table = table;
        },
        getMenu: function (menuId) {
            var url;
            if (vm.menuType==1){
                url =  "sys/menu/select";
            }
            //加载菜单树
            $.get(baseURL + url, function (r) {
                ztree = $.fn.zTree.init($("#menuTree"), setting, r.menus);
                var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
                ztree.selectNode(node);

                vm.menu.parentName = node.name;
            })
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            if(vm.menuType==1){
                vm.title ="新增系统菜单"
            }
            vm.menu = {parentName: null, parentId: 0, type: 1, orderNum: 0};

            vm.getMenu();
        },
        update: function (event) {
            var menuId = getMenuId();
            if (menuId == null) {
                return;
            }
            var url;
            if (vm.menuType==1){
                url =  "sys/menu/info/";
            }
            $.get(baseURL + url + menuId, function (r) {
                vm.showList = false;
                if(vm.menuType==1){
                    vm.title ="修改系统菜单"
                }
                vm.menu = r.menu;
                vm.getMenu();
            });
        },
        saveOrUpdate: function (event) {
            if (vm.validator()) {
                return;
            }
            var url;
            if (vm.menuType==1){
                url = vm.menu.menuId == null ? "sys/menu/save" : "sys/menu/update";
            }
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.menu),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var menuId = getMenuId();
            if (menuId == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                var url;
                if(vm.menuType==1){
                    url = "sys/menu/delete";
                }
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(menuId),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (menuId) {
            var url;
            if(vm.menuType==1){
                url = "sys/menu/info/";
            }
            $.get(baseURL + url + menuId, function (r) {
                vm.menu = r.menu;
            });
        },
        reload: function (event) {
            vm.showList = true;
            if(vm.menuType==1){
                MenuSys.table.refresh();
            }
        },
        menuTree: function () {
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.menu.parentId = node[0].menuId;
                    vm.menu.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },
        validator: function () {
            if (isBlank(vm.menu.name)) {
                alert("菜单名称不能为空");
                return true;
            }

            //菜单
            if (vm.menuType==1&&vm.menu.type === 1 && isBlank(vm.menu.url)) {
                alert("菜单URL不能为空");
                return true;
            }
        }
    },
    mounted(){

    }
});
vm.initSysTable();
function getMenuId() {
    var selected;
    if(vm.menuType==1){
        selected = $('#menuTableSys').bootstrapTreeTable('getSelections');
    }

    if (selected.length == 0) {
        alert("请选择一条记录");
        return false;
    } else {
        return selected[0].id;
    }
};