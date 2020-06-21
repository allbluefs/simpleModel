$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/user/list',
        datatype: "json",
        colModel: [
            {label: '用户Id', name: 'userId', index: 'user_id', width: 45, key: true},
            {label: '用户名', name: 'username', width: 75},
            {label: '姓名', name: 'chineseName', width: 75},
            // {label: '所属机构', name: 'deptName', sortable: false, width: 75},
            // {
            //     label: '职位', name: 'dutyName', width: 90
            // },
            {
                label: '角色', name: 'roleName', width: 90
            },
            {label: '手机号', name: 'phoneNumber', width: 100},
            {label: '身份证号', name: 'idCardNumber', width: 100},
            {label: 'QQ号', name: 'qq', width: 100},
            {label: '邮箱', name: 'email', width: 100},
            {label: '创建时间', name: 'createTime', width: 100},
            {
                label: '状态', name: 'status', width: 60, formatter: function (value, options, row) {
                    return value === 0 ?
                        '<span class="label label-danger">禁用</span>' :
                        '<span class="label label-success">正常</span>';
                }
            },
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

    $(".profile-img").hover(function(){
        $(".change-profile").show();
    },function(){
        $(".change-profile").hide();
    });

    $(".profile-img").click(function () {
        $("#profile").click();
    })
    $("#profile").change(function () {
        var file=$(this)[0].files[0];    //获取文件信息
        var imgdata='';
        if(file)
        {
            var reader=new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload=function(evt){   //读取操作完成时触发。
                $(".profile-img").attr('src',evt.target.result)  //将img标签的src绑定为DataURL
            };
        }

    });
});
var ztree;
// var setting = {
//     data: {
//         simpleData: {
//             enable: true,
//             idKey: "deptId",
//             pIdKey: "parentId",
//             rootPId: -1
//         },
//         key: {
//             url: "nourl"
//         }
//     }
// };
var vm = new Vue({
    el: '#cwapp',
    data: {
        q: {
            username: null,
            // deptId: null
        },
        showList: true,
        title: null,
        roleList: {},
        user: {
            status: 1,
            // deptId: null,
            deptName: null,
            roleIdList: []
        },
        // dutyList: []
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            registerFrom();
            vm.showList = false;
            vm.title = "新增";
            vm.roleList = {};
            vm.user = { status: 1, roleIdList: []};
            //获取角色信息
            this.getRoleList();
            // this.getDept();
            // this.getDutyList();
            // this.getParty();
        },
        // getDept: function () {
        //     //加载机构树
        //     $.get(baseURL + "sys/dept/list", function (r) {
        //         ztree = $.fn.zTree.init($("#deptTree"), setting, r);
        //         ztree.expandAll(true);
        //         var node = ztree.getNodeByParam("deptId", vm.user.deptId);
        //         if (node != null) {
        //             ztree.selectNode(node);
        //
        //             vm.user.deptName = node.name;
        //         }
        //     })
        // },
        update: function (event) {
            var userId = getSelectedRow();
            if (userId == null) {
                return;
            }
            registerFrom();
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(userId)
            //获取角色信息
            this.getRoleList();
            // this.getDutyList();
            // vm.getDept();
            // vm.getParty();
        },
        saveOrUpdate: function (event) {
            var bootstrapValidator = $("#newForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if (!bootstrapValidator.isValid()) {
                return;
            }
            var url = vm.user.userId == null ? "sys/user/save" : "sys/user/update";


            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                // data: vm.user,
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
            var userIds = getSelectedRows();
            if (userIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                // $("#jqGrid").trigger("reloadGrid");
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (userId) {
            $.get(baseURL + "sys/user/info/" + userId, function (r) {
                vm.user = r.user;
                // setTimeout(function () {
                //     var bootstrapValidator = $("#newForm").data('bootstrapValidator');
                //     bootstrapValidator.enableFieldValidators("password", false);
                //     bootstrapValidator.validate();
                // })
            });
        },
        getRoleList: function () {
            $.get(baseURL + "sys/role/select", function (r) {
                vm.roleList = r.list;
            });
        },
        // getDutyList: function () {
        //     $.get(baseURL + "sys/dict/list/duties", function (r) {
        //         vm.dutyList = r.list;
        //     });
        // },
        // deptTree: function () {
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
        //             var node = ztree.getSelectedNodes();
        //             vm.user.deptId = node[0].deptId;
        //             vm.user.deptName = node[0].name;
        //             setTimeout(function () {
        //                 $("#newForm").data('bootstrapValidator').updateStatus('deptName', 'NOT_VALIDATED').validateField('deptName');
        //             })
        //             layer.close(index);
        //         }
        //     });
        // },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'username': vm.q.username,
                    // 'deptId':vm.q.deptId
                },
                page: page
            }).trigger("reloadGrid");
        }
    }
});

function registerFrom() {
    var validator = $("#newForm").data('bootstrapValidator');
    if (validator) {
        validator.destroy();
        $('#newForm').data('bootstrapValidator', null);
    }
    $('#newForm').bootstrapValidator({
        excluded: [":disabled"],
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]([a-zA-Z0-9_]{0,})$/,
                        message: '只能以字母开头，且只能是数字、字母、_'
                    },
                    stringLength: {
                        min: 4,
                        max: 50,
                        message: "用户名最少4位，最大50位"
                    },
                    // remote: {
                    //     url: baseURL + "sys/user/detect",
                    //     dataType: "json",
                    //     message: '用户已存在',
                    //     delay: 1000,
                    //     data: function (value) {
                    //         return {username: vm.user.username, userId: vm.user.userId};
                    //     }
                    // }
                }
            },
            // deptName: {
            //     validators: {
            //         notEmpty: {
            //             message: '请选择机构'
            //         }
            //     }
            // },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: "密码最大20位"
                    }
                }
            },
            // email: {
            //     validators: {
            //         notEmpty: {
            //             message: '邮箱不能为空'
            //         },
            //         emailAddress: {
            //             message: "邮箱格式不正确"
            //         }
            //     }
            // },
            moblie: {
                validators: {
                    regexp: {
                        regexp: /^1(3|4|5|6|7|8|9)\d{9}$/,
                        message: '手机号码不正确'
                    }
                }
            },
            chRoles: {
                validators: {
                    /*notEmpty: {
                        message: '至少选择一个角色'
                    }*/
                    /*callback: {
                        message: '至少选择一个角色',
                        callback: function(value, validator) {
                            return false;
                        }
                    }*/
                }
            },
            status: {
                validators: {
                    choice: {
                        min: 1,
                        message: '请选择状态'
                    }
                }
            }
        }
    });
}
