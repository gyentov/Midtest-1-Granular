/*
	point.js
	Point in 2-d for drawing, especially in electronics
	circuit
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create this object.
	20180227
	Modify this library and rename it to Point.
*/

// Define class of Point
class Point {
	// Create constructor
	constructor() {
		this.x = 0;
		this.y = 0;
		this.color = int2rgb(0, 0, 0);
		this.size = 1.5;
		this.r = new Vect3();
		
		if(arguments.length == 2) {
			this.x = arguments[0];
			this.y = arguments[1];
		}
		
		if(arguments.length == 1) {
			this.r = arguments[0];
			this.setXY();
		}
	}
	
	// Convert from Vect3
	setXY() {
		this.x = this.r.x;
		this.y = this.r.y;
	}
	setYZ() {
		this.x = this.r.y;
		this.y = this.r.z;
	}
	setZX() {
		this.x = this.r.z;
		this.y = this.r.x;
	}
	setYX() {
		this.x = this.r.y;
		this.y = this.r.x;
	}
	setZY() {
		this.x = this.r.z;
		this.y = this.r.y;
	}
	setXZ() {
		this.x = this.r.x;
		this.y = this.r.z;
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.x + ", ";
		s += this.y + ", ";
		s += this.color + ", ";
		s += this.size + ", ";
		s += ")";
		return s;
	}
}
