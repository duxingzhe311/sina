var Utils = {
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
		
		return '=u='+ this.utf8UrlEncode(s);
	},
	md5	:	function(v){
		return hex_md5(v);
	},
	utf8UrlEncode	:	function(v) {
	 	return escape(encodeURIComponent(v)) ;
	},
	
	utf8UrlDecode	:	function(v) {
		return decodeURIComponent(unescape(v));
	}
};
