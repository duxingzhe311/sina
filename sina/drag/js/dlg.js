!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=k.substring(0,k.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(n.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",n.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function h(a,b){return"string"==typeof a?a:a[b%a.length]}function i(a){return"undefined"==typeof this?new i(a):(this.opts=f(a||{},i.defaults,o),void 0)}function j(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}n.addRule(".spin-vml","behavior:url(#default#VML)"),i.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function g(a,g,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~g}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:h(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)g(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)g(i);return b(a,m)},i.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var k,l=["webkit","Moz","ms","O"],m={},n=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};i.defaults={},f(i.prototype,{spin:function(b){this.stop();var c,d,f=this,h=f.opts,i=f.el=e(a(0,{className:h.className}),{position:h.position,width:0,zIndex:h.zIndex}),j=h.radius+h.length+h.width;if(b&&(b.insertBefore(i,b.firstChild||null),d=g(b),c=g(i),e(i,{left:("auto"==h.left?d.x-c.x+(b.offsetWidth>>1):parseInt(h.left,10)+j)+"px",top:("auto"==h.top?d.y-c.y+(b.offsetHeight>>1):parseInt(h.top,10)+j)+"px"})),i.setAttribute("role","progressbar"),f.lines(i,f.opts),!k){var l,m=0,n=(h.lines-1)*(1-h.direction)/2,o=h.fps,p=o/h.speed,q=(1-h.opacity)/(p*h.trail/100),r=p/h.lines;!function s(){m++;for(var a=0;a<h.lines;a++)l=Math.max(1-(m+(h.lines-a)*r)%p*q,h.opacity),f.opacity(i,a*h.direction+n,l,h);f.timeout=f.el&&setTimeout(s,~~(1e3/o))}()}return f},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function g(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*j+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,j=0,l=(f.lines-1)*(1-f.direction)/2;j<f.lines;j++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:k&&c(f.opacity,f.trail,l+j*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(g("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,g(h(f.color,j),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var p=e(a("group"),{behavior:"url(#default#VML)"});return!d(p,"transform")&&p.adj?j():k=d(p,"animation"),i});
var dragMinWidth = 200;
var dragMinHeight = 150;

var get = {
	byId : function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass : function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++)
			reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName : function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};

function drag0(oDrag, handle) {
	var disX = dixY = 0;
	var oMin = get.byClass("min", oDrag)[0];
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function(event) {
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;

		document.onmousemove = function(event) {
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight
					- oDrag.offsetHeight;

			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);

			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";

			return false
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};
	// 最大化按钮
	oMax.onclick = function() {
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	// 还原按钮
	oRevert.onclick = function() {
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth)
				/ 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight)
				/ 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	// 最小化按钮
	oMin.onclick = function() {
		oDrag.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "还原";
		document.body.appendChild(oA);
		oA.onclick = function() {
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};
	oClose.onclick = function(){
		dlg.close();
	};
	// 阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function(event) {
		this.onfocus = function() {
			this.blur()
		};
		(event || window.event).cancelBubble = true
	};
}

function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
	if (!handle)
		return;

	handle.onmousedown = function(event) {
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;

		document.onmousemove = function(event) {
			var event = event || window.event;

			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth
					- oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight
					- oParent.offsetTop - 2;
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;

			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");

			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");

			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");

			if ((isLeft && iW == dragMinWidth)
					|| (isTop && iH == dragMinHeight))
				document.onmousemove = null;

			return false;
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
};

function preDef(event) {
	var e = e || window.event;
	var e = event || e
	if (e.preventDefault) {// W3C
		e.preventDefault();
	} else {// IE
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

function scrollFunc(e) {
	e = e || window.event;
	if (e && e.preventDefault) {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnvalue = false;
		return false;
	}
}

function getScrollTop() {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}


function SpinCom(){
	this.spinner = null;
	this.init0 = false;
	this.target = null;
	
	this.init = function(top,left) {
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = top;
		div.style.left = left ;
		div.style.zIndex = 65535 ;
		
		document.body.appendChild(div);
		var opts = {
		  lines: 13, // The number of lines to draw |小长条的数量
		  length: 19, // The length of each line |小长条的长度
		  width: 5, // The line thickness |小长条的宽度
		  radius: 19, // The radius of the inner circle |内环的半径长
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset |旋转角度
		  direction: 1, // 1: clockwise, -1: counterclockwise |1：顺时针方向 -1：逆时针方向
		  color: '#000', // #rgb or #rrggbb or array of colors |颜色
		  speed: 1, // Rounds per second |每秒转多少圈
		  trail: 60, // Afterglow percentage |余晖效果百分比
		  shadow: false, // Whether to render a shadow |渲染阴影
		  hwaccel: false, // Whether to use hardware acceleration |加速
		  className: 'spinner', // The CSS class to assign to the spinner |类名spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000) |显示在最顶层
		  top: top, // Top position relative to parent in px |相对父元素的top
		  left: left // Left position relative to parent in px |相对父元素的left ，默认情况spinner是显示于父元素居中位置
		};
		this.spinner = new Spinner(opts).spin(div);
		this.target = div;
		this.init0 = true;
	};
	this.show = function(top,left) {
		if(!top || top <= 0)
			top = 200;
		if(!left || left <= 0)
			left = 200;
		if(!this.init0)
			this.init(top,left);
		this.spinner.spin(this.target);
	};
	this.hide = function(){
		this.spinner.stop();
	};
}

var dlg = {
	pop_div : null,
	title : null,
	width : 500,
	height : 500,
	bgColor : '#f0f0f0',
	calback : null,
	bgheight : '',
	boxes : [],
	func : null,
	curScorllHeight : 0,
	windowHeight : window.innerHeight,
	windowWidth : $(window).width(),

	setCallBack : function(f) {
		this.calback = f;
		return this;
	},
	setSize : function(w, h) {
		this.width = w;
		this.height = h;
		return this;
	},
	setColor : function(color) {
		this.bgColor = color;
		return this;
	},
	setWidth : function(w) {
		this.width = w;
		return this;
	},
	setHeight : function(hw) {
		this.height = h;
		return this;
	},
	setTitle : function(t) {
		if (!t)
			t = "";
		this.title = t;
		return this;
	},
	open : function(url, func) {
		this.func = func;
		var tmp = this;
		tmp.curScorllHeight = getScrollTop();
		this.pop_div = 
			$('<div id="pop_div"  style="width:'
				+ tmp.width + 'px;height:' + tmp.height
				+ 'px;left:300px;top:200px;display: block;">'
					+ '<div class="title" style="cursor: move;">'
						+ '<h2 style="background:' + tmp.bgColor + '">' + tmp.title + '</h2>'
						+ '<div>'
							+ '<a class="min" href="javascript:;" title="最小化"></a>'
							+ '<a class="max" href="javascript:;" title="最大化"></a>'
							+ '<a class="revert" href="javascript:;" title="还原"></a>'
							+ '<a class="close" href="javascript:;" title="关闭"></a>'
						+ '</div>' 
					+ '</div' 
					+ '<div class="resizeL"></div>'
					+ '<div class="resizeT"></div>' 
					+ '<div class="resizeR"></div>'
					+ '<div class="resizeB"></div>'
					+ '<div class="resizeLT"></div>'
					+ '<div class="resizeTR"></div>'
					+ '<div class="resizeBR"></div>'
					+ '<div class="resizeLB"></div>'
					+ '<div id="___ajaxdiv" class="___ajaxdiv"></div>'
				+ '</div>');

		$("body").append(this.pop_div);

		tmp.boxes.push(document.getElementById('pop_div'))
		$("body").append("<div id='shelter' class='shelter'></div>");
		$("#shelter").height($(window).height());
		// $("#__iframe").attr("src",url);

		$.get(url, function(data) {
			$("#___ajaxdiv").html(data);
			tmp.pop_div.fadeIn();
		});

		this.drag();
		this.center();

		document.body.parentNode.style.overflowY = "hidden";// 隐藏纵向滚动条
		$(document).on('mousewheel', function(e) {
			scrollFunc(e);
		});
		// 火狐下的鼠标滚动事件
		$(document).on('DOMMouseScroll', function(e) {
			scrollFunc(e);
		});
		return this;
	},
	drag : function() {
		var oDrag = document.getElementById("pop_div");// this.pop_div.get(0);//
		var oTitle = get.byClass("title", oDrag)[0];
		var oL = get.byClass("resizeL", oDrag)[0];
		var oT = get.byClass("resizeT", oDrag)[0];
		var oR = get.byClass("resizeR", oDrag)[0];
		var oB = get.byClass("resizeB", oDrag)[0];
		var oLT = get.byClass("resizeLT", oDrag)[0];
		var oTR = get.byClass("resizeTR", oDrag)[0];
		var oBR = get.byClass("resizeBR", oDrag)[0];
		var oLB = get.byClass("resizeLB", oDrag)[0];

		drag0(oDrag, oTitle);
		// 四角
		resize(oDrag, oLT, true, true, false, false);
		resize(oDrag, oTR, false, true, false, false);
		resize(oDrag, oBR, false, false, false, false);
		resize(oDrag, oLB, true, false, false, false);
		// 四边
		resize(oDrag, oL, true, false, false, true);
		resize(oDrag, oT, false, true, true, false);
		resize(oDrag, oR, false, false, false, true);
		resize(oDrag, oB, false, false, true, false);
		return this;
	},
	replace : function(url, func) {
		if (func)
			this.func = func;
		$.get(url, function(data) {
			$("#___ajaxdiv").html(data);
		});
		return this;
	},
	showLoading : function(top,left)
	{
		if(!this.spin){
			this.spin = new SpinCom();
		}
		this.spin.show(top,left);
	},
	hideLoading : function()
	{
		this.spin.hide();
	},
	close : function(ret) {
		var that = this;
		if (ret) {
			if ('function' == typeof this.calback)
				this.calback();
			if ('function' == typeof this.func) {
				this.func(ret);
			}
		}
		$("#pop_div").remove();
		$("#shelter").remove();
		document.body.parentNode.style.overflowY = "auto";
		$(document).off('mousewheel');
		// 火狐下的鼠标滚动事件
		$(document).off('DOMMouseScroll');
	},
	center : function() {
		for (var i = 0; i < this.boxes.length; i++) {
			this.boxes[i].style.top = (this.windowHeight - this.height) / 2
					+ this.curScorllHeight + 'px';
			this.boxes[i].style.left = (this.windowWidth - this.width) / 2
					+ 'px';
		}
		return this;
	},
	resizewindow : function() {
		window.onresize = function() {
			var modalDiv = document.getElementById('pop_div')
			if (modalDiv.offsetWidth > getInner().width) {
				modalDiv.style.left = 0 + 'px'
			} else {
				modalDiv.style.left = (getInner().width - modalDiv.offsetWidth)
						/ 2 + 'px';
			}
			if (modalDiv.offsetHeight > getInner().height) {
				modalDiv.style.top = 10 + 'px'
			} else {
				modalDiv.style.top = (getInner().height - modalDiv.offsetHeight)
						/ 2 + 'px';
			}

		};
		return this;
	}
};