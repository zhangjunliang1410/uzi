<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/4/10
 * Time: 14:31
 */
namespace app\admin\controller\config;

use app\common\controller\Backend;

class Userlevel extends Backend
{
    protected $model = null;

    protected $noNeedRight = ['start', 'pause', 'change', 'detail', 'cxselect', 'searchlist'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\config\Config;
    }

    /**
     * 查看
     */
    public function index()
    {
        $userLevel = db('project_config')->where('status',1)->column('leveljson');
        if(empty($userLevel))
        {
            $this->error('请先完成基础配置');
        }
        if ($this->request->isPost()) {
            if(empty($this->request->post())){
                $this->error('参数提交不能为空');
            }
            $postData = $this->request->post();
            $leveljson = json_encode($postData['userLevel'],JSON_UNESCAPED_UNICODE);
            db('project_config')->where('status',1)->update(['leveljson'=>$leveljson]);
            $this->success('操作成功',null);
        }
        $userLevel = @json_decode($userLevel[0],true);
        $this->assign('userLevel',$userLevel);
        return $this->view->fetch();
    }
}