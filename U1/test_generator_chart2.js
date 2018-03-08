/*
	test_generator_chart2.js
	Test of showing data produced by generator in a chart2
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180302
	Create this test function.
*/

// 20180302.1434 ok
function test_generator_chart2() {
	// Create left div
	var divL = document.createElement("div");
	divL.style.background = "#f0fff0";
	divL.style.float = "left";
	divL.style.width = "250px";
	
	// Create right div
	var divR = document.createElement("div");
	divR.style.background = "#fff0f0";
	
	// Create textarea
	var ta = document.createElement("textarea");
	ta.style.height = "170px";
	ta.style.width = "200px";
	
	// Create canvas
	var can = document.createElement("canvas");
	can.id = "Chart-Water";
	can.style.background = "#ffe";
	can.width = "400";
	can.height = "200";
	can.style.width = "400px";
	can.style.height = "200";
	
	// Define variable for Chart 2;
	var chart;
	
	// Create buttons
	var btn1 = document.createElement("button");
	btn1.id = "Series";
	btn1.innerHTML = "Series";
	var btn2 = document.createElement("button");
	btn2.id = "Polynomial";
	btn2.innerHTML = "Polynomial";
	var btn3 = document.createElement("button");
	btn3.id = "Random";
	btn3.innerHTML = "Random";
	
	// Set elements layout
	document.body.appendChild(divL);
		divL.appendChild(ta);
		divL.appendChild(btn1);
		divL.appendChild(btn2);
		divL.appendChild(btn3);
	document.body.appendChild(divR);
		divR.appendChild(can);
			chart = new Chart2("Chart-Water");

	// Add event to buttons
	btn1.addEventListener("click", buttonClick);
	btn2.addEventListener("click", buttonClick);
	btn3.addEventListener("click", buttonClick);
	
	// Set some chart property
	chart.setXLabel("t");
	chart.setYLabel("Q");
	
	// Create event
	function buttonClick() {
		var id = event.target.id;
		var res;
		var N = 11;
		if(id == "Series") {
			var series = [0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0];
			res = new Generator("water");
			res.setSeries(series);
			ta.value = xyToString();
			
			function xyToString() {
				var xyStr = "";
				for(var i = 0; i < N; i++) {
					xyStr += i + "\t";
					xyStr += series[i];
					if(i < N - 1) {
						xyStr += "\n";
					}
				}
				return xyStr;
			}
		}
		if(id == "Polynomial") {
			var coefs = [
				6E-10,
				4.41231,
				1.6573,
				-1.1084,
				0.1678,
				-0.0077
			];
			res = new Generator("water");
			res.setPolynomial(coefs);
			ta.value = coefToString();
			
			function coefToString() {
				var Nc = coefs.length;
				var coefStr = "";
				for(var i = 0; i < Nc; i++) {
					coefStr += "c" + i + "\t";
					coefStr += coefs[i];
					if(i < Nc - 1) {
						coefStr += "\n";
					}
				}
				return coefStr;
			}
		}
		if(id == "Random") {
			res = new Generator("water");
			res.setRandomInt(0, 2);
			ta.value = "min\t0\nmax\t2";
		}
		if(res != undefined) {
			var x = [];
			var y = [];
			for(var i = 0; i < N; i++) {
				x.push(i);
				y.push(res.value());
			}
			var series = new XYSeries("Water", x, y);
			chart.addSeries(series);
			chart.drawSeries("Water");
		}
	}
}
