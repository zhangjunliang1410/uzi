<?php

namespace app\admin\controller\order;

use app\common\controller\Backend;
use think\Db;
use app\common\model\ProjectConfig;
use app\common\library\Bonus;
use app\common\model\Message;

/**
 * 任务管理
 *
 * @icon fa fa-circle-o
 */
class Order extends Backend
{
    
    /**
     * Order模型对象
     * @var \app\admin\model\order\Order
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\order\Order;
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
                    $taskUser = db('task')->where('id',$value['task_id'])->value('user_id');
                    $value['taskuser'] = $taskUser>0 ?2:1;
                }
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }


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
                    $type = $params['status'];
                    $userInfo = db('user')->field('id,relation')->where('id',$params['user_id'])->find();
                    $relation = explode("-",$userInfo['relation']);
                    switch($type){
                        case 2:
                            $projectConfig = new ProjectConfig();
                            $config = $projectConfig->getConfig('rebatejson');
                            $rebateConfig = json_decode($config[0],true);
                            $projectConfig->userRebate($relation[0],$params['user_id'],'task',$ids);
                            if(!empty($relation[0])){
                                $userType = db('user')->where('id',$params['user_id'])->value('usertype');
                                $orderCount = db('order')->where(['user_id'=>$params['user_id'],'status'=>2])->count();
                                $rebateExist = db('rebate')->where(['user_id'=>$relation[0],'give_user_id'=>$params['user_id'],'type'=>'active'])->value('id');
                                if($userType == 'ordinary' && empty($rebateExist) && $orderCount>=$rebateConfig['active']['num']){
                                    $recLevel = db('user')->where('id',$relation[0])->value('level');
                                    if($recLevel == 0){
                                        $projectConfig->userRebate($relation[0],$params['user_id'],'active',$ids);
                                    }
                                }
                            }
                            $bonus = new Bonus();
                            $bonus->checkBonus($params);
                            Message::create(['user_id'=>$params['user_id'],'type'=>'task','content'=>'您有任务刚刚通过审核,赏金已发放，可继续接单']);
                            break;
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

    public function order($id = null)
    {
        $id = $this->request->request('id','');
        $type = $this->request->request('type','');
        if(!in_array($type,[2,-1])){
            $this->error('参数异常');
        }
        $map['id'] = $id;
        $map['status'] = 1;
        $orderinfo = db('order')->field('id,user_id,checktime,price,status')->where($map)->find();
        if(empty($orderinfo)){
            $this->error('订单信息异常');
        }
        if(time()>$orderinfo['checktime']){
            $this->error('超出审核期限');
        }
        $relation = db('user')->where('id',$orderinfo['user_id'])->value('relation');
        $relation = explode('-',$relation);
        Db::startTrans();
        try {
            $data = [
                'status'=>$type,
                'finaltime'=>time()
            ];
            db('order')->where('id',$id)->update($data);
            switch($type){
                case 2:
                    $projectConfig = new ProjectConfig();
                    $config = $projectConfig->getConfig('rebatejson');
                    $rebateConfig = json_decode($config[0],true);
                    $projectConfig->userRebate($relation[0],$orderinfo['user_id'],'task',$id);
                    if(!empty($relation[0])){
                        $userType = db('user')->where('id',$orderinfo['user_id'])->value('usertype');
                        $orderCount = db('order')->where(['user_id'=>$orderinfo['user_id'],'status'=>2])->count();
                        $rebateExist = db('rebate')->where(['user_id'=>$relation[0],'give_user_id'=>$orderinfo['user_id'],'type'=>'active'])->value('id');
                        if($userType == 'ordinary' && empty($rebateExist) && $orderCount>=$rebateConfig['active']['num']){
                            $recLevel = db('user')->where('id',$relation[0])->value('level');
                            if($recLevel == 0){
                                $projectConfig->userRebate($relation[0],$orderinfo['user_id'],'active',$id);
                            }
                        }
                    }
                    $bonus = new Bonus();
                    $bonus->checkBonus($orderinfo);
                    Message::create(['user_id'=>$orderinfo['user_id'],'type'=>'task','content'=>'您有任务刚刚通过审核,赏金已发放，可继续接单']);
                    break;
            }
            Db::commit();
        }catch (Exception $e){
            $this->error($e->getMessage());
            Db::rollback();
            return false;
        }
        $this->success('订单已审核');
    }
}
