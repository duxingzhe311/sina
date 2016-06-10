var System = {
	arrayDel	:	function(src,pos){
		if(!src)
			return null;
		if(pos >= src.length || pos < 0)
			return src;
		var arr = [];
		for(var i = 0; i < src.length; i ++){
			if(i != pos)
				arr.push(src[i]);
		}
		return arr;
	},
	arrayCopy	:	function(src, srcPos, dest, destPos, length){
		if(length < 1)
			return;
		
		if(!(src instanceof Array))
			return;
		if(!(dest instanceof Array))
			return;
		
		var srcArrLen = src.length;
		if(srcPos < 0 || srcPos >= srcArrLen)
			return;
		
		var destArrLen = dest.length;
		if(destArrLen < destPos)
			return;
		
		var res = [];
		
		for(var i = 0; i < destPos; i ++){
			res.push(dest[i]);
		}
		
		for(var i = 0 ; i < length; i ++){
			res.push(src[srcPos + i]);
		}
		
		var resArrLen = res.length;

		if(dest.length > resArrLen){
			for(var i = resArrLen; i < dest.length; i ++){
				res.push(dest[i]);
			}
		}
		
		return res;
	},
};