function registerFrom(){
    var validator = $("#myForm").data('bootstrapValidator')
    if(validator){
        validator.destroy();
        $('#myForm').data('bootstrapValidator', null);
    }
    $('#myForm').bootstrapValidator({
        excluded:[":disabled"],
        fields: {

			   userId: {
                            validators: {
                                notEmpty: {
                                    message: '不能为空'
                                }
                            }
                        }, 
			   menuId: {
                            validators: {
                                notEmpty: {
                                    message: '不能为空'
                                }
                            }
                        }
        }
    });
}
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'dev/sysusermenu/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'userId', index: 'user_id', width: 80 }, 			
			{ label: '', name: 'menuId', index: 'menu_id', width: 80 }			
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
		sysUserMenu: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
		    registerFrom();
			vm.showList = false;
			vm.title = "新增";
			vm.sysUserMenu = {};
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
			var url = vm.sysUserMenu.id == null ? "dev/sysusermenu/save" : "dev/sysusermenu/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysUserMenu),
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
				    url: baseURL + "dev/sysusermenu/delete",
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
			$.get(baseURL + "dev/sysusermenu/info/"+id, function(r){
                vm.sysUserMenu = r.sysUserMenu;
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