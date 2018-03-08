/*
	exam.js
	Represent problems for exam in JS
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this library.
	20180304
	Continue improving this library.
*/

// 20180304.1658 ok
function executeScript(target, menu) {
	var target = window.event.target;
	var value = target.value;
	var idx = target.selectedIndex;
	var script = menu[idx][1];
	script();
}

// 20180306.0514 ok
function examThreeGrains() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	var sel = window.event.target;
	
	// Execute a test function
	test_define_rectangle();

	// 20180213.0751-1512 ok
	function test_define_rectangle() {
		// Define a box coordinates
		/*
				z
				|
				
				H           G
				 .---------.
				/         /|
		 E /       F / |
			.---------.  |
			|  .      |  .
			| D       | / C
			|         |/
			.---------.    -- x
		 A           B
		*/
		var s = 1;
		var rA = new Vect3(0, 0, 0);
		var rB = new Vect3(s, 0, 0);
		var rC = new Vect3(s, s, 0);
		var rD = new Vect3(0, s, 0);
		var rE = new Vect3(0, 0, s);
		var rF = new Vect3(s, 0, s);
		var rG = new Vect3(s, s, s);
		var rH = new Vect3(0, s, s);
		
		// Define box sides
		var surf = new Grid4();
		var sides = [];
		surf = new Grid4(rE, rF, rB, rA);
		sides.push(surf);
		surf = new Grid4(rF, rG, rC, rB);
		sides.push(surf);
		surf = new Grid4(rG, rH, rD, rC);
		sides.push(surf);
		surf = new Grid4(rH, rE, rA, rD);
		sides.push(surf);
		surf = new Grid4(rE, rH, rG, rF);
		sides.push(surf);
		
		// Defina spherical particles
		var p = new Sphere();
		var pars = [];
		p = new Sphere();
		p.m = 4;
		p.d = 0.2;
		p.r = new Vect3(0.25, 0.25, 0.25);
		p.v = new Vect3(0.1, 0.05, 0);
		pars.push(p);
		p = new Sphere();
		p.m = 6;
		p.d = 0.3;
		p.r = new Vect3(0.25, 0.5, 0.25);
		p.v = new Vect3(0.0, 0.05, 0);
		pars.push(p);
		p = new Sphere();
		p.m = 2;
		p.d = 0.1;
		p.r = new Vect3(0.8, 0.8, 0.25);
		p.v = new Vect3(-0.02, 0.05, 0);
		pars.push(p);
		
		// Define world coordinate
		var xmin = -0.1;
		var ymin = -0.1;
		var xmax = 1.1;
		var ymax = 1.1;
		
		// Define canvas size
		var canvasWidth = 150;
		var canvasHeight = 150;
		
		// Define canvas coordinate
		var XMIN = 0;
		var YMIN = canvasHeight;
		var XMAX = canvasWidth;
		var YMAX = 0;
		
		// Create a canvas
		var c = document.createElement("canvas");
		c.id = "drawingboard";
		c.width = canvasWidth;
		c.height = canvasHeight;
		c.style.border = "1px solid #ccc";
		
		// Create some divs
		var d;
		d	= document.createElement("div");
		d.id = "ekin";
		document.body.appendChild(d);
		d	= document.createElement("div");
		d.id = "hidtext";
		document.body.appendChild(d);
		
		// Draw a circle
		function drawSphere(id, s, color) {
			var cx = document.getElementById(id).getContext("2d");
			cx.strokeStyle = color;
			cx.beginPath();
			var rr = transform({x: s.r.x, y: s.r.y});
			var rr2 = transform({x: s.r.x + s.d, y: s.r.y});
			var DD = rr2.x - rr.x;
			cx.arc(rr.x, rr.y, 0.5 * DD, 0, 2 * Math.PI);
			cx.stroke();
		}
		
		// Draw sides of rectangle
		function drawRectangles(id, surfs, color) {
			var cx = document.getElementById(id).getContext("2d");
			cx.strokeStyle = color;
			var N = surfs.length;
			for(var i = 0; i < N; i++) {
				var M = surfs[i].p.length;
				cx.beginPath();
				for(var j = 0; j < M; j++) {
					var s = surfs[i];
					var rr = transform({x: s.p[j].x, y: s.p[j].y});
					if(j == 0) {
						cx.moveTo(rr.x, rr.y);
					} else {
						cx.lineTo(rr.x, rr.y);
					}
				}
				cx.stroke();
			}
		}
		
		// Clear canvas with color
		function clearCanvas() {
			var id = arguments[0];
			var el = document.getElementById(id);
			var color = arguments[1];
			var cx = el.getContext("2d");
			cx.fillStyle = color;
			cx.fillRect(0, 0, c.width, c.height);
		}
		
		// Transform (x, y) to (X, Y)
		function transform(r) {
			var X = (r.x - xmin) / (xmax - xmin) * (XMAX - XMIN);
			X += XMIN;
			var Y = (r.y - ymin) / (ymax - ymin) * (YMAX - YMIN);
			Y += YMIN;
			return {x: X, y: Y};
		}
		
		// Collide particle and a rectangle surface
		function collide(p, surf) {
			// Declare force variable
			var F = new Vect3();
			
			// Define constants
			var kN = 100;
			var gN = 0.2;
			
			if(arguments[1] instanceof Grid4) {
				// Get colliding objects
				var p = arguments[0];
				var surf = arguments[1];
				
				// Calculate normal vector
				var r10 = Vect3.sub(surf.p[1], surf.p[0]);
				var r21 = Vect3.sub(surf.p[2], surf.p[1]);
				var n = Vect3.cross(r10, r21);
				
				// Calculate distance from surface
				var r = p.r;
				var dr = Vect3.sub(r, surf.p[0]);
				var h = Math.abs(Vect3.dot(dr, n));
				
				// Calculate overlap
				var xi = Math.max(0, 0.5 * p.d - h);
				var xidot = Vect3.dot(p.v, n);
				
				// Calculate force
				var f = (xi > 0) ? kN * xi - gN * xidot : 0;
				F = Vect3.mul(f, n);
			} else {
				// Get colliding objects
				var p0 = arguments[0];
				var p1 = arguments[1];
				
				// Calculate overlap
				var r10 = Vect3.sub(p1.r, p0.r);
				var l10 = r10.len();
				var n = r10.unit();
				var v10 = Vect3.sub(p1.v, p0.v);
				var xi = Math.max(0, 0.5 * (p1.d + p0.d) - l10);
				var xidot = Vect3.dot(v10, n);
				
				// Calculate force
				var f = (xi > 0) ? kN * xi - gN * xidot : 0;
				var m0 = p0.m;
				var m1 = p1.m;
				var mu = (m1 * m0) / (m0 + m1);
				f /= mu;
				F = Vect3.mul(f, n);
			}
			
			// Return force value
			return F;
		}
		
		var TBEG = new Date().getTime()
		console.log("BEG: " + TBEG);
		var tbeg = 0;
		var tend = 1000;
		var dt = 5E-2;
		var t = tbeg;
		var NT = 100;
		var iT = 0;
		var NT2 = 10;
		var iT2 = 0;
		
		// 20180222.2117
		var div = document.createElement("div");
		div.style.textAlign = "center";
		var b1 = document.createElement("button");
		b1.innerHTML = "Start";
		div.append(c);
		div.appendChild(b1);
		eout.append(div);
		var ekin = document.createElement("div");
		ekin.id = "ekin";
		div.append(ekin);
		
		var iter;
		
		b1.addEventListener("click", function() {
			if(b1.innerHTML == "Start") {
				b1.innerHTML = "Stop";
				sel.disabled = true;
				iter = setInterval(simulate, 5);
			} else {
				b1.innerHTML = "Start";
				clearInterval(iter);
				sel.disabled = false;
			}
		});
				
		function calculate() {
			var M = pars.length;
			
			for(var j = 0; j < M; j++) {
				var p = pars[j];
				
				// Calculate force with wall
				var SF = new Vect3();
				var N = sides.length;
				for(var i = 0; i < N; i++) {
					var F = collide(p, sides[i]);
					SF = Vect3.add(SF, F);
				}
				
				// Calculate force with other particles
				for(var i = 0; i < M; i++) {
					if(i != j) {
						var F = collide(pars[i], pars[j]);
						SF = Vect3.add(SF, F);
					}
				}
				
				// Calculate acceleration
				p.a = Vect3.div(SF, p.m);
				
				// Perform Euler numerical integration
				p.v = Vect3.add(p.v, Vect3.mul(p.a, dt));
				p.r = Vect3.add(p.r, Vect3.mul(p.v, dt));
			}
			
			// Increase time
			t += dt;
			
			// Stop simulation
			if(t > tend) {
				clearInterval(iter);
				var TEND = new Date().getTime();
				console.log("END: " + TEND);
				var TDUR = TEND - TBEG;
				console.log("DUR: " + TDUR);
			}
		}
		
		function simulate() {
			calculate();
			
			iT++;
			iT2++;
			
			if(iT2 >= NT2) {
				// Clear and draw
				clearCanvas("drawingboard", "#fff");
				drawRectangles("drawingboard", sides, "#f00");
				var M = pars.length;
				for(var j = 0; j < M; j++) {
					drawSphere("drawingboard", pars[j], "#00f");
				}
				iT2 = 0;
			}
			if(iT >= NT) {
				// Calculate total kenetic energy
				var K = 0;
				var M = pars.length;
				for(var j = 0; j < M; j++) {
					var v = pars[j].v.len();
					var m = pars[j].m;
					K += (0.5 * m * v * v);
				var sK = K.toExponential(2)
				}
				var aa = sK.split("e")[0];
				var bb = sK.split("e")[1];
				var textEkin = "<i>K</i> = " + aa
					+ " &times; 10<sup>" + bb + "</sup> J";
				ekin.innerHTML = textEkin;
				
				iT = 0;
			}
		}
	}
}

