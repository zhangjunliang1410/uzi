<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\Config;

/**
 * 控制台
 *
 * @icon fa fa-dashboard
 * @remark 用于展示当前系统中的统计数据、统计报表及重要实时数据
 */
class Dashboard extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        $day = strtotime(date("Y-m-d",time()));
        $yesterday = strtotime(date("Y-m-d",strtotime("-1 day")));
        $month = strtotime(date("Y-m-d",strtotime("-30 day")));
        $user1 = db('user')->where('createtime','>',$day)->count('id');
        $user2 = db('user')->where('createtime','>',$yesterday)->where('createtime','<',$day)->count('id');
        $user3 = db('user')->where('createtime','>',$month)->where('createtime','<',$day)->count('id');
        $recharge1= db('recharge')->where('status','=',2)->where('updatetime','>',$day)->sum('num');
        $recharge2= db('recharge')->where('status','=',2)->where('createtime','>',$yesterday)->where('createtime','<',$day)->sum('num');
        $recharge3= db('recharge')->where('status','=',2)->where('createtime','>',$month)->where('createtime','<',$day)->sum('num');
        $withdraw1= db('withdraw')->where('status','=',1)->where('createtime','>',$day)->sum('num');
        $withdraw2= db('withdraw')->where('status','=',1)->where('createtime','>',$yesterday)->where('createtime','<',$day)->sum('num');
        $withdraw3= db('withdraw')->where('status','=',1)->where('createtime','>',$month)->where('createtime','<',$day)->sum('num');
        $rebate1= sprintf("%.2f",db('rebate')->where('type','in','rec,active,recharge,recTask')->where('createtime','>',$day)->sum('num'));
        $rebate2= sprintf("%.2f",db('rebate')->where('type','in','rec,active,recharge,recTask')->where('createtime','>',$yesterday)->where('createtime','<',$day)->sum('num'));
        $rebate3= sprintf("%.2f",db('rebate')->where('type','in','rec,active,recharge,recTask')->where('createtime','>',$month)->where('createtime','<',$day)->sum('num'));
        $task1 = db('order')->where('status','=',2)->where('checktime','>',$day)->sum('price');
        $task2 = db('order')->where('status','=',2)->where('checktime','>',$yesterday)->where('checktime','<',$day)->sum('price');
        $task3 = db('order')->where('status','=',2)->where('checktime','>',$month)->where('checktime','<',$day)->sum('price');

        $count1 = db('task')->where('status','=','1')->count('id');
        $count2 = db('task')->where('status','=','2')->sum('surplus');
        $count3 = db('order')->where('status','=',1)->count('id');
        $count4 = db('order')->where('status','=',2)->count('id');
        $seventtime = \fast\Date::unixtime('day', -7);
        $paylist = $createlist = [];
        for ($i = 0; $i < 7; $i++)
        {
            $day = date("Y-m-d", $seventtime + ($i * 86400));
            $createlist[$day] = mt_rand(20, 200);
            $paylist[$day] = mt_rand(1, mt_rand(1, $createlist[$day]));
        }
        $hooks = config('addons.hooks');
        $uploadmode = isset($hooks['upload_config_init']) && $hooks['upload_config_init'] ? implode(',', $hooks['upload_config_init']) : 'local';
        $addonComposerCfg = ROOT_PATH . '/vendor/karsonzhang/fastadmin-addons/composer.json';
        Config::parse($addonComposerCfg, "json", "composer");
        $config = Config::get("composer");
        $addonVersion = isset($config['version']) ? $config['version'] : __('Unknown');
        $this->view->assign([
            'user1'            => $user1,
            'user2'            => $user2,
            'user3'            => $user3,
            'recharge1'            => $recharge1,
            'recharge2'            => $recharge2,
            'recharge3'            => $recharge3,
            'withdraw1'            => $withdraw1,
            'withdraw2'            => $withdraw2,
            'withdraw3'            => $withdraw3,
            'rebate1'            => $rebate1,
            'rebate2'            => $rebate2,
            'rebate3'          => $rebate3,
            'task1'          => $task1,
            'task2'          => $task2,
            'task3'          => $task3,
            'count1'         =>$count1,
            'count2'         =>$count2,
            'count3'         =>$count3,
            'count4'         =>$count4,
            'createlist'       => $createlist,
            'addonversion'       => $addonVersion,
            'uploadmode'       => $uploadmode
        ]);

        return $this->view->fetch();
    }

}
