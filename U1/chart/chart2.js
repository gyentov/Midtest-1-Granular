/*
	chart2.js
	Simple 2-d chart
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180221
	Create this object (semi-again), create Chart2 class.
	2018022
	Improve yesterday code.
	20180302
	Set initial view of Chart2.
*/

// Define class of Chart2
class Chart2 {
	constructor(canvasId) {
		// Define id of drawing canvas
		this.canvasId = canvasId;
		
		// Define x axis
		this.xAxis = {
			label: "x",
			font: {
				family: "Times",
				size: "16px",
				style: "italic",
				weight: "normal",
				variant: "normal",
				color: "#000"
			},
			range: {
				min: 0,
				max: 1
			},
			Ntics: 10,
			tics: 0.1,
			mantissa: 1,
			color: "#000"
		};
		
		// Define y axis
		this.yAxis = {
			label: "y",
			font: {
				family: "Times",
				size: "16px",
				style: "italic",
				weight: "normal",
				variant: "normal",
				color: "#000"
			},
			range: {
				min: 0,
				max: 1
			},
			Ntics: 5,
			tics: 0.2,
			mantissa: 1,
			color: "#000"
		};
		
		// Get canvas dimension
		var can = document.getElementById(canvasId);
		var height = can.height;
		var width = can.width;
		
		// Define internal setting
		this.margin = 40;
		this.setMargin(this.margin);
		
		// Define tics size
		this.ticsSize = 10;
		
		// Colors
		var can = document.getElementById(this.canvasId);
		this.background = "#fff";
		if(can.style.background != undefined) {
			this.background = can.style.background
		}
		this.gridLineColor = "#e5e5e5";
		
		// Data series
		this.series = [];
		
		// Initialize empty Chart2
		this.init();
	}
	
	init() {
		this.drawBothAxis();
		this.drawGrid();
	}
	
	clear() {
		var can = document.getElementById(this.canvasId);
		var w = can.width;
		var h = can.height;
		var cx = can.getContext("2d");
		cx.fillStyle = this.background;
		cx.fillRect(0, 0, w, h);
	}
	
	addSeries(newSeries) {
		var ns = newSeries;
		this.series.push(ns);
		this.setXRange({min: ns.xmin, max: ns.xmax});
		this.setYRange({min: ns.ymin, max: ns.ymax});
		this.clear();
		this.init();
	}
	
	setBackground(bgColor) {
		this.background = bgColor;
		var can = document.getElementById(this.canvasId);
		can.style.background = this.background;
	}
	
	setGridLineColor(glc) {
		this.gridColor = glc;
	}
	
	setMantissa(mx, my) {
		this.xAxis.mantissa = mx;
		this.yAxis.mantissa = my;
	}
	
	setMargin(margin) {
		this.margin = margin;
		var can = document.getElementById(this.canvasId);
		var height = can.height;
		var width = can.width;
		this.XMIN = this.margin;
		this.YMIN = height - this.margin;
		this.XMAX = width - this.margin;
		this.YMAX = this.margin;
	}
	
	setXLabel(label) {
		this.xAxis.label = label;
	}
	
	setYLabel(label) {
		this.yAxis.label = label;
	}
	
	setXRange(range) {
		this.xAxis.range.min = range.min;
		this.xAxis.range.max = range.max;
		var tics = (range.max - range.min) / this.xAxis.Ntics;
		this.setXTics(tics);
	}
	
	setYRange(range) {
		this.yAxis.range.min = range.min;
		this.yAxis.range.max = range.max;
		var tics = (range.max - range.min) / this.yAxis.Ntics;
		this.setYTics(tics);
	}
	
	setXTics(tics) {
		this.xAxis.tics = tics;
	}
	
	setYTics(tics) {
		this.yAxis.tics = tics;
	}
	
	drawBothAxis() {
		this.drawXAxis();
		this.drawXLabel();
		this.drawXTics();
		
		this.drawYAxis();
		this.drawYLabel();
		this.drawYTics();
	}
	