// 20180305.2023 ok
function examRandomLines() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var w = 200;
	var h = 200;
	
	var can = createCanvasWithId("drawingArea", w, h);
	eout.appendChild(can);
	var cx = can.getContext("2d");
	
	var i = 0;
	var di = 1;
	var iend = 1000;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(randomLine, 10);
	
	var x = w / 2;
	var y = h / 2;
	
	function randomLine() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		
		var theta = randInt(-180, 180);
		var dr = 10;
		var dx = dr * Math.cos(theta * Math.PI / 180);
		var dy = dr * Math.sin(theta * Math.PI / 180);
		
		var j = (i / iend) * 255;
		cx.strokeStyle = int2rgb(255 - j, 0, j);
		cx.beginPath();
		cx.moveTo(x, y);
		x += dx;
		if(x > w || x < 0) x -= dx;
		y += dy;
		if(y > h || y < 0) y -= dy;
		cx.lineTo(x, y);
		cx.stroke();
		
		i += di;
	}
		
	function createCanvasWithId(id, w, h) {
		var can = document.createElement("canvas");
		can.width = w;
		can.height = h;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.style.border = "1px solid #bbb";
		can.id = id;
		return can;
	}
}


// 20180305.1948 ok
function examToggleButton() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var div = document.createElement("div");
	div.style.width = "40px";
	div.style.height = "40px";
	div.style.border = "1px solid #000";
	div.style.background = "#eee";
	
	var btn = document.createElement("button");
	btn.innerHTML = "Off";
	btn.style.width = "42px";
	btn.style.height = "20px";
	btn.addEventListener("click", switchOnOff);
	
	eout.appendChild(div);
	eout.appendChild(btn);
	
	function switchOnOff() {
		var btn = window.event.target;
		if(btn.innerHTML == "Off") {
			btn.innerHTML = "On";
			div.style.background = "#faa";
		} else {
			btn.innerHTML = "Off";
			div.style.background = "#eee";
		}
	}
}

