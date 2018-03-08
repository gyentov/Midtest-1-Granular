/*
	test_capacitors.js
	Test visualisation of drawing capacitors
	
	Sparisoma Virid | dudung@gmail.com
	
	20180228
	Create this HTML for testing.
	20180301
	Make this function in more modular form.
*/

function test_capacitors_0() {
	var can = document.createElement("canvas");
	can.id = "drawingBoard";
	can.width = "300";
	can.height = "300";
	can.style.width = can.width  + "px";
	can.style.height = can.height  + "px";
	can.style.background = "#efe";
	can.style.border = "1px dashed #292";
	document.body.appendChild(can);

	var coords = new Coordinates(
		{ XMIN: 0, YMIN: can.height, XMAX: can.width, YMAX: 0 },
		{ xmin: 0, ymin: 0, xmax: 10, ymax: 10 }
	);

	/*
		Schema of capacitors circuit
		
			 p1   p2      p3 p4     p5   p6
			 +----+--| |--+--+--| |--+----+
			 |       C1         C2        |
		p7 +                            + p8
			 |                            |
			 - C3                      C4 -
			 -                            -
			 |            C5              |
		p9 +     p10 +--| |--+ p11      + p12
			 |         |  C6   |          |
			 +---------+--| |--+----------+
			p13       p14     p15         p16
	*/

	var p1 = new Vect3(1, 9, 0);
	var p2 = new Vect3(2, 9, 0);
	var p3 = new Vect3(4, 9, 0);
	var p4 = new Vect3(6, 9, 0);
	var p5 = new Vect3(8, 9, 0);
	var p6 = new Vect3(9, 9, 0);

	var p7 = new Vect3(1, 6, 0);
	var p8 = new Vect3(9, 6, 0);

	var p9 = new Vect3(1, 4, 0);
	var p10 = new Vect3(4, 4, 0);
	var p11 = new Vect3(6, 4, 0);
	var p12 = new Vect3(9, 4, 0);

	var p13 = new Vect3(1, 1, 0);
	var p14 = new Vect3(4, 1, 0);
	var p15 = new Vect3(6, 1, 0);
	var p16 = new Vect3(9, 1, 0);

	var C1 = new Capacitor(p2, p3);
	var C2 = new Capacitor(p4, p5);
	var C3 = new Capacitor(p7, p9);
	var C4 = new Capacitor(p8, p12);
	var C5 = new Capacitor(p10, p11);
	var C6 = new Capacitor(p14, p15);

	var o1 = new Point(p1);
	var o2 = new Point(p2);
	var o3 = new Point(p3);
	var o4 = new Point(p4);
	var o5 = new Point(p5);
	var o6 = new Point(p6);
	var o7 = new Point(p7);
	var o8 = new Point(p8);
	var o9 = new Point(p9);
	var o10 = new Point(p10);
	var o11 = new Point(p11);
	var o12 = new Point(p12);
	var o13 = new Point(p13);
	var o14 = new Point(p14);
	var o15 = new Point(p15);
	var o16 = new Point(p16);

	var con1 = new Connector(p1, p2);
	var con2 = new Connector(p3, p4);
	var con3 = new Connector(p5, p6);
	var con4 = new Connector(p1, p7);
	var con5 = new Connector(p6, p8);
	var con6 = new Connector(p9, p13);
	var con7 = new Connector(p12, p16);
	var con8 = new Connector(p13, p14);
	var con9 = new Connector(p10, p14);
	var con10 = new Connector(p11, p15);
	var con11 = new Connector(p15, p16);

	var pnt = new Painter("drawingBoard", coords);
	pnt.draw(
		o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12,
		o13, o14, o15, o16,
		con1, con2, con3, con4, con5, con6, con7, con8, con9,
		con10, con11,
		C1, C2, C3, C4, C5, C6
	);
}