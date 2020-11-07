<?php
namespace app\api\controller;

use app\common\controller\Api;
use app\common\library\TxSms;
use app\common\library\Bonus;
use app\common\model\Configure;
use app\common\model\ProjectConfig;
use app\common\model\Recharge;
use app\common\model\Task;
use app\common\model\MoneyLog;
use app\common\model\ScoreLog;
use app\common\model\Order;
use app\common\model\User;
use app\common\model\Message;
use think\Db;
use douyin\open\Api\DefaultApi;
use douyin\open\Api\UserInfoApi;
use think\File;
use think\Exception;
use think\Request;

class Index extends Api
{
    protected $noNeedLogin = ['GetLoginQrcode'];
    protected $noNeedRight = ['*'];

    protected $logo = 'http://task.zz0510.top/uploads/logo01.png';
    protected $nickname = '管理员';
    //money余额  score钻石

    public function index()
    {
        $user = $this->auth->getUserinfo();
        $user['avatar'] = !empty($user['avatar'])?fileUrl($user['avatar']):'';
        $user['bronze'] = db('bronze')->where('user_id',$user['id'])->value('id');
        $this->success('信息返回成功',$user);
    }

    public function myTeam()
    {
        $user = $this->auth->getUserinfo();
        $user['avatar'] = fileUrl($user['avatar']);
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $type = $this->request->request('type',1,'htmlspecialchars');
        $recCount = db('user')->where('leader_id',$user['id'])->count();
        if($type == 1)
        {
            $recList = Db::query("select id,avatar,nickname,level,createtime from dz_user where relation REGEXP '^{$user['id']}-' limit {$limit}");
        }elseif($type == 2){
            $recList = Db::query("select id,avatar,nickname,level,createtime from dz_user where relation REGEXP '^[0-9]+-{$user['id']}-' limit {$limit}");
        }else{
            $recList = Db::query("select id,avatar,nickname,level,createtime from dz_user where relation REGEXP '^[0-9]+-[0-9]+-{$user['id']}-' limit {$limit}");
        }
        if(!empty($recList)){
            foreach($recList as $key=>&$value)
            {
                $value['avatar'] = fileUrl($value['avatar']);
            }
        }
        $data = [
            'user'=>$user,
            'count'=>$recCount,
            'recList'=>$recList
        ];
        $this->success("信息返回成功",$data);
    }

    public function gitCs()
    {
        $this->success('测试下git');
    }

    public function home()
    {
        $user = $this->auth->getUserinfo();
        $data['userinfo'] = $this->auth->getUserinfo();
        $thumb = db('thumb')->field('image,url')->where('status',1)->select()->toArray();
        $levelConfig = ProjectConfig::getConfig('leveljson');
        $config = json_decode($levelConfig[0],true);
        $startTime = strtotime(date("Y-m-d",time()));
        $map['user_id'] = ['=',$user['id']];
        $map['createtime'] = ['>',$startTime];
        $taskCount = db("order")->where($map)->count('id');
        $data['surplus'] = $config[$user['level']]['tasknum']-$taskCount;
        if(empty($thumb)){
            $this->error('管理员未设置轮播图');
        }else{
            foreach($thumb as $key=>&$value){
                $thumb[$key]['image'] = fileUrl($value['image']);
            }
        }
        $data['thumb'] = $thumb;
        //$data['radio'] = htmlspecialchars_decode(Configure::getConfig('horn')[0]);
        $startTime = strtotime(date("Y-m-d",time()));
        $updatetime = db('user')->where('id',$user['id'])->value('prevtime');
        $data['display'] = $updatetime>$startTime?0:1;
        $data['content'] = htmlspecialchars_decode(Configure::getConfig('radio')[0]);
        $data['contentStatus'] = htmlspecialchars_decode(Configure::getConfig('radiostatus')[0]);
        $data['levelMessage'] = createMessage(20,2);
        $messageExist = db('message')->where(['user_id'=>$user['id'],'status'=>0])->count('id');
        $data['messageExist'] = empty($messageExist)?0:1;
        $data['withdrawMessage'] = createMessage(30);
        $this->success('信息返回成功',$data);
    }

    public function shareImage()
    {
        $userInfo = $this->auth->getUserinfo();
        $shareImg = db('share')->where('user_id='.$userInfo['id'])->value('url');
        $request = Request::instance();
        $domain = $request->domain();
        $shareUrl = $domain.'/index/reg/register?invitecode='.$userInfo['invitecode'];
        if(empty($shareImg)){
            $bgImg = $domain.'/uploads/share1.jpg';
            $code = '邀请码:'.$userInfo['invitecode'];
            $re = mergeImg($userInfo['id'],$bgImg,$shareUrl,$code);
            if(empty($re)){
                $this->error('创建分享二维码失败,请联系管理员');
            }
            $shareOrder = [
                'user_id'=>$userInfo['id'],
                'url'=>$re,
                'createtime'=>time()
            ];
            $res = db('share')->insertGetId($shareOrder);
            if(empty($res)){
                $this->error('添加失败');
            }
            $shareImg = db('share')->where('user_id='.$userInfo['id'])->value('url');
        }

        $data = [
            'qrcode'=>$url = 'http://'.$_SERVER['HTTP_HOST'].'/api/common/qrcode?invitecode='.$userInfo['invitecode'],
            'shareImg'=>$shareImg,
            'code'=>$userInfo['invitecode'],
            'shareUrl'=>$shareUrl
        ];
        $this->success('分享二维码页面信息返回成功',$data);
    }

    public function course()
    {
        $content = htmlspecialchars_decode(Configure::getConfig('novicecontent')[0]);
        $this->success('信息返回成功',$content);
    }


    public function content()
    {
        $type = $this->request->request('type','');
        if($type == 1){
            $content = htmlspecialchars_decode(Configure::getConfig('handlecontent')[0]);
        }else{
            $content = htmlspecialchars_decode(Configure::getConfig('invitecontent')[0]);
        }
        $this->success('信息返回成功',$content);
    }

    public function userLevel()
    {
        $userInfo = $this->auth->getUserinfo();
        $config = ProjectConfig::getConfig('leveljson');
        $levelConfig = json_decode($config[0],true);
        unset($levelConfig['recharge']);
        $bronze = db('bronze')->where('user_id',$userInfo['id'])->value('id')?1:0;
        $configDetail = [];
        foreach($levelConfig as $k=>$value){
            if($k != 0){
                array_push($configDetail,$value);
            }
        }
        $data = [
            'level'=>$userInfo['level'],
            'num'=>$levelConfig[0]['num'],
            'bronze'=>$bronze,
            'config'=>$configDetail
        ];
        $this->success('信息返回成功',$data);
    }


