/*
	resource.js
	Framework for resource object
	
	Sparisoma Viridi | dudung@gmail.com
	Tatang Suheri | tatangpl@yahoo.com
	
	20180301
	Start this library and not yet work.
*/

// Define class of Resources
class Resources {
	constructor(id, type) {
		this.id = id;
		this.type = type;
		this.unit = "";
		this.factor = 1;
		this.available = true;
	}
	
	// Change unit
	setUnitAndFactor(unit, factor) {
		this.unit = unit;
		this.factor = factor;
	}
}