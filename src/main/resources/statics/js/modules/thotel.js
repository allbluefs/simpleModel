function registerFrom(){
	var validator = $("#myForm").data('bootstrapValidator')
	if(validator){
		validator.destroy();
		$('#myForm').data('bootstrapValidator', null);
	}
	// $('#myForm').bootstrapValidator({
	// 	excluded:[":disabled"],
	// 	fields: {
	//
	// 		name: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '酒店名称不能为空'
	// 				}
	// 			}
	// 		},
	// 		location: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '酒店位置不能为空'
	// 				}
	// 			}
	// 		},
	// 		room: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '房间数不能为空'
	// 				}
	// 			}
	// 		},
	// 		phone: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '联系方式不能为空'
	// 				}
	// 			}
	// 		},
	// 		userId: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '创建人不能为空'
	// 				}
	// 			}
	// 		},
	// 		status: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: '0 未激活 1 激活不能为空'
	// 				}
	// 			}
	// 		}
	// 	}
	// });
}

$(function () {
    $("#jqGrid").jqGrid({
        url:baseURL+ '/hotel/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '酒店名称', name: 'name', index: 'name', width: 80 }, 			
			{ label: '酒店位置', name: 'location', index: 'location', width: 80 }, 			
			{ label: '房间数', name: 'room', index: 'room', width: 80 }, 			
			{ label: '联系方式', name: 'phone', index: 'phone', width: 80 }, 			
			{ label: '创建人', name: 'userId', index: 'user_id', width: 80 }, 			
			{ label: '0 未激活 1 激活', name: 'status', index: 'status', width: 80 }			
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
		tHotel: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
		    registerFrom();
			vm.showList = false;
			vm.title = "新增";
			vm.tHotel = {};
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
			var url = vm.tHotel.id == null ? "dev/thotel/save" : "dev/thotel/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tHotel),
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
				    url: baseURL + "dev/thotel/delete",
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
			$.get(baseURL + "dev/thotel/info/"+id, function(r){
                vm.tHotel = r.tHotel;
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