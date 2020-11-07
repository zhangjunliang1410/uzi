<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/1
 * Time: 15:14
 */

namespace app\common\model;

use think\Model;
use think\Exception;
use think\Validate;

class Task extends Model
{
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    public static function createTask($data)
    {
        if(empty($data) || !is_array($data)){
            return false;
        }
        Db::startTrans();
        try {
            $recharge = new Task($data);
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