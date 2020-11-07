<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/4/10
 * Time: 14:31
 */
namespace app\admin\controller\config;

use app\common\controller\Backend;
use think\File;

class Pay extends Backend
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
        $config = db('project_config')->where('status',1)->value('pay');
        $bankConfig = db('project_config')->where('status',1)->value('bank');
        if ($this->request->isPost()) {
            if(empty($this->request->post())){
                $this->error('参数提交不能为空');
            }
            $postData = $this->request->post();
            $alipay = $postData['alipay'];
            $wechat = $postData['wechat'];
            $file = request()->file('alipay1');
            $url = '/uploads/image/';
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $alipay[0]['image'] = $url.$info->getSaveName();
                }
            }
            $file = request()->file('alipay2');
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $alipay[1]['image'] = $url.$info->getSaveName();
                }
            }
            $file = request()->file('alipay3');
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $alipay[2]['image'] = $url.$info->getSaveName();
                }
            }
            $file = request()->file('wechat1');
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $wechat[0]['image'] = $url.$info->getSaveName();
                }
            }
            $file = request()->file('wechat2');
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $wechat[1]['image'] = $url.$info->getSaveName();
                }
            }
            $file = request()->file('wechat3');
            if($file) {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'image');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $wechat[2]['image'] = $url.$info->getSaveName();
                }
            }
            $data['pay'] = json_encode(['alipay'=>$alipay,'wechat'=>$wechat]);
            $data['bank'] = json_encode($postData['bank']);
            db('project_config')->where('status',1)->update($data);
            $this->success('操作成功',null);
        }
        $pay = @json_decode($config,true);
        $bank = @json_decode($bankConfig,true);
        $this->assign('bank',$bank);
        $this->assign('alipay',$pay['alipay']);
        $this->assign('wechat',$pay['wechat']);
        return $this->view->fetch();
    }
}