	drawXTics() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		var tics = this.xAxis.tics;
		var x0 = this.xAxis.range.min;
		var N = this.xAxis.Ntics;
		cx.strokeStyle = this.xAxis.color;
		cx.beginPath();
		for(var i = 0; i <= N; i++) {
			var x = (x0 + i * tics).toFixed(this.xAxis.mantissa);
			var p = {x: x, y: 0};
			var q = this.transform(p);
			var xx = q.x;
			var yy1 = this.YMIN - 0.5 * this.ticsSize;
			var yy2 = this.YMIN + 0.5 * this.ticsSize;
			cx.moveTo(xx, yy1);
			cx.lineTo(xx, yy2);
			
			cx.font = "normal 12px Times";
			cx.textAlign = "center"
			cx.fillText(x, xx, yy2 + 1.5 * this.ticsSize);
		}
		cx.stroke();
	}
	
	drawYTics() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		var tics = this.yAxis.tics;
		var y0 = this.yAxis.range.min;
		var N = this.yAxis.Ntics;
		cx.strokeStyle = this.xAxis.color;
		cx.beginPath();
		for(var i = 0; i <= N; i++) {
			var y = (y0 + i * tics).toFixed(this.yAxis.mantissa);
			var p = {x: 0, y: y};
			var q = this.transform(p);
			var yy = q.y;
			var xx1 = this.XMIN - 0.5 * this.ticsSize;
			var xx2 = this.XMIN + 0.5 * this.ticsSize;
			cx.moveTo(xx1, yy);
			cx.lineTo(xx2, yy);
			
			cx.font = "normal 12px Times";
			cx.textAlign = "right"
			cx.fillText(
				y,
				xx1 - 0.5 * this.ticsSize,
				yy + 0.4 * this.ticsSize
			);
		}
		cx.stroke();
	}
	
	drawGrid() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		var xmin = this.xAxis.range.min;
		var ymin = this.yAxis.range.min;
		var xmax = this.xAxis.range.max;
		var ymax = this.yAxis.range.max;
		var xtics = this.xAxis.tics;
		var ytics = this.yAxis.tics;
		var Nx = this.xAxis.Ntics;
		var Ny = this.yAxis.Ntics;
		
		cx.strokeStyle = this.gridLineColor;
		cx.beginPath();
		for(var j = 0; j < Ny; j++) {
			for(var i = 0; i < Nx; i++) {
				var x = xmin + i * xtics;
				var y = ymin + j * ytics;
				var q1 = this.transform({x: x, y: y});
				var q2 = this.transform(
					{x: x + xtics, y: y + ytics}
				);
				var lx = q2.x - q1.x;
				var ly = q2.y - q1.y;
				cx.rect(q1.x, q1.y, lx, ly);
			}
		}
		cx.stroke();
	}
	
	drawXAxis() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		cx.strokeStyle = this.xAxis.color;
		cx.beginPath();
		cx.moveTo(this.XMIN, this.YMIN);
		cx.lineTo(this.XMAX, this.YMIN);
		cx.stroke();
	}

	drawYAxis() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		cx.strokeStyle = this.yAxis.color;
		cx.beginPath();
		cx.moveTo(this.XMIN, this.YMIN);
		cx.lineTo(this.XMIN, this.YMAX);
		cx.stroke();
	}
	
	drawXLabel() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		cx.fillStyle = this.xAxis.font.color;
		var font = this.xAxis.font.style
			+ ' ' + this.xAxis.font.size
			+ ' ' + this.xAxis.font.family;
		cx.font = font;
		var x = this.XMAX + 0.3 * this.margin;
		var y = this.YMIN + 0.2 * this.margin;
		cx.fillText(this.xAxis.label, x, y);
	}
	
	drawYLabel() {
		var can = document.getElementById(this.canvasId);
		var cx = can.getContext("2d");
		cx.fillStyle = this.yAxis.font.color;
		var font = this.yAxis.font.style
			+ ' ' + this.yAxis.font.size
			+ ' ' + this.yAxis.font.family;
		cx.font = font;
		var x = this.XMIN - 0.2 * this.margin;
		var y = this.YMAX - 0.3 * this.margin;
		cx.fillText(this.yAxis.label, x, y);
	}
	
	drawSeries(id) {
		var N = this.series.length;
		var j = -1;
		for(var i = 0; i < N; i++) {
			if(id == this.series[i].id) {
				j = i;
			}
		}
		if(j > -1) {
			var series = this.series[j];
			var x = series.x;
			var y = series.y;
			var N = series.length;
			
			var can = document.getElementById(this.canvasId)
			var cx = can.getContext("2d");
			
			cx.strokeStyle = series.color;
			cx.beginPath();
			for(var i = 0; i < N; i++) {
				var p = {x: x[i], y: y[i]};
				var q = this.transform(p);
				if(i == 0) {
					cx.moveTo(q.x, q.y);
				} else {
					cx.lineTo(q.x, q.y);
				}
			}
			cx.stroke();
		}
	}
	
	transform(point) {
		var XMIN = this.XMIN;
		var YMIN = this.YMIN;
		var XMAX = this.XMAX;
		var YMAX = this.YMAX;
		
		var xmin = this.xAxis.range.min;
		var ymin = this.yAxis.range.min;
		var xmax = this.xAxis.range.max;
		var ymax = this.yAxis.range.max;
		
		var x = point.x;
		var y = point.y;
		
		var X = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		var Y = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
		
		return {x: X, y: Y};
	}
}