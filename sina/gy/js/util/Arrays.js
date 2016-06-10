var Arrays = {
	sort			:	function(arr,desc){
		
	},
	
	asList			:	function(arr){
		if(null == arr || arr.length < 1)
			return null;
		var res = new ArrayList();
		for(var i = 0; i < arr.length; i ++){
			res.add(arr[i]);
		}
		return res;
	},
	
	binarySearch	:	function(arr,key,fromIndex,toIndex){
		var low = 'undefined' == typeof fromIndex ? 0 : fromIndex;
		var high = 'undefined' == typeof (toIndex) ? arr.length : toIndex - 1;
		
		while (low <= high) {
		    var mid = (low + high) >>> 1;
		    var midVal = arr[mid];
		
		    if (midVal < key)
		        low = mid + 1;
		    else if (midVal > key)
		        high = mid - 1;
		    else
		        return mid; // key found
		}
		return -(low + 1);  // key not found.
	},
	
	fill			:	function(arr,val){
		if(null == arr)
			return;
		for(var i = 0; i < arr.length; i ++){
			arr[i] = val;
		}
	},
	
	reverse			:	function(arr){
		
	}
};