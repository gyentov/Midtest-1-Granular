/*	connectors.js	Draw connectors in canvas element		Sparisoma Viridi | dudung@gmai.com		20180227	Create this library insipred by capacitors.js	in the same folder.*/class Connector {	constructor(r1, r2) {		this.type = "straight";		this.rbeg = r1;		this.rend = r2;		this.color = "#000";	}		setColor(lc) {		this.color = lc;	}}