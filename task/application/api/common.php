<?php
require_once VENDOR_PATH.'qrcode/phpqrcode.php';

use think\File;
use app\common\model\MoneyLog;
use think\Db;
use think\Request;

function randomKeys($length)
{
    $pattern = '1234567890abcdefghijklmnopqrstuvwxyz
               ABCDEFGHIJKLOMNOPQRSTUVWXYZ';
    $key = '';
    for($i=0;$i<$length;$i++)
    {
        $key .= $pattern{mt_rand(0,35)};    //生成php随机数
    }
    return $key;
}

function fileUrl($file,$type='')
{
    if(empty($file)){
        return '';
    }
    $type = empty($type)?'image':$type;
    if($type == 'image'){
        if(!preg_match('/\\.(gif|jpeg|png|jpg|)$/i', $file)){
            return '';
        }
    }
    if($type == 'video'){
        if(!preg_match('/(.*)\.(mp4|rmvb|avi)$/',$file)){
            return '';
        }
    }
    if($type == 'mp3'){
        if(!preg_match('/(.*)\.(mp3)$/',$file)){
            return '';
        }
    }
    $request = Request::instance();
    $domain = $request->domain();
    $url = $domain .$file;
    return $url;
}

function createMessage($num,$type=1)
{
    $nameArray = array('张','王','李','赵','秦','齐','韩','魏','燕','楚','卫','白','程', '孙','周','吴','冯','陈','褚','孔','曹','严','华','金','陶','蒋','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭','郎');
    $numArray = array('100','200','150','400','300','500');
    $levelArray = ['黄金','白金','钻石','至尊'];
    $message = [];
    for($a=0;$a<=$num;$a++){
        $nameInfo = $nameArray[array_rand($nameArray,1)];
        if($type == 1){
            $numInfo = $numArray[array_rand($numArray,1)];
        }else{
            $numInfo = $levelArray[array_rand($levelArray,1)];
        }
        if($type == 1){
            $message[$a] = $nameInfo.'**提现成功'.$numInfo .'元';
        }else{
            $message[$a] = $nameInfo.'**升级成为'.$numInfo .'会员';
        }

    }
    return $message;
}

function object_array($array) {
    if(is_object($array)) {
        $array = (array)$array;
    } if(is_array($array)) {
        foreach($array as $key=>$value) {
            $array[$key] = object_array($value);
        }
    }
    return $array;
}

function base64_image($content)
{
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $content, $result)){
        $type = $result[2];
        $img = base64_decode(str_replace($result[1], '', $content));
    }else{
        $img = base64_decode($content);
        $type = "jpg";
    }
    $new_file = ROOT_PATH.'public/uploads/'.date("Ymd",time());
    if (!file_exists($new_file)) {
        //检查是否有该文件夹，如果没有就创建，并给予最高权限
        mkdir($new_file, 0777,true);
    }
    $filename = time() . '_' . uniqid() . ".{$type}"; //文件名
    $new_file = $new_file . $filename;
    if(file_put_contents($new_file, base64_decode(str_replace($result[1], '', $content)))){
        $config = db('project_config')
            ->field('qiniujson')
            ->find();
        $config = json_decode($config['qiniujson'],true);
        if(!empty($config)){
            $accessKey = $config['appid'];
            $secretKey = $config['secret'];
            $auth = new Auth($accessKey, $secretKey);
            $bucket = $config['bucket'];
            $token = $auth->uploadToken($bucket);
            $filePath = $new_file;
            $new_file = time() . '_' . uniqid() . ".{$type}";
            $uploadMgr = new UploadManager();
            $re = $uploadMgr->putFile($token, $new_file, $filePath);
            if(empty($re)){
                return false;
            }else{
                return $new_file;
            }
        }
        return $new_file;
    };
}

function getip() {
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP") , "unknown")) {
        $ip = getenv("HTTP_CLIENT_IP");
    } else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR") , "unknown")) {
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    } else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR") , "unknown")) {
        $ip = getenv("REMOTE_ADDR");
    } else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) {
        $ip = $_SERVER['REMOTE_ADDR'];
    } else {
        $ip = "unknown";
    }
    return $ip;
}

