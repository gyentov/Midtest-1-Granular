/*
	timer.js
	Generate timing event using setInterval and clearInterval
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180302
	Start this library.
*/

class Timer {
	constructor(func, period) {
		this.func = func;
		this.period = period;
		this.ticking = false;
		this.uid = 0;
	}
	
	start() {
		if(!this.ticking) {
			this.ticking = true;
			this.uid = setInterval(this.func, this.period);
		}
	}
	
	stop() {
		if(this.ticking) {
			this.ticking = false;
			clearInterval(this.uid);
		}
	}
}