    public function receiveBronze()
    {
        $userInfo = $this->auth->getUserinfo();
        $config = ProjectConfig::getConfig('leveljson');
        $levelConfig = json_decode($config[0],true);
        $bronze = db('bronze')->where('user_id',$userInfo['id'])->value('id');
        if(!empty($bronze)){
            $this->error('你已领取此奖励');
        }
        Db::startTrans();
        try {
            db('user')->where('id',$userInfo['id'])->setInc('score',$levelConfig[0]['num']);
            $data = [
                'user_id'=>$userInfo['id'],
                'num'=>$levelConfig[0]['num'],
                'createtime'=>time()
            ];
            db('bronze')->insert($data);
            ScoreLog::create(['user_id' => $userInfo['id'], 'score' => '+'.$levelConfig[0]['num'], 'before' => $userInfo['score'], 'after' => $userInfo['score']+$levelConfig[0]['num'], 'memo' => '领取青铜会员奖励']);
            Db::commit();
        }catch (Exception $e){
            $this->error($e->getMessage());
            Db::rollback();
            return false;
        }
        $this->success('奖励领取成功');
    }


    public function rechargeDetail()
    {
        $config = ProjectConfig::getConfig('leveljson');
        $levelConfig = json_decode($config[0],true);
        array_splice($levelConfig,0,1);
        $wechat = fileUrl(Configure::getConfig('wechatimage')[0]);
        $alipay = fileUrl(Configure::getConfig('alipayimage')[0]);
        $data = [
            'levelConfig'=>$levelConfig,
            'wechat'=>$wechat,
            'alipay'=>$alipay
        ];
        $this->success('信息返回成功',$data);
    }

    public function douyin()
    {
        $userInfo = $this->auth->getUserinfo();
        $exist = db('bind')->where('user_id',$userInfo['id'])->where('type',1)->value('id');
        if(!empty($exist)){
            $this->error('用户已完成绑定');
        }
        $client_key = "awzj2dkc3z8momgf";
        $client_secret = "68555ba0a77bf1c6633a5d76e9764da0";
        $code = $this->request->request('code','','htmlspecialchars');
        if(empty($code)){
            $this->error('缺失参数');
        }
        $url="https://open.douyin.com/oauth/access_token/?client_key=".$client_key."&client_secret=".$client_secret."&code=".$code."&grant_type=authorization_code";
        $return  = curlGet($url);
        $accessToken = $return['data']['access_token'];
        $openid = $return['data']['open_id'];
        if(empty($accessToken)){
            $this->error('获取token失败');
        }
        $getUrl = "https://open.douyin.com/oauth/userinfo/?access_token=".$accessToken."&open_id=".$openid;
        $user = curlGet($getUrl);
        if(empty($user['data']['nickname'])){
            $this->error('获取用户信息失败');
        }
        $data = [
            'user_id'=>$userInfo['id'],
            'openid'=>$openid,
            'type'=>1,
            'image'=>$user['data']['avatar'],
            'nickname'=>$user['data']['nickname'],
            'createtime'=>time()
        ];
        db('bind')->insert($data);
        $this->success('绑定成功');
    }

    public function wechat()
    {
        $userInfo = $this->auth->getUserinfo();
        $exist = db('bind')->where('user_id',$userInfo['id'])->where('type',2)->value('id');
        if(!empty($exist)){
            $this->error('用户已完成绑定');
        }
        $avatar = $this->request->request('avatar','','htmlspecialchars');
        $nickname = $this->request->request('nickname','','htmlspecialchars');
        $openid = $this->request->request('openid','','htmlspecialchars');
        if(empty($avatar) || empty($nickname)){
            $this->error('参数缺失');
        }
        $data = [
            'user_id'=>$userInfo['id'],
            'openid'=>$openid,
            'type'=>2,
            'image'=>$avatar,
            'nickname'=>$nickname,
            'createtime'=>time()
        ];
        db('bind')->insert($data);
        $this->success('绑定成功');
    }

    public function GetLoginQrcode()
    {
        $url = 'https://open.douyin.com/platform/oauth/connect/platform/oauth/connect';
        $redirect_uri = "http://dz.zz0510.top/index/reg/back";
        $scope = "scope";
        $url = $url . "?client_key=awzj2dkc3z8momgf&response_type=code&scope=" . $scope . "&redirect_uri=" . $redirect_uri . "&state=1";
        header('Location:' . $url);
        exit();
    }


    public function rechargeOrder()
    {
        $types = $this->request->request('types','','htmlspecialchars');
        $userInfo = $this->auth->getUserinfo();
        if($types == 'send'){
            $data['image']  = $this->request->request('image','','htmlspecialchars');
            $data['paytype'] = $this->request->request('paytype','','htmlspecialchars');
            if(empty($data['image']) || empty($data['paytype'])){
                $this->error('参数缺失');
            }
            $data['num'] = intval($this->request->request('num','','htmlspecialchars'));
            if(empty($data['num']) || $data['num']<=0){
                $this->error('价格错误');
            }
            $data['paytime'] = time();
            $data['user_id'] = $userInfo['id'];
            $data['status'] = 1;
            $recharge = new Recharge();
            $recharge->allowField(true)->save($data);
            $this->success('提交成功,等待审核');
        }else{
            $this->error('操作异常');
        }
    }

