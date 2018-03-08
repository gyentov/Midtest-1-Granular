/*
	generator.js
	Generator for resource object
	
	Sparisoma Viridi | dudung@gmail.com
	Tatang Suheri | tatangpl@yahoo.com
	
	20180301
	Start this library and setRandomInt, setSeries, and
	setPolynom are ok. setFunction is not implemented.
*/

// Define class of Generator
class Generator {
	constructor(id) {
		this.id = id;
		this.type = undefined;
		this.series = [];
		this.min = 0;
		this.max = 1;
		this.polyf = undefined;
		this.tick = 0;
	}
	
	// Set data series
	setSeries(series) {
		this.series = series;
		this.type = "data series";
		this.tick = 0;
	}
	
	// Set random integer
	setRandomInt(min, max) {
		this.min = min;
		this.max = max;
		this.type = "random int";
		this.tick = 0;
	}
	
	// Set polinomial
	setPolynomial(coefs) {
		var polyf = new Polynomial(coefs);
		this.polyf = polyf;
		this.type = "polynomial";
		this.tick = 0;
	}
	
	// Set function -- not yet implemented
	setFunction() {
		this.type = "function";
		this.tick = 0;
	}
	
	// Generate value
	value() {
		var val = 0;
		if(this.type == "data series") {
			var i = this.tick;
			var N = this.series.length
			while(i > N-1 ) {
				i -= N;
			}
			val = this.series[i];
		}
		if(this.type == "random int") {
			var min = this.min;
			var max = this.max;
			var val = randInt(min, max);
		}
		if(this.type == "polynomial") {
			val = this.polyf.value(this.tick);
		}
		if(this.type == undefined) {
			val = 0;
		}
		this.tick++;
		return val;
	}
}