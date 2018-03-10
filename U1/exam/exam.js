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
		p.m = 4;
		p.d = 0.2;
		p.r = new Vect3(0.25, 0.5, 0.25);
		p.v = new Vect3(0.0, 0.05, 0);
		pars.push(p);
		p = new Sphere();
		p.m = 4;
		p.d = 0.2;
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
	var theta = randInt(-180, 180);
	var tid = setInterval(randomLine, 10);
	
	var x = w / 2;
	var y = h / 2;
	
	function randomLine() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		
		
		if((randInt(0,2)/2)<0.5){
			theta += 90;
		}else{
			theta -= 90;
		}
		
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
	
	var div1 = document.createElement("div");
	div1.style.display = "inline-block";
	div1.style.width = "40px";
	div1.style.height = "40px";
	div1.style.border = "1px solid #000";
	div1.style.background = "#eee";
	
	var btn1 = document.createElement("button");
	btn1.innerHTML = "Off";
	btn1.style.width = "42px";
	btn1.style.height = "20px";
	btn1.addEventListener("click", switchOnOff1);
	
	var div2 = document.createElement("div");
	div2.style.display = "inline-block";
	div2.style.width = "40px";
	div2.style.height = "40px";
	div2.style.border = "1px solid #000";
	div2.style.background = "#eee";

	var btn2 = document.createElement("button");
	btn2.innerHTML = "Off";
	btn2.style.width = "42px";
	btn2.style.height = "20px";
	btn2.addEventListener("click", switchOnOff2);

	var div3 = document.createElement("div");
	div3.style.display = "inline-block";
	div3.style.width = "40px";
	div3.style.height = "40px";
	div3.style.border = "1px solid #000";
	div3.style.background = "#eee";

	var btn3 = document.createElement("button");
	btn3.innerHTML = "Off";
	btn3.style.width = "42px";
	btn3.style.height = "20px";
	btn3.addEventListener("click", switchOnOff3);

	eout.appendChild(div1);
	eout.appendChild(div2);
	eout.appendChild(div3);
	var enter = document.createElement("br");
	eout.appendChild(enter);
	eout.appendChild(btn1);
	eout.appendChild(btn2);
	eout.appendChild(btn3);
	
	function switchOnOff1() {
		//var btn = window.event.target;
		if(btn1.innerHTML == "Off") {
			btn1.innerHTML = "On";
			div1.style.background = "#faa";
		} else {
			btn1.innerHTML = "Off";
			div1.style.background = "#eee";
		}
	}

	function switchOnOff2() {
		//var btn = window.event.target;
		if(btn2.innerHTML == "Off") {
			btn2.innerHTML = "On";
			div2.style.background = "#9aff9a";
		} else {
			btn2.innerHTML = "Off";
			div2.style.background = "#eee";
		}
	}

	function switchOnOff3() {
		//var btn = window.event.target;
		if(btn3.innerHTML == "Off") {
			btn3.innerHTML = "On";
			div3.style.background = "#a9ebf7";
		} else {
			btn3.innerHTML = "Off";
			div3.style.background = "#eee";
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
	
	A=2;
	T=10;
	tmax=10;

	var t =[];
	var x =[];
	for(i=0; i<tmax+1; i++){
		t.push(i);
		x.push(A*Math.sin(2*Math.PI*i/T));
	}

	var series = new XYSeries("series1", t, x);
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
	etxa.style.width = "150px";
	etxa.style.height = "150px";
	etxa.style.overflowY = "scroll"
	etxa.value = "\\frac{1}{10} 2 3 \\log{3}{9}\n"
	+ "0 4 \\sin{x^2} 4\n"
	+ "1 -\\exp{y} 9 7\n"
	+ "6 4 5 \\frac{z}{x}";
	
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
	t=10;
	T=10;
	A=2;

	data = [];
	data[0] = ["t","x","y"];
	for(i=1; i<t+1; i++){
			data[i] = 
			[	i, 
				Number.parseFloat(A*Math.cos(2*Math.PI*i/T)).toFixed(3),
				Number.parseFloat( A*Math.sin(2*Math.PI*i/T)).toFixed(3)
			];
	}	

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
	var xmed =0;
	for(var i = 0; i < N; i++) {
		xsum += x[i];
	}
	var xavg = xsum / N;

	//insertion sort
	for(i=1; i<N; i++){
		for(j=0; j<N; j++){
			if (x[j] > x[j+1] ) {
				dummy = x[j];
				x[j]= x[j+1];
				x[j+1] = dummy;
			}	
		}	
	}

	if( N%2 ==0 ){
		xmed = 0.5*( x[Math.floor(N/2-1)] + x[(Math.floor(N/2-1)+1)] ) ;
	}else{
		xmed = x[ Math.floor(N/2-1)+1 ];
	}

	sumasi = 0;
	for(i=0; i<N; i++){
		sumasi += Math.pow(x[i]-xavg,2);	
	}
	xdev = Math.sqrt( sumasi/(N-1) );

	var str = "xmin = " + min + "<br/>";
	str += "xmax = " + max + "<br/>";
	str += "xsum = " + xsum + "<br/>";
	str += "x = [" + x + "]<br/>";
	str += "N = " + N + "<br/>";
	str += "xavg = " + xavg + "<br/>";
	str += "xmed = " + xmed + "<br/>";
	str += "xdev = " + Number.parseFloat(xdev).toFixed(2);
	div.innerHTML = str;
}

// 20180304.0617 ok
function examProgressBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var i = 0;
	var di = 2;
	var iend = 100;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(progressBar, 200);
	
	function progressBar() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		var N = Math.round(i / di);
		var s = "#".repeat(N) + " " + i + " %";
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

	var btn2 = document.createElement("button");
	btn2.style.width = "120px";
	btn2.innerHTML = "Not yet clicked";
	btn2.addEventListener("click", buttonClick2);
	div.appendChild(btn2);

	var clicked1 = 0; //untuk simpan jumlah klik tombol1
	var clicked2 = 0; //untuk simpan jumlah klik tombol2

	function buttonClick() {
		clicked2++;
		//var target = window.event.target;
		if(clicked2 == 1) {
			btn2.innerHTML = "Clicked once";
		} else if(clicked2 == 2) {
			btn2.innerHTML = "Clicked twice";
		} else if(clicked2==0){
			btn2.innerHTML="Not yet clicked";
		}else{
			btn2.innerHTML = "Clicked " + clicked2 + " times";
		}
	}

	function buttonClick2() {
		clicked1++;
		//var target = window.event.target;
		if(clicked1 == 1) {
			btn.innerHTML = "Clicked once";
		} else if(clicked1 == 2) {
			btn.innerHTML = "Clicked twice";
		} else if(clicked1==0){
			btn.innerHTML="Nozt yet clicked";
		} else{
			btn.innerHTML = "Clicked " + clicked1 + " times";
		}
	}

}

