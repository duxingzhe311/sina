<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx027784a72daaaf59", "d93229ec48aa153bfd2c2e8e517aeaa6");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
	<title>upload</title>
	<style>
	body{height:100%; overflow:hidden; margin:0px; padding:0px;}
	.div_container{
		width:100%;
		height: 100%;
		position:absolute;
	}
	.div_tip{
		width:100%;
		height: 10%;
		text-align: center;
		line-height: 100%;
	}
	.div_child{
		width:50%;
		height: 40%;
		margin:auto;
		text-align: center;
		line-height: 100%;
	}
	.div_img{
		height: 80%;
		border:5px solid;
		border-color:rgb(205,205,205);
		border-style:dotted;
		display: block;
	}
	</style>
</head>
<body>
<div class="div_container">
	<div class="div_tip">
	
	</div>
	<div class="div_child">
			<input type="file" ftype="ALIPAY" name="file_alipay" style="display:none" id="file_alipay">
			<img class="div_img" id="imgPre_alipay" src="img/add.png" width="300px" height="300px"/> 
	</div>
	<hr style="width:80%;height:3px;">
	<div class="div_child">
			<input type="file" ftype="WEIXIN" name="file_weixin" style="display:none" id="file_weixin">
			<img class="div_img" id="imgPre_weixin" src="img/add.png" width="300px" height="300px"/> 
	</div>
	<input type="button" value="click me" onclick="WX()">
	<input type="button" value="click me2" onclick="WX()">
	<input type="button" value="click me3" onclick="WX()">
</div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
 
  var url = "http://172.16.0.250:8180/upgrade/qrCodeUpload";

  var locationUrl = location.href;
  var queryString = locationUrl.substring(locationUrl.lastIndexOf("?") + 1);
  if(queryString){
  	var kv = queryString.split("&");
  	var queryObj = {};

  	for(var i in kv){
  		var ti = kv[i];
  		var index = ti.indexOf("=");
  		var k = ti.substring(0,index);
  		var v = ti.substring(index + 1);
  		if(k){
  			if(isNaN(v))
  				eval("queryObj." + k + " = '" + v + "'");
  			else
  				eval("queryObj." + k + " = " + v);
  		}
  	}
  }
  alert("00:" + wx);
  function G(id){
  	return document.getElementById(id);
  }

  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'onMenuShareQZone',
		'startRecord',
		'stopRecord',
		'onVoiceRecordEnd',
		'playVoice',
		'pauseVoice',
		'stopVoice',
		'onVoicePlayEnd',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'translateVoice',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard'
    ]
  });
  
  alert("01:" + wx);
  wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
      //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
      //则可以直接调用，不需要放在ready函数中。
  	alert("ready:");
  });
  wx.error(function(res){

      // config信息验证失败会执行error函数，如签名过期导致验证失败，
      	//具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  	alert("error" + res);
  });
  /*

  wx.checkJsApi({
      jsApiList: ['previewImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
  });
  */
  function WX(){
  	wx.chooseImage({
  	    success: function (res) {
  	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  	        alert(localIds);
  	    }
  	});
  }

  function getFileUrl(sourceId) {
  	var url = null;
  	try{
  		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
  	}catch(E){}
  	if(null == url){
  		try{
  			url = document.getElementById(sourceId).value; 
  		}catch(E){}
  	}
  	//alert("url::" + url);
  	return url; 
  }

  function preImg(sourceId, targetId) { 
  	var url = getFileUrl(sourceId); 
  	var imgPre = document.getElementById(targetId); 
  	if(null != url)
  		imgPre.src = url;	
  }

  G("file_alipay").onchange = function(){
  	preImg(this.id,'imgPre_alipay');
  	sendFile(this);
  };
  G("file_weixin").onchange = function(){
  	preImg(this.id,'imgPre_weixin');
  	sendFile(this);
  };
  G("imgPre_alipay").onclick = function(){
  	G("file_alipay").click();
  };

  G("imgPre_weixin").onclick = function(){
  	G("file_weixin").click();
  };

  function sendFile(o){
  	var file = o.files[0]; 
  	var reader = new FileReader(); 
  	reader.readAsDataURL(file); 
  	var res = null;
  	reader.onload = function(e){
  		var str = this.result;
  		res = str.substr(str.indexOf(",") + 1);
  		var obj = {};
  		obj.hotelId = queryObj.hotelId;
  		obj.type = o.getAttribute("ftype");
  		obj.content = res;
  		createUploadTip(o.id);
  		send_ajax(o.id,url,JSON.stringify(obj));
  	}
  }

  function send_ajax(id,url,sendstr){
      if (window.XMLHttpRequest){
          req = new XMLHttpRequest();
      } else if (window.ActiveXObject){
          req = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if(req){
      	req.onreadystatechange = function(){
              if(4 == req.readyState){
              	var res = JSON.parse(req.responseText);
                  if(200 == req.status){  
                      if(0 != res.status){
                      	alert(res.message);
                      }else{
                      	
                      }
                  }else{  
                      alert("error");  
                  }  
              }
              hideUploadTip(id)
          };
      	req.open("POST", url, true);
  	    req.send(sendstr);
      }
  }

  function createUploadTip(id){
  	var div = document.createElement("div");
  	div.id = "tip_" + id;
  	div.style.position = 'absolute';
  	div.style.top = '25%';
  	div.style.left = '30%';
  	div.style.backgroundcolor = '#ffffff';
  	div.style.zIndex = 65535 ;
  	div.innerHTML = "helloooooo";
  	G(id).parentNode.appendChild(div);
  }

  function hideUploadTip(id){
  	var o = G("tip_" + id);
  	o.style.display = 'none';
  	o.remove();
  }
</script>
</html>
