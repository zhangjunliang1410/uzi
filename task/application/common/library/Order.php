<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/13
 * Time: 17:17
 */

namespace app\common\library;

use think\Db;
use think\Model;

class Order
{
    public function updateTask()
    {
        $map['endtime'] = ['<',time()];
        $orderList = db('task')->field('id')->where($map)->limit(300)->select();
        if(!empty($orderList)){
            foreach($orderList as $key=>$value){
                db('task')->where('id',$value['id'])->update(['status'=>3,'updatetime'=>time()]);
            }
        }
        return true;
    }

    public function updateOrder()
    {
        //接了没做
        $map['status'] = ['=',0];
        $map['limittime'] = ['<',time()];
        $orderList = db('order')->field('id')->where($map)->select();
        if(!empty($orderList)){
            foreach($orderList as $key=>&$value){
                db('order')->where('id',$value['id'])->update(['status'=>-1,'updatetime'=>time()]);
            }
        }
        return true;
    }
}