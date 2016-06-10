var GyUtils = {
	ignore	:	false,
	mgr		:	null,
	setIgnoreScroll	:	function(b){
		this.ignore = b;
	},
	isIgnoreScroll	:	function(){
		return this.ignore;
	},
	show	:	function(category){
		var index = this.getFirstItemIndex(category);
		this.mgr.show(index);
	},
	setMgr	:	function(mgr){
		this.mgr = mgr;
	},
	getMgr	:	function(){
		return this.mgr;
	},
	plus	:	function(cid,id){
		var item = GyUtils.findItemById(cid,id);
		if(item)
			item.plus();
	},
	minus	:	function(cid,id){
		var item = GyUtils.findItemById(cid,id);
		if(item)
			item.minus();
	},
	findCagegoryByName	:	function(name){
		return this.mgr.findCagegoryByName(name);
	},
	selectCategory	:	function(category,scl){
		if(scl){
			GyUtils.setIgnoreScroll(true);
			category.toTop();
			setTimeout(function(){
				GyUtils.setIgnoreScroll(false);
			},500);
		}
		var obj = $("#left_li_" + category.getId());
		if(!obj.hasClass("li_sel")){
			$("[id ^=left_li]").removeClass("li_sel");
			obj.addClass("li_sel");
		}
	},
	selectCategoryByName	:	function(name){
		GyUtils.setIgnoreScroll(true);
		var category = GyUtils.findCagegoryByName(name);
		GyUtils.selectCategory(category,true);
		setTimeout(function(){
			GyUtils.setIgnoreScroll(false);
		},500);
	},
	getFirstItemIndex	:	function(category){
		return this.mgr.getFirstItemIndex(category);
	},
	findItemById	:	function(cid,id){
		return this.mgr.findItemById(cid,id);
	},
	setAmount	:	function(){
		this.mgr.setAmount();
	},
	plusCount	:	function(){
		this.mgr.plusCount();
	},
	minusCount	:	function(){
		this.mgr.minusCount();
	},
	setCount	:	function(){
		this.mgr.setCount();
	},
	setDetails	:	function(){
		this.mgr.setDetails();
	},
	toggleDetails	:	function(){
		this.mgr.toggleDetails();
	},
	selectok	:	function(){
		this.mgr.selectok();
	},
};
