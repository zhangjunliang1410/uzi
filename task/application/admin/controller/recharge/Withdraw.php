<?php

namespace app\admin\controller\recharge;

use app\common\controller\Backend;
use app\common\model\User;
use app\common\model\ProjectConfig;
use think\Db;
/**
 * 提现管理
 *
 * @icon fa fa-circle-o
 */
class Withdraw extends Backend
{
    
    /**
     * Withdraw模型对象
     * @var \app\admin\model\recharge\Withdraw
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\recharge\Withdraw;
        $this->view->assign("statusList", $this->model->getStatusList());
    }


    /**
     * 查看
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
            if(!empty($list)){
                foreach($list as $key=>&$value){
                    $bankInfo = db('user')->field('bankuser,bankname,bankcard')->where('id',$value['user_id'])->find();
                    $value['card'] = $bankInfo['bankcard'];
                    $value['bankuser'] = $bankInfo['bankuser'];
                    $value['bankname'] = $bankInfo['bankname'];
                }
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 编辑
     */
    public function edit($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            if (!in_array($row[$this->dataLimitField], $adminIds)) {
                $this->error(__('You have no permission'));
            }
        }
        if ($this->request->isPost()) {
            $params = $this->request->post("row/a");
            if ($params) {
                $params = $this->preExcludeFields($params);
                $result = false;
                Db::startTrans();
                try {
                    //是否采用模型验证
                    if ($this->modelValidate) {
                        $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                        $row->validateFailException(true)->validate($validate);
                    }
                    if($params['status'] == -1)
                    {
                        User::newMoney($params['num'],'+'.$params['num'],$params['user_id'],'提现拒绝返还余额');
                    }
                    $result = $row->allowField(true)->save($params);
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
                    $this->error(__('No rows were updated'));
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

    public function edits($ids)
    {
        $info = db('withdraw')->where('id',$ids)->find();
        if (!$info) {
            $this->error(__('No Results were found'));
        }
        if($info['status'] == 2 || $info['status'] == -1){
            $this->error('此订单已完成处理');
        }
        $info['status'] = 2;
        if ($info) {
            db('withdraw')->where('id',$info['id'])->update(['status'=>1,'updatetime'=>time()]);
            $this->success('提现成功','recharge/withdraw/index');
        }
    }

    public function detail($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error('订单信息异常');
        }
        if ($this->request->isPost()) {
            $postData = $this->request->post();
            $info = db('withdraw')->where('id',$postData['id'])->find();
            db('withdraw')->where('id',$postData['id'])->update(['reason'=>$postData['reason'],'status'=>-1]);
            User::newMoney($info['num'],'+'.$info['num'],$info['user_id'],'提现拒绝返还余额');
            $this->success('订单已拒绝');
        }
        $this->view->assign("row", $row->toArray());
        return $this->view->fetch();
    }

}
