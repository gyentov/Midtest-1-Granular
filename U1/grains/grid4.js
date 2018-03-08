/*
	grid4.js
	Grid constructed of 4 Vect3 for element of plain surface
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create this object, but without warning that the points
	are not on the plain surface.
*/

// Define class of Particle
class Grid4 {
	// Create constructor
	constructor() {
		if(arguments.length == 0) {
			this.p = [
				new Vect3(),
				new Vect3(),
				new Vect3(), 
				new Vect3()
			];
		} else if(arguments.length == 4) {
			this.p = [
				arguments[0],
				arguments[1],
				arguments[2],
				arguments[3]
			];
		} else if(arguments.length == 1) {
			if(arguments[0] instanceof Grid4)
			this.p = [
				arguments[0].p[0],
				arguments[0].p[1],
				arguments[0].p[2],
				arguments[0].p[3]
			];
		}
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.p[0].strval() + ", ";
		s += this.p[1].strval() + ", ";
		s += this.p[2].strval() + ", ";
		s += this.p[3].strval();
		s += ")";
		return s;
	}
	
	// Get center coordinate
	center() {
		var N = this.p.length;
		var p0 = new Vect3();
		for(var i in this.p) {
			p0 = Vect3.add(p0, this.p[i]);
		}
		p0 = Vect3.div(p0, N);
		return p0;
	}
}
