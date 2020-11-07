<?php

namespace app\admin\controller\user;

use app\common\controller\Backend;
use think\Db;
/**
 * 信息绑定管理
 *
 * @icon fa fa-circle-o
 */
class Bind extends Backend
{
    
    /**
     * Bind模型对象
     * @var \app\admin\model\user\Bind
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\user\Bind;
        $this->view->assign("typeList", $this->model->getTypeList());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    public function index()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                ->where($where)
                ->order($sort, $order)
                ->count();

            $list = $this->model
                ->where($where)
                ->order($sort, $order)
                ->limit($offset, $limit)
                ->select();

            $list = collection($list)->toArray();
            foreach($list as $key=>$value){
                $value['nickname'] = db('user')->where('id',$value['user_id'])->value('nickname');
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }


    public function bank()
    {
        $id = $this->request->request('user_id');
        $userInfo = db('user')->field('nickname,bankuser,bankname,bankcard')->where('id',$id)->find();
        $this->assign('user',$userInfo);
        return $this->view->fetch();
    }
    

}