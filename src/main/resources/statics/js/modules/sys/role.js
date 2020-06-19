$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/role/list',
        datatype: "json",
        colModel: [
            {label: '角色Id', name: 'roleId', index: 'role_id', width: 50, key: true},
            {label: '角色名称', name: 'roleName', index: 'role_name', width: 80},
            {label: '所属机构', name: 'deptName', sortable: false, width: 80},
            {label: '备注', name: 'remark', index: 'remark', width: 80},
            {label: '创建时间', name: 'createTime', index: 'create_time', width: 80}
        ],
        viewrecords: true,
        height: 'auto',
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});
var menuSetting = {
    check: {
        enable: true,
        nocheckInherit: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};

// var dataSetting = {
//     check: {
//         enable: true,
//         nocheckInherit: true,
//         chkboxType: {"Y":"", "N":""}
//     },
//     data: {
//         simpleData: {
//             enable: true,
//             idKey: "deptId",
//             pIdKey: "parentId",
//             rootPId: -1
//         },
//         key: {
//             url:"nourl"
//         }
//     }
// };
// var deptSetting = {
//     data: {
//         simpleData: {
//             enable: true,
//             idKey: "deptId",
//             pIdKey: "parentId",
//             rootPId: -1
//         },
//         key: {
//             url:"nourl"
//         }
//     }
// };

var menuZtree;
var appMenuZTree;
var dataZtree;
// var deptZtree;
var vm = new Vue({
    el: '#cwapp',
    data: {
        showList: true,
        title: null,
        role: {
            deptId: null,
            deptName: null
        },
        q: {
            roleName: null
        }
    },
    methods: {
        getMenuTree: function(roleId){
            //加载菜单树
            $.get(baseURL + "sys/menu/select", function(r){
                menuZtree = $.fn.zTree.init($("#menuTree"), menuSetting, r.menus);
                // var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
                menuZtree.expandAll(true);
                if(roleId != null){
                    vm.getRole(roleId);
                }
            });
        },
        // getAppMenuTree: function(roleId){
        //     //加载菜单树
        //     $.get(baseURL + "sys/appmenu/select", function(r){
        //         appMenuZTree = $.fn.zTree.init($("#appMenuTree"), menuSetting, r.menus);
        //         // var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
        //         appMenuZTree.expandAll(true);
        //         if(roleId != null){
        //             vm.getRole(roleId);
        //         }
        //     });
        // },
        //
        // getDataTree: function(roleId){
        //     //加载机构树
        //     $.get(baseURL + "sys/dept/list", function(r){
        //         dataZtree = $.fn.zTree.init($("#dataTree"), dataSetting, r);
        //         dataZtree.expandAll(true);
        //         if(roleId != null){
        //             vm.getRole(roleId);
        //         }
        //     });
        // },
        // getDept: function(){
        //     //加载机构树
        //     $.get(baseURL + "sys/dept/list", function(r){
        //         deptZtree = $.fn.zTree.init($("#deptTree"), deptSetting, r);
        //         deptZtree.expandAll(true);
        //         var node = deptZtree.getNodeByParam("deptId", vm.role.deptId);
        //         if(node != null){
        //             deptZtree.selectNode(node);
        //             vm.role.deptName = node.name;
        //         }
        //     });
        // },
        query: function () {

            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.role = {deptName:null, deptId:null};
            registerFrom();
            vm.getMenuTree();
            // vm.getAppMenuTree();
            // vm.getDataTree();
            // vm.getDept();
        },
        update: function (event) {
            var roleId = getSelectedRow();
            if (roleId == null) {
                return;
            }
            registerFrom();
            vm.showList = false;
            vm.title = "修改";

            // vm.getDataTree(roleId);
            vm.getMenuTree(roleId);
            // vm.getAppMenuTree(roleId);
            // vm.getDept();

            setTimeout(function () {
                var bootstrapValidator = $("#newForm").data('bootstrapValidator');
                bootstrapValidator.enableFieldValidators("deptName", false);
                bootstrapValidator.validate();
            },500);

        },
        saveOrUpdate: function (event) {
            var bootstrapValidator = $("#newForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if (!bootstrapValidator.isValid()) {
                return;
            }

            var nodes = menuZtree.getCheckedNodes(true);
            var menuIdList = new Array();
            for(var i=0; i<nodes.length; i++) {
                menuIdList.push(nodes[i].menuId);
            }
            vm.role.menuIdList = menuIdList;

            // var nodes = appMenuZTree.getCheckedNodes(true);
            // var appMenuIdList = new Array();
            // for(var i=0; i<nodes.length; i++) {
            //     appMenuIdList.push(nodes[i].menuId);
            // }
            // vm.role.appMenuIdList = appMenuIdList;

            // var nodes = dataZtree.getCheckedNodes(true);
            // var deptIdList = new Array();
            // for (var i=0; i<nodes.length; i++) {
            //     deptIdList.push(nodes[i].deptId);
            // }
            // vm.role.deptIdList = deptIdList;



            var url = vm.role.roleId == null ? "sys/role/save" : "sys/role/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.role),
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
            var roleIds = getSelectedRows();
            if (roleIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/role/delete",
                    contentType: "application/json",
                    data: JSON.stringify(roleIds),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        // deptTree: function(){
        //     layer.open({
        //         type: 1,
        //         offset: '50px',
        //         skin: 'layui-layer-molv',
        //         title: "选择机构",
        //         area: ['300px', '450px'],
        //         shade: 0.3,
        //         shadeClose: false,
        //         content: jQuery("#deptLayer"),
        //         btn: ['确定', '取消'],
        //         btn1: function (index) {
        //             var node = deptZtree.getSelectedNodes();
        //
        //             vm.role.deptId = node[0].deptId;
        //             vm.role.deptName = node[0].name;
        //             setTimeout(function () {
        //                 $("#newForm").data('bootstrapValidator').updateStatus('deptName', 'NOT_VALIDATED').validateField('deptName');
        //             })
        //             layer.close(index);
        //         }
        //     });
        // },
        getRole: function(roleId){
            $.get(baseURL + "sys/role/info/"+roleId, function(r){
                vm.role = r.role;

                //勾选角色所拥有的菜单
                var menuIds = vm.role.menuIdList;
                for(var i=0; i<menuIds.length; i++) {
                    var node = menuZtree.getNodeByParam("menuId", menuIds[i]);
                    menuZtree.checkNode(node, true, false);
                }

                //勾选角色所拥有的APP菜单
                // var appMenuIds = vm.role.appMenuIdList;
                // for(var i=0; i<appMenuIds.length; i++) {
                //     var node = appMenuZTree.getNodeByParam("menuId", appMenuIds[i]);
                //     appMenuZTree.checkNode(node, true, false);
                // }

                //勾选角色所拥有的机构数据权限
                // var deptIds = vm.role.deptIdList;
                // for(var i=0; i<deptIds.length; i++) {
                //     var node = dataZtree.getNodeByParam("deptId", deptIds[i]);
                //     dataZtree.checkNode(node, true, false);
                // }
                // vm.getDept();
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData:{'roleName': vm.q.roleName},
                page: page
            }).trigger("reloadGrid");
        }
    }
});

function registerFrom(){
    var validator = $("#newForm").data('bootstrapValidator');
    if(validator){
        validator.destroy();
        $('#newForm').data('bootstrapValidator', null);
    }
    $('#newForm').bootstrapValidator({
        excluded:[":disabled"],
        fields: {
            roleName: {
                validators: {
                    notEmpty: {
                        message: '角色名称不能为空'
                    },
                    remote:{
                        url: baseURL+"sys/role/detect",
                        dataType: "json",
                        message: '该角色名称已存在',
                        delay: 1000,
                        data: function (value) {
                            return {"roleName": vm.role.roleName, "roleId": vm.role.roleId};
                        }
                    }
                }
            },
            deptName: {
                validators: {
                    notEmpty: {
                        message: '请选择机构'
                    }
                }
            }
        }
    });
}