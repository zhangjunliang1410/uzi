define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/order/index' + location.search,
                    add_url: 'order/order/add',
                    edit_url: 'order/order/edit',
                    del_url: 'order/order/del',
                    multi_url: 'order/order/multi',
                    table: 'order',
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
                        {field: 'user_id', title: __('User_id')},
                        {field: 'nickname', title: __('用户名'),operate:false},
                        {field: 'taskuser', title: __('Taskuser'),searchList: {"1":__('Taskuser 1'),"2":__('Taskuser 2')}, formatter: Table.api.formatter.normal},
                        {field: 'task_id', title: __('Task_id')},
                        {field: 'price', title: __('Price'),operate:false},
                        {field: 'collect', title: __('Collect'),operate:false},
                        {field: 'images', title: __('Images'), events: Table.api.events.image, formatter: Table.api.formatter.images,operate:false},
                        {field: 'mobilemodel', title: __('手机型号'),operate:false},
                        {field: 'platform', title: __('操作系统'),operate:false},
                        {field: 'ip', title: __('IP'),operate:false},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2'),"-1":__('Status -1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'limittime', title: __('Limittime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'finishtime', title: __('Finishtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'checktime', title: __('Checktime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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