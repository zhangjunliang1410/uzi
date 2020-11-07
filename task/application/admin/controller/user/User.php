<?php

namespace app\admin\controller\user;

use app\common\controller\Backend;
use think\Db;
use app\common\model\MoneyLog;
use app\common\model\ScoreLog;

/**
 * 会员管理
 *
 * @icon fa fa-user
 */
class User extends Backend
{

    protected $relationSearch = true;


    /**
     * @var \app\admin\model\User
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('User');
        $this->view->assign("levelList", $this->model->getLevelList());
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
                ->with('group')
                ->where($where)
                ->order($sort, $order)
                ->count();
            $list = $this->model
                ->with('group')
                ->where($where)
                ->order($sort, $order)
                ->limit($offset, $limit)
                ->select();
            foreach ($list as $k => $v) {
                $v->hidden(['password', 'salt']);
                $v->recnum = db('user')->where('leader_id',$v->id)->count('id');
                $v->recharge = db('recharge')->where(['status'=>2,'user_id'=>$v->id])->sum('num');
                $v->twonum = Db::query("select count(id) as num from dz_user where relation REGEXP '^[0-9]+-{$v->id}-'")[0]['num'];
                $v->threenum = Db::query("select count(id) as num from dz_user where relation REGEXP '^[0-9]+-[0-9]+-{$v->id}-'")[0]['num'];
                $v->teamnum = Db::query("select count(id) as num from dz_user where relation REGEXP '^{$v->id}-' OR relation REGEXP '.-{$v->id}-'")[0]['num'];
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    public function rec()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            var_dump($this->request->get());
            exit;
        }
    }

    public function send()
    {
        if ($this->request->isPost())
        {
            $postData = $this->request->post();
            if(strstr($postData['name'],',')){
                $userList = explode(',',$postData['name']);
            }else{
                $userList[0] = $postData['name'];
            }
            if(empty($userList)){
                $this->error('用户异常');
            }
            $type = $postData['type'];
            $num = sprintf("%.2f",$postData['num']);
            if($num<=0){
                $this->error('金额错误');
            }
            Db::startTrans();
            try {
                foreach($userList as $key=>$value){
                    $userInfo = db('user')->field('score,money')->where('id',$value)->find();
                    if($postData['paytype'] == 1){
                        if($type == 1){
                            db('user')->where('id',$value)->setInc('score',$num);
                            ScoreLog::create(['user_id' => $value, 'score' => '+'.$num, 'before' => $userInfo['score'], 'after' => $userInfo['score']+$num, 'memo' => $postData['memo']]);
                        }elseif($type == 2){
                            db('user')->where('id',$value)->setInc('money',$num);
                            MoneyLog::create(['user_id' => $value, 'money' => '+'.$num, 'before' => $userInfo['money'], 'after' => $userInfo['money']+$num, 'memo' => $postData['memo']]);
                        }
                    }else{
                        if($type == 1){
                            db('user')->where('id',$value)->setDec('score',$num);
                            ScoreLog::create(['user_id' => $value, 'score' => '-'.$num, 'before' => $userInfo['score'], 'after' => $userInfo['score']-$num, 'memo' => $postData['memo']]);
                        }elseif($type == 2){
                            db('user')->where('id',$value)->setDec('money',$num);
                            MoneyLog::create(['user_id' => $value, 'money' => '-'.$num, 'before' => $userInfo['money'], 'after' => $userInfo['money']-$num, 'memo' => $postData['memo']]);
                        }
                    }

                }
                Db::commit();
                $this->success('人工发放成功');
            } catch (ValidateException $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
        }
        return $this->view->fetch();
    }


    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get($ids);
        if (!$row)
            $this->error(__('No Results were found'));
        $this->view->assign('groupList', build_select('row[group_id]', \app\admin\model\UserGroup::column('id,name'), $row['group_id'], ['class' => 'form-control selectpicker']));
        return parent::edit($ids);
    }

}