// 20180304.2142 ok
function examChartXY() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";
		
	eout.appendChild(ecan);
	
	var x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	var y = [-7, 0, 5, 8, 9, 8, 5, 0, -7];
	var series = new XYSeries("series1", x, y);
	var chart = new Chart2("drawingArea");
	chart.yAxis.Ntics = 4;
	chart.xAxis.Ntics = 8;
	chart.addSeries(series);
	chart.drawSeries("series1");
}

// 20180304.2107 ok
function examTextareaMatrix() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var elef = document.createElement("div");
	elef.style.width = "125px";
	elef.style.float = "left";
	
	var erig = document.createElement("div");
	erig.style.float = "left";
	erig.style.padding = "4px 50px 4px 50px";
	erig.id = "mathjax-matrix"
	
	var etxa = document.createElement("textarea");
	etxa.style.width = "120px";
	etxa.style.height = "120px";
	etxa.style.overflowY = "scroll"
	etxa.value = "1 2 3 4\n"
	+ "0 4 0 4\n"
	+ "1 3 9 7\n"
	+ "6 4 5 8";
	
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "MathJax matrix";
	ebtn.style.width = "125px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa);
		elef.appendChild(ebtn);
	eout.appendChild(erig);
	
	function btnClick() {
		var content = etxa.value;
		var lines = content.split("\n");
		var M = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length; i++) {
				var Mel = words[i];
				row.push(Mel);
			}
			M.push(row);
		}
		
		var ROW = M.length;
		
		var latex = "\\begin{equation}\n"
			+ "M = \\left[\n"
			+ "\\begin{array}\n";
		var COL = M[0].length;
		latex += "{" + "c".repeat(COL) + "}\n";
		for(var j = 0; j < ROW; j++) {
			var arow = M[j];
			var COL = arow.length;
			for(var i = 0; i < COL; i++) {
				latex += M[j][i];
				if(i < COL - 1) {
					latex += " & ";
				} else {
					latex += " \\\\\n";
				}
			}
		}
		latex += "\\end{array}\n"
			+ "\\right]\n"
			+ "\\end{equation}";
		
		updateMath("mathjax-matrix", latex)
	}
}

