<?php

namespace app\admin\model\task;

use think\Model;


class Task extends Model
{

    

    

    // 表名
    protected $name = 'task';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'mealtype_text',
        'tasktype_text',
        'starttime_text',
        'endtime_text',
        'checklimit_text',
        'postlimit_text',
        'posttime_text',
        'iscollect_text',
        'isimg_text',
        'paytype_text',
        'status_text',
        'paytime_text'
    ];
    

    
    public function getMealtypeList()
    {
        return ['0' => __('Mealtype 0'), '1' => __('Mealtype 1'), '2' => __('Mealtype 2'), '3' => __('Mealtype 3'), '4' => __('Mealtype 4')];
    }

    public function getTasktypeList()
    {
        return ['1' => __('Tasktype 1'), '2' => __('Tasktype 2'), '3' => __('Tasktype 3') ,'4' => __('Tasktype 4')];
    }

    public function getChecklimitList()
    {
        return ['0' => __('Checklimit 0'), '1' => __('Checklimit 1'), '2' => __('Checklimit 2'), '3' => __('Checklimit 3')];
    }

    public function getPostlimitList()
    {
        return ['0' => __('Postlimit 0'), '1' => __('Postlimit 1'), '2' => __('Postlimit 2'), '3' => __('Postlimit 3')];
    }

    public function getIscollectList()
    {
        return ['0' => __('Iscollect 0'), '1' => __('Iscollect 1')];
    }

    public function getIsimgList()
    {
        return ['0' => __('Isimg 0'), '1' => __('Isimg 1')];
    }

    public function getPaytypeList()
    {
        return ['wechat' => __('Paytype wechat'), 'alipay' => __('Paytype alipay')];
    }

    public function getStatusList()
    {
        return ['0' => __('Status 0'), '1' => __('Status 1'), '2' => __('审核通过'), '3' => __('Status 3'), '-1' => __('Status -1')];
    }


    public function getMealtypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['mealtype']) ? $data['mealtype'] : '');
        $list = $this->getMealtypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getTasktypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['tasktype']) ? $data['tasktype'] : '');
        $list = $this->getTasktypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStarttimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['starttime']) ? $data['starttime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getEndtimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['endtime']) ? $data['endtime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getChecklimitTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['checklimit']) ? $data['checklimit'] : '');
        $list = $this->getChecklimitList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPostlimitTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['postlimit']) ? $data['postlimit'] : '');
        $list = $this->getPostlimitList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPosttimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['posttime']) ? $data['posttime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getIscollectTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['iscollect']) ? $data['iscollect'] : '');
        $list = $this->getIscollectList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsimgTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['isimg']) ? $data['isimg'] : '');
        $list = $this->getIsimgList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPaytypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['paytype']) ? $data['paytype'] : '');
        $list = $this->getPaytypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPaytimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['paytime']) ? $data['paytime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setStarttimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setEndtimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setPosttimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setPaytimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}
