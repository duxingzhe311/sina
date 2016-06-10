<%@page import="com.pltc.listener.weixin.WeiXinUserInfoListener"%>
<%@page import="com.pltc.listener.weixin.WeiXinListenerMgr"%>
<%@page import="com.pltc.util.BeanFactory"%>
<%@page import="com.pltc.entry.HotelInfo"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.awt.Image"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="org.apache.commons.logging.Log"%>
<%@page import="org.apache.commons.logging.LogFactory"%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
import="java.io.*,
		java.net.*,
		java.text.*,
		java.util.*,
		org.dom4j.*,
		org.dom4j.io.*
"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%!
//报表
private static final String URL_REPORT = "report/reportAction?user=";
//屏芯介绍
private static final String URL_PXJS = "http://mp.weixin.qq.com/mp/appmsg/show?__biz=MjM5NzAzMjk5MA==&appmsgid=10000012&itemidx=1&sign=53eb764168cdbb7ffb3addf7c7aabeb4#wechat_redirect";
//行业动态
private static final String URL_HYDT = "http://mp.weixin.qq.com/s?__biz=MjM5NzAzMjk5MA==&mid=200181193&idx=1&sn=9658d69362a74cffb6ec63a5659e5406#rd";
//至尊320
private static final String URL_ZHIZUN = "http://mp.weixin.qq.com/mp/appmsg/show?__biz=MjM5NzAzMjk5MA==&appmsgid=10000009&itemidx=1&sign=14742e96ac483ddf9ee1b9de2f8d896a#wechat_redirect";
//荣耀
private static final String URL_RONGYAO = "http://mp.weixin.qq.com/s?__biz=MjM5NzAzMjk5MA==&mid=10000015&idx=1&sn=365f14f9ff646186e2c99c6971d10ce9#rd";

public static final String EVENT_SUBSCRIBE = "subscribe";//订阅
public static final String EVENT_UNSUBSCRIBE = "unsubscribe";//取消订阅

public static final String EVENT_CLOUD = "V1001_CLOUD";//自定义菜单的帮助按钮对应的事件（云服务）
public static final String EVENT_ZHIZUN = "V1001_ZHIZUN";//自定义菜单的绑定按钮对应的事件（至尊ST320）
public static final String EVENT_RONGYAO = "V1001_RONGYAO";//自定义菜单的绑定按钮对应的事件（荣耀AT310）
public static final String EVENT_PXJJ = "V1001_PXJS";//自定义菜单的绑定按钮对应的事件（屏芯简介）
public static final String EVENT_LXFS = "V1001_LXFS";//自定义菜单的绑定按钮对应的事件（联系方式）
public static final String EVENT_SHFW = "V1001_SHFW";//自定义菜单的绑定按钮对应的事件（售后服务）
public static final String EVENT_HYDT = "V1001_HYDT";//自定义菜单的绑定按钮对应的事件（行业动态）

public static final String MSG_TEXT = "text";//文本
public static final String MSG_IMG = "image";//图片
public static final String MSG_VOICE = "voice";//语音
public static final String MSG_VIDEO = "video";//视频
public static final String MSG_THUMB = "thumb";//缩略图
public static final String MSG_LOCATION = "location";//地理位置
public static final String MSG_LINK = "link";//链接
public static final String MSG_EVENT = "event";//事件

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

