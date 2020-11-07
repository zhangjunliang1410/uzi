define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'recharge/withdraw/index' + location.search,
                    edit_url: 'recharge/withdraw/edit',
                    multi_url: 'recharge/withdraw/multi',
                    table: 'withdraw',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'user_id', title: __('User_id')},
                        {field: 'num', title: __('Num'), operate:'BETWEEN'},
                        {field: 'orderId', title: __('订单编号'), operate:'BETWEEN'},
                        {field: 'card', title: __('银行卡号'), operate:'BETWEEN'},
                        {field: 'bankuser', title: __('开户人'), operate:'BETWEEN'},
                        {field: 'bankname', title: __('开户行'), operate:'BETWEEN'},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"-1":__('Status -1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: '拒绝订单',
                                    title: __('拒绝订单'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    extend:'data-area=\'["350px,350px"]\'',
                                    icon: 'fa fa-magic',
                                    url: 'recharge/withdraw/detail',
                                    callback: function (data) {
                                        Layer.alert("订单已拒绝");
                                    }
                                },
                                {
                                    name: '通过审核',
                                    text: __('通过审核'),
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'recharge/withdraw/edits',
                                    success: function (data, ret) {
                                        window.location.reload();
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                }
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
        detail: function () {
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