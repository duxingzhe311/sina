var win = {
	pop_div 			:		null								,
	titleImg			:		"images/menu2.png"					,
	title				:		null								,
	width				:		500									,
	height				:		500									,
	bgColor        		:       '#ccc'								,
	calback				:		null								,
	bgheight			:       ''									,
	_alertitle      	:		''									,
	_alert_con   		:       ''                                	,
	boxes				:		[]									,
	func				:		null								,
	
	setCallBack		:	function(f){
		this.calback	= f;
		return this;
	},
	setSize			:		function(w,h){
		this.width = w;
		this.height = h;
		return this;
	},
	setColor		:	function(color){
		this.bgColor=color;
		return this;
	},
	setWidth		:		function(w){
		this.width = w;
		return this;
	},
	setHeight		:		function(hw){
		this.height = h;
		return this;
	},
	setTitle		:		function(t){
		if(!t)
			t="";
		this.title = t;
		return this;
	},
	setTitleImg	:	function(img){
		if(!img){
			img = "images/menu2.png";
		}
		this.titleImg = img;
		return this;
	},
	lock       :     function(){
		window.onscroll=function(){
			var h = document.documentElement.scrollHeight
			var w= document.documentElement.offsetWidth
			
			$("#shelter").height(h);
			
		}
		return this;
	},

	open	:	function(url,func){
		this.func = func;
		var tmp = this;
		this.pop_div = $('<div id="pop_div" class="pop_div" style="width:'+ tmp.width +'px;height:' + tmp.height + 'px;">'+
		'<h6 class="__cardtitle" style="background:'+tmp.bgColor+'">'+
		'<img src="'+ tmp.titleImg + '" />'+ tmp.title +
		'<span id="__closeBtn" class="closeBtn">×</span>'+
		'</h6><div id="___ajaxdiv"></div></div>');
		$("body").append(this.pop_div)
		tmp.boxes.push(document.getElementById('pop_div'))
		$("body").append("<div id='shelter' class='shelter'></div>");
		
		$.get(url,
			function(data){
				$("#___ajaxdiv").html(data);
				tmp.pop_div.fadeIn();
				$("#__closeBtn").click(function(){
						tmp.close();	
				});
			}
		);
		this.drag();
		this.center();
		return this;
	}, 
	close	:	function(ret){
			if('function' == typeof this.calback )
				this.calback();
			if(ret){
				if('function' == typeof this.func){
					this.func(ret);
				}
			}
				
			
			$("#pop_div").remove();
			$("#shelter").remove();
			$('#_alert').remove()
	},
	drag  :    function(){
			this.pop_div.mousedown(function(e){
				preDef(e);
				var e=e || window.event;
				var _this=this;
				var diffX = e.clientX - _this.offsetLeft;
				var diffY = e.clientY - _this.offsetTop;
				if (typeof _this.setCapture != 'undefined') {
					_this.setCapture();
				} 
				document.onmousemove = function (e) {
					var e=e || window.event;
					var left = e.clientX - diffX;
					var top = e.clientY - diffY;
					if (left < 0) {
							left = 0;
					} else if (left >getInner().width - _this.offsetWidth) {
						left =getInner().width - _this.offsetWidth;
					}
					if (top < 0) {
						top = 0;
					} else if (top >getInner().height- _this.offsetHeight) {
						top = getInner().height - _this.offsetHeight;
					}
					_this.style.left = left + 'px';
					_this.style.top = top + 'px';
				}
				document.onmouseup = function () {
					this.onmousemove = null;
					this.onmouseup = null;
					if (typeof _this.releaseCapture != 'undefined') {
						_this.releaseCapture();
					}
				}
		});
		return this;
	},
	center   :function(){
		for(var i=0;i<this.boxes.length;i++){
		var top = (document.documentElement.clientHeight - parseInt(this.boxes[i].style.height)) / 2;
		var left = (document.documentElement.clientWidth - parseInt(this.boxes[i].style.width)) / 2;
				this.boxes[i].style.top = top + 'px';
				this.boxes[i].style.left = left + 'px';
		}
		return this;
	},
	resizewindow   :    function () {
		window.onresize = function () {
			var modalDiv=document.getElementById('pop_div')
			if (modalDiv.offsetWidth> getInner().width) {
				modalDiv.style.left=0+'px'
			}else{
				modalDiv.style.left = (getInner().width - modalDiv.offsetWidth)/2 + 'px';
			}
			if (modalDiv.offsetHeight >  getInner().height) {
				modalDiv.style.top=10+'px'
			}else{
				modalDiv.style.top = (getInner().height - modalDiv.offsetHeight)/2+ 'px';
			}
			
		};
		return this;
	}
	
};

function preDef(event) {
	var e = e||window.event;
	if (typeof e.preventDefault != 'undefined') {//W3C
		e.preventDefault();
	} else {//IE
		e.returnValue = false;
	}
}

function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}

