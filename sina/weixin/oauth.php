<?php 
echo "<font size=5>所有的参数：</font><br>";
echo "<font size=5>" . $_SERVER['QUERY_STRING'] . "</font>";
echo "<hr>";


//echo "CODE：<br>";
$code = $_GET['code'];
echo "<font size=5>拿到了code:" .$code . "</font><br>";
//if (isset($code)){
//    echo "code: " . $code;
//}else{
//    echo "NO CODE";
//}
//echo "<br>";
$appid = $_GET['appid'];
$secret = $_GET['secret'];


echo "<font size=5>null==appid:" . (null == $appid) . "null==secret:" . (null == $secret) . "</font><br>";
if(null == $appid)
	$appid = "wx027784a72daaaf59";
if(null == $secret)
	$secret = "d93229ec48aa153bfd2c2e8e517aeaa6";

$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid ."&secret=" . $secret . "&grant_type=authorization_code&code=" . $code;
$res = file_get_contents($url);


echo "<font size=5>根据CODE得到OpenId等信息：</font><br>";
echo "<font size=5>" . $res . "</font>";
echo "<br>";
//
//echo "<hr>";

$decode = json_decode($res,true);
$openId = $decode['openid'];
echo "<font size=5>拿到了openId:" . $openId . "</font><br>";
//$access_token = $decode['access_token'];
//echo "openId:" . $openId;
//echo "<br>";
//echo "access_token:" . $access_token;
//echo "<br>";
//echo "<hr>";

//echo "根据OpenId得到用户信息（需scope为 snsapi_userinfo）：<br>";
//$url = "https://api.weixin.qq.com/sns/userinfo?access_token=" . $access_token . "&openid=" . $openId . "&lang=zh_CN";
//$url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=7F9EMxg8Yp6nN5Au1etcnhQgpJHVLOT1z9c6hgyZAe2zz0mrA-58jwjl6NbZUNbEvO59UE4Su10fbtH-Um9hbA&openid=" . $openId . "&lang=zh_CN";
//$res = file_get_contents($url);
//echo $res;
//
//$decode = json_decode($res,true);
//echo "<br><img src='" . $decode['headimgurl'] . "'></img><br>";
//
//echo "openid:" . $openId . "<br>";
//echo "nickname:" . $decode['nickname'] . "<br>";
//echo "country:" . $decode['country'] . "<br>";
//echo "province:" . $decode['province'] . "<br>";
//echo "city:" . $decode['city'] . "<br>";
//echo "sex:" . $decode['sex'] . "<br>";
//echo "<br>";

?>