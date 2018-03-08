/*
	test_integration.js
	Test the simple numerical integration functions
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Create this test functions.
*/

// 20180303.1828 ok
function test_compare_integ_methods() {
	function func(x) {
		return 4 * x * x * x + 3 * x * x + 2 * x;
	}
	var xbeg = 0;
	var xend = 1;
	var N1 = 8;
	var N2 = 16;
	
	// Rectangle rule (begin point)
	var Arectbeg1 = integRectNBeg(func, xbeg, xend, N1);
	var Arectbeg2 = integRectNBeg(func, xbeg, xend, N2);
	var Errrectbeg = Math.abs(Arectbeg2 - Arectbeg1);
	console.log("rect-beg", Arectbeg2, Errrectbeg);
	
	// Rectangle rule (end point)
	var Arectend1 = integRectNEnd(func, xbeg, xend, N1);
	var Arectend2 = integRectNEnd(func, xbeg, xend, N2);
	var Errrectend = Math.abs(Arectend2 - Arectend1);
	console.log("rect-end", Arectend2, Errrectend);
	
	// Rectangle rule (mid point)
	var Arectmid1 = integRectNMid(func, xbeg, xend, N1);
	var Arectmid2 = integRectNMid(func, xbeg, xend, N2);
	var Errrectmid = Math.abs(Arectmid2 - Arectmid1);
	console.log("rect-mid", Arectmid2, Errrectmid);
	
	// Trapezium rule
	var Atrapez1 = integTrapezN(func, xbeg, xend, N1);
	var Atrapez2 = integTrapezN(func, xbeg, xend, N2);
	var Errtrapez = Math.abs(Atrapez2 - Atrapez1);
	console.log("trapez", Atrapez2, Errtrapez);
	
	// Simpson's rule
	var Asimps1 = integSimpsN(func, xbeg, xend, N1);
	var Asimps2 = integSimpsN(func, xbeg, xend, N2);
	var Errsimps = Math.abs(Asimps2 - Asimps1);
	console.log("simps", Asimps2, Errsimps);
	
	// Simpson's 3/8 rule
	var Asimps381 = integSimps38N(func, xbeg, xend, N1);
	var Asimps382 = integSimps38N(func, xbeg, xend, N2);
	var Errsimps38 = Math.abs(Asimps382 - Asimps381);
	console.log("simps-3/8", Asimps382, Errsimps38);
	
	// Boole's rule
	var Aboole1 = integBooleN(func, xbeg, xend, N1);
	var Aboole2 = integBooleN(func, xbeg, xend, N2);
	var Errboole = Math.abs(Aboole2 - Aboole1);
	console.log("boole", Aboole2, Errboole);
	
	// Milne's rule
	var Amilne1 = integMilneN(func, xbeg, xend, N1);
	var Amilne2 = integMilneN(func, xbeg, xend, N2);
	var Errmilne = Math.abs(Amilne2 - Amilne1);
	console.log("milne", Amilne2, Errmilne);
}

// 20180303.1811 ok
function test_integration_milne_error() {
	var error = 1E-5;
	var xbeg = 0;
	var xend = 1;
	var A = integMilneError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 4 * x * x * x + 3 * x * x + 2 * x;
	}
}

// 20180303.1754 ok
function test_integration_boole_error() {
	var error = 1E-5;
	var xbeg = 0;
	var xend = 1;
	var A = integBooleError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 4 * x * x * x + 3 * x * x + 2 * x;
	}
}

// 20180303.1742 ok
function test_integration_simpson_38_error() {
	var error = 1E-5;
	var xbeg = 0;
	var xend = 1;
	var A1 = integSimpsError(func, xbeg, xend, error);
	var A2 = integSimps38Error(func, xbeg, xend, error);
	console.log(A1, A2);
	
	// Define integrand
	function func(x) {
		return 4 * x * x * x + 3 * x * x + 2 * x;
	}
}

// 20180303.1720 ok
function test_integration_simpson_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integSimpsError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1714 ok
function test_integration_trapez_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integTrapezError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1710 ok
function test_integration_rect_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integRectError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1658 ok
function test_integration_rect_n_segments() {
	var N = 0;
	var Arectbeg = 0;
	var Arectmid = 0;
	var Arectend = 0;
	var xbeg = 0;
	var xend = 1;
	
	N = 1;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 10;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 100;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 1000;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);
	
	// Define integrand
	function func(x) {
		return x;
	}
}