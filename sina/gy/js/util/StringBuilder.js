function StringBuilder(){
	this.str = "";
	
	this.init = function(str){
		this.str = str;
		return this;
	};
	
	this.append = function(s){
		this.str += s;
		return this;
	};
	
	this.newLine = function(){
		this.str += "<br>";
		return this;
	};
	
	this.indexOf = function(v){
		return this.str.indexOf(v);
	};
	
	this.endWith = function(v){
		if(!v)
			return false;
		return this.str.length - v.length === this.str.lastIndexOf(v);
	};
	
	this.deleteCharAt = function(index){
		if(index < 0)
			return this;
		if(index >= this.str.length)
			return this;
		
		var tmp = this.str.substring(0,index) + this.str.substring(index + 1);
		this.str = tmp;
		return this;
	};
	
	this.deleteCharAtLast = function(){
		return this.deleteCharAt(this.str.length - 1);
	};

	this.deleteCharAtFirstt = function(){
		return this.deleteCharAt(0);
	};
	
	this.startsWith = function(v){
		if(!v)
			return false;
		return 0 === this.str.indexOf(v);
	};
	
	this.charAt = function(v){
		return this.str.charAt(v);
	};
	
	this.toString = function(){
		return this.str;
	};
}