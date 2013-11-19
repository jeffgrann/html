"use strict";

({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['html'],

function (html) {
	var publicInterface = {};
	
	publicInterface.get = function getTestCases () {
		var testCases = {
		    name: "html Tests",
		     
			//----------------------------------------------------------------------------------------------------
			// decodeHtml()
			//----------------------------------------------------------------------------------------------------
		    'test decodeHtml()': function() {
					Y.Assert.areSame('Ken Thompson & Dennis Ritchie', html.makeString('Ken Thompson &amp; Dennis Ritchie').decodeHtml().s, "& --> &amp;");
					Y.Assert.areSame('3 < 4', html.makeString('3 &lt; 4').decodeHtml().s, "< --> &lt;");
					Y.Assert.areSame('One line\nAnother line', html.makeString('One line<br />Another line').decodeHtml({lineBreakTagsToNewlines: true}).s, "(true) \\n --> <br />");
					Y.Assert.areSame('One line\nAnother line', html.makeString('One line&NewLine;Another line').decodeHtml({lineBreakTagsToNewlines: false}).s, "(false) \\n --> <br />");
					Y.Assert.areSame('One line\nAnother line', html.makeString('One line&NewLine;Another line').decodeHtml().s, "(default) \\n --> <br />");
					Y.Assert.areSame('', html.makeString('').decodeHtml().s, "empty string");
		        },

			//----------------------------------------------------------------------------------------------------
			// encodeHtml()
			//----------------------------------------------------------------------------------------------------
		    'test encodeHtml()': function() {
					Y.Assert.areSame('&lt;div&gt;hi&lt;&sol;div&gt;', html.makeString('<div>hi</div>').encodeHtml().s, "<div>hi</div>");
					Y.Assert.areSame('One line&NewLine;Another line', html.makeString('One line\nAnother line').encodeHtml().s, "(default) &NewLine;");
					Y.Assert.areSame('One line&NewLine;Another line', html.makeString('One line\nAnother line').encodeHtml({addLineBreakTags: false}).s, "(false) &NewLine;");
					Y.Assert.areSame('One line<br />Another line', html.makeString('One line\nAnother line').encodeHtml({addLineBreakTags: true}).s, "(true) \\n --> <br />");
					Y.Assert.areSame('', html.makeString('').encodeHtml().s, "empty string");
		        },

			//----------------------------------------------------------------------------------------------------
			// encode/decode
			//----------------------------------------------------------------------------------------------------
		    'test encode/decode': function() {
					Y.Assert.areSame('<div>hi</div>', html.makeString('<div>hi</div>').encodeHtml().decodeHtml().s, "<div>hi</div>");
					Y.Assert.areSame('One line\nAnother line', html.makeString('One line\nAnother line').encodeHtml().decodeHtml().s, "One line\\nAnother line");
					
					Y.Assert.areSame(
						'One line\nAnother line',
						html.makeString('One line\nAnother line').encodeHtml({addLineBreakTags: true}).decodeHtml({lineBreakTagsToNewlines: true}).s,
						"One line\\nAnother line with break tags");
		        },

			//----------------------------------------------------------------------------------------------------
			// decode/encode
			//----------------------------------------------------------------------------------------------------
		    'test decode/encode': function() {
					Y.Assert.areSame('&lt;div&gt;hi&lt;&sol;div&gt;', html.makeString('&lt;div&gt;hi&lt;&sol;div&gt;').decodeHtml().encodeHtml().s, "<div>hi</div>");
					Y.Assert.areSame('One line&NewLine;Another line', html.makeString('One line&NewLine;Another line').decodeHtml().encodeHtml().s, "One line&NewLine;Another line");
					
					Y.Assert.areSame(
						'One line<br />Another line',
						html.makeString('One line&NewLine;Another line').decodeHtml({lineBreakTagsToNewlines: true}).encodeHtml({addLineBreakTags: true}).s,
						"One line&NewLine;Another line with break tags");
		        },

			//----------------------------------------------------------------------------------------------------
			// stripHtmlTags()
			//----------------------------------------------------------------------------------------------------
		    'test stripHtmlTags()': function() {
					Y.Assert.areSame('a link', html.makeString('a <a href="#">link</a>').stripHtmlTags().s);
					Y.Assert.areSame('a linkalert("hello world!")', html.makeString('a <a href="#">link</a><script>alert("hello world!")</script>').stripHtmlTags().s);
		        }
	    };
	    
	    return testCases;
	};
	
	return publicInterface;
});
