define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'configure/configure/index' + location.search,
                    add_url: 'configure/configure/add',
                    edit_url: 'configure/configure/edit',
                    del_url: 'configure/configure/del',
                    multi_url: 'configure/configure/multi',
                    table: 'configure',
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
                        {field: 'radio', title: __('Radio')},
                        {field: 'radiostatus', title: __('Radiostatus'), searchList: {"0":__('Radiostatus 0'),"1":__('Radiostatus 1')}, formatter: Table.api.formatter.status},
                        {field: 'wximage', title: __('Wximage'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'serviceimage', title: __('Serviceimage'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'android', title: __('Android')},
                        {field: 'ios', title: __('Ios')},
                        {field: 'version', title: __('Version')},
                        {field: 'updateUrl', title: __('Updateurl'), formatter: Table.api.formatter.url},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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