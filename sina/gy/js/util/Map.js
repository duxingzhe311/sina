function Entry(key, value) {
	this.key = key;
	this.value = value;
	
	this.getKey = function(){
		return this.key;
	};
	this.getValue = function(){
		return this.value;
	};
}

function Map() {
	this.index = -1;
	this.entrys = new Array(10);
	this.get = function(key) {// 通过key映射value
		if (this.index == -1) {
			return null;
		}
		for (var i = 0; i <= this.index; i++) {
			var entry = this.entrys[i];
			if (entry.key == key) {
				return entry.value;
			}
		}
		return null;
	};
	this.size = function() {// 返回元素个数
		return this.index + 1;
	};
	this.containsKey = function(key) {// 是否包含key值
		if (this.index == -1) {
			return false;
		}
		for (var i = 0; i <= this.index; i++) {
			var entry = this.entrys[i];
			if (entry.key == key) {
				return true;
			}
		}
		return false;
	};
	this.containsValue = function(value) {// 是否包含值
		if (this.index == -1) {
			return false;
		}
		for (var i = 0; i <= this.index; i++) {
			var entry = this.entrys[i];
			if (entry.value == value) {
				return true;
			}
		}
		return false;
	};
	
	this.put = function(key, value) {// 添加元素
		var val = null;
		if (this.containsKey(key)) {
			val = this.get(key);
			this.remove(key);
		}
		this.index++;
		this.entrys[this.index] = new Entry(key, value);
		return val;
	};
	
	this.keySet = function() {// 返回key集合
		if (this.index == -1)
			return null;
		
		var keys = new ArrayList();
		for (var i = 0; i <= this.index; i++) {
			keys.add(this.entrys[i].key);
		}
		return keys;
	};
	
	this.values = function() {// 返回值集合
		if (this.index == -1) {
			return null;
		}
		var value = new ArrayList();
		for (var i = 0; i <= this.index; i++) {
			value.add(this.entrys[i].value);
		}
		return value;
	};
	this.clear = function() {// 清空
		if (this.index != -1) {
			for (var i = 0; i <= this.index; i++) {
				this.entrys[i] = null;
			}
			this.index = -1;
		}
	};
	this.remove = function(key) {// 移除某个元素
		if (this.index == -1) {
			return null;
		}
		var po = -1;
		var flag = false;
		for (var i = 0; i <= this.index; i++) {
			var entry = this.entrys[i];
			if (entry.key == key) {
				po = i;
				if (i == this.index) {
					po = -1;
				}
				flag = true;
			}
			if (po != -1) {
				this.entrys[po] = this.entrys[po + 1];
				po++;
			}
		}
		if (flag) {
			this.index = this.index - 1;
		}
	};
	
	this.isEmpty = function() {// 是否为空
		if (this.index == -1) {
			return true;
		}
		return false;
	};
	
	this.entrySet = function() {// 返回Entry
		if (this.index == -1) {
			return null;
		}
		var entry = new ArrayList();
		for (var i = 0; i <= this.index; i++) {
			entry.add(this.entrys[i]);
		}
		return entry;
	};
}