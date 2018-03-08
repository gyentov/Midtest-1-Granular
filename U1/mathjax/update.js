/*
	update.js
	Update HTML element containing MathJax element
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180304
	Move this part from index.html to this script.
*/

function updateMath(id, TeX) {
	// Set innerHTML
	document.getElementById(id).innerHTML = TeX;

	// Reprocess the element
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, id])
}
