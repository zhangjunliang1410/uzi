<?php

namespace app\common\validate;

use think\Validate;

class Task extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'videocontent'=>'require',
        'step1image'=>'require',
        'tasktype'=> 'require',
        'title'=> 'require',
        'tasknum'=> 'number|>=:1',
        'starttime'=>'require',
        'endtime'=>'require',
        'url'=>'require',
        'step1content'=>'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'step1image'=>'任务步骤1图片必填',
        'videocontent'=>'任务说明必填',
        'tasktype.require'=>'任务类型必选',
        'title.require'=>'任务标题必填',
        'tasknum.number'=>'任务数量必须为数字',
        'starttime.require'=>'开始时间必选',
        'endtime.require'=>'结束时间必选',
        'url.require'=>'链接必选',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['mealtype','tasktype','title','tasknum','starttime','endtime','url'],
        'edit' => ['mealtype','tasktype','title','tasknum','starttime','endtime','url'],
    ];
    
}
