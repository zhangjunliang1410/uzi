<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/6/30
 * Time: 14:11
 */

namespace app\common\model;

use think\Model;
use think\Db;
use think\Exception;
use app\common\model\MoneyLog;
use app\common\model\User;
use app\common\model\Order;
use app\common\model\Message;

class ProjectConfig extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    /**
     * 调用参数
     * @param string $attr
     * @return mixed
     */
    public static function getConfig($attr = '')
    {
        if(!empty($attr)){
            $config = self::where('status',1)->column($attr);
        }else{
            $config = self::get(1);
        }
        return $config;
    }

    public function userRebate($suid,$uid,$type,$orderid='',$rechargeid='')
    {
        if(empty($suid) || empty($uid) || empty($type))
        {
            return false;
        }
        $rebateOrder = [
            'user_id'=>$suid,
            'give_user_id'=>$uid,
            'type'=>$type,
            'status'=>1
        ];
        $rebateConfig = $this->getConfig('rebatejson');
        $config = json_decode($rebateConfig[0],true);
        $userinfo = db('user')->field('id,level,relation')->where('id',$uid)->find();
        switch($type)
        {
            case 'rec':
                if($userinfo['level'] == 0){
                    $rebateOrder['num'] = $config['unmember']['ordinary'];
                    //User::newMoney($config['unmember']['ordinary'],'+'.$config['unmember']['ordinary'],$suid,'推荐普通用户佣金');
                    user::coldMoney($rebateOrder['num'],$suid);
                    $re = Rebate::create($rebateOrder);
                }
                break;
            case 'task':
                $rebateOrder['order_id'] = $orderid;
                $rebateOrder['user_id'] = $uid;
                unset($rebateOrder['give_user_id']);
                $order = Order::get($orderid);
                $rebateOrder['num'] = $order['price'];
                $title = Task::where('id',$order['task_id'])->value('title');
                User::newMoney($order['price'],'+'.$order['price'],$uid,$title.'任务佣金');
                Message::create(['user_id'=>$order['user_id'],'type'=>'money','content'=>'您有新的任务佣金到账,请查收']);
                Rebate::create($rebateOrder);
                if(!empty($suid)){
                    $this->taskRebate($uid,$orderid,$rebateOrder);
                }
                break;
            case 'active':
                $recUser = db('user')->field('level,id')->where('id',$suid)->find();
                if($recUser['level'] == 0)
                {
                    db('user')->where('id',$uid)->update(['usertype'=>'active']);
                    $rebateOrder['num'] = $config['unmerber']['active'];
                    //User::newMoney($rebateOrder['num'],'+'.$rebateOrder['num'],$suid,'推荐用户成为活跃用户');
                    db('user')->where('id',$suid)->setInc('coldmoney',$rebateOrder['num']);
                    Rebate::create($rebateOrder);
                }
            case 'recharge':
                if($userinfo['level'] == 0)
                {
                    $rebateOrder['recharge_id'] = $rechargeid;
                    $rechargeInfo = Recharge::get($rechargeid);
                    if($rechargeInfo->status == 2)
                    {
                        $rebateOrder['num'] = sprintf("%.2f",$rechargeInfo->num*$config['unmember']['percent']*0.01+$config['unmember']['recharge']);
                        //User::newMoney($rebateOrder['num'],'+'.$rebateOrder['num'],$suid,'推荐用户充值');
                        db('user')->where('id',$suid)->setInc('coldmoney',$rebateOrder['num']);
                        Rebate::create($rebateOrder);
                    }
                }
                break;
        }
        return true;
    }

    public function taskRebate($uid,$orderid,$rebateOrder)
    {
        $order = Order::get($orderid);
        if(empty($order) || $order['status'] != 2){
            return false;
        }
        $rebateConfig = $this->getConfig('rebatejson');
        $config = json_decode($rebateConfig[0],true);
        $userinfo = db('user')->field('id,level,relation')->where('id',$uid)->find();
        $rebateOrder['type'] = 'recTask';
        $relation = explode('-',$userinfo['relation']);
        foreach($relation as $key=>$value){
            if(empty($value) || $key>2){
                break;
            }
            if($userinfo['level'] == 0 && $key>0){
                break;
            }
            $rebateOrder['user_id'] = $value;
            if($userinfo['level'] == 0){
                $rebateOrder['num'] = sprintf("%.2f",$config['unmember'][$key]*$rebateOrder['num']*0.01);
            }else{
                $rebateOrder['num'] = sprintf("%.2f",$config['member'][$key]*$rebateOrder['num']*0.01);
            }
            //User::newMoney($rebateOrder['num'],'+'.$rebateOrder['num'],$value,'推荐用户任务佣金');
            db('user')->where('id',$value)->setInc('coldmoney',$rebateOrder['num']);
            Rebate::create($rebateOrder);
        }
        return true;
    }


}