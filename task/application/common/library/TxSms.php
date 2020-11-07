<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/8/21
 * Time: 16:58
 */

namespace app\common\library;

use think\Db;
use think\Model;
class TxSms
{
    public $appId;
    public $secret;
    public $sign;

    public function __construct()
    {
        $this->appId = 'douzhuan123';
        $this->secret = 'douzhuanvgy159';
        $this->sign = '【抖赚】';
    }

    /**
     * 发送验证码
     * @param $mobile
     * @param string $content
     * @param int $verify
     * @param string $ip
     * @param string $event
     * @return bool|string
     */
    public function send($mobile, $content='',$verify=0,$ip='',$event='')
    {
        $map['mobile'] = ['=',$mobile];
        $startTime = strtotime(date("Y-m-d",time()));
        $map['createtime'] = ['>',$startTime];
        $userInfo = db('sms')
               ->field('createtime,count(id) as count_id')
               ->where($map)
               ->find();
        if($userInfo['count_id'] > 20){
            return '每个手机号码每天最多发送20条短信';
        }
        if(empty($this->appId) || empty($this->secret) || empty($this->sign)){
            return '管理员未配置';
        }
        $username = urlencode($this->appId);
        $password = urlencode($this->secret);
        $mobiles = $mobile;
        $string = $this->sign .$content;
        $contents = urlencode(mb_convert_encoding($string,"gb2312" , "utf-8"));
        $fp=Fopen("http://api.sms1086.com/api/Send.aspx?username=$username&password=$password&mobiles=$mobiles&content=$contents","r");
        $ret = fgetss($fp,255);
        $re =  urldecode($ret);
        $code = substr(substr($re,7),0,1);
        if($code == 0){
            $smsOrder = [
                'event'=>$event,
                'mobile'=>$mobile,
                'code'=>empty($verify)?'':$verify,
                'title'=>empty($content)?'':$content,
                'ip'=>empty($ip)?'':$ip,
                'createtime'=>time()
            ];
            $re = db('sms')
                ->insertGetId($smsOrder);
            if($re == false){
                return '添加记录失败';
            }
            $code = 'OK';
            return true;
        }else{
            return '发送失败,请联系管理员';
        }
    }

    /**
     * 验证码查验
     * @param $mobile
     * @param $event
     * @param $code
     * @return bool
     */
    public static function check($mobile,$event,$code)
    {
        $codeInfo = db('sms')
            -> where('mobile','=',$mobile)
            -> where('event','=',$event)
            -> where('createtime','>',strtotime(date("Y-m-d",time())))
            -> order('id desc')
            -> value('code');
        if(empty($codeInfo) || $codeInfo != $code){
            return false;
        }else{
            return true;
        }
    }
}