    public function payTask()
    {
        $userinfo = $this->auth->getUserinfo();
        $config = ProjectConfig::getConfig('packagejson');
        $taskConfig = json_decode($config[0],true);
        $wechat = fileUrl(Configure::getConfig('wechatimage')[0]);
        $alipay = fileUrl(Configure::getConfig('alipayimage')[0]);
        $id = $this->request->post('id','','htmlspecialchars');
        if(empty($id)){
            $this->error('参数缺失');
        }
        $order = db('task')->field('id,tasknum,price')->where(['id'=>$id,'status'=>0])->find();
        if(empty($order)){
            $this->error('订单信息异常');
        }
        $type = $this->request->post('type','','htmlspecialchars');
        if($type == 'send'){
            $data = [
                'status'=>1,
                'paytime'=>time()
            ];
            $rebate = $taskConfig['rebate'];
            $sum = sprintf("%.2f",$order['tasknum']*$order['price']);
            $rebatePrice = sprintf("%.2f",$sum*$rebate*0.01);
            $sumPrice = sprintf("%.2f",$rebatePrice+$sum);
            if($userinfo['score']<$sumPrice){
                $this->error('钻石不足,请充值');
            }
            db('user')->where('id',$userinfo['id'])->setDec('score',$sumPrice);
            ScoreLog::create(['user_id' => $userinfo['id'], 'score' => '-'.$sumPrice, 'before' => $userinfo['score'], 'after' => $userinfo['score']-$sumPrice, 'memo' => '发布任务扣除']);
            $res = db('task')->where('id',$id)->update($data);
            if($res == false){
                $this->error('更新订单失败');
            }
            $this->success('已支付,任务发布成功');
        }
        $re = [
            'order'=>$order,
            'wechat'=>$wechat,
            'alipay'=>$alipay,
            'taskConfig'=>$taskConfig
        ];
        $this->success('信息返回成功',$re);
    }

    //我发布的任务
    public function releaseTask()
    {
        $userInfo = $this->auth->getUserinfo();
        $type = $this->request->post('type','','htmlspecialchars');
        $type = empty($type)?1:$type;
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $data['user_id'] = ['=',$userInfo['id']];
        switch($type)
        {
            case 2:
                $data['status'] = ['=',0];
                break;
            case 3:
                $data['status'] = ['=',1];
                break;
            case 4:
                $data['starttime'] = ['<=',time()];
                $data['endtime'] = ['>',time()];
                $data['status'] = ['=',2];
        }
        $list = db('task')->field('id,title,tasktype,starttime,endtime,price,status')->where($data)->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }

    public function delTask()
    {
        $user = $this->auth->getUserinfo();
        $id = $this->request->request('id','','htmlspecialchars');
        $map = [
            'id'=>$id,
            'user_id'=>$user['id']
        ];
        $taskInfo = db('order')->field('id,status,task_id')->where($map)->find();
        if($taskInfo['status'] > 0 || empty($taskInfo)){
            $this->error('订单信息错误或订单已完成');
        }
        db('order')->where('id',$id)->update(['status'=>-1,'updatetime'=>time()]);
        db('task')->where('id',$taskInfo['task_id'])->setInc('surplus');
        $this->success('订单已取消');
    }

    public function delPost()
    {
        $user = $this->auth->getUserinfo();
        $id = $this->request->request('id','','htmlspecialchars');
        $map = [
            'id'=>$id,
            'user_id'=>$user['id']
        ];
        $taskInfo = db('task')->field('id,status')->where($map)->find();
        if($taskInfo['status'] > 0 || empty($taskInfo)){
            $this->error('任务信息错误');
        }
        db('task')->where('id',$id)->delete();
        $this->success('订单已取消');
    }

    public function checkList()
    {
        $userInfo = $this->auth->getUserinfo();
        $type = $this->request->request('type',1);
        $page = $this->request->request('page',1);
        $limit = page_limit($page,15);
        $map['b.user_id']= ['=',$userInfo['id']];
        if($type == 1){
            $map['a.status'] = ['=',1];
        }else{
            $map['a.status'] = ['in','-1,2'];
        }
        $orderList = db('order')
            ->alias('a')
            ->join('task b','a.task_id=b.id')
            ->field('b.title,b.tasktype,a.price,b.starttime,b.endtime,a.id,a.user_id,a.status')
            ->where(['b.user_id'=>$userInfo['id']])
            ->order('a.createtime desc')
            ->limit($limit)
            ->select();
        $list = [];
        if(!empty($orderList)){
            foreach($orderList as $key=>&$value){
                if($type == 1 && $value['status'] != 1){
                    unset($orderList[$key]);
                    continue;
                }elseif($type == 2){
                    if($value['status'] !=-1 && $value['status'] !=2){
                        unset($orderList[$key]);
                        continue;
                    }
                }
                $user = db('user')->field('avatar,nickname')->where('id',$value['user_id'])->find();
                $value['avatar'] = fileUrl($user['avatar']);
                $value['nickname'] = $user['nickname'];
                array_push($list,$value);
            }
        }
        $this->success('信息返回成功',$list);
    }

    public function checkTaskDetail()
    {
        $id = $this->request->request('id','','htmlspecialchars');
        $map['a.id'] = $id;
        $orderInfo = db('order')
            ->alias('a')
            ->join('task b','a.task_id=b.id')
            ->field('b.title,b.tasktype,a.price,a.id,a.user_id,a.collect,a.images,a.finishtime,a.status')
            ->where($map)
            ->find();
        if(!empty($orderInfo['images'])){
            $orderInfo['images'] = explode(',',$orderInfo['images']);
            foreach($orderInfo['images'] as $key=>&$val)
            {
                $orderInfo['images'][$key] = fileUrl($val);
            }
        }
        $orderInfo['nickname'] = db('user')->where('id',$orderInfo['user_id'])->value('nickname');
        $this->success('信息返回成功',$orderInfo);
    }

    public function myTask()
    {
        $userInfo = $this->auth->getUserinfo();
        $type = $this->request->request('type',3);
        $page = $this->request->request('page',1);
        $limit = page_limit($page,15);
        $map = [
            'a.user_id'=>['=',$userInfo['id']],
        ];
        if($type != 3){
            $map['a.status'] = ['=',$type];
        }else{
            $map['a.status'] = ['in','0,1,2,-1'];
        }
        $orderList = db('order')
            ->alias('a')
            ->join('task b','a.task_id=b.id')
            ->field('b.title,b.tasktype,a.price,b.starttime,b.endtime,a.id,a.user_id,a.status,a.task_id')
            ->where($map)
            ->limit($limit)
            ->select();
        $this->success('信息返回成功',$orderList);
    }

    public function rebateList()
    {
        $page = $this->request->request('page',1);
        $limit = page_limit($page,15);
        $userinfo = $this->auth->getUserinfo();
        $map = [
            'user_id'=>$userinfo['id'],
            'type'=>'task'
        ];
        $sum = db('rebate')->where($map)->sum('num');
        $rebateList = db('rebate')->field('id,order_id,num,createtime')->where($map)->order('createtime desc')->limit($limit)->select()->toArray();
        if(!empty($rebateList)){
            foreach($rebateList as $key=>&$value){
                $taskid = db('order')->where('id',$value['order_id'])->value('task_id');
                $value['title'] = db('task')->where('id',$taskid)->value('title');
            }
        }
        $data = [
            'sum'=>empty($sum)?0.00:$sum,
            'list'=>$rebateList
        ];
        $this->success('信息返回成功',$data);
    }

