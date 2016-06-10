<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<title>php</title>
<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
<link href="./css/comm.css" rel="stylesheet" type="text/css" />
<link href="./css/main.css" rel="stylesheet" type="text/css" />

</head>
<body>

<?php
	include 'db/DBUtil.php';
?>
	<div id="main">
		<div id="left">
		<div>
		

		<?php 
	$dbUtil = DBUtil::getInstance();
	
	$con = $dbUtil->getConn();
	
	if(!$con){
		echo "创建数据库连接失败！";			
		return;
	}
	$result = $dbUtil->excute("SELECT * FROM User");
	echo '<h4>用户列表</h4>';
		?>
			<a href="user/user_edit.php">注册用户</a>
			<table border="1">
				<?php
				echo '<th>唯一名</th><th>密码</th><th>姓名</th><th>注册日期</th><th>操作</th>';
				while($row = mysql_fetch_array($result))
				{
					$id = $row['Id'];
					?>
					<tr>
						<td><?php echo $row['UserName'] ?></td>
						<td><?php echo $row['Password'] ?></td>
						<td><?php echo $row['RealName'] ?></td>
						<td><?php echo $row['CreateTime'] ?></td>
						<td><a href="javascript:edlt('<?php echo $id ?>')">编辑</a>|<a href="javascript:del('<?php echo $id ?>')">删除</a></td>
					</tr>
					<?php
				}?>
			</table>
		</div>	
			<div>
				<a target="_blank" href="http://www.xuexi111.com/">xuexi111</a>
				<a target="_blank" href="http://zh.learnlayout.com/">learnlayout</a>
				<a target="_blank" href="http://www.script-tutorials.com/">script-tutorials</a>
				<a target="_blank" href="http://js.fgm.cc/learn/">js-learn</a>
				<a target="_blank" href="http://www.multisilicon.com/blog/a22201774~/pdu.htm">pdu</a>
				<a target="_blank" href="http://tool.chinaz.com/Tools/JsFormat.aspx">JsFormat</a>
				<br>
				<a target="_blank" href='../butterfly/index.html'>蝴蝶</a>
				<a target="_blank" href='../html/top_arrow.html'>到顶端</a>
				<a target="_blank" href='../html/div_top_arrow.html'>到顶端2</a>
				<a target="_blank" href='../html/taobao.html'>淘宝</a>
				<a target="_blank" href='../html/move.html'>飘啊飘</a>
				<a target="_blank" href='../html/spin.html'>转啊转</a>
				<a target="_blank" href='../error/error.php'>错误</a>
				<a target="_blank" href='../html/menu.html'>右键菜单</a>
				<a target="_blank" href='../404/404.html'>404</a>
				<a target="_blank" href='../ggk/ggk.html'>刮刮卡</a>
				<a target="_blank" href='../photo/photo.html'>圆图</a>
				<a target="_blank" href='../html/img.html'>JS预览图片</a>
				<a target="_blank" href='../snow/snow.html'>飘雪</a>
				<a target="_blank" href='../drag/a.html'>推拽改变大小</a>
				<a target="_blank" href='../angular-1.3.9/docs/index.html'>angular-1.3.9</a>
				<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=623799957&amp;site=qq&amp;menu=yes" target="_blank" title="我">QQ联系</a>
				<!--
				<a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=81d83269dff64fb94c5c5639287ac97148c60671b03953ddbad0b57580e16ae9">
					<img border="0" src="http://pub.idqqimg.com/wpa/images/group.png" alt="紫云人在北京" title="紫云人在北京">
				</a>
				-->
				<br>
				<a target="_blank" href='../html/css.html'>CSS</a>
				<a target="_blank" href='../html/nav.html'>导航</a>
				<a target="_blank" href='../html/16/16.html'>16</a>
				<a target="_blank" href='../html/17/17.html'>17</a>
				<a target="_blank" href='../html/18/18.html'>18</a>
				<a target="_blank" href='../html/19/19.html'>19</a>
				<a target="_blank" href='../html/20/20.html'>20</a>
			</div>
		</div>
		<div id="right">
			<canvas id="canvas" width="150" height="150">
				<br>您的浏览器不支持canvas，请升级。<br>
			</canvas>
		</div>
	</div>
	

</body>
<script type="text/javascript">
	function edlt(id){
		location.href = "../user/user_edit.php?id=" + id;
	}

	function del(id){
		if(confirm("确定删除吗？")){
			location.href = "../user/user_del_do.php?id=" + id;
		}
	}
	function clock() {
		var now = new Date();
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.save();
		ctx.clearRect(0, 0, 150, 150);
		ctx.translate(75, 75);
		ctx.scale(0.4, 0.4);
		ctx.rotate(-Math.PI / 2);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.lineWidth = 8;
		ctx.lineCap = "round";

		// Hour marks
		ctx.save();
		for ( var i = 0; i < 12; i++) {
			ctx.beginPath();
			ctx.rotate(Math.PI / 6);
			ctx.moveTo(100, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.restore();

		// Minute marks
		ctx.save();
		ctx.lineWidth = 5;
		for (i = 0; i < 60; i++) {
			if (i % 5 != 0) {
				ctx.beginPath();
				ctx.moveTo(117, 0);
				ctx.lineTo(120, 0);
				ctx.stroke();
			}
			ctx.rotate(Math.PI / 30);
		}
		ctx.restore();

		var sec = now.getSeconds();
		var min = now.getMinutes();
		var hr = now.getHours();
		hr = hr >= 12 ? hr - 12 : hr;

		ctx.fillStyle = "black";

		// write Hours
		ctx.save();
		ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600)
				* sec);
		ctx.lineWidth = 14;
		ctx.beginPath();
		ctx.moveTo(-20, 0);
		ctx.lineTo(80, 0);
		ctx.stroke();
		ctx.restore();

		// write Minutes
		ctx.save();
		ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo(-28, 0);
		ctx.lineTo(112, 0);
		ctx.stroke();
		ctx.restore();

		// Write seconds
		ctx.save();
		ctx.rotate(sec * Math.PI / 30);
		ctx.strokeStyle = "#D40000";
		ctx.fillStyle = "#D40000";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(-30, 0);
		ctx.lineTo(83, 0);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fillStyle = "#555";
		ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.restore();

		ctx.beginPath();
		ctx.lineWidth = 14;
		ctx.strokeStyle = '#325FA2';
		ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
		ctx.stroke();

		ctx.restore();
	}
	$(function(){
		clock();
		setInterval(clock, 1000);
	});
</script>
</html>