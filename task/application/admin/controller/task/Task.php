<?php

namespace app\admin\controller\task;

use app\common\controller\Backend;
use think\Db;
/**
 * 任务管理
 *
 * @icon fa fa-circle-o
 */
class Task extends Backend
{
    
    /**
     * Task模型对象
     * @var \app\admin\model\task\Task
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\task\Task;
        $this->view->assign("mealtypeList", $this->model->getMealtypeList());
        $this->view->assign("tasktypeList", $this->model->getTasktypeList());
        $this->view->assign("checklimitList", $this->model->getChecklimitList());
        $this->view->assign("postlimitList", $this->model->getPostlimitList());
        $this->view->assign("iscollectList", $this->model->getIscollectList());
        $this->view->assign("isimgList", $this->model->getIsimgList());
        $this->view->assign("paytypeList", $this->model->getPaytypeList());
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
                }
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $params = $this->request->post("row/a");
            if ($params) {
                $params = $this->preExcludeFields($params);

                if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
                    $params[$this->dataLimitField] = $this->auth->id;
                }
                $result = false;
                $params['status'] = 2;
                Db::startTrans();
                try {
                    //是否采用模型验证
                    if ($this->modelValidate) {
                        $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                        $this->model->validateFailException(true)->validate($validate);
                    }
                    $result = $this->model->allowField(true)->save($params);
                    Db::commit();
                } catch (ValidateException $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                } catch (PDOException $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                } catch (Exception $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                }
                if ($result !== false) {
                    $this->success();
                } else {
                    $this->error(__('No rows were inserted'));
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        return $this->view->fetch();
    }


    public function edits($ids)
    {
        $info = db('task')->where('id',$ids)->find();
        if (!$info) {
            $this->error(__('No Results were found'));
        }
        if($info['status'] == 2 || $info['status'] == -1){
            $this->error('此订单已完成处理');
        }
        $status = $this->request->request('status');;
        if ($info) {
            db('task')->where('id',$ids)->update(['status'=>$status,'updatetime'=>time()]);
            $this->success('订单审核通过');
        }else{
            $this->error('订单未找到');
        }
    }

}
