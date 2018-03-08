/*
	particle.js
	Spherical particle with motion parameters
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create this object by extending particle.
*/

// Define class of Sphere
class Sphere extends Particle {
	// Create constructor
	constructor() {
		super();
		this.d = 1.0;
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.m + ", ";
		s += this.q + ", ";
		s += this.d + ", ";
		s += this.r.strval() + ", ";
		s += this.v.strval() + ", ";
		s += this.a.strval();
		s += ")";
		return s;
	}
}
