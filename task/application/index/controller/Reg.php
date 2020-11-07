<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/1/2
 * Time: 13:43
 */
namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;
use think\Request;
use think\Session;
use app\common\model\MoneyLog;
use app\common\model\User;
use app\common\library\TxSms;

class Reg extends Frontend
{
    protected $layout = '';
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];


    /**
     * 注册
     * @return mixed
     *
     */
    public function register()
    {
        $suid = $this->request->request('invitecode','');
        if(!empty($suid)){
            session('invitecode',$suid);
        }
        $type = $this->request->request('type','');
        $mobile = $this->request->request('mobile','');
        if($type == 'verifycode'){
            $txSms = new TxSms();
            $ip = $this->request->ip();
            $event = 'register';
            $verify = rand(100000,999999);
            $content = '您本次注册验证码为'.$verify;
            $re = $txSms->send($mobile, $content,$verify,$ip,$event);
            if($re == true){
                $data = [
                    'type'=>'success',
                    'msg'=>'发送成功',
                ];
            }else{
                $data = [
                    'type'=>'error',
                    'msg'=>$re
                ];
            }
            return json($data);
        }elseif($type == 'submit'){
            $code = $this->request->request('code','');
            $data['type'] = 'error';
//            if(empty($code) || \app\common\library\TxSms::check($mobile,'register',$code) == false){
//                $data['msg']= '验证码错误';
//                return json($data);
//            }
            $user = \app\common\model\User::getByMobile($mobile);
            if(!empty($user)){
                $data['msg']= '用户已存在';
                return json($data);
            }
            $password = $this->request->post('password');
            //执行注册
            $recInfo = db('user')->where('invitecode',session('invitecode'))->value('id');
            if(empty($recInfo))
            {
                $data['msg']= '推荐人信息错误';
                return json($data);
            }
            $ret = $this->auth->webRegister($mobile, $password, '', $recInfo,[]);
            if($ret){
                session('suid',null);
                $data['type'] = 'success';
                $data['msg'] = '注册成功';
            }else{
                $data['msg'] = '注册失败';
            }
            return json($data);
        }
        return $this->view->fetch();
    }

    /**
     * 下载链接
     * @return mixed
     *
     */
    public function download()
    {
        $downInfo = db('configure')->field('android,ios')->where('status',1)->find();
        if(empty($downInfo)){
            $this->error('管理员未设置');
        }
        $this->assign('downInfo',$downInfo);
        return $this->view->fetch();
    }

    public function back()
    {
        return $this->view->fetch();
    }

    function handleMoney($uid,$money,$remarks,$type=1)
    {
        $uid = trim($uid);
        $money = sprintf("%.2f",trim($money));
        $beforeMoney = db('user')->where('id='.$uid)->value('money');
        if(empty($uid) || empty($money)){
            return false;
        }
        $sql = "UPDATE fa_user SET money = :money WHERE id = :id;";
        if($type == 1){
            $total = sprintf("%.2f",$beforeMoney+$money);
        }else{
            $total = sprintf("%.2f",$beforeMoney-$money);
        }
        $re = Db::execute($sql,['money'=>$total,'id'=>$uid]);
        if($re == false){
            return false;
        }
        MoneyLog::create(['user_id' => $uid, 'money' => $money, 'before' => $beforeMoney, 'after' => $total, 'memo' =>$remarks ]);
        return true;
    }
}