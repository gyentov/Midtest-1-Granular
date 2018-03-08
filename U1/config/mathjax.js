/*
	mathjax.js
	Cofigure MathJax
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180304
	Move from index.html to this script.
*/

MathJax.Hub.Config({
	// Set equation number
	TeX: {
		equationNumbers: {
			autoNumber: "AMS" 
			}
	},
	
	// Set inline math tags
	tex2jax: {
		inlineMath: [
			['$','$'],
			['\\(','\\)']
		]
	}
});
