<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/10
 * Time: 16:47
 */

namespace app\common\library;

use think\Db;
use think\Model;
use app\common\model\ProjectConfig;
use app\common\model\User;

class Bonus
{
    public $bonus = [];

    public function __construct()
    {
        $starttime = strtotime(date("Y-m-d",time()));
        $map['createtime'] = ['>',$starttime];
        $this->bonus = db('bonus_total')->where($starttime)->find();
        if(empty($this->bonus)){
            return false;
        }
        return $this->bonus;
    }

    public function addBonus()
    {
        if(time()-$this->bonus['updatetime']>1800)
        {
            $add = sprintf("%.2f",$this->bonus['num']/45);
            $data = [
                'addnum'=>sprintf("%.2f",$this->bonus['addnum']+$add),
                'updatetime'=>time()
            ];
            if(date("H") == 23){
                $data['addnum'] = $this->bonus['num'];
            }
            db('bonus_total')->where('id',$this->bonus['id'])->update($data);
        }else{
            return false;
        }
        return true;
    }

    public function carve()
    {
        $starttime = strtotime(date("Y-m-d",time()));
        $userList = db('bonus')->field('id,user_id')->where('createtime','>',$starttime)->where('status','=',0)->select();
        if(empty($userList)){
            return true;
        }
        $count = db('bonus')->where('createtime','>',$starttime)->where('status','=',0)->count('id');
        if($count == 0){
            return true;
        }
        $bonusConfig = ProjectConfig::getConfig('bonus');
        $config = json_decode($bonusConfig[0],true);
        $usernum = $config['usernum'];
        if($usernum>0){
            $count = $count+$config['usernum'];
        }
        $configNum = $config['num'];
        //计算不够
        if($configNum>=$count){
            $num = sprintf("%.2f",$this->bonus['addnum']/$count);
            $data = ['num'=>$num,'updatetime'=>time(),'status'=>1];
            foreach($userList as $key=>$value){
                db('bonus')->where('id',$value['id'])->update($data);
                User::newScore($num,'+'.$num,$value['user_id'],'瓜分分红池奖励');
            }
        }else{
            $num = sprintf("%.2f",$this->bonus['addnum']/$this->bonus['num']);
            $data = ['num'=>$num,'updatetime'=>time(),'status'=>0];
            $limit = $count-$usernum;
            $userList = db('bonus')->where('createtime','>',$starttime)->where('status','=',0)->order('id asc')->limit($limit)->select();
            foreach($userList as $key=>$value){
                if($key+1<$this->bonus['num']){
                    User::newScore($num,'+'.$num,$value['user_id'],'瓜分分红池奖励');
                }else{
                    $data['status'] = -1;
                }
                db('bonus')->where('id',$value['id'])->update($data);
            }
        }
        return true;
    }

    public function checkBonus($order)
    {
        if(empty($order) || !is_array($order))
        {
            return false;
        }
        $starttime = strtotime(date("Y-m-d",time()));
        $map['createtime'] = ['>',$starttime];
        $map['user_id'] = ['=',$order['user_id']];
        $exist = db('bonus')->where($map)->value('id');
        if(date("H") == 23){
            return true;
        }
        if(!empty($exist)){
            return true;
        }
        $bonusConfig = ProjectConfig::getConfig('bonus');
        $config = json_decode($bonusConfig[0],true);
        $taskNum = $config['taskNum'];
        $where['finaltime'] = ['>',$starttime];
        $where['user_id'] = ['=',$order['user_id']];
        $where['status'] = ['=',2];
        $userTask = db('order')->where($where)->count('id');
        if($userTask>=$taskNum){
            $data= [
                'user_id'=>$order['user_id'],
                'status'=>0,
                'createtime'=>time()
            ];
            db('bonus')->insert($data);
        }
        return true;
    }

}