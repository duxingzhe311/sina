function StringReader(str) {
	this.str = str;
	this.length = str.length;
	this.next = 0;
	this.mark = 0;

	this.read = function(off, len){
		if(2 == arguments.length){
	        if (this.next >= this.length)
	            return null;
	        
	        var n = Math.min(this.length - this.next, len);

	        var cbuf = [];
	        for(var i = off, j = off + n; i < j; i ++){
	        	cbuf.push(this.str.charAt(i));
	        }
	        this.next += n;
	        return cbuf;
		}
		if (this.next >= this.length)
			return null;
		return str.charAt(this.next ++);
	};
	
	this.skip = function(ns) {
        if (next >= length)
            return 0;
        // Bound skip by beginning and end of the source
        var n = Math.min(length - this.next, ns);
        n = Math.max(- this.next, n);
        this.next += n;
        return n;
    };
	
}