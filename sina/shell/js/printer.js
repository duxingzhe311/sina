var DataType = {
	INIT			:	1,//初始化
	LF				:	2,//换行
	LF2				:	4,//2个换行
	LF3				:	8,//3个换行
	LF4				:	16,//4个换行
	CUT				:	32,//进纸并切割（左边留一点不切）这个不支持。
	STRING			:	64,//字符串
	BOLD_ON			:	128,//加粗
	BOLD_OFF		:	256,//取消加粗
	ALIGN_LEFT		:	512,//左对齐（作用于整行）
	ALIGN_CENTER	:	1024,//居中对齐（作用于整行）
	ALIGN_RIGHT		:	2048,//右对齐（作用于整行）
	UNDER_LINE1		:	4096,//下划线，1点宽
	UNDER_LINE2		:	8192,//下划线，2点宽
	UNDER_LINE_OFF	:	16384,// 取消下划线
	ROWS			:	16384 * 2,//多行数据（数据行数不固定，传入List<String>/List<String[]>）
	COLS			:	16384 * 4//一行多项（每行的项数比较固定，传入String[]，按照偏移量显示）
};

function PrintItem(){
	this.dataType = DataType.STRING;
	this.data = null;
	this.valid = true;
	this.getDataType = function(){
		return this.dataType;
	};
	this.isValid = function(){
		return this.valid;
	};
	this.setValid = function(valid){
		this.valid = valid;
	};
	this.getData = function(){
		return this.data;
	};
	this.setData = function(data){
		this.data = data;
		return this;
	};
	this.addDataType = function(dataType){
		this.dataType |= dataType;
		return this;
	};
	this.setDataType = function(dataType){
		this.dataType = dataType;
		return this;
	};
	this.toString = function(){
		return "dataType:" + this.dataType + ",data:" + this.data + ",valid:" + this.valid;
	};
	this.toJSONString = function(){
		var res = {};
		res.dataType = this.dataType;
		if(null != this.data){
			res.data = this.data;
		}
		return JSON.stringify(res);
	};
};

function PrintData(){
	this.printItems = new ArrayList();
	
	this.LN_ITEM = new PrintItem().setDataType(DataType.LF);
	this.BOLD_OFF_ITEM = new PrintItem().setDataType(DataType.BOLD_OFF);
	this.DOT_ITEM = new PrintItem().setDataType(DataType.STRING).setData("--------------------------------");
	
	this.getPrintItems = function(){
		return this.printItems;
	};
	this.clear = function(){
		this.printItems.clear();
	};
	this.ln = function(){
		this.printItems.add(this.LN_ITEM);
		return this;
	};
	this.ln2 = function(){
		this.ln().ln();
		return this;
	};
	this.ln3 = function(){
		this.ln().ln().ln();
		return this;
	};
	this.add	 = function(item){
		if(item.isValid()){
			if(0 != (item.getDataType() & DataType.STRING_ARRAY)){
				this.addStringArr(item.getData());
			}else{
				this.printItems.add(item);
			}
		}
		return this;
	};
	this.addln = function(item){
		if(item.isValid()){
			if(0 != (item.getDataType() & DataType.ROWS)){
				this.addStringArr(item.getData());
			}else{
				this.add(item).add(this.LN_ITEM);
			}
		}
		return this;
	};
	this.addStringln = function(s){
		if(null != s){
			this.addln(new PrintItem().setDataType(DataType.STRING).setData(s));
		}
		return this;
	};
	this.addString = function(s){
		if(null != s){
			this.add(new PrintItem().setDataType(DataType.STRING).setData(s));
		}
		return this;
	};
	this.addStringArr = function(strings){
		if(null != strings && strings.length > 0){
			for(var i in strings){
				this.addln(new PrintItem().setDataType(DataType.STRING).setData(strings[i]));
			}
		}
		return this;
	};
	this.boldOff = function(){
		this.add(this.BOLD_OFF_ITEM);
	    return this;
	};
	this.addDotLine = function(){
		this.addln(this.DOT_ITEM);
	    return this;
	};
	this.addTail = function(){
		this.addln(new PrintItem().setDataType(DataType.ALIGN_CENTER | DataType.STRING).setData("本系统由\"慧客科技\"提供"))
		.add(new PrintItem().setDataType(DataType.ALIGN_CENTER | DataType.STRING).setData("010-56228037"));
		return this;
	};
	this.parse = function(obj){
		if(obj.printItems){
			for(var i = 0; i < obj.printItems.length; i ++){
				this.printItems.add(obj.printItems[i]);
			}
		}
		return this;
	};
	this.toJSONString = function(){
		var res = "{\"printItems\":[";
		var len = 0;
		if((len = this.printItems.size()) > 0){
			var sj = new StringJoiner(",");
			for(var i = 0; i < len; i ++){
				var ti = this.printItems.get(i);
				if(ti){
					sj.add(ti.toJSONString());
				}
			}
			res+=sj.toString();
		}
		res += "]}";
		return res;
	};
};