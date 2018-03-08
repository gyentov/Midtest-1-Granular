/*
	particle.js
	Point particle with motion parameters
	
	Sparisoma Viridi | dudung@gmail.com
	
	20171227
	Create this object.
*/

// Define class of Particle
class Particle {
	// Create constructor
	constructor() {
		this.m = 1.0;
		this.q = 1.0;
		this.r = new Vect3();
		this.v = new Vect3();
		this.a = new Vect3();
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.m + ", ";
		s += this.q + ", ";
		s += this.r.strval() + ", ";
		s += this.v.strval() + ", ";
		s += this.a.strval();
		s += ")";
		return s;
	}
}