//上传图片
function saveAvatar($content){
    if(empty($content)){
        $this->exitJson("图片未找到",1);
    }
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $content, $result)){
        $type = $result[2];
        $img = base64_decode(str_replace($result[1], '', $content));
    }else{
        $img = base64_decode($content);
        $type = "jpg";
    }
    if(!in_array($type,array('jpg','jpeg','png'))){
        return '图片类型不符';
    }
    $fileUrl = ROOT_PATH.'public/uploads/'.date("Ymd",time());
    if(!$fileUrl){
        mkdir($fileUrl, 0777,true);
    }
    $imageName = time().'_' . uniqid() .".".$type;
    $size = file_put_contents($fileUrl. $imageName, $img);
    if($size >2*1024*1024){
        return '图片过大';
    }
    if($size <=0){
        return '图片上传失败';
    }
    $request = Request::instance();
    $domain = $request->domain();
    return $domain.'/uploads/'.date("Ymd",time()).$imageName;
}

function formUrl($url,$data = array())
{
    if(empty($url) || empty($data)){
        return false;
    }
    foreach($data as $key=>$value){
        $url .= $key.'='.$value.'&';
    }
    $length = strlen($url);
    $url = substr($url,0,$length-1);
    return $url;
}

/**
 * curl请求get
 * @param $url
 * @return mixed
 */
function getUrl($url) {
    //初始化
    $ch = curl_init();
    //设置选项，包括URL
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    //执行并获取HTML文档内容
    $output = curl_exec($ch);
    //释放curl句柄
    curl_close($ch);
    //打印获得的数据
    $return = json_decode($output,true);
    return $return;
}

/**
 *curl请求post
 * @param $url
 * @param bool|false $postData
 * @param bool|false $header
 * @return mixed
 */
function postUrl($url, $data = false, $header = false) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // post数据
    curl_setopt($ch, CURLOPT_POST, 1);
    // post的变量
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $output = curl_exec($ch);
    curl_close($ch);
    //打印获得的数据
    return $output;
}


function get_access_token($code)
{
    $url =  'https://open.douyin.com/oauth/access_token/oauth/access_token/';
    $params = array(
        'client_key' => 'aw25wjzjh2um5pdh',
        'client_secret' => 'a136cd326e6c77aafd47fc8c65267038',
        'code' => $code,
        'grant_type' => 'authorization_code',
    );
    $data = curl_get($url, $params);
    return $data;
}

function curlGet($url){
    $headerArray =array("Content-type:application/json;","Accept:application/json");
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headerArray);
    $output = curl_exec($ch);
    curl_close($ch);
    $output = json_decode($output,true);
    return $output;
}

function curl_get($url, $data = array())
{
    //初始化
    $ch = curl_init();
    //设置选项，包括URL
    $query = http_build_query($data);
    $url = $url . '?' . $query;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    //执行并获取HTML文档内容
    $output = curl_exec($ch);
    //释放curl句柄
    curl_close($ch);

    $result = json_decode($output, true);

    return $result;
}

function curl_post($url, $data = array())
{
    //初始化
    $curl = curl_init();
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //设置post方式提交
    curl_setopt($curl, CURLOPT_POST, 1);
    //设置post数据
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));

    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //不验证证书下同
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    //执行命令
    $json = curl_exec($curl);

    //关闭URL请求
    curl_close($curl);

    $result = json_decode($json, true);

    return $result;
}
/**
 * 当全部是中文的时候，函数返回 1；当有一部分是中文的时候，函数返回 0; 当不包含中文的时候，函数返回 -1
 * @param $string
 * @return int
 */
function check_chinese($string)
{
    if(preg_match('/^[\x{4e00}-\x{9fa5}]+$/u', $string) === 1){
        //全是中文
        return 1;
    }elseif(preg_match('/[\x{4e00}-\x{9fa5}]/u', $string) === 1){
        //包含中文
        return 0;
    }
    return -1;
}

/**
 * 简单分页
 * @param $page
 * @param $size
 * @return string
 */
function page_limit($page,$size)
{
    $page = empty($page)?1:$page;
    $size = empty($size)?10:$size;
    $page = empty($page)?0:($page-1)*$size;
    $limit = $page.','.$size;
    return $limit;
}

/**
 * 处理图片
 * @param $uid
 * @param $bgImage
 * @param $url
 * @param string $share
 * @return string
 */
