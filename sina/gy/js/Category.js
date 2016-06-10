function Category(){
	this.name = "";
	this.count = 0;//已选的数目
	this.index = 0;//索引
	this.items = new ArrayList();

	this.equals = function(o){
		if(null == o)
			return false;
		if(! o instanceof Category)
			return false;
		return this.name == o.name;
	};
	
	this.toJsonString = function(){
		var str = "{'name':'" + this.name + "','items':["; 
		
		for(var i = 0,j = this.items.size(); i < j; i ++){
			var ti = this.items.get(i);
			str += ti.toJsonString();
			if(i != j - 1)
				str += ",";
		}
		return str + "]}";
	};
	
	this.toHtmlString = function(){
		return "<li id='left_li_" + this.getId() + "'>"
			+ "<a href='javascript:void(0);' onclick='GyUtils.selectCategoryByName(\"" +this.name + "\")'>" + this.name + "</a>"
			+ "</li>";
	};
	
	this.findItemById = function(id){
		if(!id)
			return null;

		if(this.items.isEmpty())
			return "";
		for(var i = 0,j = this.items.size(); i < j; i ++){
			var ti = this.items.get(i);
			if(id == ti.getId())
				return ti;
		}
		return null;
	};
	
	this.getTop = function(){
		var o = $("[cid=cat_" + this.getId() + "]").first().position();
		if(o)
			return o.top;
		return 9999;
	};
	
	this.toTop = function(){
//		var top = this.getTop();
//		if(0 == top)
//			return;
//		var rightTop = $("#right").scrollTop();
//		
//		top = top + rightTop;
//		$("#right").animate({scrollTop:top},200);
		GyUtils.show(this);
	};

	
	this.getItemsHtmlDetail = function(){
		if(this.count < 1)
			return "";
		if(this.items.isEmpty())
			return "";
		var tmp = this;
		var sb = new StringBuilder();
		for(var i = 0,j = this.items.size(); i < j; i ++){
			var ti = this.items.get(i);
			if(ti.getCount() < 1)
				continue;
			sb.append(ti.toHtmlDetailString());
		}
		return sb.toString();
	};

	this.toString = function(){
		return 'name = ' + this.name + 'items = ' + this.items;
	};
	
	this.getId = function(){
		return Utils.md5(this.name);
	};

	this.setIndex = function(index){
		this.index = index;
		return this;
	};
	this.getIndex = function(){
		return this.index;
	};
	this.getName = function(){
		return this.name;
	};
	this.setName = function(name){
		this.name = name;
		return this;
	};
	this.pulsCount = function(){
		this.count ++;
		return this;
	};
	this.getCount = function(){
		return this.count;
	};
	this.minusCount = function(){
		this.count --;
		return this;
	};

	this.getItems = function(){
		return this.items;
	};
	this.setItems = function(items){
		this.items = items;
		return this;
	};
	this.addItem = function(item){
		this.items.add(item);
		return this;
	};
}
