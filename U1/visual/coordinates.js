/*
	coordinates.js
	Store canvas and world coordinates
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180227
	Create this library based on decprecated transform.js from	version of 20180107.
*/

class Coordinates {
	constructor() {
		var RANGES = arguments[0];
		this.XMIN = RANGES.XMIN;
		this.YMIN = RANGES.YMIN;
		this.XMAX = RANGES.XMAX;
		this.YMAX = RANGES.YMAX;
		var ranges = arguments[1];
		this.xmin = ranges.xmin;
		this.ymin = ranges.ymin;
		this.xmax = ranges.xmax;
		this.ymax = ranges.ymax;
	}
	
	transform() {
		var p = arguments[0];
		var x = p.x;
		var y = p.y;
		
		var X = (x -this.xmin) / (this.xmax - this.xmin);
		X *= (this.XMAX - this.XMIN);
		X += this.XMIN;
		
		var Y = (y -this.ymin) / (this.ymax - this.ymin);
		Y *= (this.YMAX - this.YMIN);
		Y += this.YMIN;
		
		return {x: X, y: Y};
	}
}