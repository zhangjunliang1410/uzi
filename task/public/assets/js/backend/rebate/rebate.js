define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'rebate/rebate/index' + location.search,
                    add_url: 'rebate/rebate/add',
                    edit_url: 'rebate/rebate/edit',
                    del_url: 'rebate/rebate/del',
                    multi_url: 'rebate/rebate/multi',
                    table: 'rebate',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                searchFormVisible: true,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'user_id', title: __('User_id')},
                        {field: 'nickname', title: __('用户名'),operate:false},
                        {field: 'give_user_id', title: __('Give_user_id')},
                        {field: 'givename', title: __('来源用户'),operate:false},
                        {field: 'type', title: __('Type'), searchList: {"rec":__('Type rec'),"task":__('Type task'),"active":__('Type active'),"recharge":__('Type recharge'),"recTask":__('Type rectask')}, formatter: Table.api.formatter.normal},
                        {field: 'order_id', title: __('Order_id'),operate:false},
                        {field: 'recharge_id', title: __('Recharge_id'),operate:false},
                        {field: 'num', title: __('Num'),operate:false},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status,operate:false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), addclass:'datetimerange', formatter: Table.api.formatter.datetime,operate:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});