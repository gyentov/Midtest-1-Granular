/*
	polynomial.js
	Polynomial function of one variable
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180301
	Create this library and tested.
*/

// Define class of Polynomial
class Polynomial {
	constructor (coefs) {
		this.order = 0;
		this.coefs = coefs;
		this.calcOrder();
	}
	
	// Calculate order of polynomial
	calcOrder() {
		var N = this.coefs.length;
		this.order = N;
	}
	
	// Set coefficients
	setCoefs(coefs) {
		this.coefs = coefs;
		this.calcOrder();
	}
	
	// Get coefficients
	getCoefs() {
		return this.coefs;
	}
	
	// Get value of function
	value(x) {
		var xn = 1;
		var f = 0;
		var N = this.order;
		for(var i = 0; i < N; i++) {
			var df = this.coefs[i] * xn;
			f += df;
			xn *= x;
		}
		return f;
	}
}