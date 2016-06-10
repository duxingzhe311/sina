function JSONObject(){
	this.obj = {};
	
	this.put = function(k,v){
		eval("this.obj." + k + "='" + v + "'");
	};
	
	this.opt = function(k){
		return eval("this.obj." + k);
	};

	this.optString = function(k){
		return this.opt(k);
	};
	
	this.optInt = function(k){
		return parseInt(eval("this.obj." + k));
	};
	
	this.optFloat = function(k){
		return parseFloat(eval("this.obj." + k));
	};
	
	this.get = function(k){
		return this.opt(k);
	};
	
	this.toJsonObject = function(){
		return this.obj;
	};
	
	this.toString = function(){
		return JSON.stringify(this.obj);
	};
	
	this.parse = function(json){
		this.obj = eval("(" + json + ")");
		return this;
	};
	
	this.isEmpty = function(){
		return 0 === this.keys().length;
	};
	
	this.keys = function(){
		var o = this.obj;
		var arr = [];
		for(var i in o){
			arr.push(i);
		}
		return arr;
	};
}


function JSONArray(){
	this.list = new ArrayList();
	
	this.put = function(v){
		this.list.add(v);
	};
	
	this.length = function(){
		return this.list.size();
	};
	
	this.opt = function(index){
		return this.list.get(index);
	};
	
	this.get = function(index){
		return this.opt(index);
	};
	this.toString = function(){
		return JSON.stringify(this.list.arr);
	};
	this.parse = function(jsonArr){
		if(jsonArr instanceof ArrayList)
			this.list = jsonArr;
		else
			this.list.arr = JSON.parse(jsonArr + "");
		return this;
	};
	this.asList = function(){
		return this.list;
	};

	this.isEmpty = function(){
		return this.length == 0;
	};
}