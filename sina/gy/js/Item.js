function Item(){
	this.category = "";
	this.name = "";
	this.spec = "";
	this.img = "";
	this.sellCount = 0;
	this.price = 0;
	this.priceTail = "";
	this.index = 0;
	this.count = 0;

	this.equals = function(o){
		if(null == o)
			return false;
		if(! o instanceof Item)
			return false;
		return this.index === o.index && (this.name + this.spec) == (o.name + o.spec);
	};
	
	this.minus = function(){
		var id = this.getId();
		var addMinCid = "add_min_" + id;
		var countCid = "count_" + id;
		var daddMinCid = "d_add_min_" + id;
		var dcountCid = "d_count_" + id;
		
		var addMin = $("#" + addMinCid );
		var addMin2 = $("#" + daddMinCid );
		if(1 == this.count){
			this.count = 0;
			if(addMin.hasClass("show-all"))
				addMin.removeClass("show-all");
			if(addMin2.hasClass("show-all"))
				addMin2.removeClass("show-all");
		}
		var obj = $("#" + countCid);
		var obj2 = $("#" + dcountCid);
		var val = parseInt(obj.html()) - 1;
		this.count = val;
		obj.html(val);
		obj2.html(val);
		
		this.category.minusCount();
		GyUtils.minusCount();
		GyUtils.setAmount();
		GyUtils.setDetails();
	};
	
	this.plus = function(){
		var id = this.getId();
		var addMinCid = "add_min_" + id;
		var countCid = "count_" + id;
		var daddMinCid = "d_add_min_" + id;
		var dcountCid = "d_count_" + id;
		
		var obj = $("#" + countCid);
		var obj2 = $("#" + dcountCid);
		var val = parseInt(obj.html()) + 1;

		var addMin = $("#" + addMinCid);
		var addMin2 = $("#" + daddMinCid);
		if(!addMin.hasClass("show-all")){
			addMin.addClass("show-all");
		}
		if(!addMin2.hasClass("show-all")){
			addMin2.addClass("show-all");
		}
		this.count = val;
		obj.html(val);
		obj2.html(val);

		this.category.pulsCount();
		GyUtils.plusCount();
		GyUtils.setAmount();
		GyUtils.setDetails();
	};

	this.toHtmlString = function(){
		var id = this.getId();
		var cid = this.category.getId();
		var sb = new StringBuilder();
		
		sb.append("<li cid='cat_").append(this.category.getId()).append("' mid='li_mid_").append(id).append("'>")
		.append("<div class='wrap'>")
		.append("<div class='list-img'>")
		.append("</div>")
		.append("<div class='list-content'>")
		.append("<h6 class='title'>").append(this.name).append("</h6>")
		.append("<p class='description'><strong>").append(this.spec).append("</strong></p>")
		.append("<p class='price'>").append(this.price).append(this.priceTail).append("</p>")
		.append("</div>")
		.append("</div>")
		.append("<div id='add_min_").append(id).append("' class='item-add");
		if(this.count > 0)
			sb.append(" show-all");
		sb.append("'>")
		.append("<button class='btn -minus'>")
		.append("<i class='icon-minus' cid='").append(cid).append("' mid='").append(id).append("'>-</i>")
		.append("</button>")
		.append("<span class='item-count' id='count_").append(id).append("'>").append(this.count).append("</span>")
		.append("<button class='btn -plus'>")
		.append("<i class='icon-plus' cid='").append(cid).append("' mid='").append(id).append("')'>+</i>")
		.append("</button>")
		.append("</div>")
		.append("</li>");
		return sb.toString();
	};
	
	this.toHtmlDetailString = function(){
		if(this.count < 1)
			return "";
		var p = (this.price * this.count).toFixed(2);
		var id = this.getId();
		var cid = this.category.getId();
		var sb = new StringBuilder();
		sb.append("<li class='cl-item'>")
		.append("<div class='cl-r1'>").append(this.name).append("</div>")
		.append("<div class='cl-r3'>￥").append(p).append("</div>")
		.append("<div class='cl-r2'>")
		.append("<div id='d_add_min_").append(id).append("' class='item-add");
		if(this.count > 0)
			sb.append(" show-all");
		sb.append("'>")
		.append("<button class='btn -minus'>")
		.append("<i class='icon-minus' cid='").append(cid).append("' mid='").append(id).append("'>-</i>")
		.append("</button>")
		.append("<span class='item-count' id='d_count_").append(id).append("'>").append(this.count).append("</span>")
		.append("<button class='btn -plus'>")
		.append("<i class='icon-plus' cid='").append(cid).append("' mid='").append(id).append("'>+</i>")
		.append("</button>")
		.append("</div>")
		.append("</div>")
		.append("</li>");
		return sb.toString();
	};
	
	this.toJSONString = function(){
		return "{'name':'" + this.name + "','img':'" + this.img + "','sellCount':'" + this.sellCount + "','price':'" + this.price + "','count':'" + this.count + "'}";
	};
	
	this.toJSONObject = function(){
		var str = this.toJSONString();
		return eval("(" + str + ")");
	};
	
	this.toString = function(){
		return 'name = ' + this.name + 'img = ' + this.img + 'sellCount = ' + this.sellCount + 'price = ' + this.price + 'count = ' + this.count;
	};
	
	this.getTop = function(){
		var o = $("[mid='li_mid_" + this.getId() + "']").position();
		if(o)
			return o.top;
		return -1;
	};
	
	this.getId = function(){
		return Utils.md5(this.category.getName() + "_" + this.name + "_" + this.spec);
	};
	
	this.setIndex = function(index){
		this.index = index;
		return this;
	};
	this.getIndex = function(){
		return this.index;
	};
	this.setCategory = function(category){
		this.category = category;
	};
	this.getCategory = function(){
		return this.category;
	};
	this.setPriceTail = function(priceTail){
		this.priceTail = priceTail;
		return this;
	};
	this.getPriceTail = function(){
		return this.priceTail;
	};
	
	this.getName = function(){
		return this.name;
	};
	this.setName = function(name){
		this.name = name;
		return this;
	};

	this.setSpec = function(spec){
		this.spec = spec;
		return this;
	};
	this.getSpec = function(){
		return this.spec;
	};
	
	this.getImg = function(){
		return this.img;
	};
	this.setImg = function(img){
		this.img = img;
		return this;
	};

	this.getSellCount = function(){
		return this.sellCount;
	};
	this.setSellCount = function(sellCount){
		this.sellCount = sellCount;
		return this;
	};

	this.getPrice = function(){
		return this.price;
	};
	this.setPrice = function(price){
		this.price = price;
		return this;
	};

	this.getCount = function(){
		return this.count;
	};
	this.setCount = function(count){
		this.count = count;
		return this;
	};

}