function mergeImg($uid,$bgImage,$url,$share="")
{
    $fileName = time().'.png';
    $img = ImageCreate(900,900);
    $color = ImageColorAllocate($img,255,255,255);
    ImageFill($img,0,0,$color);
    imagepng($img,$fileName);
    $link = $link = $url;
    $errorCorrectionLevel = "L";
    $matrixPointSize = "5";
    QRcode::png($link, $fileName, $errorCorrectionLevel, $matrixPointSize);
    //$logo = $bgImage;//准备好的logo图片
    $bigImgPath = $bgImage;
    $img = imagecreatefromstring(file_get_contents($bigImgPath));
    $font = $_SERVER['DOCUMENT_ROOT']. "/uploads/msyh.ttf";
    $black = imagecolorallocate($img, 0, 0, 0);
    $fontSize = 18;
    $circleSize = 0;
    $left = 380;
    $top = 978;
    imagefttext($img, $fontSize, $circleSize, $left, $top, $black, $font, $share);
    $imgname = randomKeys(8).'.png';
    imagepng($img,$imgname);//保存图片
    $path_1 = $imgname;
    //图片二
    $path_2 = $fileName;
    //创建图片对象
    $imageArr = explode('.',$path_1);
    switch($imageArr[1])
    {
        case "jpg":
            $image_1 = imagecreatefromjpeg($path_1);
            break;
        case "jpeg":
            $image_1 = imagecreatefromjpeg($path_1);
            break;
        case "png":
            $image_1 = imagecreatefrompng($path_1);
            break;

    }
    //$image_1 = imagecreatefromjpeg($path_1);
    $image_2 = imagecreatefrompng($path_2);
    //合成图片
    //imagecopymerge ( resource $dst_im , resource $src_im , int $dst_x , int $dst_y , int $src_x , int $src_y , int $src_w , int $src_h , int $pct )---拷贝并合并图像的一部分
    //将 src_im 图像中坐标从 src_x，src_y 开始，宽度为 src_w，高度为 src_h 的一部分拷贝到 dst_im 图像中坐标为 dst_x 和 dst_y 的位置上。两图像将根据 pct 来决定合并程度，其值范围从 0 到 100。当 pct = 0 时，实际上什么也没做，当为 100 时对于调色板图像本函数和 imagecopy() 完全一样，它对真彩色图像实现了 alpha 透明。
    imagecopymerge($image_1, $image_2, 121, 932, 0,0, imagesx($image_2), imagesy($image_2), 100);
    // 输出合成图片
    $rand = randomKeys(8);
    $bgImg = $_SERVER['DOCUMENT_ROOT']. "/uploads/qrcode/".$rand.$uid.".png";
    imagepng($image_1,$bgImg);//bool(true)
    $imgUrl = "http://task.zz0510.top/uploads/qrcode/".$rand.$uid.".png";
    unlink($fileName);
    unlink($imgname);
    return $imgUrl;
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

/**
 *
 * 生成唯一字符串
 * @param $uid
 * @return bool|string
 */
function create_only_str($uid)
{

    if(empty($uid)){
        return false;
    }else{
        if(strlen($uid) < 5){
            $uid = str_pad($uid, 5, "0", STR_PAD_LEFT);
        }else{
            $uid = substr($uid, "-5");
        }
    }
    $str = "Liude".date("ymdHis").$uid;
    return $str;
}


/**
 * [xmltoarray xml格式转换为数组]
 * @param [type] $xml [xml]
 * @return [type]  [xml 转化为array]
 */
function xmltoarray($xml) {
    //禁止引用外部xml实体
    libxml_disable_entity_loader(true);
    $xmlstring = simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA);
    $val = json_decode(json_encode($xmlstring),true);
    return $val;
}

/**
 * [arraytoxml 将数组转换成xml格式（简单方法）:]
 * @param [type] $data [数组]
 * @return [type]  [array 转 xml]
 */
function arraytoxml($data){
    $str='<xml>';
    foreach($data as $k=>$v) {
        $str.='<'.$k.'>'.$v.'</'.$k.'>';
    }
    $str.='</xml>';
    return $str;
}

/**
 * [createNoncestr 生成随机字符串]
 * @param integer $length [长度]
 * @return [type]   [字母大小写加数字]
 */
function createNoncestr($length =32){
    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789";
    $str ="";

    for($i=0;$i<$length;$i++){
        $str.= substr($chars, mt_rand(0, strlen($chars)-1), 1);
    }
    return $str;
}

/**
 * [curl_post_ssl 发送curl_post数据]
 * @param [type] $url  [发送地址]
 * @param [type] $xmldata [发送文件格式]
 * @param [type] $second [设置执行最长秒数]
 * @param [type] $aHeader [设置头部]
 * @return [type]   [description]
 */
