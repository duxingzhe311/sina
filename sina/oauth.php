<!--<!DOCTYPE html>-->
<!--<html>-->
<!--<head>-->
<!--<meta http-equiv="Content-Type" content="text/html; charset=utf8" />-->
<!--<title>我的信息</title>-->
<!---->
<!--</head>-->
<!--<body>-->
<?php 
//echo "所有的参数：<br>";
//echo $_SERVER['QUERY_STRING'];
//echo "<hr>";


//echo "CODE：<br>";
$code = $_GET['code'];
//if (isset($code)){
//    echo "code: " . $code;
//}else{
//    echo "NO CODE";
//}
//echo "<br>";
$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5258e95e3ca6dbfc&secret=05451ed7d998fa98e1ec20e776312096&grant_type=authorization_code&code=" . $code;
$res = file_get_contents($url);


//echo "根据CODE得到OpenId等信息：<br>";
//echo $res;
//echo "<br>";
//
//echo "<hr>";

$decode = json_decode($res,true);
$openId = $decode['openid'];
echo "openId:" . $openId;
echo "<script>location.href='http://121.42.45.47/PLTC_adv_1/weixin/userinfo.jsp?openId=" . $openId . "';</script>"; 
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
<!--</body>-->
<!--</html>-->