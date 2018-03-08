/*
	painter.js
	Draw visual objects on canvas element
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180227
	Create this library.
	20180228
	Modify this library but still false ~ 0533.
	Fix the bug at 1026.
	20180301
	Fix bug for coords --> this.coords in lines 42, 51, 53,
	63, and 64.
*/

// Define class of Painter
class Painter {
	// Create constructor
	constructor() {
		this.id = arguments[0];
		this.coords = arguments[1];
	}
	
	setCanvasId(id) {
		this.id = id;
	}
	
	setCoordinates(coords) {
		this.coords = coords;
	}
	
	draw() {
		var can = document.getElementById(this.id);
		var cx = can.getContext("2d");
		
		var N = arguments.length;
		var objs = arguments;
		
		for(var i = 0; i < N; i++) {
			var o = objs[i];
			if(o instanceof Point) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				var q = this.coords.transform(o);
				cx.arc(q.x, q.y, o.size, 0, 2 * Math.PI);
				cx.fillStyle = o.color;
				cx.fill();
				cx.stroke();
			}
			if(o instanceof Connector) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				var qbeg = this.coords.transform(o.rbeg);
				cx.moveTo(qbeg.x, qbeg.y);
				var qend = this.coords.transform(o.rend);
				cx.lineTo(qend.x, qend.y);
				cx.stroke();
			}
			if(o instanceof Capacitor) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				cx.fillStyle = o.color;
				
				var w = 2 * o.plateThickness + o.plateGap;
				var qbeg = this.coords.transform(o.rbeg);
				var qend = this.coords.transform(o.rend);
				var Dx = qend.x - qbeg.x;
				var Dy = qend.y - qbeg.y;
				var L = Math.sqrt(Dx * Dx + Dy * Dy);
				
				var cosq = Dx / L;
				var sinq = Dy / L;
				var l = 0.5 * (L - w);
				
				var q1 = {};
				q1.x = qbeg.x + l * cosq;
				q1.y = qbeg.y + l * sinq;
				var q2 = {};
				q2.x = qend.x - l * cosq;
				q2.y = qend.y - l * sinq;
				
				cx.moveTo(qbeg.x, qbeg.y);
				cx.lineTo(q1.x, q1.y);
				cx.moveTo(qend.x, qend.y);
				cx.lineTo(q2.x, q2.y);
								
				var q1u = {};
				q1u.x = q1.x - 0.5 * o.size * sinq;
				q1u.y = q1.y + 0.5 * o.size * cosq;
				var q1d = {};
				q1d.x = q1.x + 0.5 * o.size * sinq;
				q1d.y = q1.y - 0.5 * o.size * cosq
				var q11u = {};
				q11u.x = q1u.x + o.plateThickness * cosq;
				q11u.y = q1u.y + o.plateThickness * sinq;
				var q11d = {};
				q11d.x = q1d.x + o.plateThickness * cosq;
				q11d.y = q1d.y + o.plateThickness * sinq;
				cx.moveTo(q1u.x, q1u.y);
				cx.lineTo(q11u.x, q11u.y);
				cx.lineTo(q11d.x, q11d.y);
				cx.lineTo(q1d.x, q1d.y);
				cx.closePath();
				
				var q2u = {};
				q2u.x = q2.x - 0.5 * o.size * sinq;
				q2u.y = q2.y + 0.5 * o.size * cosq
				var q2d = {};
				q2d.x = q2.x + 0.5 * o.size * sinq;
				q2d.y = q2.y - 0.5 * o.size * cosq;
				var q22u = {};
				q22u.x = q2u.x - o.plateThickness * cosq;
				q22u.y = q2u.y - o.plateThickness * sinq;
				var q22d = {};
				q22d.x = q2d.x - o.plateThickness * cosq;
				q22d.y = q2d.y - o.plateThickness * sinq
				cx.moveTo(q2u.x, q2u.y);
				cx.lineTo(q22u.x, q22u.y);
				cx.lineTo(q22d.x, q22d.y);
				cx.lineTo(q2d.x, q2d.y);
				cx.closePath();
				
				cx.fill();
				cx.stroke();
			}
		}
	}
}