function curl_post_ssl($url, $xmldata, $second = 30, $aHeader = array()){
    $isdir = $_SERVER['DOCUMENT_ROOT']."/uploads/";//证书位置;绝对路径

    $ch = curl_init();//初始化curl

    curl_setopt($ch, CURLOPT_TIMEOUT, $second);//设置执行最长秒数
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_URL, $url);//抓取指定网页
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);// 终止从服务端进行验证
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);//
    curl_setopt($ch, CURLOPT_SSLCERTTYPE, 'PEM');//证书类型
    curl_setopt($ch, CURLOPT_SSLCERT, $isdir . 'apiclient_cert.pem');//证书位置
    curl_setopt($ch, CURLOPT_SSLKEYTYPE, 'PEM');//CURLOPT_SSLKEY中规定的私钥的加密类型
    curl_setopt($ch, CURLOPT_SSLKEY, $isdir . 'apiclient_key.pem');//证书位置
    curl_setopt($ch, CURLOPT_CAINFO, 'PEM');
    curl_setopt($ch, CURLOPT_CAINFO, $isdir . 'rootca.pem');
    if (count($aHeader) >= 1) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $aHeader);//设置头部
    }
    curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
    curl_setopt($ch, CURLOPT_POSTFIELDS, $xmldata);//全部数据使用HTTP协议中的"POST"操作来发送

    $data = curl_exec($ch);//执行回话
    if ($data) {
        curl_close($ch);
        return $data;
    } else {
        $error = curl_errno($ch);
        echo "call faild, errorCode:$error\n";
        curl_close($ch);
        return false;
    }
}


/**
 * [sendMoney 企业付款到零钱]
 * @param [type] $amount  [发送的金额（分）目前发送金额不能少于1元]
 * @param [type] $re_openid [发送人的 openid]
 * @param string $desc  [企业付款描述信息 (必填)]
 * @param string $check_name [收款用户姓名 (选填)]
 * @return [type]    [description]
 */
function sendMoney($amount,$re_openid,$desc='测试',$check_name='',$ip){

    $total_amount = (100) * $amount;

    $data=array(
        'mch_appid'=>'wxe9a6d81c8d98fb43',//商户账号appid
        'mchid'=>'1589850141',//商户号
        'nonce_str'=>createNoncestr(),//随机字符串
        'partner_trade_no'=> date('YmdHis').rand(1000, 9999),//商户订单号
        'openid'=> $re_openid,//用户openid
        'check_name'=>'NO_CHECK',//校验用户姓名选项,
        're_user_name'=> $check_name,//收款用户姓名
        'amount'=>$total_amount,//金额
        'desc'=> $desc,//企业付款描述信息
        'spbill_create_ip'=> '219.157.249.248',//Ip地址
    );

    //生成签名算法
    $secrect_key='bceaiuhdeb269njfd1489bjnkiyfrf0f';///这个就是个API密码。MD5 32位。
    $data=array_filter($data);
    ksort($data);
    $str='';
    foreach($data as $k=>$v) {
        $str.=$k.'='.$v.'&';
    }
    $str.='key='.$secrect_key;
    $data['sign']=strtoupper(md5($str));
    //生成签名算法
    $xml=arraytoxml($data);
    $url='https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers'; //调用接口
    $res=curl_post_ssl($url,$xml);
    $return=xmltoarray($res);


    print_r($return);
    //返回来的结果是xml，最后转换成数组
    /*
    array(9) {
     ["return_code"]=>
     string(7) "SUCCESS"
     ["return_msg"]=>
     array(0) {
     }
     ["mch_appid"]=>
     string(18) "wx57676786465544b2a5"
     ["mchid"]=>
     string(10) "143345612"
     ["nonce_str"]=>
     string(32) "iw6TtHdOySMAfS81qcnqXojwUMn8l8mY"
     ["result_code"]=>
     string(7) "SUCCESS"
     ["partner_trade_no"]=>
     string(18) "201807011410504098"
     ["payment_no"]=>
     string(28) "1000018301201807019357038738"
     ["payment_time"]=>
     string(19) "2018-07-01 14:56:35"
    }
    */


    //$responseObj = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
    //echo $res= $responseObj->return_code; //SUCCESS 如果返回来SUCCESS,则发生成功，处理自己的逻辑

    return $return;
}
