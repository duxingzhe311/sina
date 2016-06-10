<%@page import="com.sun.image.codec.jpeg.JPEGEncodeParam"%>
<%@page import="com.sun.image.codec.jpeg.JPEGCodec"%>
<%@page import="com.sun.image.codec.jpeg.JPEGImageEncoder"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.awt.Image"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="org.apache.commons.logging.Log"%>
<%@page import="org.apache.commons.logging.LogFactory"%>
<%@ page language="java" 
	contentType="text/html; 
	charset=UTF-8" 
	pageEncoding="UTF-8"
	import="
		java.io.*,
		java.net.*,
		java.text.*,
		java.util.*,
		org.dom4j.*,
		org.dom4j.io.*
"%>
<%!
public static final String PICTURE_BASE_PATH = "/home/apache-tomcat-8.0.5/webapps/_res/picture/";//照片保存的根目录

public static final String BIND_INFO_PATH = "/home/weixin/bind/";//绑定信息的数据的目录，里面都是非常重要的文件，以后就用数据库了
public static final String EVENT_SUBSCRIBE = "subscribe";//订阅
public static final String EVENT_UNSUBSCRIBE = "unsubscribe";//取消订阅

public static final String EVENT_HELP = "V1001_HELP";//自定义菜单的帮助按钮对应的事件
public static final String EVENT_BIND = "V1001_BIND";//自定义菜单的绑定按钮对应的事件

public static final String MSG_TEXT = "text";//文本
public static final String MSG_IMG = "image";//图片
public static final String MSG_VOICE = "voice";//语音
public static final String MSG_VIDEO = "video";//视频
public static final String MSG_THUMB = "thumb";//缩略图
public static final String MSG_LOCATION = "location";//地理位置
public static final String MSG_LINK = "link";//链接
public static final String MSG_EVENT = "event";//事件

public static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
public static final DateFormat dfShort = new SimpleDateFormat("yyyy-MM-dd");

public static String createMsgText(String fromUserName,String toUserName,String content){
	if(null == fromUserName || "".equals(fromUserName = fromUserName.trim()))
		return null;
	if(null == toUserName || "".equals(toUserName = toUserName.trim()))
		return null;
	if(null == content || "".equals(content = content.trim()))
		return null;
	
	String res = "<xml>"
			+ "<ToUserName><![CDATA[" + fromUserName + "]]></ToUserName>"
			+ "<FromUserName><![CDATA[" + toUserName + "]]></FromUserName>"
			+ "<CreateTime>" + (System.currentTimeMillis() / 1000) + "</CreateTime>"
			+ "<MsgType><![CDATA[text]]></MsgType>"
			+ "<Content><![CDATA[" + content + "]]></Content>"
			+ "</xml>";
	return res;
}
//压缩的
public static class PictureDownload2{

