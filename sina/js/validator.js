jQuery.fn.extend({
	fileControl:function(){
	    var argus = arguments[0];
	    
	    var tmp = this;
	    return this.each(function(){
		    var allow = argus.allow;//合法的文件类型，是一个数组
		    var deny = argus.deny;//不合法的文件类型，是一个数组
		    var debug = argus.debug;//是否为调试状态
		    
	        var paddingLeft = argus.paddingLeft,
	        　　width = argus.width?argus.width:$(this).width()-(paddingLeft?paddingLeft:0),
	        　　height = argus.height?argus.height:$(this).height(),
	        　　top = argus.top?argus.top:($(this).height()+parseInt(($(this).outerHeight() - $(this).height())/2)),
	        　　left = argus.left?argus.left:($(this).width()+parseInt(($(this).outerWidth() - $(this).width())/2)),
	        　　lineHeight = argus.lineHeight?argus.lineHeight:height,
		        style = "position:relative; z-index:-1; background-position:top left; background-repeat:no-repeat;left:0px;top:-"+height+"px;";   
		    　　style += argus.image?("background-image:url("+argus.image+");"):"";
		    　　style += "width:"+width+"px;";
		    　　style += height?("height:"+height+"px;"):"";
		    　　style += paddingLeft?("padding-left:"+paddingLeft+"px;"):"";
		    　　style += lineHeight?("line-height:"+lineHeight+"px;"):"";

	        $(this).wrap("<div></div>").after("<div did='fadeFile' ></div>").css({"width":"99px","height":"32px","opacity":"0"}) //
	        .next().attr("style",style);
	        $(this).change(function(){
	            showFile($(this),$(this).next());
	        });
	        function showFile(telem,felem){
	            var value = $(telem).val();
	            if(!checkAllow(allow,value)){
	            	try{
	    		    	if(typeof argus.onFailed == 'function')
	    		    		argus.onFailed();
	    	            $(felem).text("请选择：" + allow + "类型文件！").addClass(argus.cssClass);
	    		    }catch(e){
	    		    	if(debug)
	    		    		alert(e);
	    		    }
	    		    return;
	            }
	            if(checkDeny(deny,value)){
	            	try{
	    		    	if(typeof argus.onFailed == 'function')
	    		    		argus.onFailed();
	    	            $(felem).text("不支持" + deny + "类型文件").addClass(argus.cssClass);
	    		    }catch(e){
	    		    	if(debug)
	    		    		alert(e);
	    		    }
	    		    return;
	            }
            	try{
     		    	if(typeof argus.onSucc == 'function'){
     		    		$(felem).removeClass(argus.cssClass);
     		    		argus.onSucc();
     		    	}
     		    }catch(e){
    		    	if(debug)
    		    		alert(e);
     		    }
	            $(felem).text(value);
	        }
	    });
	}
});

function checkAllow(arr,f){
	if(!arr)
		return true;
	if(arr instanceof Array){
		var len = 0;
		if(len = arr.length){
			for(var i = 0; i < len; i ++){
				var ai = arr[i];
				if(ai = (ai + "").toLowerCase()){
					if((f+"").toLowerCase().indexOf(ai) != -1)
						return true;
				}
			}
		}
		return false;
	}
	return true;
}

function checkDeny(arr,f){
	if(!arr)
		return false;
	
	if(arr instanceof Array){
		var len = 0;
		if(len = arr.length){
			for(var i = 0; i < len; i ++){
				var ai = arr[i];
				if(ai = (ai + "").toLowerCase()){
					if((f+"").toLowerCase().indexOf(ai) != -1)
						return true;
				}
			}
		}
		return false;
	}
	return false;
}

function trim(n){
	if(!n)
		return n ;
	n = n + "";
	return n.replace(/(^\s+)|\s+$/g,'');
}

function createLabel(id){
	var la = $("label[forId='" + id + "']");
	if(la.get(0))
		return la;
	la = $("<label class='" + BASE_PARAMETER.labelCss + "' cb='vld' forId='" + id + "'></label>");
	$("#" + id).after(la);
	return la;
}

function findDiy(name,arr){
	if(!(name = trim(name)))
		return null;
	if(null == arr || !(arr instanceof Array))
		return null;
	for(var i in arr){
		var ti = arr[i];
		if(!ti)
			continue;
		if(name == ti.name)
			return ti;
	}
	return null;
}

