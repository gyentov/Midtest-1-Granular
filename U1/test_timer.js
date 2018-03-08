/*
	test_timer.js
	Test the use of Timer
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180302
	Create this test function.
*/

// 20180302.1609 !ok
function test_timer_chart2() {
	
}

// 20180302.1520 ok
function test_timer() {
	var timer = new Timer(run, 100);
	
	var N = 10;
	var i = 0;
	timer.start();
	
	function run() {
		console.log(i);
		if(i >= N) {
			timer.stop();
		}
		i++;
	}
}
