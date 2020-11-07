<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/6/30
 * Time: 15:27
 */

namespace app\common\model;

use think\Model;
use think\Exception;

class Recharge extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    public static function createOrder($data)
    {
        if(empty($data) || !is_array($data)){
            return false;
        }
        Db::startTrans();
        try {
            $recharge = new Recharge($data);
            $recharge->allowField(true)->save();
            Db::commit();
        }catch (Exception $e) {
            $e->getMessage();
            Db::rollback();
            return false;
        }
        return true;
    }


}