var BASE_PARAMETER = {
		debug : false,//是否为Debug状态，如果是，会有一些异常提示
		ip : 'ip',
		len : 'len',//必须长度
		diy : 'diy',//DIY的，为了简单起见，这个不做验证，只是触发一个自定义的函数，如果有必要，可以调用vld.setOk(xx)来阻止表单提交
		mail : 'mail',
		number : 'number',
		require : 'require',
		maxVal : 'maxVal',
		minVal : 'minVal',
		maxLen : 'maxLen',
		minLen : 'minLen',
		postCode:'postCode',//邮编
		fax:'fax',//传真号码
		phone:'phone',//电话号码
		roomNum: 'roomNum',//房间号
		labelCss : '',//显示错误信息的label的样式
		checkFunc : null,//自己定义的其他校验规则，返回true或者false
		circuit : true
};
function VldItem(){
	this.init = function(id,type,func,option){
		this.id = id;
		this.type = type;
		this.ok = false;
		this.func = func;
		this.option = option;
	};
	this.isOk = function(){
		return this.func(this.option);
	}
}

var vld = {
	first : true,//是否第一次提交
	ok : true,//是否OK，OK才提交，不OK不提交，会提供给外部一个方法设置ok的值
	ckArr : new Array(),//要校验的所有字段
	diyArr : new Array(),//DIY的字段
	init : function(option){
		if(!option)
			return this;
		BASE_PARAMETER.labelCss = option.labelCss;
		BASE_PARAMETER.circuit = option.circuit;
		BASE_PARAMETER.checkFunc = option.checkFunc;
		BASE_PARAMETER.debug = option.debug;
		this.first = true;
		return this;
	},
	//全局的OK
	setOk : function(ok){
		this.ok = ok;
	},
	//变态的需求的OK
	setOkDiy : function(id,ok){
		var tmp = this;
		var arr = tmp.diyArr;
		var d = findDiy(id,arr);
		if(d){
			d.ok = ok;
		}else{
			d = {
					name : id,
					ok : ok
				};
			arr.push(d);
		}
	},
	isOk : function(){
		var tmp = this;
		var arr = tmp.diyArr;
		var o = this.ok;
		if(!o)
			return false;
		if(arr && (arr instanceof Array)){
			for(var i in arr){
				var ti = arr[i];
				if(!ti)
					continue;
				if(!ti.ok)
					return false;
			}
		}
		return o;
	},

	bind : function(formId){
		var tmp = this;
		if(!formId)
			return this;
		$("#" + formId).bind("submit", function(){
			if(!tmp.first)
				return false;

			var res = true;
			for(var i = 0,j = tmp.ckArr.length;i < j; i ++){
				var ti = tmp.ckArr[i];
				if(!ti.isOk()){
					if(BASE_PARAMETER.circuit)
						return false;
					else
						res = false;
				}
			}
			var ckres = true;

			try{
				if((typeof BASE_PARAMETER.checkFunc) == 'function'){
					ckres = BASE_PARAMETER.checkFunc();
				}
			}catch(e){
				if(BASE_PARAMETER.debug)
					alert(e);
			}
			//alert("rrrrrrrrrr" + tmp.isOk());
			res = ckres && res && tmp.isOk();
			if(res)
				first = false;
			return res;
		});
		return this;
	},
	remove : function(id) {
		if(!id)
			return this;
		var tmp = this;
		var tarr = new Array();
		var tlen = 0;
		if((tlen = tmp.ckArr.length) < 1)
			return this;
		for(var i = 0; i < tlen; i ++){
			var ti = tmp.ckArr[i];
			if(!ti)
				continue;
			if(id != ti.id)
				tarr.push(ti);
		}
		tmp.ckArr = tarr;
		return this;
	},
	number : function(id){
		if(!id)
			return this;
		var tmp = this;
		var tnum = new VldItem();
		tnum.init(id,BASE_PARAMETER.number , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && isNaN(v)){
				if(ei){
					ei.html("必须为数字！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tnum);

		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && isNaN(val)){
				info.html("必须为数字！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	require : function(id){
		if(!id)
			return this;
		
		var tmp = this;
		var treq = new VldItem();
		treq.init(id,BASE_PARAMETER.require , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(!v){
				if(ei){
					ei.html("不能为空！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(treq);
		
		var obj = $("#" + id);
		var info = createLabel(id);
		info.html("*");
		obj.blur(function(){
			var val = trim($(this).val());
			if(!val){
				info.html("不能为空！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	maxLen : function(id,len){
		if(!id)
			return this;
		var tmp = this;
		var tmaxLen = new VldItem();
		tmaxLen.init(id,BASE_PARAMETER.maxLen , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && v.length > len){
				if(ei){
					ei.html("不能超过" + len + "位！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tmaxLen);
		
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val){
				if(val.length > len){
					$(this).after(info);
					info.html("不能超过" + len + " 位！");
				}
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	minLen : function(id,len){
		if(!id)
			return this;

		var tmp = this;
		var tminLen = new VldItem();
		tminLen.init(id,BASE_PARAMETER.minLen , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && v.length < len){
				if(ei){
					ei.html("不能小于" + len + "位！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tminLen);

		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val){
				if(val.length < len){
					info.html("不能小于" + len + " 位！");
				}
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	len : function(id,len){
		if(!id)
			return this;
		var tmp = this;
		var tlen = new VldItem();
		tlen.init(id,BASE_PARAMETER.len , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && v.length != len){
				if(ei){
					ei.html("必须为" + len + "位！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tlen);
		
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(!val || val.length != len){
				info.html("必须为" + len + " 位！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	minVal : function(id,mv){
		if(!id)
			return this;
		
		var tmp = this;
		var tminVal = new VldItem();
		tminVal.init(id,BASE_PARAMETER.minVal , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !isNaN(v) && parseFloat(v) < mv){
				if(ei){
					ei.html("必须大于" + mv + "！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tminVal);
		
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !isNaN(val) && parseFloat(val) < mv){
				info.html("不能小于" + mv);
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	maxVal : function(id,mv){
		if(!id)
			return this;

		var tmp = this;
		var tmaxVal = new VldItem();
		tmaxVal.init(id,BASE_PARAMETER.maxVal , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !isNaN(v) && parseFloat(v) > mv){
				if(ei){
					ei.html("必须小于" + mv + "！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tmaxVal);
		
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !isNaN(val) && parseFloat(val) > mv){
				info.html("不能大于" + mv + "！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	mail : function(id){
		if(!id)
			return this;
		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var tmp = this;
		var tmail = new VldItem();
		tmail.init(id,BASE_PARAMETER.mail , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !myreg.test(v)){
				if(ei){
					ei.html("邮箱格式不正确！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tmail);
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !myreg.test(val)){
				info.html("邮箱格式不正确！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	//PostCode
	postCode : function(id){
		if(!id)
			return this;
		var myreg =/[1-9]\d{5}(?!\d)/;
		var tmp = this;
		var tpost = new VldItem();
		tpost.init(id,BASE_PARAMETER.postCode , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !myreg.test(v)){
				if(ei){
					ei.html("邮编格式不正确！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tpost);
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !myreg.test(val)){
				info.html("邮编格式不正确！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	//IP
	ip : function(id){
		if(!id)
			return this;
		var myreg = /^(((1\d{2})|(2[0-4]\d)|(25[0-5])|([1-9]?\d))[.]){3}((1\d{2})|(2[0-4]\d)|(25[0-5])|([1-9]?\d))$/;
		var tmp = this;
		var tip = new VldItem();
		tip.init(id,BASE_PARAMETER.ip , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !myreg.test(v)){
				if(ei){
					ei.html("IP格式不正确！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tip);
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !myreg.test(val)){
				info.html("IP格式不正确！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	info : function(id,str){
		if(!id)
			return this;
		if(!(str = trim(str)))
			return this;
		var info = createLabel(id);
		
		var obj = $("#" + id);
		info.html(str);
		return this;
	},
	//diy的，可能需要验证是否重复之类的需求，
	diy : function(id,func){
		if(!id)
			return this;
		if((typeof func) != 'function')
			return this;
		
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(func);
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	//phone
	phone:function(id){
		if(!id)
			return this;
		var myreg =/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/;
		/*
		 * 1、可以是1开头的11位数字（手机号）
			2、可以是“区号-电话号-分机号”或者是“(区号)电话号-分机号”格式
			3、区号是0开头的3～4位数字，可以没有区号
			4、电话号是5～8位数字，不能以0开头
			5、分机号是1～8位数字，可以没有分机号
			合法数据示例：
			13812341234
			010-12345678
			(0432)1234567-1234
		 */
		var tmp = this;
		var tphone = new VldItem();
		tphone.init(id,BASE_PARAMETER.phone , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !myreg.test(v)){
				if(ei){
					ei.html("电话格式不正确！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tphone);
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !myreg.test(val)){
				info.html("电话格式不正确！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	},
	//fax
	fax:function(id){
		if(!id)
		return this;
		var myreg = /^(\d{3,4}-)?\d{7,8}$/; 
		/*
		 * 传真格式为:XXX-12345678或XXXX-1234567或XXXX-12345678
		 */
		var tmp = this;
		var tfax = new VldItem();
		tfax.init(id,BASE_PARAMETER.fax , function(){
			var ei = createLabel(this.id);
			var v = trim($("#" + this.id).val());
			if(v && !myreg.test(v)){
				if(ei){
					ei.html("传真格式不正确！");
				}
				return false;
			}
			return true;
		}, {});
		tmp.ckArr.push(tfax);
		var obj = $("#" + id);
		var info = createLabel(id);
		obj.blur(function(){
			var val = trim($(this).val());
			if(val && !myreg.test(val)){
				info.html("传真格式不正确！");
			}
		});
		obj.focus(function(){
			info.html("");
		});
		return this;
	}
}