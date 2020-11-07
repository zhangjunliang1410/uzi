<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:75:"/www/wwwroot/task/public/../application/admin/view/config/rebate/index.html";i:1594809179;s:60:"/www/wwwroot/task/application/admin/view/layout/default.html";i:1594809179;s:57:"/www/wwwroot/task/application/admin/view/common/meta.html";i:1594809179;s:59:"/www/wwwroot/task/application/admin/view/common/script.html";i:1594809179;}*/ ?>
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
                                <form class="form-inline" role="form" data-toggle="validator" method="POST" action="">
    <div class="form-group">
        <label class="col-xs-5 col-sm-3 col-md-2 control-label" style="text-align: right;">返佣参数</label>
        <div class="col-xs-12 col-sm-9">
            <div class="input-group">
                <span class="input-group-addon">注册用户完成</span>
                <input type="text" name="userLevel[active][num]" value="<?php echo $userLevel['active']['num']; ?>" class="form-control">
                <span class="input-group-addon">单成为活跃用户</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">非会员用户邀请普通用户奖励</span>
                <input type="text" name="userLevel[unmember][ordinary]" value="<?php echo $userLevel['unmember']['ordinary']; ?>" class="form-control">
                <span class="input-group-addon">元</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">非会员用户下级变活跃用户奖励</span>
                <input type="text" name="userLevel[unmember][active]" value="<?php echo $userLevel['unmember']['active']; ?>" class="form-control">
                <span class="input-group-addon">元</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">非会员用户下级变充值用户奖励</span>
                <input type="text" name="userLevel[unmember][recharge]" value="<?php echo $userLevel['unmember']['recharge']; ?>" class="form-control">
                <span class="input-group-addon">元+充值额</span>
                <input type="text" name="userLevel[unmember][percent]" value="<?php echo $userLevel['unmember']['percent']; ?>" class="form-control">
                <span class="input-group-addon">%</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">非会员直推一级享受</span>
                <input type="text" name="userLevel[unmember][0]" value="<?php echo $userLevel['unmember'][0]; ?>" class="form-control">
                <span class="input-group-addon">%返佣</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">会员直推一级享受</span>
                <input type="text" name="userLevel[member][0]" value="<?php echo $userLevel['member'][0]; ?>" class="form-control">
                <span class="input-group-addon">%返佣</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">会员直推二级享受</span>
                <input type="text" name="userLevel[member][1]" value="<?php echo $userLevel['member'][1]; ?>" class="form-control">
                <span class="input-group-addon">%返佣</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">会员直推三级享受</span>
                <input type="text" name="userLevel[member][2]" value="<?php echo $userLevel['member'][2]; ?>" class="form-control">
                <span class="input-group-addon">%返佣</span>
            </div>
            <div class="input-group">
                <span class="input-group-addon">佣金满足</span>
                <input type="text" name="userLevel[out]" value="<?php echo $userLevel['out']; ?>" class="form-control">
                <span class="input-group-addon">可转余额</span>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-success btn-embossed" style="position: relative;left: 40%;top:20px;width:80px;height: 35px;font-size:14px;"><?php echo __('OK'); ?></button>
</form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>