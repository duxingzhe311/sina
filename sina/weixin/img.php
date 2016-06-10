<?php 
define('ADMIN_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include ADMIN_ROOT . './Consts.php';
$bgimg = Consts::$IMG_MNH_PREFIX . $_GET["num"] . Consts::$IMG_MN_TAIL;
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>美女</title>
</head>
<div style="width:100%; height:100%; margin-bottom: 55.504801px; border-top-left-radius: 376.636051px; border-top-right-radius: 376.636051px; border-bottom-right-radius: 376.636051px; border-bottom-left-radius: 376.636051px;">
	<img src="<?php echo $bgimg?>" width="100%" height="100%" style="border-top-left-radius: 376.636051px; border-top-right-radius: 376.636051px; border-bottom-right-radius: 376.636051px; border-bottom-left-radius: 376.636051px;">
</div>
</body>
</html>