define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'recharge/recharge/index' + location.search,
                    multi_url: 'recharge/recharge/multi',
                    table: 'recharge',
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
                        {field: 'nickname', title: __('用户名'), operate:false},
                        {field: 'num', title: __('Num'), operate:false},
                        {field: 'orderId', title: __('订单编号'), operate:false},
                        {field: 'image', title: __('Image'), events: Table.api.events.image, formatter: Table.api.formatter.image, operate:false},
                        {field: 'paytype', title: __('Paytype'), searchList: {"alipay1":__('Paytype alipay1'),"alipay2":__('Paytype alipay2'),"alipay3":__('Paytype alipay3'),"wechat1":__('Paytype wechat1'),"wechat2":__('Paytype wechat2'),"wechat3":__('Paytype wechat3'),"bank1":__('Paytype bank1'),"bank2":__('Paytype bank2'),"bank3":__('Paytype bank3'),"alipaybank1":__('Paytype alipaybank1'),"alipaybank2":__('Paytype alipaybank2'),"alipaybank3":__('Paytype alipaybank3'),"wechatbank1":__('Paytype wechatbank1'),"wechatbank2":__('Paytype wechatbank2'),"wechatbank3":__('Paytype wechatbank3')}, formatter: Table.api.formatter.normal},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2'),"-1":__('Status -1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'paytime', title: __('Paytime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'),  addclass:'datetimerange', formatter: Table.api.formatter.datetime, operate:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: '拒绝订单',
                                    title: __('拒绝订单'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    extend:'data-area=\'["350px,350px"]\'',
                                    icon: 'fa fa-magic',
                                    url: 'recharge/recharge/detail',
                                    callback: function (data) {
                                        Layer.alert("订单已拒绝");
                                    }
                                },
                                {
                                    name: '通过审核',
                                    text: __('通过审核'),
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'recharge/recharge/edits',
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