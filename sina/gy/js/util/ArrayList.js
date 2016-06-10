function ArrayList(){
	this.arr = [];

	this.add = function(v,index){
		if('undefined' == typeof(index)){
			this.arr.push(v);
		}else{
			var size = this.arr.length;
			if(index < 0 || index > size)
				return false;
			
			if(index == size)
				this.arr.push(v);
			else{
				this.arr = System.arrayCopy(this.arr, index, this.arr, index + 1,size - index);
				this.arr[index] = v;
			}
		}
		return true;
	};

	this.push = function(v,index){
		return this.add(v,index);
	};

	this.set = function(v,index){
		if(index < 0)
			return this;
		if(index >= this.arr.length)
			return this;
		this.arr[index] = v;
		return this;
	};
	
	this.get = function(i){
		if(i < 0 || i >= this.arr.length)
			return null;
		return this.arr[i];
	};
	
	this.remove = function(index){
		if(index < 0 || index >= this.arr.length)
			return null;
		var res = null;
		var arrn = [];
		for(var i = 0 ; i < this.arr.length; i ++){
			if(i != index)
				arrn.push(this.arr[i]);
			else
				res = this.arr[i];
		}
		this.arr = arrn;
		return res;
	};
	
	this.toArray = function(){
		return this.arr;
	};
	
	this.addAll = function(v){
		var len = this.arr.length;
		if(v instanceof ArrayList){
			var array = v.toArray();
			return this.addAllArray(array);
		}
		return len === this.arr.length;
	};

	this.addAllArray = function(v){
		var len = this.arr.length;
		if(v instanceof Array){
			for(var i in v){
				this.add(v[i]);
			}
		}
		return len === this.arr.length;
	};
	
	this.clear = function(){
		this.arr = [];
	};
	
	this.size = function(){
		return this.arr.length;
	};
	
	this.isEmpty = function(){
		return 0 === this.arr.length;
	};
	
}