// 20180304.1608 ok
function examTable() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "";
	var data = [
		["t", "v", "x"],
		[0, 0, 0],
		[1, 2, 1],
		[2, 4, 4],
		[3, 6, 9],
		[4, 8, 16],
		[5, 10, 25]
	];
	var tab = document.createElement("table");
	tab.style.background = "#fee";
	var ROW = data.length;
	for(var j = 0; j < ROW; j++) {
		var row = document.createElement("tr");
		if(j == 0) {
			row.style.background = "#fde";
			row.style.fontWeight = "bold";
			row.style.fontStyle = "italic";
			row.style.fontFamily = "Times";
			row.style.color = "red";
		} else {
			row.style.background = "#ffe";
		}
		var dataRow = data[j];
		var COL = dataRow.length;
		for(var i = 0; i < COL; i++) {
			var dataCol = dataRow[i];
			var col = document.createElement("td");
			col.style.border = "1px solid #fde";
			col.style.width = "80px";
			col.style.textAlign = "center";
			col.innerHTML = dataCol;
			row.appendChild(col);
		}
		tab.appendChild(row);
	}
	div.appendChild(tab);
}

// 20180304.0929 ok
function examSimpleStatistics() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var min = 2;
	var max = 10;
	var N = 20;
	var x = randIntN(min, max, N);
	var xsum = 0;
	for(var i = 0; i < N; i++) {
		xsum += x[i];
	}
	var xavg = xsum / N;
	var str = "xmin = " + min + "<br/>";
	str += "xmax = " + max + "<br/>";
	str += "xsum = " + xsum + "<br/>";
	str += "x = [" + x + "]<br/>";
	str += "N = " + N + "<br/>";
	str += "xavg = " + xavg;
	div.innerHTML = str;
}

