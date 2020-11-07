define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'user/user/index' + location.search,
                    add_url: 'user/user/add',
                    edit_url: 'user/user/edit',
                    multi_url: 'user/user/multi',
                    table: 'user',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                searchFormVisible: true,
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'nickname', title: __('Nickname')},
                        {field: 'mobile', title: __('Mobile')},
                        {field: 'avatar', title: __('Avatar'), events: Table.api.events.image, formatter: Table.api.formatter.image,operate:false},
                        {field: 'level', title: __('Level'), searchList: {"0":__('Level 0'),"1":__('Level 1'),"2":__('Level 2'),"3":__('Level 3'),"4":__('Level 4'),"5":__('Level 5')}, formatter: Table.api.formatter.normal},
                        {field: 'recnum', title: __('直推'),operate:false},
                        {field: 'twonum', title: __('二级'),operate:false},
                        {field: 'threenum', title: __('三级'),operate:false},
                        {field: 'teamnum', title: __('团队'),operate:false},
                        {field: 'recharge', title: __('充值金额'),operate:false},
                        {field: 'invitecode', title: __('Invitecode'),operate:false},
                        {field: 'money', title: __('Money'), operate:false},
                        {field: 'score', title: __('Score'),operate:false},
                        {field: 'coldmoney', title: __('Coldmoney'), operate:'BETWEEN',operate:false},
                        {field: 'usertype', title: __('Usertype'), searchList: {"ordinary":__('Usertype ordinary'),"active":__('Usertype active'),"recharge":__('Usertype recharge')}, formatter: Table.api.formatter.normal},
                        {field: 'joinip', title: __('Joinip'),operate:false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status,operate:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'addtabs',
                                    title: __('绑定信息'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-list',
                                    url: function(row){
                                        return 'user/bind/bank?user_id='+row.id;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    title: __('直推'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-magic',
                                    url: function(row){
                                        return 'config/team/rec?type=1&user_id='+row.id;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    title: __('间推'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-list',
                                    url: function(row){
                                        return 'config/team/rec?type=2&user_id='+row.id;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    title: __('三层'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-list',
                                    url: function(row){
                                        return 'config/team/rec?type=3&user_id='+row.id;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    title: __('余额记录'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-book',
                                    url: function(row){
                                        return 'user/usermoneylog/index?user_id='+row.id;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    title: __('钻石记录'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-book',
                                    url: function(row){
                                        return 'user/userscorelog/index?user_id='+row.id;
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});