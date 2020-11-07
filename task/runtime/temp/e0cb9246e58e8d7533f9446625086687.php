<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:70:"/www/wwwroot/task/public/../application/admin/view/user/user/send.html";i:1595993183;s:60:"/www/wwwroot/task/application/admin/view/layout/default.html";i:1594809179;s:57:"/www/wwwroot/task/application/admin/view/common/meta.html";i:1594809179;s:59:"/www/wwwroot/task/application/admin/view/common/script.html";i:1594809179;}*/ ?>
<!DOCTYPE html>
<html lang="<?php echo $config['language']; ?>">
    <head>
        <meta charset="utf-8">
<title><?php echo (isset($title) && ($title !== '')?$title:''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" href="/assets/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="/assets/css/backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
  <script src="/assets/js/html5shiv.js"></script>
  <script src="/assets/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
    var require = {
        config:  <?php echo json_encode($config); ?>
    };
</script>
    </head>

    <body class="inside-header inside-aside <?php echo defined('IS_DIALOG') && IS_DIALOG ? 'is-dialog' : ''; ?>">
        <div id="main" role="main">
            <div class="tab-content tab-addtabs">
                <div id="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <section class="content-header hide">
                                <h1>
                                    <?php echo __('Dashboard'); ?>
                                    <small><?php echo __('Control panel'); ?></small>
                                </h1>
                            </section>
                            <?php if(!IS_DIALOG && !\think\Config::get('fastadmin.multiplenav')): ?>
                            <!-- RIBBON -->
                            <div id="ribbon">
                                <ol class="breadcrumb pull-left">
                                    <li><a href="dashboard" class="addtabsit"><i class="fa fa-dashboard"></i> <?php echo __('Dashboard'); ?></a></li>
                                </ol>
                                <ol class="breadcrumb pull-right">
                                    <?php foreach($breadcrumb as $vo): ?>
                                    <li><a href="javascript:;" data-url="<?php echo $vo['url']; ?>"><?php echo $vo['title']; ?></a></li>
                                    <?php endforeach; ?>
                                </ol>
                            </div>
                            <!-- END RIBBON -->
                            <?php endif; ?>
                            <div class="content">
                                <div>
    <form action="" method="POST">
        <p style="padding:0;margin:0;font-size: 16px;font-weight: 600;height:30px;line-height: 30px;border-bottom: 2px solid #EEEEEE;">人工存根</p>
        <div style="padding:10px 0 0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">
                <span style="color:red">*</span>
                会员账号:
            </div>
            <input style="width:500px;" placeholder="批量操作可输入会员ID,以英文逗号,隔开,最多支持100个" type="text" name="name" />
        </div>
        <div style="padding:10px 0 0;margin:0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">
                <span style="color:red">*</span>
                金额:
            </div>
            <input style="width:500px;" placeholder="请输入金额" type="number" name="num" />
        </div>
        <div style="padding: 10px 0 0;margin:0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">
                <span style="color:red">*</span>
                类型:
            </div>
            <div style="display:inline-block;">
                <div style="margin-right:15px;display:inline-block;">
                    <input type="radio" name="type" value="1" style="display:inline-block;" checked="checked"/>钻石
                </div>
                <div style="margin-right:15px;display:inline-block;">
                    <input type="radio" name="type" value="2" style="display:inline-block;" />余额
                </div>
            </div>
        </div>
        <div style="padding: 10px 0 0;margin:0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">
                <span style="color:red">*</span>
                类型:
            </div>
            <div style="display:inline-block;">
                <div style="margin-right:15px;display:inline-block;">
                    <input type="radio" name="paytype" value="1" style="display:inline-block;" checked="checked"/>增加
                </div>
                <div style="margin-right:15px;display:inline-block;">
                    <input type="radio" name="paytype" value="2" style="display:inline-block;" />减少
                </div>
            </div>
        </div>
        <div style="padding:10px 0 0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">
                <span style="color:red">*</span>
                备注:
            </div>
            <input style="width:500px;" placeholder="请输入备注" type="text" name="memo" />
        </div>
        <div style="padding:10px 0;height:30px;line-height: 30px;">
            <div  style="display: inline-block;width:120px;text-align: right;">


            </div>
            <input style="margin-top:10px;width:100px;border-color:#c2e6f3;border-radius: 3px;background-color:#e6f5fa;color:#3faad1;" placeholder="请输入金额" type="submit" name="fname" />
        </div>

    </form>

</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>