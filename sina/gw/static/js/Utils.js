var Utils = {
	getById	:	function(id){
		return document.getElementById(id);
	},
	trim	:	function(n){
		if(n==null)
			return null ;
		n = n + "";
		return n.replace(/(^\s+)|\s+$/g,'');
	},
	encodeHexUrl	:	function(s) {
		if(s==null)
			return null ;
		
		if(s=='')
			return '';
		
		return '=u='+ this.utf8UrlEncode0(s);
	},
	decodeHexUrl	:	function(s){
		if(!s)
			return s ;

		if(s.indexOf("=h=") != 0 && s.indexOf("=u=") != 0)
			return s;
		
		s = s.substr(3);
		return this.utf8UrlDecode0(s);
	},
	md5	:	function(v){
		return hex_md5(v);
	},
	utf8UrlEncode	:	function(v) {
	 	return encodeURIComponent(v);
	},
	
	utf8UrlDecode	:	function(v) {
		return decodeURIComponent(v);
	},
	utf8UrlEncode0	:	function(v) {
	 	return escape(encodeURIComponent(v)) ;
	},
	
	utf8UrlDecode0	:	function(v) {
		return decodeURIComponent(unescape(v));
	},
	getSize			:	function(size){
		if(isNaN(size)){
			return "err";
		}
		var K = 1024;
		var M = 1024 * 1024;
		if (size > 10 * M) {
	        return (size / M) + "M";
	    }
	    if (size > 10 * K) {
	        return (size / K) + "K";
	    }
	    return size + "b";
	},
	ajaxPostSync		:	function(url,sendstr,cb){
		var __req = null;
	    if (window.XMLHttpRequest){
	    	__req = new XMLHttpRequest();
	    } else if (window.ActiveXObject){
	    	__req = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    if(__req){
	    	__req.onreadystatechange = function(){
	            if(4 == __req.readyState){
		            	var res = __req.responseText;
		            	try{
		            		res = JSON.parse(__req.responseText);
		            	}catch(E){}
	                if(200 == __req.status){
		                	if('function' == typeof cb){
		                		cb(res);
		                	}
	                }else{
	                }
	            }
	        };
	        __req.open("POST", url, false);
	        __req.send(sendstr);
	    }
	},
	ajaxPost		:	function(url,sendstr,cb){
		var __req = null;
	    if (window.XMLHttpRequest){
	    	__req = new XMLHttpRequest();
	    } else if (window.ActiveXObject){
	    	__req = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    if(__req){
	    	__req.onreadystatechange = function(){
	            if(4 == __req.readyState){
		            	var res = __req.responseText;
		            	try{
		            		res = JSON.parse(__req.responseText);
		            	}catch(E){}
	                if(200 == __req.status){
		                	if('function' == typeof cb){
		                		cb(res);
		                	}
	                }else{
	                }
	            }
	        };
	        __req.open("POST", url, true);
	        __req.send(sendstr);
	    }
	},
	ajaxPostRaw	:	function(url,sendstr,cb){
		var __req = null;
	    if (window.XMLHttpRequest){
	    	__req = new XMLHttpRequest();
	    } else if (window.ActiveXObject){
	    	__req = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    if(__req){
	    	__req.onreadystatechange = function(){
	            if(4 == __req.readyState){
		            	var res = __req.responseText;
	                if(200 == __req.status){
		                	if('function' == typeof cb){
		                		cb(res);
		                	}
	                }else{
	                }
	            }
	        };
	        __req.open("POST", url, true);
	        __req.send(sendstr);
	    }
	},
	ajaxGet		:	function(url,cb){
		var __req = null;
	    if (window.XMLHttpRequest){
	    	__req = new XMLHttpRequest();
	    } else if (window.ActiveXObject){
	    	__req = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    if(__req){
	    	__req.onreadystatechange = function(){
	            if(4 == __req.readyState){
	                if(200 == __req.status){
	                	if('function' == typeof cb){
	                		cb(__req.responseText);
	                	}
	                }else{
	                }  
	            }
	        };
	        __req.open("GET", url, true);
	        __req.send(null);
	    }
	}
};