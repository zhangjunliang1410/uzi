define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'jstree'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'user.team/index' + location.search,
                    team_tree_url: 'user.team/team_tree' + location.search,
                    add_url: 'user.team/add',
                    edit_url: 'user.team/edit',
                    del_url: 'user.team/del',
                    multi_url: 'user.team/multi',
                    table: 'user',
                }
            });

            var table = $("#table");
            // 初始化表格
            // table.bootstrapTable({
            //     url: $.fn.bootstrapTable.defaults.extend.index_url,

            // pk: 'id',
            // sortName: 'id',
            // sortOrder:'asc',
            // columns: [

            // ]

            //});
            //当表格数据加载完成时
            //table.on('load-success.bs.table', function (e, data) {
            //这里可以获取从服务端获取的JSON数据


            table.jstree({
                "core": {
                    //'initially_open':["abc"],
                    'data': {
                        'url': $.fn.bootstrapTable.defaults.extend.index_url,
                        'dataType': 'json',
                        'data': function(node) { // 传给服务端点击的节点

                            leader_id = node.id == '#' ? '0' : node.id;
                            filter = { leader_id: leader_id };
                            op = { 'leader_id': '=' };
                            return { filter: JSON.stringify(filter), op: JSON.stringify(op) };
                            //return { clickId: data.id };
                        },
                        success: function(data) {

                        }
                    }
                },
                "types": {
                    "default": {
                        "icon": "/assets/img/favicon.ico",
                        "valid_children": ["default", "file"]
                    },

                },
                "themes": {
                    "variant": "large", //加大
                    "ellipsis": true //文字多时省略
                },
                "plugins": ["wholerow", "themes", "types"]
            });

            //点击查询
            $('#search').on('click', function() {
                table.jstree(true).destroy();
                if ($('#id').val() == ''&& $('#username').val() == ''&& $('#mobile').val() == '') {
                    table.jstree({
                        "core": {
                            //'initially_open':["abc"],
                            'data': {
                                'url': $.fn.bootstrapTable.defaults.extend.index_url,
                                'dataType': 'json',
                                'data': function(node) { // 传给服务端点击的节点

                                    leader_id = node.id == '#' ? '0' : node.id;
                                    filter = { leader_id: leader_id };
                                    op = { 'leader_id': '=' };
                                    return { filter: JSON.stringify(filter), op: JSON.stringify(op) };
                                    //return { clickId: data.id };
                                },
                                success: function(data) {

                                }
                            }
                        },
                        "types": {
                            "default": {
                                "icon": "/assets/img/favicon.ico",
                                "valid_children": ["default", "file"]
                            },

                        },
                        "themes": {
                            "variant": "large", //加大
                            "ellipsis": true //文字多时省略
                        },
                        "plugins": ["wholerow", "themes", "types"]
                    });
                } else {
                    table.jstree({
                        "core": {
                            'data': {
                                'url': function(node) {
                                    return node.id === '#' ?
                                        $.fn.bootstrapTable.defaults.extend.team_tree_url :
                                        $.fn.bootstrapTable.defaults.extend.index_url;
                                },
                                'dataType': 'json',

                                'data': function(node) { // 传给服务端点击的节点
                                    console.log(node)
                                    filter = {};
                                    op = {};
                                    if (node.id === '#') {
                                        //筛选
                                        if($('#id').val()!=''){
                                            filter.id = $('#id').val() == '' ? '0' : $('#id').val();
                                            op.id = '=';
                                        }
                                        if($('#username').val()!=''){
                                            filter.username =$('#username').val() ;
                                            op.username= 'LIKE';
                                        }
                                        if($('#mobile').val()!=''){
                                            filter.mobile =$('#mobile').val() ;
                                            op.mobile= 'LIKE';
                                        }
                                    } else {
                                        leader_id = node.id == '#' ? '0' : node.id;
                                        filter = { leader_id: leader_id };
                                        op = { 'leader_id': '=' };
                                    }
                                    return { filter: JSON.stringify(filter), op: JSON.stringify(op) };
                                    //return { clickId: data.id };
                                },
                                success: function(data) {},
                            }
                        },
                        "types": {
                            "default": {
                                "icon": "/assets/img/favicon.ico",
                                "valid_children": ["default", "file"]
                            },

                        },
                        "themes": {
                            "variant": "large", //加大
                            "ellipsis": true //文字多时省略
                        },
                        "plugins": ["wholerow", "themes", "types"]
                    });

                }
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function() {
            Controller.api.bindevent();
        },
        edit: function() {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function() {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});