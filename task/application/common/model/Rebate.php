<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/6
 * Time: 17:21
 */

namespace app\common\model;

use think\Model;
use think\Exception;

class Rebate extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
}