// 20180304.0545 ok
function examColorBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	N = 16;
	for(var i = N; i >-1 ; i--) {
		var sp = document.createElement("span");
		var x = i * 16 - 1;
		var color = int2rgb(0, 255 - x, 0 ); //color/rgb.js
		sp.style.background = color;
		sp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;\
		&nbsp;&nbsp;&nbsp;&nbsp;";
		div.appendChild(sp);
	}
}

// 20180304.0530 ok
function examLetterConfiguration() {
	var div = document.getElementById("scriptResult");
	var str = "Komputasi Sistem Fisis";
	var N = str.length +3;
	var str2 = "";
	while(N>-1) {
		str2 += str.substring(0, N - 3) + "<br/>";
		N = N-3;
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
	cx.fillStyle = "#33ccff";
	cx.strokeStyle = "#0000cc";
	cx.lineWidth = 6;
	cx.beginPath();
	cx.arc(50, 50, 40, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();

	cx.fillStyle = "#99ff99";
	cx.strokeStyle = "#009900";
	cx.lineWidth = 6;
	cx.beginPath();
	cx.arc(136, 50, 40, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();

	cx.fillStyle = "#ffcccc";
	cx.strokeStyle = "#cc0000";
	cx.lineWidth = 6;
	cx.beginPath();
	cx.arc(222, 50, 40, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
}

// 20180303.2347 ok
function examMathJaxRootFormula() {
	var div = document.getElementById("scriptResult");	
	var str = "";
	/*
	str += "\\begin{equation}";
	str += "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
	str += "\\end{equation}";
	*/
	str += "\\begin{equation} ax^2 + bx + c = 0 \\tag{1} \\end{equation}"
	str +="\\begin{equation}x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}  \\tag{2} \\end{equation}"
	str += "\\begin{equation} x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0 \\tag{3} \\end{equation}"
	str += "\\begin{equation} (x-x_1)(x-x_2) = 0 \\tag{4} \\end{equation}"
	str += "\\begin{equation} x_1 +x_2 = - \\frac{b}{a} \\tag{5} \\end{equation}"
	str += "\\begin{equation} x_1 \\cdot x_2 =\\frac{c}{a} \\tag{6} \\end{equation}"
	updateMath("scriptResult", str);
}

function examTextareaAndChartXY(){
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";

	var etxa = document.createElement("textarea");
	etxa.style.width = "150px";
	etxa.style.height = "150px";
	etxa.style.overflowX = "scroll";
	etxa.value = "x= 1 2 3 4 5 6\n"
	+"y= 6 5 4 3 2 1";

	var btn = document.createElement("button");
	btn.innerHTML = "Plot Data";
	btn.style.width = "125px";
	btn.addEventListener("click", Click);

	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";

	eout.appendChild(etxa);
	eout.appendChild(btn);
	eout.appendChild(ecan);

	function Click (){
		var content = etxa.value;
		var lines = content.split("\n");
		var M = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length-1; i++) {
				if(words[i] != "x=" ||  words[i] != "y=" ){
					var Mel = words[i+1];
					row.push(Mel);
				}
			}
			M.push(row);
		}

		var x = [];
		var y = [];
		for(i = 0; i<M[0].length; i++){
			x[i] = parseFloat(M[0][i]);
		};
		for(j = 0; j<M[1].length; j++){
			y[j] = parseFloat(M[1][j]);
		};

		var series = new XYSeries("series1", x, y);
		var chart = new Chart2("drawingArea");
		chart.yAxis.Ntics = 4;
		chart.xAxis.Ntics = 8;
		chart.addSeries(series);
		chart.drawSeries("series1");
	};

}

function examArrayOfCircle(){
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	div.style.width = "500px";
	div.style.height= "500px";
	var can = document.createElement("canvas");
	can.width = "500";
	can.height = "500";
	div.appendChild(can);
	var cx = can.getContext("2d");

	for (i=1; i<5; i++){
		for(j=0; j<i; j++){
			cx.fillStyle = "#33ccff";
			cx.strokeStyle = "#0000cc";
			cx.lineWidth = 6;
			cx.beginPath();
			cx.arc( (2*j+1)*50,(2*i-1)*50, 40, 0, 2 * Math.PI);
			cx.fill();
			cx.stroke();
		}
	}
}

function examDrawCircularMotion(){
	// Create a div container
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	div.style.width = "500px";
	div.style.height= "500px";
	
	// Create buttons
	var b3 = document.createElement("button");
	b3.innerHTML = "Start";
	b3.style.width = "50px";
	b3.addEventListener("click", toggle);
	
	var c = document.createElement("canvas");
	c.id = "drawingboard";
	c.width = 400;
	c.height = 400;
	c.style.border = "1px solid #ccc";
	
	div.appendChild(c);
	div.appendChild(b3);

	// Define physical parameters
	var A = 50;
	var T = 10;
	var xc = 200;
	var yc = 200;
	var t = 0;

	// Define variable for setInterval
	var cf;
	var SIMULATING = false;
	
	// Start and stop simulation
	function toggle() {
		if(!SIMULATING) {
			b3.innerHTML = "Stop";
			cf = setInterval(simulate, 100);
		} else {
			b3.innerHTML = "Start";
			clearInterval(cf);
		}
		SIMULATING = !SIMULATING;
	}
	
	// Perform simulation
	function simulate() {
		clear("drawingboard", "#fff");
		var x = xc + A*Math.cos(2*Math.PI*t/T);
		var y = yc + A*Math.sin(2*Math.PI*t/T);
		drawCircle("drawingboard", x, y, "#f00");
		
		t++;
		if(t>10){
			t=0;
		}
	}
	
	// Draw a circle
	function drawCircle(id, x, y, color) {
		var cx = document.getElementById(id).getContext("2d");
		cx.fillStyle = "#33ccff";
		cx.strokeStyle = color;
		cx.beginPath();
		cx.arc(x, y, 4, 0, 2 * Math.PI);
		cx.stroke();
		cx.fill();
	}
		
	// Clear textarea or canvas with color
	function clear() {
		var id = arguments[0];
		var el = document.getElementById(id);
		if(arguments.length == 1) {
			el.value = "";
		} else if(arguments.length == 2) {
			var color = arguments[1];
			var cx = el.getContext("2d");
			cx.fillStyle = color;
			cx.fillRect(0, 0, c.width, c.height);
		}
	}
		

}

function examDynamicColor(){
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	div.style.width = "500px";
	div.style.height= "500px";
	var can = document.createElement("canvas");
	can.width = "500";
	can.height = "500";
	div.appendChild(can);
	var cx = can.getContext("2d");

	var btn1 = document.createElement("button");
	btn1.innerHTML = "Start";
	btn1.style.width = "42px";
	btn1.style.height = "20px";
	var sel = window.event.target;
	sel.disabled = true;
	btn1.addEventListener("click", function() {
		if(btn1.innerHTML == "Start") {
			btn1.innerHTML = "Stop";
			sel.disabled = true;
			iter = setInterval(simulate, 5);
		} else {
			btn1.innerHTML = "Start";
			clearInterval(iter);
			sel.disabled = false;
		}
	});
	div.appendChild(btn1)

	var gb=0;
	var counter=0;
	function simulate(){
		var color = int2rgb(255, gb, gb );
		cx.fillStyle = color;
		cx.strokeStyle = "#0000cc";
		cx.lineWidth = 6;
		cx.beginPath();
		cx.arc( 250, 250, 200, 0, 2 * Math.PI);
		cx.fill();
		cx.stroke();
	
		if(counter%2 == 0){
			gb++;
			if(gb==255){
				counter++;
			}
		}else{
			gb--;
			if(gb==0){
				counter++;
			}
		}
	}




}

function examMatrixAdditionMathJax(){
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	eout.style.height = "400px";
	
	var elef = document.createElement("div");
	elef.style.width = "125px";
	elef.style.height = "250px"
	elef.style.float = "left";
	
	var erig = document.createElement("div");
	erig.style.float = "left";
	erig.style.padding = "4px 50px 4px 50px";
	erig.id = "mathjax-matrix"
	
	var etxa1 = document.createElement("textarea");
	etxa1.style.width = "150px";
	etxa1.style.height = "150px";
	etxa1.style.overflowY = "scroll"
	etxa1.value = "1 2 3\n"
	+ "4 5 6\n"
	+ "7 8 9\n"
	+ "10 11 12";

	var etxa2 = document.createElement("textarea");
	etxa2.style.width = "150px";
	etxa2.style.height = "150px";
	etxa2.style.overflowY = "scroll"
	etxa2.value = "1 2 3\n"
	+ "4 5 6\n"
	+ "7 8 9\n"
	+ "10 11 12";
	
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "Add Matrices";
	ebtn.style.width = "125px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa1);
		elef.appendChild(etxa2);
		elef.appendChild(ebtn);
	eout.appendChild(erig);
	
	function btnClick() {
		var content1 = etxa1.value;
		var lines1 = content1.split("\n");
		var M1 = [];
		for(var j = 0; j < lines1.length; j++) {
			var words1 = lines1[j].split(" ");
			var row1 = [];
			for(var i = 0; i < words1.length; i++) {
				var Mel1 = words1[i];
				row1.push(parseFloat(Mel1));
			}
			M1.push(row1);
		}
		var content2 = etxa2.value;
		var lines2 = content2.split("\n");
		var M2 = [];
		for(var j = 0; j < lines2.length; j++) {
			var words2 = lines2[j].split(" ");
			var row2 = [];
			for(var i = 0; i < words2.length; i++) {
				var Mel2 = words2[i];
				row2.push(parseFloat(Mel2));
			}
			M2.push(row2);
		}


		var jumlah =[];
		for(i=0; i<M1.length; i++){
			jumlah[i] = new Array(M2[0].length);
		}
		
		for(i=0;i<M1.length; i++){
			for(j=0; j<M2[0].length; j++){
				jumlah[i][j]= M1[i][j] +M2[i][j];
			}
		}

		console.log(jumlah);
				
		var ROW = jumlah.length;
		
		var latex = "\\begin{equation}\n"
			+ "M = \\left[\n"
			+ "\\begin{array}\n";
		var COL = jumlah[0].length;
		latex += "{" + "c".repeat(COL) + "}\n";
		for(var j = 0; j < ROW; j++) {
			var arow = jumlah[j];
			var COL = arow.length;
			for(var i = 0; i < COL; i++) {
				latex += jumlah[j][i];
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

// 20180303.2308 ok
function examDisplaySeries() {
	var div = document.getElementById("scriptResult");
	var N = 10;
	var str = "";
	for(var i = 0; i < N+1; i++) {
		str += i*i + 2 + "<br/>";
	}
	div.innerHTML = str;
}

function examRandomDataChart(){
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";

	var btn = document.createElement("button");
	btn.innerHTML = "Plot Data";
	btn.style.width = "125px";
	btn.addEventListener("click", Click);

	var sel = window.event.target;
	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";

	eout.appendChild(btn);
	eout.appendChild(ecan);

	var x = [];
	var y = [];

	var cf;
	var SIMULATING = false;

	function Click (){

		if(!SIMULATING) {
			btn.innerHTML = "Stop";
			cf = setInterval( gambar, 100);
			sel.disabled = true;
		} else {
			btn.innerHTML = "Start";
			clearInterval(cf);
			sel.disabled = false;
		}
		SIMULATING = !SIMULATING;
	}
	var i =0;
	i++;
	function gambar(){
		y.push(randInt(-100, 100));
		x.push(i++);
		var series = new XYSeries("series1", x, y);
		var chart = new Chart2("drawingArea");
		chart.yAxis.Ntics = 4;
		chart.xAxis.Ntics = 8;
		chart.addSeries(series);
		chart.drawSeries("series1");
		eout.appendChild(ecan);
		if(x.length>20){
			x =[];
			y= [];
		}
	}
}
// 20180303.2249 ok
function examClear() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";	
}

// 20180303.2249 ok
function examHelloWorld() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "<br>Selamat pagi dan selamat datang di folder solusi saya untuk U1. </br> <br>Nama saya adalah Feby Genta Ananda. </br> <br>NIM saya adalah 10214003. </br> <br>Senang berkenalan dengan Anda.";

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
		case "Textarea and chart xy" :
			examTextareaAndChartXY();
			break;
		case "Array of Circle" :
			examArrayOfCircle();
			break;
		case "Dynamic Color" :
			examDynamicColor();
			break;
		case "Matrix addition Mathjax" :
			examMatrixAdditionMathJax();
			break;
		case "Random Data Chart" :
			examRandomDataChart();
			break;
		default:
	}
}