//图文消息
public static String createMsgTw(String fromUserName,String toUserName,TwItem... list){
	int len = 0;
	if(null == list || (len = list.length) == 0)
		return null;
	
	StringBuilder sb = new StringBuilder("<xml>")
		.append("<ToUserName><![CDATA[").append(fromUserName).append("]]></ToUserName>")
		.append("<FromUserName><![CDATA[").append(toUserName).append("]]></FromUserName>")
		.append("<CreateTime>").append(System.currentTimeMillis() / 1000).append("</CreateTime>")
		.append("<MsgType><![CDATA[news]]></MsgType>")
		.append("<ArticleCount>").append(len).append("</ArticleCount>")
		.append("<Articles>");
		
	for(TwItem ti : list){
		sb.append(ti.toString());
	}
	sb.append("</Articles>")
	.append("</xml>");
	return sb.toString();
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

//图文项
public static class TwItem{
	private String title;
	private String description;
	private String url;
	private String picurl;
	public TwItem(String title,String description,String url,String picurl){
		this.title = title;
		this.description = description;
		this.url = url;
		this.picurl = picurl;
	}
	public String toString(){
		return "<item>"
			+ "<Title><![CDATA[" + title + "]]></Title>"
			+ "<Description><![CDATA[" + description + "]]></Description>"
			+ "<PicUrl><![CDATA[" + picurl + "]]></PicUrl>"
			+ "<Url><![CDATA[" + url + "]]></Url>"
			+ "</item>";
	}
}

//根据微信openID号查找饭店
public static List<HotelInfo> getHotelInfo(Log log ,String weixinId){
	//假的
	List<HotelInfo> his = BeanFactory.getHotelInfoService().queryByWeiXinId(weixinId);
	log.info("查询饭店：" + weixinId + "---" + his);
	if(null == his || his.isEmpty()){
		/*
		HotelInfo hi = new HotelInfo();
		if("oHtLfjhvEn1FmxGLXDzgjsVGbsKA".equals(weixinId)){//我的
			hi.setName("我不拉面");
		}else if("oHtLfjhvAz_FYotCYgjndbxOuG2k".equals(weixinId)){//张总
			hi.setName("老张拉面");
		}else if("oHtLfjt0u3SWDhQtCELN2iDGxDm0".equals(weixinId)){//王旭东
			hi.setName("东哥拉面");
		}else if("oHtLfjofdpNVGaTNyBFlN-lECN3I".equals(weixinId)){//许绍楠
			hi.setName("阿楠拉面");
		}else if("oHtLfjpBDp6CyEnk0yu6qToBiM0E".equals(weixinId)){//王总
			hi.setName("老王拉面");
		}else if("oHtLfjjpgTPVwKqYnxZbOpEtETwE".equals(weixinId)){//葛丽
			hi.setName("葛丽拉面");
		}else if("oHtLfjgvZJcqCDNtgnCyAhufIdcQ".equals(weixinId)){//沈总
			hi.setName("拉面拉面");
		}else if("oHtLfjnrkmbcMERBRKutRP_3gsMA".equals(weixinId)){//雷帝
			hi.setName("老马拉面");
		}else{
			//hi.setName("测试的用户");
			return null;
		}
		his = new ArrayList<HotelInfo>();
		his.add(hi);
		*/
		return null;
	}
	return his;
}
%>
<%
final Log log = LogFactory.getLog(this.getClass());

String signature = request.getParameter("signature");
String timestamp = request.getParameter("timestamp");
String nonce = request.getParameter("nonce");
String echostr = request.getParameter("echostr");

ReqHelper reqHelper = new ReqHelper(request);
final String msgType = reqHelper.getProp("MsgType");

final String fromUserName = reqHelper.getProp("FromUserName");
final String toUserName = reqHelper.getProp("ToUserName");

final String eventKey = reqHelper.getProp("EventKey");
final String event = reqHelper.getProp("Event");
final String content = reqHelper.getProp("Content");

log.info("msgType : " + msgType + "\tfromUser:" + fromUserName + "\ttoUser:" + toUserName);


new Thread(new Runnable(){
	@Override
	public void run(){
		log.info("启动新线程处理信息。。");
		WeiXinListenerMgr weiXinListenerMgr = WeiXinListenerMgr.getInstance();
		weiXinListenerMgr.fireListener(fromUserName, msgType, event, content);
	}
}).start();

if(MSG_TEXT.equals(msgType)){
	String res = createMsgText(fromUserName,toUserName, content);
	log.info(fromUserName + ":" + content);
	out.print(res);
}
else if(MSG_EVENT.equals(msgType)){
	//log.info("事件--EventKey:" + eventKey + "\tevent" + event);
	
	String res = null;
	if(EVENT_SUBSCRIBE.equals(event)){
		//订阅
		res = createMsgText(fromUserName,toUserName, "你好！感谢关注北京屏芯科技。“点心”智能云平台，老板小秘书，时刻知盈收！");
		log.info("第一次订阅," + fromUserName);
	}else if(EVENT_UNSUBSCRIBE.equals(event)){
		//取消订阅
		log.info("取消订阅," + fromUserName);
	}else if(EVENT_CLOUD.equals(eventKey)){
		List<HotelInfo> his = getHotelInfo(log,fromUserName);
		HotelInfo hi = null;
		if(null == his || his.isEmpty() || null == (hi = his.get(0))){
			res = createMsgText(fromUserName, toUserName, "您暂时还没有绑定餐厅。");
		}else{
			//title应该是会变的
			String nametitle = hi.getNameTitle();
			String title = hi.getName();//hi.getNameTitle();
			if(StringUtils.isNotBlank(nametitle)){
				title = nametitle;
			}
			
			TwItem tione = new TwItem("点心智能云平台", title + "本月销售量持续飙升，根本停不下来，下面是详细报道。", 
					basePath + URL_REPORT + fromUserName, basePath + "weixin/img/tongji.jpg");
			res = createMsgTw(fromUserName,toUserName,tione);
		}
		log.info("我的饭店");
	}else if(EVENT_ZHIZUN.equals(eventKey)){
		TwItem tione = new TwItem("屏芯科技点菜宝320—精彩源于创新！", "屏芯科技点菜宝320———精彩源于创新！", URL_ZHIZUN, basePath + "weixin/img/zhizun320.jpg");
		res = createMsgTw(fromUserName,toUserName,tione);
		log.info("点菜宝320");
	}else if(EVENT_RONGYAO.equals(eventKey)){
		TwItem tione = new TwItem("新品发布—屏芯对讲系列荣耀上市", "新品发布——屏芯对讲系列荣耀上市", URL_RONGYAO, basePath + "weixin/img/rongyao.jpg");
		res = createMsgTw(fromUserName,toUserName,tione);
		log.info("荣耀");
	}else if(EVENT_PXJJ.equals(eventKey)){
		TwItem tione = new TwItem("北京屏芯科技有限公司", "北京屏芯科技有限公司成立于2008年，于2013年入驻清华科技园区。是一家集科研、生产、销售、服务于一体的高新企业。", URL_PXJS, basePath + "weixin/img/pxlogo.jpg");
		res = createMsgTw(fromUserName,toUserName,tione);
		log.info("屏芯简介");
	}else if(EVENT_LXFS.equals(eventKey)){
		res = createMsgText(fromUserName, toUserName, "公司地址：北京市海淀区中关村东路1号科技大厦C座1702\n联系方式：4006-987-818(总机) \n手机：15811409415(销售)13269745669(销售)\nQQ:1957995338 (销售) ");
		log.info("联系方式");
	}else if(EVENT_SHFW.equals(eventKey)){
		res = createMsgText(fromUserName, toUserName, "售后中心：北京市昌平区沙河镇豆各庄9号彩易达科技园\n座机：010-52460797（维修）\n手机：13651226508（维修）\n18701652624（售后）\nQQ：2275487760（售后）898869415（技术）");
		log.info("售后服务");
	}else if(EVENT_HYDT.equals(eventKey)){
		TwItem tione = new TwItem("第九届国际餐饮食品博览会亮相北京", "核心提示：从北京烹饪协会获悉，第九届（北京）国际餐饮.食品博览会本周末将在北京展览馆举行，餐博会共设餐饮、", URL_HYDT, basePath + "weixin/img/hydt.jpg");
		res = createMsgTw(fromUserName,toUserName,tione);
		log.info("行业动态");
	}
	out.print(res);
}
%>