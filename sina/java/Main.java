package com.php;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
	public static void main(String[] args) throws Exception {
		URL url = new URL("http://localhost/sina/weixin/weixin.php");
		OutputStream os = null;
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoInput(true);
		conn.setDoOutput(true);
		os = conn.getOutputStream();
		DataOutputStream dos = new DataOutputStream(os);
		System.out.println("fachu:hello");
		dos.writeUTF("<?xml version='1.0' encoding='utf-8'?><xml>" + "<FromUserName>licaicai</FromUserName>"
				+ "<ToUserName>chenxb</ToUserName>"
				+ "<Content>hello</Content>" + "<EventKey>click</EventKey>"
				+ "<Event>hhhhh</Event>" + "</xml>");
		dos.flush();
		dos.close();

		InputStream is = conn.getInputStream();
		if (null != is && is.available() > 0) {
//			DataInputStream dis = new DataInputStream(is);
//			String str = dis.readUTF();
//			System.out.println("shoudao:" + str);
			BufferedReader buf = new BufferedReader(new InputStreamReader(is));
			String line = null;
			while (null != (line = buf.readLine())) {
				System.out.println(line);
			}
			buf.close();
		}

		InputStream err = conn.getErrorStream();
		if (null != err && err.available() > 0) {
			BufferedReader buf = new BufferedReader(new InputStreamReader(err));
			String line = null;
			while (null != (line = buf.readLine())) {
				System.out.println(line);
			}
			err.close();
		}
	}
}
