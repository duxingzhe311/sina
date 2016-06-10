if(navigator.userAgent.toLocaleLowerCase().indexOf("firefox") > 0)
{
   var $E = function()
   {
	   var c = $E.caller;
	   while(c.caller)
		   c=c.caller;
	   return c.arguments[0];
   };
   __defineGetter__("event", $E);
}

var getOffset = {
	top: function (obj) {
		return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0); 
	},
	left: function (obj) {
		return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0); 
	}	
};
var tbs_menu_oMenu = null;
var tbs_menu_aUl = null;
var tbs_menu_aLi = null;
var tbs_menu_aDoc = null;

function Tbs_Menu()
{
	//当点击右键弹出右键菜单的时候触发的函数
	this.on_rightclick_fun = null;
	//触发右键事件的Element
	this.eventSrcElement = null;
	//用来初始化的数据，在自定义data的时候可以参考下面data的格式：
	this.data ={
			//总的标题
			title		:		"自定义右键菜单",
		 	//存放第一级菜单的数组，这里只有四个元素
			datas		:		
			[
				{
			 		//第一级菜单的标题
					title	:		'first',
					//存放第一级菜单的子菜单元素的数组，这里有三个元素
					datas	:
					[
						{
							//第二级菜单（第一级的子菜单的标题）
							title:'00000000000001',
							//点击的时候触发的函数名
							func:'tbs_onclick_fun0000'
						},
						{
							title:'00000000002',
							func:'tbs_onclick_fun0000'
						},
						{
							title:'00000000000000003',
							func:'tbs_onclick_fun0000'
						}
					]
				},
				{
					title		:		"second",
					datas		:
					[
						{
							title:'11111111',
							func:'tbs_onclick_fun0000'
						},
						{
							title:'11112222',
							func:'tbs_onclick_fun0000'
						},
						{
							title:'11113333',
							func:'tbs_onclick_fun0000'
						}
					]
				},
				{
					title		:		"third",
					datas		:
					[
						{
							title:'22221111',
							func:'tbs_onclick_fun0000'
						},
						{
							title:'22222222',
							func:'tbs_onclick_fun0000'
						},
						{
							title:'22223333',
							func:'tbs_onclick_fun0000'
						}
					]
				},
				{
					title		:		"fourth",
					func		:		"func1"
				}
			]
	};
	var tbs_This = this;
	
	this.init = function(data,on_rightclick_fun)
	{
		document.oncontextmenu = function (event)
		{
			return false;
		};
	
		if(data)
			this.data = data;
		this.on_rightclick_fun = on_rightclick_fun;
		var menu = this.create_menu();
		if(menu)
			$("body").append(menu);

		tbs_menu_oMenu = document.getElementById("tbs_rightMenu");
		tbs_menu_aUl = tbs_menu_oMenu.getElementsByTagName("ul");
		tbs_menu_aLi = tbs_menu_oMenu.getElementsByTagName("li");
		var showTimer = hideTimer = null;
		var i = 0;
		var maxWidth = maxHeight = 0;
		tbs_menu_aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];

		tbs_menu_oMenu.style.display = "none";

		for (i = 0; i < tbs_menu_aLi.length; i++)
		{
			//为含有子菜单的li加上箭头
			tbs_menu_aLi[i].getElementsByTagName("ul")[0] && (tbs_menu_aLi[i].className = "sub");
			
			//鼠标移入
			tbs_menu_aLi[i].onmouseover = function ()
			{
				var oThis = this;
				var oUl = oThis.getElementsByTagName("ul");
				
				//鼠标移入样式
				oThis.className += " active";			
				
				//显示子菜单
				if (oUl[0])
				{
					clearTimeout(hideTimer);				
					showTimer = setTimeout(function ()
					{
						for (i = 0; i < oThis.parentNode.children.length; i++)
						{
							oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
							(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
						}
						oUl[0].style.display = "block";
						oUl[0].style.top = oThis.offsetTop + "px";
						oUl[0].style.left = oThis.offsetWidth + "px";
						setWidth(oUl[0]);
						
						//最大显示范围					
						maxWidth = tbs_menu_aDoc[0] - oUl[0].offsetWidth;
						maxHeight = tbs_menu_aDoc[1] - oUl[0].offsetHeight;
						
						//防止溢出
						maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
						maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px");
					},300);
				}			
			};
				
			//鼠标移出	
			tbs_menu_aLi[i].onmouseout = function ()
			{
				var oThis = this;
				var oUl = oThis.getElementsByTagName("ul");
				//鼠标移出样式
				oThis.className = oThis.className.replace(/\s?active/,"");
				
				clearTimeout(showTimer);
				hideTimer = setTimeout(function ()
				{
					for (i = 0; i < oThis.parentNode.children.length; i++)
					{
						oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
						(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
					}
				},300);
			};
		}
	};
	
	this.bind = function(obj)
	{
		if(!obj)
			return;
		for(var i in obj)
		{
			obj[i].oncontextmenu = this.show_menu;
		}
	};
	
	this.getSrcElement = function()
	{
		return this.eventSrcElement;
	};
	
	//自定义右键菜单
	this.show_menu = function (event)
	{
		//给eventSrcElement赋值，外面就可以通过getSrcElement得到eventSrcElement了
		var event = event || window.event;
		tbs_This.eventSrcElement = event.target || event.srcElement;
		
		if(typeof tbs_This.on_rightclick_fun == 'function')
			tbs_This.on_rightclick_fun();
		
		
		tbs_menu_oMenu.style.display = "block";
		tbs_menu_oMenu.style.top = event.clientY + "px";
		tbs_menu_oMenu.style.left = event.clientX + "px";
		setWidth(tbs_menu_aUl[0]);
		
		//最大显示范围
		maxWidth = tbs_menu_aDoc[0] - tbs_menu_oMenu.offsetWidth;
		maxHeight = tbs_menu_aDoc[1] - tbs_menu_oMenu.offsetHeight;
		
		//防止菜单溢出
		tbs_menu_oMenu.offsetTop > maxHeight && (tbs_menu_oMenu.style.top = maxHeight + "px");
		tbs_menu_oMenu.offsetLeft > maxWidth && (tbs_menu_oMenu.style.left = maxWidth + "px");
		return false;
	};
	
	this.create_menu = function()
	{
		if(!this.data)
			return null;
		var $div = $("<div id='tbs_rightMenu' style='display: block; top: 88px; left: 196px;'></div>");
		var $ul = $("<ul style='top: 27px; left: 150px;'></ul>");
		$div.append($ul);
		var title = this.data.title;
		//总的标题
		if(title)
			$ul.append("<li><strong>" + title + "</strong></li>");
		
		var datas = this.data.datas;
		if(datas)
		{
			//第一级菜单的遍历
			for(var i = 0; i < datas.length; i ++)
			{
				var di = datas[i];
				//第一级菜单的title
				var ti = di.title;
				var $li = null;
				if(ti)
				{
					var funi = di.func;
					$li = $("<li onclick='" + funi + "()'>" + ti + "</li>");
					$ul.append($li);
				}
				var datass = di.datas;
				if(datass)
				{
					//第二级菜单的遍历
					var $ulj = $("<ul></ul>");
					for(var j = 0; j < datass.length; j ++)
					{
						var dj = datass[j];
						var tj = dj.title;
						var fun = dj.func;
						$li.append($ulj);
						if(tj)
						{
							$ulj.append("<li onclick='" + fun + "()'>" + tj + "</li>");
						}
					}
				}
			}
		}
		return $div;
	};
};

function tbs_onclick_fun0000()
{
	alert("点击一个菜单触发的函数");
}

//点击隐藏菜单
document.onclick = function()
{
	if(tbs_menu_oMenu)
		tbs_menu_oMenu.style.display = "none";	
};

//取li中最大的宽度, 并赋给同级所有li	
function setWidth(obj)
{
	if(!obj)
		return;
	maxWidth = 0;
	for (i = 0; i < obj.children.length; i++)
	{
		var oLi = obj.children[i];			
		var iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"] : getComputedStyle(oLi,null)["paddingLeft"]) * 2;
		if (iWidth > maxWidth) maxWidth = iWidth;
	}
	for (i = 0; i < obj.children.length; i++) obj.children[i].style.width = maxWidth + "px";
}