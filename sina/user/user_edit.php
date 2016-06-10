<!DOCTYPE html>
<?php 
define('ADMIN_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include ADMIN_ROOT . '../db/DBUtil.php';

$userId = isset($_GET["id"]) ? $_GET["id"] : 0;
$user = null;
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="../js/validator.js"></script>
<link href="../css/comm.css" rel="stylesheet" type="text/css" />
<link href="../css/main.css" rel="stylesheet" type="text/css" />

<title>php</title>
</head>
<body>
	<div id="main">
		<form id="form1" action="user_edit_do.php" method="post">
		<?php 
		if($userId > 0){
			$dbUtil = DBUtil::getInstance();
			$con = $dbUtil -> getConn();
			if(!$con){
				echo "创建数据库连接失败！";			
				return;
			}
			
			$result = $dbUtil->excute("SELECT * FROM User where Id = " . $userId);
			if($result)
				$user = mysql_fetch_array($result);
			?>
			<input type="hidden" id="Id" name="id" value="<?php echo $userId?>">
			<?php
		}
		?>
			<table>
			<tr>
				<td>
					用户名:
				</td>
				<td>
					<input type="text" name="UserName" id="UserName" value="<?php echo null == $user ? '' : $user['UserName']?>"/>
				</td>
			</tr>
			<tr>
				<td>
					密码:
				</td>
				<td>
					<input type="password" name="Password" id="Password" value="<?php echo null == $user ? '' : $user['Password']?>"/>
				</td>
			</tr>
			<tr>
				<td>
					确认密码:
				</td>
				<td>
					<input type="password" name="RePassword" id="RePassword" value="<?php echo null == $user ? '' : $user['Password']?>"/>
				</td>
			</tr>
			<tr>
				<td>
					姓名:
				</td>
				<td>
					<input type="text" name="RealName" id="RealName" value="<?php echo null == $user ? '' : $user['RealName']?>"/>
				</td>
			</tr>
			<tr>
				<td>
					<input type="submit" value="确定"/>
				</td>
				<td>
					<input type="reset" value="重置"/>
				</td>
			</tr>
			</table>
		</form>
	</div>
</body>
<script type="text/javascript">
	$(function(){
		var option = {
				labelCss:'lab',//显示次错误信息的label的class
				circuit:true,//是否支持校验短路
				checkFunc : function(){
					return true;
				}//其他的校验
			};
		vld.init(option)
		.bind("form1")
		.require("UserName")
		.require("Password")
		.minLen("Password",6)
		.diy("RePassword",function(){
			if($("#RePassword").val() != $("#Password").val()){
				alert("两次密码不一致！");
				vld.setOk(false);
				return;
			}
			vld.setOk(true);
		})
		.require("RealName");
	});
</script>
</html>