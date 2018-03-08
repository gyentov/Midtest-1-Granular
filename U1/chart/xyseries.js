/*
	xyseries.js
	Simple (x, y) data series for Chart2
	
	Sparisoma Viridi | dudung@gmail.com
	
	2018022
	Create XYSeries class.
	20180302
	Add feature of min and max using spread operator of the
	ECMAScript 6.
*/

// Define class of XYSeries
class XYSeries {
	constructor(id, x, y) {
		this.id = id;
		this.color = "#f00";
		this.size = 1;
		this.mark = "line";
		this.x = x;
		this.y = y;
		this.length = Math.min(x.length, y.length);
		this.xmin = Math.min(...x);
		this.ymin = Math.min(...y);
		this.xmax = Math.max(...x);
		this.ymax = Math.max(...y);
	}
	
	setColor(color) {
		this.color = color;
	}
	
	setSize(size) {
		this.size = size;
	}
	
	setMark(mark) {
		this.mark = mark;
	}
}