/*
	test_generator.js
	Test library of generator objects
	
	Sparisoma Virid | dudung@gmail.com
	
	20180301
	Create this test function three different
	source are tested and ok.
*/

// 20180301.1813 ok
function test_generator_polynomial() {
	var coefs = [3, -4, 1];
	var res = new Generator("water");
	res.setPolynomial(coefs);
	for(var i = 0; i < 5; i++) {
		console.log(res.value());
	}
}

// 20180301.1750 ok
function test_generator_series() {
	var series = [1, 10, 2];
	var N = series.length;
	var res = new Generator("water");
	res.setSeries(series);
	for(var i = 0; i < 3 * N; i++) {
		console.log(res.value());
	}
}

// 20180301.1738 ok
function test_generator_randomint() {
	var res = new Generator("water");
	res.setRandomInt(2, 5);
	var N = 10;
	for(var i = 0; i < N; i++) {
		console.log(res.value());
	}
}