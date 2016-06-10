function StringJoiner(delimiter,prefix,suffix){
	this.delimiter = delimiter || "";
	this.prefix = prefix || "";
	this.suffix = suffix || "";
	
	this.value = null;
    this.emptyValue = this.prefix + this.suffix;
	
	this.add = function(newElement){
		this.prepareBuilder().append(newElement);
		return this;
	};
	
	this.toString = function(){
        if (this.value == null) {
            return this.emptyValue;
        } else {
            if (this.suffix == "") {
                return this.value.toString();
            } else {
                var result = this.value.append(this.suffix).toString();
                return result;
            }
        }
	};
	
	this.prepareBuilder = function(){
		if (this.value != null) {
			this.value.append(this.delimiter);
        } else {
        	this.value = new StringBuilder().append(this.prefix);
        }
        return this.value;
	};
}