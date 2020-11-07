<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/2
 * Time: 14:01
 */

namespace app\common\model;

use think\Model;
use think\Exception;

class Order extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    
}