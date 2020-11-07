<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/2
 * Time: 16:45
 */

namespace app\common\model;

use think\Model;

class Message extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 追加属性
    protected $append = [
    ];
}