<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/6/30
 * Time: 9:46
 */

namespace app\common\model;

use think\Model;

class Configure extends Model
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
}