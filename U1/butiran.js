/*
	butiran.js
	Include another js
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create this file.
	Modified script proposed by Michael Sharman from
	http://chapter31.com
	/2006/12/07/including-js-files-from-within-js-files/
	which is more compact than proposed by e-satis from
	https://stackoverflow.com
	/questions/950087/how-do-i-include-a-javascript-file
	-in-another-javascript-file as answered Jun 4 '09 at 12:13
	and still avoiding ECMAScript 6.
	20180222
	Change the name from grains.js to butiran.js and upload to
	GitHub, also try to improve loadScript but still fails.
	20180224
	Delete repo in GitHub and recreate it.
	Change license to MIT one.
	20180301
	Create from [2] and not work well.
	There could be another candidates, e.g. as in [3],
	which does not work either.
	
	References
	1. Michael Sharman, "Include JS file", 7 Des 2006,
	URL http://chapter31.com/2006/12/07
	/including-js-files-from-within-js-files/ [20180106].
	2. e-satis, "Execute callback after the script loaded",
	4 Jun 2009, URL https://stackoverflow.com/questions/950087
	/how-do-i-include-a-javascript-file-in-another
	-javascript-file [20180106].
	3. heinob, Flimm, StackOverflow 18 Jun 2015,
	URL https://stackoverflow.com/questions/950087
	/how-do-i-include-a-javascript-file
	-in-another-javascript-file [20180301].
	4. jrburke, "require.js", GitHub, 21 Aug 2017
	URL https://github.com/volojs/create-template
	/blob/master/www/lib/require.js [20180301].
*/

/*
// [4] -- not workl

// for implementation of [4]
// <script src="../lib/require.js"></script>
// <script src="../butiran.js"></script>

requirejs.config({
	baseUrl: "lib",
	paths: {
		app: ""
	}
});

// Include required JS
requirejs(["../../grains/vect3"]);
requirejs(["../../color/rgb.js"]);
requirejs(["../../visual/coordinates.js"]);
requirejs(["../../visual/electronics/point.js"]);
requirejs(["../../visual/electronics/connectors.js"]);
requirejs(["../../visual/electronics/capacitors.js"]);
requirejs(["../../visual/painter.js"]);
requirejs(["../../math/polynomial.js"]);
requirejs(["../../framework/industry.js"]);
requirejs(["../../framework/resource.js"]);
requirejs(["../../framework/generator.js"]);
*/

/*
// [3] -- not work
function require(base, url) {
	var ajax = new XMLHttpRequest();
	var burl = base + url;
	ajax.open("GET", burl, false);
	ajax.onreadystatechange = function() {
		var script = ajax.response || ajax.responseText;
		if(ajax.readyState == 4) {
			switch(ajax.status) {
				case 200:
					eval.apply(window, [script]);
					console.log("Script loaded: ", burl)
					break;
				default:
					console.log("Error: Script not loaded: ", burl);
			}
		}
	};
	ajax.send(null);
}

// Define base url
var base = "https://rawgit.com/dudung/butiran/master/";

// Include required JS
require(base, "grains/vect3.js");
require(base, "color/rgb.js");
require(base, "visual/coordinates.js");
require(base, "visual/electronics/point.js");
require(base, "visual/electronics/connectors.js");
require(base, "visual/electronics/capacitors.js");
require(base, "visual/painter.js");
require(base, "math/polynomial.js");
require(base, "framework/industry.js");
require(base, "framework/resource.js");
require(base, "framework/generator.js");
*/

/*
//	Modified further using trial and error method
//	20180222.1832 !ok
function loadScripts(scripts, i) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = scripts[i];
	script.async = false;
	
	script.onreadystatechange = callback;
	script.onload = callback;
		
	if(i < scripts.length - 1) {
		document.head.appendChild(script);
	}
	
	function callback() {
		loadScripts(scripts, i + 1);
	}
}

var scripts = [
	"grains/vect3.js",
	"grains/particle.js",
	"grains/sphere.js",
	"grains/grid4.js",
	"grains/field.js",
	"grains/force.js",
	"grains/point2.js",
	"color/rgb.js",
	"canvas/graphics.js",
	"data/dataxy.js",
	"canvas/transform.js",
	"canvas/xychart.js",
	"test/test.js",
	"canvas/chart2.js",
	"canvas/xyseries.js"
];
loadScripts(scripts, 0);
*/

/*
// [2] -- actually work but not so modular
function loadScript(url, callback) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.async = false;
	
	script.onreadystatechange = callback;
	script.onload = callback;
	
	head.appendChild(script);
}
*/

/*
// [1] -- not work
function include(file) {
	var script = document.createElement ("script");
	script.src = file;
	script.type = "text/javascript";
	script.defer = true;
	
	var head = document.getElementsByTagName("head");
	head.item(0).appendChild(script);
}

// Include some JS
include("../grains/vect3.js");
include("../grains/particle.js");
include("../grains/sphere.js");
include("../grains/grid4.js");
include("../grains/field.js");
include("../grains/force.js");
include("../grains/point2.js");
include("../color/rgb.js");
include("../canvas/graphics.js");
include("../data/dataxy.js");
include("../canvas/transform.js");
include("../canvas/xychart.js");
include("../test/test.js");
include("../canvas/chart2.js");
include("../canvas/xyseries.js");
*/