	public static void downLoadPicture(String picUrl,String path){
		if(null == picUrl)
			return;
		
		URL url = null;
		HttpURLConnection conn = null;
		InputStream is = null;
		OutputStream os = null;
		
		try {
			url = new URL(picUrl);

			conn = (HttpURLConnection)url.openConnection();
			conn.setReadTimeout(20 * 1000);
			conn.setConnectTimeout(20 * 1000);
			
			is = conn.getInputStream();
			
			Image srcFile = ImageIO.read(is);
			int width = srcFile.getWidth(null);
			int height = srcFile.getHeight(null);

			BufferedImage tag = new BufferedImage(width, height,
					BufferedImage.TYPE_INT_RGB);
			tag.getGraphics().drawImage(srcFile, 0, 0, width, height, null);
			String osPath = path + System.currentTimeMillis() + ".jpg";
			
			File newFile = new File(osPath);
			os = new FileOutputStream(newFile);
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(os);
			JPEGEncodeParam jep = JPEGCodec.getDefaultJPEGEncodeParam(tag);
			jep.setQuality(0.5f, true);
			encoder.encode(tag, jep);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(null != conn)
				conn.disconnect();
			try {
				if(null != os)
					os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				if(null != is)
					is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}


public static class PictureDownload {
	public static void downLoadPicture(String picUrl,String path){
		if(null == picUrl)
			return;
		
		URL url = null;
		HttpURLConnection conn = null;
		InputStream is = null;
		OutputStream os = null;
		
		try {
			url = new URL(picUrl);
			conn = (HttpURLConnection)url.openConnection();
			conn.setReadTimeout(20 * 1000);
			conn.setConnectTimeout(20 * 1000);
			
			is = conn.getInputStream();
			byte[] b = new byte[256];
			int len = -1;
			String osPath = path + System.currentTimeMillis() + ".jpg";
			os = new FileOutputStream(osPath);
			while(-1 != (len = is.read(b))){
				os.write(b, 0, len);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(null != conn)
				conn.disconnect();
			try {
				if(null != os)
					os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				if(null != is)
					is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}

public static class ReqHelper{
	private HttpServletRequest req;
	private Element root;
	
	public ReqHelper(HttpServletRequest req){
			SAXReader reader = new SAXReader();
			InputStream is = null;
			try {
				is = req.getInputStream();
				Document doc = reader.read(is);
				root = doc.getRootElement();
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				if(null != is){
					try{
						is.close();
					}catch(Exception e){
						e.printStackTrace();
					}
				}
			}
	}
	
	public String getProp(String prop){
		if(null == root)
			return null;
		return root.elementText(prop);
	}
}

public static boolean bind(String userName,String serverId){
	if(null == userName || "".equals(userName = userName.trim()))
		return false;
	if(null == serverId || "".equals(serverId = serverId.trim()))
		return false;
	//应该保存到数据库或者文件里，这里就先存文件了
	//先查询是否以前绑定过了
	//如果绑定过了怎么办
	return true;
}

public static boolean unbind(String userName){
	if(null == userName || "".equals(userName = userName.trim()))
		return false;
	//删除绑定信息
	
	return true;
}

public static String getServerId(String userName){
	if(null == userName || "".equals(userName = userName.trim()))
		return null;
	return "123456";
}
%>
<%
Log log = LogFactory.getLog(this.getClass());
/*
boolean flag = true;
InputStream is = request.getInputStream();
BufferedReader buf = new BufferedReader(new InputStreamReader(is));
String line = null;
try{
	while(null != (line = buf.readLine())){
		if(StringUtils.isNotBlank(line))		
			log.info(line);
	}
}catch(Exception e){
	return;
}
if(flag)
	return;
*/
ReqHelper reqHelper = new ReqHelper(request);
String msgType = reqHelper.getProp("MsgType");

String fromUserName = reqHelper.getProp("FromUserName");
String toUserName = reqHelper.getProp("ToUserName");

log.info("msgType : " + msgType + "\t" + fromUserName + "\t" + toUserName);

if(MSG_TEXT.equals(msgType)){
	String content = reqHelper.getProp("Content");
	String res = null;
	if("jiebang".equalsIgnoreCase(content)){
		if(unbind(fromUserName))
			res = createMsgText(fromUserName,toUserName, "您好，感谢关注智能酒店同一张床应用，现在处于测试阶段，已经解绑！");
		else
			res = createMsgText(fromUserName,toUserName, "解绑失败！");
	}else{
		res = createMsgText(fromUserName,toUserName, content);
	}
	out.print(res);
}
else if(MSG_EVENT.equals(msgType)){
	String event = reqHelper.getProp("Event");
	String eventKey = reqHelper.getProp("EventKey");

	String res = null;
	log.info("eventKey = " + eventKey + ", fromUserName: " + fromUserName + ", toUserName : " + toUserName);
	if(EVENT_HELP.equals(eventKey)){
		res = createMsgText(fromUserName,toUserName, "欢迎使用智能酒店同一张床应用！您当前已经绑定的设备号码是：" + getServerId(fromUserName) + "，解除绑定请回复字母：jiebang。");
		log.info("帮助," + res);
	}else if(EVENT_BIND.equals(eventKey)){
		res = createMsgText(fromUserName,toUserName, "感谢关注智能酒店同一张床应用！请回复右上角微信绑定号，例如：12345678。查询微信绑定号请回复：chaxun。绑定成功后，系统会返回确认信息。");
		log.info("绑定," + res);
	}
	//注意这里是event，不是eventKey
	if(EVENT_SUBSCRIBE.equals(event)){
		//订阅，是否在这个时候就给这个用户自动绑定一下？
		res = createMsgText(fromUserName,toUserName, "你好！感谢关注智能酒店同一张床应用！");
		log.info("第一次订阅," + res);
	}else if(EVENT_UNSUBSCRIBE.equals(event)){
		//取消订阅，就得让这个用户绑定信息从服务器中删除
		log.info("取消订阅," + res);
	}
	out.print(res);
}
else if(MSG_IMG.equals(msgType)){
	String picUrl = reqHelper.getProp("PicUrl");
	String res = createMsgText(fromUserName,toUserName, "你好，照片已经成功上传！");
	PictureDownload.downLoadPicture(picUrl, PICTURE_BASE_PATH + fromUserName + "_");
	out.print(res);
}
else if(MSG_VOICE.equals(msgType)){
	
}
else if(MSG_VIDEO.equals(msgType)){
	
}
else if(MSG_LOCATION.equals(msgType)){
	
}
else if(MSG_LINK.equals(msgType)){
	
}
%>
