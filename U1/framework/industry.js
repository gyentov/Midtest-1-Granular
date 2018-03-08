/*
	industry.js
	Framework for industry object
	
	Sparisoma Viridi | dudung@gmail.com
	Tatang Suheri | tatangpl@yahoo.com
	
	20180301
	Start this library and not yet tested.
*/

class Industry {
	constructor(id, type) {
		this.id = id;
		this.type = type;
		this.revenue = { value: 0, source: [] };
		this.cost = {	value: 0, source: [] };
	}
}

class Resource {
	constructor(id, type) {
		this.id = id;
		this.type = type;
	}
}