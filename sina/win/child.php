<?php
$name = isset($_GET["name"]) ? $_GET["name"] : "毛也木有";
echo "从父页面传过来的：" . $name . "<br>";
?>
<input type="text" name="name" value="子页面的值" id="name_child">
<br>
<input type="button" value="关闭" onclick="click_me()">
<script>
	function click_me(){
		win.close("我是从子页面传递过去的：" + $("#name_child").val());
	}
</script>