<?php

namespace app\api\controller;

use app\common\controller\Api;
use think\Db;
use app\common\library\Bonus;
use app\common\library\Order;
use app\common\model\ProjectConfig;


class Crontab extends Api
{
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['*'];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['*'];


    //处理分红池定时增长
    public function bonus()
    {
        date_default_timezone_set ("PRC");
        $bonus = new Bonus();
        if(date("H")<23){
            //执行增长计划
            $bonus->addBonus();
        }elseif(date("H")>=23 && date("i")>30){
            //分红
            $bonus->carve();
            return true;
        }
        if(date("H") == 0){
            $starttime = strtotime(date("Y-m-d",time()));
            $map['createtime'] = ['<',$starttime];
            $info = db('bonus_total')->where($map)->find();
            if(empty($info)){
                return true;
            }
            db('bonus_total')->where($map)->delete();
            $bonusConfig = ProjectConfig::getConfig('bonus');
            $config = json_decode($bonusConfig[0],true);
            $data = [
                'num'=>$config['sum'],
                'createtime'=>time()
            ];
            db('bonus_total')->insert($data);
        }

    }


    public function orderHandle()
    {
        $order = new Order();
        $rea = $order->updateOrder();
        $reb = $order->updateTask();
        if($rea  == false || $reb == false){
            $this->error('错误');;
        }
        $config = ProjectConfig::getConfig('rebatejson');
        $config = json_decode($config[0],true);
        $map['coldmoney'] = ['>',$config['out']];
        $userList = db('user')->field('id')->where($map)->select();
        $money = sprintf("%.2f",$config['out']);
        foreach($userList as $key=>$value)
        {
            db('user')->where('id',$value['id'])->setDec('coldmoney',$money);
            db('user')->where('id',$value['id'])->setInc('rebatemoney',$money);
        }
        $this->success('成功');
    }
}