    public function taskDetail()
    {
        $userinfo = $this->auth->getUserinfo();
        //list列表，my自己上传，do做任务的
        $type = $this->request->request('type','','htmlspecialchars');
        $id = $this->request->request('id','','htmlspecialchars');
        $type = empty($type)?'list':$type;
        $data['id'] = ['=',$id];
        switch($type)
        {
            case 'list':
                $data['status'] = ['=',2];
                $data['surplus'] = ['>',0];
                break;
            case 'my':
                $data['user_id'] = ['=',$userinfo['id']];
                break;
        }
        $taskInfo = db('task')
            ->field('id,mealtype,title,user_id,postlimit,tasktype,posttime,tasknum,surplus,price,starttime,endtime,url,videofile,videocontent,iscollect,isimg,step1image,step1content,step2image,step2content,step3image,step3content,step4image,step4content,step5image,step5content,collect,image,status,checklimit')
            ->where($data)
            ->find();
        if(empty($taskInfo) || empty($id))
        {
            $this->error('任务信息错误');
        }
        if($taskInfo['user_id'] == 0)
        {
            $taskInfo['avatar'] = $this->logo;
            $taskInfo['nickname'] = $this->nickname;
        }else{
            $userInfo = db('user')->field('id,nickname,avatar')->where('id',$taskInfo['user_id'])->find();
            $taskInfo['avatar'] = empty($userInfo['avatar'])?'':fileUrl($userInfo['avatar']);
            $taskInfo['nickname'] = $userInfo['nickname'];
        }
        $taskInfo['step1image'] = $taskInfo['step1image']?fileUrl($taskInfo['step1image']):'';
        $taskInfo['step1content'] = $taskInfo['step1content']?strip_tags($taskInfo['step1content']):'';
        $taskInfo['step2content'] = $taskInfo['step2content']?strip_tags($taskInfo['step2content']):'';
        $taskInfo['step3content'] = $taskInfo['step3content']?strip_tags($taskInfo['step3content']):'';
        $taskInfo['step4content'] = $taskInfo['step4content']?strip_tags($taskInfo['step4content']):'';
        $taskInfo['step5content'] = $taskInfo['step5content']?strip_tags($taskInfo['step5content']):'';
        $taskInfo['step2image'] = $taskInfo['step2image']?fileUrl($taskInfo['step2image']):'';
        $taskInfo['step3image'] = $taskInfo['step3image']?fileUrl($taskInfo['step3image']):'';
        $taskInfo['step4image'] = $taskInfo['step4image']?fileUrl($taskInfo['step4image']):'';
        $taskInfo['step5image'] = $taskInfo['step5image']?fileUrl($taskInfo['step5image']):'';
        $taskInfo['videofile'] = $taskInfo['videofile']?fileUrl($taskInfo['videofile'],'video'):'';
        $taskInfo['videocontent'] = $taskInfo['videocontent']?strip_tags($taskInfo['videocontent']):'';
        $taskInfo['image'] = $taskInfo['image']?fileUrl($taskInfo['image']):'';
        if(in_array($type,['do','list']))
        {
            $map['user_id'] = $userinfo['id'];
            $map['task_id'] = $id;
            $existStatus = db('order')->where($map)->order('id desc')->value('status');
            if(!empty($existStatus) || $existStatus == 0){
                $taskInfo['taskStatus'] = $existStatus;
                $limittime = db('order')->where($map)->value('limittime');
                $taskInfo['diff'] = $limittime-time();
                $taskInfo['taskOrderId'] = db("order")->where($map)->value('id');
            }else{
                $taskInfo['taskStatus'] = "";
                $taskInfo['taskOrderId'] = "";
            }
        }else{
            $taskInfo['taskStatus'] = "";
            $taskInfo['taskOrderId'] = "";
        }
        $this->success('信息返回成功',$taskInfo);
    }

    public function accept()
    {
        $timeConfig = json_decode(ProjectConfig::getConfig('tasktime')[0],true);
        $startTime = strtotime(date("Y-m-d {$timeConfig['start']}",time()));
        $endTime = strtotime(date("Y-m-d {$timeConfig['end']}",time()));
        if(time()<$startTime || time()>$endTime){
            $this->error('管理员未开启任务接取');
        }
        $userInfo = $this->auth->getUserinfo();
        $id = $this->request->request('id','','htmlspecialchars');
        $taskStatus = db('order')->where(['user_id'=>$userInfo['id'],'task_id'=>$id])->value('status');
        $map['user_id'] = ['=',$userInfo['id']];
        $startTime = strtotime(date("Y-m-d",time()));
        $map['createtime'] = ['>',$startTime];
        $taskCount = db("order")->where($map)->count('id')?:0;
        $levelConfig = ProjectConfig::getConfig('leveljson');
        $config = json_decode($levelConfig[0],true);
        if($taskCount+1>$config[$userInfo['level']]['tasknum']){
            $this->error('今日可接取任务已达到上限');
        }
        if($taskStatus>=0 && $taskStatus){
            $this->error('任务进行中或已完成');
        }
        $taskInfo = db('task')->field('id,user_id,surplus,price,postlimit,mealtype')->where('id',$id)->lock(true)->find();
        if($userInfo['level']<$taskInfo['mealtype']){
            $this->error('等级不足,无法接取');
        }
        if($userInfo['id'] == $taskInfo['user_id']){
            $this->error('不能接取自己发布任务');
        }
        Db::startTrans();
        try {
            if(empty($taskInfo)){
                throw new Exception('信息异常');
            }
            $data = [
                'user_id'=>$userInfo['id'],
                'task_id'=>$id,
                'taskuser'=>$taskInfo['user_id']>0?2:1,
                'orderId'=>'Dz'.time().randomKeys(2),
                'price'=>$taskInfo['price'],
                'status'=>0,
                'createtime'=>time()
            ];
            switch($taskInfo['postlimit'])
            {
                case '0':
                    $data['limittime'] = time()+86400;
                    break;
                case '1':
                    $data['limittime'] = time()+604800;
                    break;
                case '2':
                    $data['limittime'] = time()+2592000;
                    break;
                case '3':
                    $data['limittime'] = time()+31536000;
            }
            db('order')->insertGetId($data);
            db('task')->where('id',$id)->setDec('surplus');
//            db('user')->where('id',$userInfo['id'])->setDec('score');
//            ScoreLog::create(['user_id' => $userInfo['id'], 'score' =>'-1', 'before' => $userInfo['score'], 'after' => $userInfo['score']-1, 'memo' => '接取任务扣除1钻石']);
            Db::commit();
        }catch (Exception $e){
            $this->error($e->getMessage());
            Db::rollback();
            return false;
        }
        $this->success('任务已接取');
    }

