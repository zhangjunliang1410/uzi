define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'task/task/index' + location.search,
                    edit_url: 'task/task/edit',
                    multi_url: 'task/task/multi',
                    table: 'task',
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
                        {field: 'mealtype', title: __('Mealtype'), searchList: {"0":__('Mealtype 0'),"1":__('Mealtype 1'),"2":__('Mealtype 2'),"3":__('Mealtype 3'),"4":__('Mealtype 4')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'tasktype', title: __('Tasktype'), searchList: {"1":__('Tasktype 1'),"2":__('Tasktype 2'),"3":__('Tasktype 3'),"4":__('Tasktype 4')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'title', title: __('Title'),operate:false},
                        {field: 'tasknum', title: __('Tasknum'),operate:false},
                        {field: 'price', title: __('Price'),operate:false},
                        {field: 'surplus', title: __('Surplus'),operate:false},
                        {field: 'starttime', title: __('Starttime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'endtime', title: __('Endtime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'checklimit', title: __('Checklimit'), searchList: {"0":__('Checklimit 0'),"1":__('Checklimit 1'),"2":__('Checklimit 2'),"3":__('Checklimit 3')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'postlimit', title: __('Postlimit'), searchList: {"0":__('Postlimit 0'),"1":__('Postlimit 1'),"2":__('Postlimit 2'),"3":__('Postlimit 3')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'posttime', title: __('Posttime'),operate:false, addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'iscollect', title: __('Iscollect'), searchList: {"0":__('Iscollect 0'),"1":__('Iscollect 1')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'isimg', title: __('Isimg'), searchList: {"0":__('Isimg 0'),"1":__('Isimg 1')}, formatter: Table.api.formatter.normal,searchable:false},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2'),"3":__('Status 3'),"-1":__('Status -1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'addtabs',
                                    title: __('任务订单'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-list',
                                    url: function(row){
                                        return 'order/order/index?task_id='+row.id;
                                    }
                                },
                                {
                                    name: '通过审核',
                                    text: __('通过审核'),
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'task/task/edits?status=2',
                                    success: function (data, ret) {
                                        window.location.reload();
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: '审核拒绝',
                                    text: __('审核拒绝'),
                                    classname: 'btn btn-xs btn-error btn-book btn-ajax',
                                    icon: 'fa fa-book',
                                    url: 'task/task/edits?status=-1',
                                    success: function (data, ret) {
                                        window.location.reload();
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                            ],
                            formatter: Table.api.formatter.operate}
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