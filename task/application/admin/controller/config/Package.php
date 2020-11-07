<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/4/10
 * Time: 14:31
 */
namespace app\admin\controller\config;

use app\common\controller\Backend;
use app\admin\model\config\config;
class Package extends Backend
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
        $packagejson = db('project_config')->where('status',1)->column('packagejson');
        if(empty($packagejson))
        {
            $this->error('请先完成基础配置');
        }
        if ($this->request->isPost()) {
            if(empty($this->request->post())){
                $this->error('参数提交不能为空');
            }
            $postData = $this->request->post();
            $leveljson = json_encode($postData['packagejson'],JSON_UNESCAPED_UNICODE);
            db('project_config')->where('status',1)->update(['packagejson'=>$leveljson]);
            $this->success('操作成功',null);
        }
        $packagejson = json_decode($packagejson[0],true);
        $this->assign('packagejson',$packagejson);
        return $this->view->fetch();
    }
}