    public function userCheck()
    {
        $id = $this->request->request('id','','htmlspecialchars');
        $type = $this->request->request('type','','htmlspecialchars');
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

    public function myRebate()
    {
        $userinfo = $this->auth->getUserinfo();
        $userinfo['avatar'] = fileUrl($userinfo['avatar']);
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $recList = db('user')->field('id,usertype')->where('leader_id',$userinfo['id'])->limit($limit)->select()->toArray();
        $userinfo['recCount'] = !empty($recList)?count($recList):0;
        $map['user_id'] = ['=',$userinfo['id']];
        $map['type'] = ['in','rec,recTask,recharge,active'];
        if(!empty($recList))
        {
            foreach($recList as $key=>&$value)
            {
                $map['give_user_id'] = ['=',$value['id']];
                $value['rebateNum'] = db('rebate')->where($map)->sum('num');
                $userInfo = db('user')->field('id,usertype,avatar,nickname')->where('id',$value['id'])->find();
                $userInfo['avatar'] = fileUrl($userInfo['avatar']);
                $value['userInfo'] = $userInfo;
                $value['twoList'] = db('user')->field('id,usertype')->where('leader_id',$value['id'])->limit($limit)->select()->toArray();
                if(!empty($value['twoList']))
                {
                    foreach($value['twoList'] as $ke=>&$val)
                    {
                        $map['give_user_id'] = ['=',$val['id']];
                        $val['rebateNum'] = db('rebate')->where($map)->sum('num');
                        $userInfo = db('user')->field('id,usertype,avatar,nickname')->where('id',$val['id'])->find();
                        $userInfo['avatar'] = fileUrl($userInfo['avatar']);
                        $val['userInfo'] = $userInfo;
                        $val['threeList'] = db('user')->field('id,usertype')->where('leader_id',$val['id'])->limit($limit)->select()->toArray();
                        if(!empty($val['threeList']))
                        {
                            foreach($val['threeList'] as $k=>&$v)
                            {
                                $map['give_user_id'] = ['=',$v['id']];
                                $v['rebateNum'] = db('rebate')->where($map)->sum('num');
                                $userInfo = db('user')->field('id,usertype,avatar,nickname')->where('id',$v['id'])->find();
                                $userInfo['avatar'] = fileUrl($userInfo['avatar']);
                                $v['userInfo'] = $userInfo;
                            }
                        }
                    }
                }
            }
        }
        $data = [
            'user'=>$userinfo,
            'recList'=>$recList
        ];
        $this->success('信息返回成功',$data);
    }

    public function submitDetail()
    {
        $id = $this->request->request('id','');
        $orderInfo = db('order')->field('price,collect,images,finishtime,status')->where('id',$id)->find();
        $orderInfo['images'] = explode(',',$orderInfo['images']);
        foreach($orderInfo['images'] as $key=>&$val){
            if(!empty($val)){
                $orderInfo[$key] = fileUrl($val);
            }
        }
        $this->success('信息返回成功',$orderInfo);
    }

    public function coldMoney()
    {
        $userinfo = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $type = $this->request->request('type','');
        $config = ProjectConfig::getConfig('rebatejson');
        $rebateConfig = json_decode($config[0],true);
        if($type == 'send')
        {
            if($userinfo['rebatemoney']<$rebateConfig['out']){
                $this->error('佣金至少达到'.$rebateConfig['out'] .'元方可转出');
            }
            $num = (int)$this->request->request('num',0);
            if($num>$userinfo['rebatemoney'] || $num<$rebateConfig['out'])
            {
                $this->error('转出金额错误');
            }
            db('user')->where('id',$userinfo['id'])->setDec('rebatemoney',$num);
            User::newMoney($num,'+'.$num,$userinfo['id'],'佣金账户转出');
            $order = [
                'user_id'=>$userinfo['id'],
                'num'=>$num,
                'createtime'=>time()
            ];
            db('cold_out')->insert($order);
            $this->success('佣金已转出');
        }
        $list = db('cold_out')->where('user_id',$userinfo['id'])->limit($limit)->order('createtime desc')->select();
        $data = [
            'user'=>$userinfo,
            'list'=>$list,
            'least'=>$rebateConfig['out']
        ];
        $this->success('信息返回成功',$data);
    }

    public function withdraw()
    {
        $user = $this->auth->getUserinfo();
        $withdrawConfig = ProjectConfig::getConfig('withdrawjson');
        $config = json_decode($withdrawConfig[0],true);
        $recCount = db('user')->where('leader_id',$user['id'])->count('id');
        $taskCount = db('order')->where(['user_id'=>$user['id'],'status'=>2])->count('id');
        $withdraw = explode(',',$config['withdraw']);
        $type = $this->request->request('type','');
        if($type == 'send'){
            $num = intval($this->request->request('num',''));
            if(!in_array($num,$withdraw)){
                $this->error('提现金额错误');
            }
            if($taskCount < $config['finish']){
                $this->error('任务完成不足');
            }
            if($recCount<$config['invite']){
                $this->error('邀请人数不足');
            }
            if($user['level']<$config['level']){
                $this->error('会员等级不足');
            }
            if($user['money']<$num){
                $this->error('余额不足');
            }
            $bankInfo = db('user')->field('bankuser,bankname,bankcard')->where('id',$user['id'])->find();
            if(empty($bankInfo['bankname']) || empty($bankInfo['bankcard'])){
                $this->error('未绑定银行卡');
            }
            db('user')->where('id',$user['id'])->setDec('money',$num);
            ScoreLog::create(['user_id' => $user['id'], 'score' => '-'.$num, 'before' => $user['score'], 'after' => $user['money']-$num, 'memo' => '提现扣除']);
            $order = [
                'user_id'=>$user['id'],
                'num'=>$num,
                'status'=>0,
                'createtime'=>time()
            ];
            db('withdraw')->insert($order);
            $this->success('提现已提交,等待管理员审核');
        }
        $data = [
            'user'=>$user,
            'withdraw'=>$withdraw
        ];
        $this->success('信息返回成功',$data);
    }

    public function finish()
    {
        $userinfo = $this->auth->getUserinfo();
        $id = $this->request->post('id','','htmlspecialchars');
        $map['user_id'] = ['=',$userinfo['id']];
        $map['id'] = ['=',$id];
        $map['status'] = ['=',0];
        $orderInfo = db('order')->field('id,task_id,limittime')->where($map)->find();
        $checktype = db('task')->where('id',$orderInfo['task_id'])->value('checklimit');
        $taskinfo = db('task')->field('iscollect,isimg,status')->where('id',$orderInfo['task_id'])->find();
        if($taskinfo['iscollect'] == 1 && empty($this->request->post('collect','','htmlspecialchars'))){
            $this->error('收集信息必填');
        }else{
            $data['collect'] = $this->request->post('collect','','htmlspecialchars');
        }
        if($taskinfo['status'] == 3 || $taskinfo['status'] == -1){
            $this->error('任务已下架或者管理员已取消此任务');
        }
        if($taskinfo['isimg'] == 1 && empty($this->request->post('images/a',''))){
            $this->error('图片信息必填');
        }elseif($taskinfo['isimg'] == 1){
            $image = $this->request->post('images/a','');
            $data['images'] = implode(',',$image);
        }
        if(empty($orderInfo)){
            $this->error('任务订单异常');
        }
        if($orderInfo['limittime']<time())
        {
            $this->error('超出提交限制时间');
        }
        switch($checktype){
            case 0:
                $data['checktime'] = time()+3600;
                break;
            case 1:
                $data['checktime'] = 7200+time();
                break;
            case 2:
                $data['checktime'] = 43200+time();
                break;
            case 3:
                $data['checktime'] = 86400+time();
        }
        $data['status'] = 1;
        $data['finishtime'] = time();
        $data['mobilemodel'] = $this->request->request('mobilemodel','','htmlspecialchars');
        $data['platform'] = $this->request->request('platform','','htmlspecialchars');
        $data['ip'] = getip();
        $re = db('order')->where('id',$id)->update($data);
        $this->success('任务已提交,等待审核');
    }



    public function taskList()
    {
        $mealtype = $this->request->request('mealtype',0,'htmlspecialchars');
        $tasktype = $this->request->request('tasktype','','htmlspecialchars');
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $map['mealtype'] = ['=',$mealtype];
        if(!empty($tasktype)){
            $map['tasktype'] = ['=',$tasktype];
        }
        $map['status'] = ['=',2];
        $map['posttime'] = ['<',time()];
        $map['starttime'] = ['<',time()];
        $map['endtime'] = ['>',time()];
        $list = db('task')->field('id,title,mealtype,tasktype,createtime,endtime,price')->where($map)->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }



    public function rechargeList()
    {
        $userInfo = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('recharge')->field('type,num,createtime,status,reason')->where(['user_id'=>$userInfo['id']])->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }


    public function bonusInfo()
    {
        $userInfo = $this->auth->getUserinfo();
        $config = ProjectConfig::getConfig('bonus');
        $bonusConfig = json_decode($config[0],true);
        $dayBonus = db('bonus_total')->field('num,addnum')->find();
        $startTime = strtotime("Y-m-d",time());
        $map['createtime'] = ['>',$startTime];
        $finishNum = db('bonus')->where($map)->count('id');
        if($bonusConfig['usernum']>0){
            $finishNum = $finishNum+$bonusConfig['usernum'];
        }
        $where['checktime'] = ['>',$startTime];
        $where['user_id'] = ['=',$userInfo['id']];
        $where['status'] = ['=',2];
        $finishOrder = db('order')->where($where)->count('id');
        $data = [
            'bonusConfig'=>$bonusConfig,
            'dayBonus'=>$dayBonus,
            'finishNum'=>$finishNum?$finishNum:0,
            'finishOrder'=>$finishOrder?$finishOrder:0,
        ];
        if($finishNum>0){
            $data['equal'] = sprintf("%.2f",$dayBonus['addnum']/$finishNum);
        }else{
            $data['equal'] = 0.00;
        }

        $this->success('信息返回成功',$data);
    }

    public function postTask()
    {
        $user = $this->auth->getUserinfo();
        $config = ProjectConfig::getConfig('packagejson');
        $taskConfig = json_decode($config[0],true);
        $type = $this->request->request('type','','htmlspecialchars');
        if($type == 'send'){
            $data = input('post.');
            $validate = validate('Task');
            if(!$validate ->scene('add')->check($data)) {
                $this ->error($validate ->getError());
            }else{
                $data['price'] = sprintf("%.2f",$data['price']);
                if($data['price']<=0){
                    $this->error('任务价格错误');
                }
                $data['tasknum'] = $data['num'];
                $data['user_id'] = $user['id'];
                $data['starttime'] = strtotime($data['starttime']);
                $data['endtime'] = strtotime($data['endtime']);
                $data['posttime'] = strtotime($data['posttime']);
                $data['surplus'] = $data['num'];
                $task = new Task();
                $task->allowField(true)->save($data);
                $this->success('请继续下一步',$task->id);
            }
        }
        $this->success('信息返回成功',$taskConfig);
    }

    public function messageList()
    {
        $userInfo = $this->auth->getUserinfo();
        $type = $this->request->request('type',0);
        $map['user_id'] = ['=',$userInfo['id']];
        if($type == 1){
            $map['type'] = ['=','reg'];
        }elseif($type == 2){
            $map['type'] = ['=','task'];
        }elseif($type == 3){
            $map['type'] = ['=','money'];
        }
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('message')->field('id,content,type,status,createtime')->where($map)->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }

    public function bindInfo()
    {
        $user = $this->auth->getUserinfo();
        $data['bankInfo'] = db('user')->field('bankcard,bankuser,bankname')->where('id',$user['id'])->find();
        $data['bankStatus'] = empty($data['bankInfo']['bankcard'])?0:1;
        $map['user_id'] = ['=',$user['id']];
        $map['type'] = ['=',1];
        $data['dyInfo'] = db('bind')->where($map)->find();
        $data['dyStatus'] = empty($data['dyInfo'])?0:1;
        $map['type'] = ['=',2];
        $data['wxInfo'] = db('bind')->where($map)->find();
        $data['wxStatus'] = empty($data['wxInfo'])?0:1;
        $this->success('信息返回成功',$data);
    }

    public function bindBank()
    {
        $user = $this->auth->getUserinfo();
        $bankInfo = db('user')->field('bankcard,bankuser,bankname')->where('id',$user['id'])->find();
        if(!empty($bankInfo['bankcard'])){
            $this->error('银行卡已绑定');
        }
        $data['bankcard'] =(int)$this->request->request('bankcard','','htmlspecialchars');
        if(count($data)>18 || empty($data['bankcard'])){
            $this->error('银行卡号不正确');
        }
        $data['bankuser'] = $this->request->request('bankuser','','htmlspecialchars');
        $data['bankname'] = $this->request->request('bankname','','htmlspecialchars');
        db('user')->where('id',$user['id'])->update($data);
        $this->success('绑定成功');
    }

    public function scoreList()
    {
        $user = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('user_score_log')->field('score,memo,createtime')->where('user_id',$user['id'])->order('createtime desc')->limit($limit)->select();
        $data = [
            'user'=>$user,
            'list'=>$list
        ];
        $this->success('信息返回成功',$data);
    }

    public function feedBack()
    {
        $user = $this->auth->getUserinfo();
        $starttime = strtotime(date("Y-m-d",time()));
        $map['user_id'] = ['=',$user['id']];
        $map['createtime'] = ['>',$starttime];
        $exist = db('feedback')->where($map)->value('id');
        if(!empty($exist)){
            $this->error('每天只可提交一次');
        }
        $data['content'] = $this->request->request('content','','htmlspecialchars');
        $data['mobile'] = $this->request->request('mobile','','htmlspecialchars');
        $data['user_id'] = $user['id'];
        $data['createtime'] = time();
        db('feedback')->insert($data);
        $this->success('提交成功');
    }

    public function moneyList()
    {
        $user = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('user_money_log')->field('money,memo,createtime')->where('user_id',$user['id'])->order('createtime desc')->limit($limit)->select();
        $data = [
            'user'=>$user,
            'list'=>$list
        ];
        $this->success('信息返回成功',$data);
    }

    public function updateInfo()
    {
        $user = $this->auth->getUserinfo();
        $user['avatar'] = fileUrl($user['avatar']);
        $type = $this->request->post('type','','htmlspecialchars');
        if($type == 'send'){
            $data = [];
            if(!empty($this->request->post('avatar','','htmlspecialchars'))){
                $data['avatar'] = $this->request->post('avatar','','htmlspecialchars');
            }
            if(!empty($this->request->post('nickname','','htmlspecialchars'))){
                $data['nickname'] = $this->request->post('nickname','','htmlspecialchars');
            }
            if(!empty($this->request->post('password','','htmlspecialchars'))){
                $oldpassword = $this->request->post('oldpassword','','htmlspecialchars');
                $password = $this->request->post('password','','htmlspecialchars');
                $repassword = $this->request->post('repassword','','htmlspecialchars');
                if(empty($oldpassword) || empty($password) || empty($repassword))
                {
                    $this->error('修改密码需填写完整');
                }
                if($password != $repassword){
                    $this->error('新密码两次不一致');
                }
                if($oldpassword  == $password){
                    $this->error('新旧密码一致');
                }
                $re = $this->auth->changepwd($password,$oldpassword);
                if($re == false){
                    $this->error('修改密码失败');
                }
            }
            if(count($data)>0)
            {
                db('user')->where('id',$user['id'])->update($data);
            }
            $this->success('信息修改成功');
        }
        $this->success('信息返回成功',$user);
    }



    public function messageCate()
    {
        $user = $this->auth->getUserinfo();
        $list = db('message')->field('id,content,type,status,createtime')->where('user_id',$user['id'])->group('type')->order('createtime desc')->select()->toarray();
        $info = db('news')->where('status',1)->order('createtime desc')->find();
        if(!empty($info)){
            $info['type'] = 'news';
            array_push($list,$info);
        }
        $this->success('信息返回成功',$list);
    }

    public function messageInfo()
    {
        $id = $this->request->request('id');
        $messageInfo = db('message')->field('content,type,status,createtime')->where('id',$id)->find();
        db('message')->where('id',$id)->update(['status'=>1,'updatetime'=>time()]);
        $this->success('信息已返回',$messageInfo);
    }

    public function groupImage()
    {
        $type = $this->request->request('type','service','htmlspecialchars');
        $image = $type == 'service'?fileUrl(Configure::getConfig('serviceimage')[0]):fileUrl(Configure::getConfig('wximage')[0]);
        $this->success('信息返回成功',$image);
    }


    /**
     *上传文件
     *
     */
    public function postFile()
    {
        $type = $this->request->request('type','','htmlspecialchars');
        if(!in_array($type,['mp3','mp4','image']) || empty($type)){
            $this->error('上传类型不符');
        }
        $file = request()->file('file');
        if(empty($file)){
            $this->error('文件信息错误');
        }
        if($type == 'mp3'){
            $info = $file->validate(['ext'=>'mp3'])->move(ROOT_PATH.'public'.DS.'uploads'.DS.'mp3');
            $url = '/uploads/mp3/'.$info->getSaveName();
        }elseif($type == 'mp4'){
            $fileInfo = $file->validate(['ext'=>'mp4,rmvb,avi'])->move(ROOT_PATH.'public'.DS.'uploads'.DS.'video');
            $url = '/uploads/video/'.$fileInfo->getSaveName();
        }elseif($type == 'image'){
            $fileInfo = $file->validate(['ext'=>'jpg,jpeg,png'])->move(ROOT_PATH.'public'.DS.'uploads'.DS.'image');
            $url = '/uploads/image/'.$fileInfo->getSaveName();
        }
        $this->success('文件路径返回成功',$url);
    }

    public function turnInfo()
    {
        $userinfo = $this->auth->getUserinfo();
        $turn = ProjectConfig::getConfig('tablejson');
        $config = json_decode($turn[0],true);
        $type = $this->request->request('type','','htmlspecialchars');
        $score = $config['score'];
        unset($config['score']);
        if($type == 'send'){
            if($score>$userinfo['score']){
                $this->error('钻石不足');
            }
            $rand = mt_rand(1,100);
            $num = 0;
            $key = '';
            foreach($config as $k=>$value)
            {
                $num +=$value['percent'];
                if($num>=$rand)
                {
                    $key = $k;
                    break;
                }
            }
            $turn = $config[$key];

            Db::startTrans();
            try {

                $data = [
                    'user_id'=>$userinfo['id'],
                    'win'=>$turn['name'],
                    'type'=>$turn['type'],
                    'num'=>$score,
                    'createtime'=>time()
                ];
                db('win')->insert($data);
                $after = $userinfo['score']-$score;
                db('user')->where('id',$userinfo['id'])->setDec('score',$score);
                ScoreLog::create(['user_id' => $userinfo['id'], 'score' => '-'.$score, 'before' => $userinfo['score'], 'after' => $after, 'memo' => '抽奖扣除']);
                switch($turn['type'])
                {
                    case 2:
                        User::newScore($turn['name'],'+'.$turn['name'],$userinfo['id'],'抽奖获得钻石');
                        break;
                    case 3:
                        User::newMoney($turn['name'],'+'.$turn['name'],$userinfo['id'],'抽奖获得余额');
                        break;
                    case 4:
                        db('user')->where('id',$userinfo['id'])->update(['level'=>5,'updatetime'=>time()]);
                        $order = [
                            'user_id'=>$userinfo['id'],
                            'type'=>5,
                            'status'=>1,
                            'createtime'=>time()
                        ];
                        db('exchange')->insert($order);
                }
                Db::commit();
                $this->success('获得奖励',$key);
            }catch (Exception $e){
                $this->error($e->getMessage());
                Db::rollback();
                return false;
            }
        }
        $data = [
            'user'=>$userinfo,
            'config'=>$config,
            'score'=>$score
        ];
        $this->success('信息返回成功',$data);
    }

    public function turnList()
    {
        $user = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('win')->where('user_id',$user['id'])->order('createtime desc')->limit($limit)->select();
        $data = [
            'user'=>$user,
            'list'=>$list
        ];
        $this->success('信息返回成功',$data);
    }

    public function withdrawList()
    {
        $user = $this->auth->getUserinfo();
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('withdraw')->where('user_id',$user['id'])->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }

    public function rechargeConfig()
    {
        $config = json_decode(ProjectConfig::getConfig('leveljson')[0],true);
        $recharge = explode(',',$config['recharge']);
        $pay = json_decode(db('project_config')->where('status',1)->value('pay'),true);
        $bankConfig = json_decode(db('project_config')->where('status',1)->value('bank'),true);
        $alipay = $pay['alipay'];
        if(!empty($alipay)){
            foreach($alipay as $key=>&$value)
            {
                if($key == 'switch'){
                    continue;
                }
                $value['image'] = !empty($value['image'])?fileUrl($value['image']):'';
            }
            $alipay[0]['image'] = !empty($alipay[0]['image'])?fileUrl($alipay[0]['image']):'';
        }
        $wechat = $pay['wechat'];
        if(!empty($wechat)){
            foreach($wechat as $ke=>&$val)
            {
                if($ke == 'switch'){
                    continue;
                }
                $val['image'] = !empty($val['image']) ? fileUrl($val['image']) : '';
            }
            $wechat[0]['image'] = !empty($wechat[0]['image']) ? fileUrl($wechat[0]['image']) : '';
        }
        $data = [
            'recharge'=>$recharge,
            'alipay'=>$alipay,
            'wechat'=>$wechat,
            'bankConfig'=>$bankConfig
        ];
        $this->success('信息返回成功',$data);
    }

    public function problem()
    {
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $list = db('problem')->field('id,title,createtime')->where('status',1)->order('createtime desc')->limit($limit)->select();
        $type = $this->request->request('type','');
        if($type == 'detail'){
            $id = $this->request->request('id','');
            $info = db('problem')->where('id',$id)->find();
            if(empty($id) || empty($info)){
                $this->error('信息错误');
            }
            $info['content'] = htmlspecialchars_decode($info['content']);
            $this->success('信息返回成功',$info);
        }
        $this->success('信息返回成功',$list);
    }

    public function updateLevel()
    {
        $userinfo = $this->auth->getUserinfo();
        $levelconfig = ProjectConfig::getConfig('leveljson');
        $config = json_decode($levelconfig[0],true);
        $type = $this->request->request('type');
        if($type == 'update'){
            $level = $this->request->request('level','');
            if($userinfo['level']>=$level){
                $this->error('等级不符');
            }
            if($userinfo['score']<$config[$level]['num']){
                $this->error('钻石不足');
            }
            $data['level'] = $level;
            $data['updatetime'] = time();
            db('user')->where('id',$userinfo['id'])->setDec('score',$config[$level]['num']);
            ScoreLog::create(['user_id' => $userinfo['id'], 'score' => '-'.$config[$level]['num'], 'before' => $userinfo['score'], 'after' => $userinfo['score']-$config[$level]['num'], 'memo' => '充值会员消耗']);
            db('user')->where('id',$userinfo['id'])->update($data);
            $order = [
                'user_id'=>$userinfo['id'],
                'type'=>$level,
                'num'=>$config[$level]['num'],
                'status'=>1,
                'createtime'=>time()
            ];
            db('exchange')->insert($order);
            $this->success('会员充值成功');
        }
        array_shift($config);
        array_pop($config);
        $data =
            [
                'config'=>$config,
                'level'=>$userinfo['level']
            ];
        $this->success('信息返回成功',$data);
    }

    public function exchangeList()
    {
        $page = $this->request->post('page',1);
        $limit = page_limit($page,15);
        $user = $this->auth->getUserinfo();
        $list = db('exchange')->field('type,num,createtime')->where('user_id',$user['id'])->order('createtime desc')->limit($limit)->select();
        $this->success('信息返回成功',$list);
    }

    public function newsList()
    {
        $page = $this->request->request('page',1);
        $limit = page_limit($page,15);
        $list = db('news')->field('id,title,createtime')->where('status',1)->order('createtime desc')->limit($limit)->select();
        $type = $this->request->request('type');
        if($type == 'detail'){
            $id = $this->request->request('id');
            $info = db('news')->where('id',$id)->find();
            $info['content'] = htmlspecialchars_decode($info['content']);
            $this->success('详情返回成功',$info);
        }
        $this->success('信息返回成功',$list);
    }

}