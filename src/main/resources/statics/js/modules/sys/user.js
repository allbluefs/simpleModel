function registerFrom(){
    var validator = $("#myForm").data('bootstrapValidator')
    if(validator){
        validator.destroy();
        $('#myForm').data('bootstrapValidator', null);
    }
    $('#myForm').bootstrapValidator({
        excluded:[":disabled"],
        fields: {

			   username: {
                            validators: {
                                notEmpty: {
                                    message: '账户不能为空'
                                }
                            }
                        }, 
			   password: {
                            validators: {
                                notEmpty: {
                                    message: '密码不能为空'
                                }
                            }
                        }, 
			   userType: {
                            validators: {
                                notEmpty: {
                                    message: '用户类型（1普通用户 3管理员）不能为空'
                                }
                            }
                        }, 
			   chineseName: {
                            validators: {
                                notEmpty: {
                                    message: '用户姓名不能为空'
                                }
                            }
                        }
        }
    });
}
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/user/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '账户', name: 'username', index: 'username', width: 80 }, 			
			{ label: '密码', name: 'password', index: 'password', width: 80 }, 			
			{ label: '用户类型（1普通用户 3管理员）', name: 'userType', index: 'user_type', width: 80 }, 			
			{ label: '用户姓名', name: 'chineseName', index: 'chinese_name', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    isDisable:false,
		showList: true,
		title: null,
		sysUser: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
		    registerFrom();
			vm.showList = false;
			vm.title = "新增";
			vm.sysUser = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			registerFrom();
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			vm.isDisable = true;
		    var bootstrapValidator = $("#myForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if (!bootstrapValidator.isValid()) {
				vm.isDisable = false;
                return;
            }
			var url = vm.sysUser.id == null ? "sys/user/save" : "sys/user/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysUser),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
					vm.isDisable = false;
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/user/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "sys/user/info/"+id, function(r){
                vm.sysUser = r.sysUser;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});