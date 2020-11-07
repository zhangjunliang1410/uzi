<?php

namespace app\admin\controller\rebate;

use app\common\controller\Backend;

/**
 * 返佣管理
 *
 * @icon fa fa-circle-o
 */
class Rebate extends Backend
{
    
    /**
     * Rebate模型对象
     * @var \app\admin\model\rebate\Rebate
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\rebate\Rebate;
        $this->view->assign("typeList", $this->model->getTypeList());
        $this->view->assign("statusList", $this->model->getStatusList());
    }

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
            if(!empty($list))
            {
                foreach($list as $key=>&$value)
                {
                    $value['nickname'] = db('user')->where('id',$value['user_id'])->value('nickname');
                    if(!empty($value['give_user_id'])){
                        $value['givename'] = db('user')->where('id',$value['give_user_id'])->value('nickname');
                    }else{
                        $value['givename'] = '';
                    }
                }
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }
    

}
