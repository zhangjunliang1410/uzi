<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/9
 * Time: 17:45
 */

namespace app\admin\controller\config;

use app\common\controller\Backend;
use app\common\model\User;
use think\Db;
class Team extends Backend
{
    protected $model = null;

    protected $noNeedRight = ['rec'];

    public function rec()
    {
        $type = $this->request->request('type')?:1;
        $user_id = $this->request->request('user_id');
        if($type == 1){
            $list = db('user')->field('id,nickname,mobile,createtime,level')->where('leader_id',$user_id)->paginate(10);
        }elseif($type == 2){
            $list = db('user')->field('id,nickname,mobile,createtime,level')->where('relation','exp','REGEXP \''."^[0-9]+-{$user_id}-".'\'')->paginate(10);
        }elseif($type == 3){
            $list = db('user')->field('id,nickname,mobile,createtime,level')->where('relation','exp','REGEXP \''."^[0-9]+-[0-9]+-{$user_id}-".'\'')->paginate(10);
        }
        $this->assign('list',$list);
        return $this->view->fetch();
    }
}