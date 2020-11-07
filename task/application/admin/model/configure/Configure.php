<?php

namespace app\admin\model\configure;

use think\Model;


class Configure extends Model
{

    

    

    // 表名
    protected $name = 'configure';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'radiostatus_text',
        'status_text'
    ];
    

    
    public function getRadiostatusList()
    {
        return ['0' => __('Radiostatus 0'), '1' => __('Radiostatus 1')];
    }

    public function getStatusList()
    {
        return ['0' => __('Status 0'), '1' => __('Status 1')];
    }


    public function getRadiostatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['radiostatus']) ? $data['radiostatus'] : '');
        $list = $this->getRadiostatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