// 20180304.0617 ok
function examProgressBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var i = 0;
	var di = 5;
	var iend = 100;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(progressBar, 100);
	
	function progressBar() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		var N = Math.round(i / di);
		var s = "=".repeat(N) + " " + i + " %";
		div.innerHTML = s;
		i += di;
	}
}

// 20180304.0553 ok
function examButtonClick() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var btn = document.createElement("button");
	btn.style.width = "120px";
	btn.innerHTML = "Not yet clicked";
	btn.addEventListener("click", buttonClick);
	div.appendChild(btn);
	var clicked = 0;
	
	function buttonClick() {
		clicked++;
		var target = window.event.target;
		if(clicked == 1) {
			target.innerHTML = "Clicked once";
		} else if(clicked == 2) {
			target.innerHTML = "Clicked twice";
		} else {
			target.innerHTML = "Clicked " + clicked + " times";
		}
	}
}

// 20180304.0545 ok
function examColorBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	N = 16;
	for(var i = 0; i < N; i++) {
		var sp = document.createElement("span");
		var x = i * 16 - 1;
		var color = int2rgb(255, 255 - x, 255 -x );
		sp.style.background = color;
		sp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;\
		&nbsp;&nbsp;&nbsp;&nbsp;";
		div.appendChild(sp);
	}
}

// 20180304.0530 ok
function examLetterConfiguration() {
	var div = document.getElementById("scriptResult");
	var str = "Computation";
	var N = str.length;
	var str2 = "";
	for(var i = 0; i < N; i++) {
		str2 += str.substring(0, i + 1) + "<br/>";
	}
	div.innerHTML = str2;
}

// 20180304.0004 ok
function examDrawCircle() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var can = document.createElement("canvas");
	div.appendChild(can);
	var cx = can.getContext("2d");
	cx.fillStyle = "#aaf";
	cx.strokeStyle = "#f00";
	cx.lineWidth = 3;
	cx.beginPath();
	cx.arc(50, 50, 40, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
}

// 20180303.2347 ok
function examMathJaxRootFormula() {
	var div = document.getElementById("scriptResult");	
	var str = "";
	str += "\\begin{equation}";
	str += "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
	str += "\\end{equation}";
	updateMath("scriptResult", str);
}

// 20180303.2308 ok
function examDisplaySeries() {
	var div = document.getElementById("scriptResult");
	var N = 10;
	var str = "";
	for(var i = 0; i < N; i++) {
		str += i + "<br/>";
	}
	div.innerHTML = str;
}

// 20180303.2249 ok
function examClear() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";	
}

// 20180303.2249 ok
function examHelloWorld() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "Hello, World!";
}

// 20180304.0937 ok
function executeFunctionByValue(value) {
	switch(value) {
		case "Select problems":
			examClear();
			break;
		case "Hello world":
			examHelloWorld();
			break;
		case "Letter configuration":
			examLetterConfiguration();
			break;
		case "Display series":
			examDisplaySeries();
			break;
		case "Root formula":
			examMathJaxRootFormula();
			break;
		case "Draw circle":
			examDrawCircle();
			break;
		case "Color bar":
			examColorBar();
			break;
		case "Button click":
			examButtonClick();
			break;
		case "Progress bar":
			examProgressBar();
			break;
		case "Simple statistics":
			examSimpleStatistics();
			break;
		case "Table":
			examTable();
			break;
		default:
	}
}
