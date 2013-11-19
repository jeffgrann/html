
html v1.0
=========

html is a unified Javascript RequireJS/CommonJS module for the browser and/or Wakanda Server 
(SSJS) which provides utilities for working with HTML.

Contents
--------
* [Dependencies](#DEPENDENCIES)
* [Script Files](#SCRIPT_FILES)
* [Example](#EXAMPLE)
* [Module Functions](#MODULE_FUNCTIONS)
    * [makeString (value)](#MAKESTRING)
* [HTML String Object Methods](#HTML_STRING_OBJECT_METHODS)
    * [string Module String Object Methods](#STRING_MODULE_STRING_OBJECT_METHODS)
    * [decodeHtml (options)](#DECODEHTML)
    * [encodeHtml (options)](#ENCODEHTML)
    * [stripHtmlTags ()](#STRIPHTMLTAGS)
* [Extending This Module](#EXTENDING_THIS_MODULE)
* [Testing](#TESTING)
* [Credits](#CREDITS)
* [Contributions](#CONTRIBUTIONS)
* [License](#LICENSE)


<a id="DEPENDENCIES"></a>
Dependencies
------------

* [RequireJS](http://requirejs.org) on the client (browser) side.
* [string](https://github.com/jeffgrann/string) - included.
* [Wakanda](http://www.wakanda.org) v6+.

<a id="SCRIPT_FILES"></a>
Script Files
------------

* html.js - Fully commented script. Update to contribute.
* html.min.js - Minimized script. For normal use.
* html.no-md.js - Commented script without markdown comments. Use for debugging.

<a id="EXAMPLE"></a>
Example
-------

```javascript
html.makeString("Hi!\rI'm Tom.\r\nWhat's your name?\nIs it Jerry?")
    .encodeHtml({addLineBreakTags: true}).s;

// 'Hi&excl;<br />I&apos;m Tom&period;<br />What&apos;s your name&quest;<br />Is it Jerry&quest;'

html.makeString("Hi&excl;<br />I&apos;m Tom&period;<br />What&apos;s your name&quest;<br />Is it Jerry&quest;")
    .decodeHtml({lineBreakTagsToNewlines: true}).s;

// "Hi!\nI'm Tom.\nWhat's your name?\nIs it Jerry?"
```

<a id="MODULE_FUNCTIONS"></a>
Module Functions
----------------
<a id="MAKESTRING"></a>
### makeString (value)

To create a string object, simply call the **makeString()** function with an initial `value`. The
returned string object extends the [string](https://github.com/jeffgrann/string) module's string
object, allowing you to use its methods as well as native Javascript String object methods. See the
string module's [README](https://github.com/jeffgrann/string/blob/master/README.md) for more
information. 

Examples:

```javascript
html.makeString('Hello').s; // 'Hello'
```

<a id="HTML_STRING_OBJECT_METHODS"></a>
HTML String Object Methods
--------------------------
<a id="STRING_MODULE_STRING_OBJECT_METHODS"></a>
### string Module String Object Methods

This module extends the [string](https://github.com/jeffgrann/string) module's string object.
Therefore, you can use its methods as well as native Javascript String object methods in addition
to the methods defined in this module. See the string module's
[README](https://github.com/jeffgrann/string/blob/master/README.md) for more information. 
<a id="DECODEHTML"></a>
### decodeHtml (options)

Decodes HTML entities into their string representation.

##### Arguments

* `options` *Optional* - An object with the following properties.

    * `lineBreakTagsToNewlines` *Optional* - A boolean specifying if HTML line break tags (`<br>`,
    `<br/>` or `<br />`) should be converted to newlines ("\n"). The default is *false*. 

Examples:

```javascript
html.makeString('Ken Thompson &amp; Dennis Ritchie').decodeHtml().s; // 'Ken Thompson & Dennis Ritchie'
html.makeString('3 &lt; 4').decodeHtml().s; // '3 < 4'
html.makeString('One line<br />Another line').decodeHtml({lineBreakTagsToNewlines: true}).s; // 'One line\nAnother line'
```
<a id="ENCODEHTML"></a>
### encodeHtml (options)

Converts special characters in the string to their equivalent HTML entities.

##### Arguments

* `options` *Optional* - An object with the following properties.

    * `addLineBreakTags` *Optional* - A boolean specifying if line breaks in the string ("\r",
    "\r\n" and "\n") should be converted to HTML line break tags (`<br />`). The default is *false*. 

Examples:

```javascript
html.makeString('<div>hi</div>').encodeHtml().s; // '&lt;div&gt;hi&lt;&sol;div&gt;'
html.makeString('One line\nAnother line').encodeHtml().s; // 'One line&NewLine;Another line'
html.makeString('One line\nAnother line').encodeHtml({addLineBreakTags: true}).s; // 'One line<br />Another line'
```
<a id="STRIPHTMLTAGS"></a>
### stripHtmlTags ()

Removes all HTML tags from the string.

Examples:

```javascript
html.makeString('a <a href="#">link</a>').stripHtmlTags().s; // 'a link'
html.makeString('a <a href="#">link</a><script>alert("hello world!")</script>').stripHtmlTags().s; // 'a linkalert("hello world!")'
```

<a id="EXTENDING_THIS_MODULE"></a>
Extending This Module
---------------------
Extending this module's string object is easy by doing the following:

1. Call `this.setValue(value)` in your object's constructor function (named `Str` for this
example). 

2. Create an object from this module. `stringObject = html.makeString('')`

3. Set your constructor function's prototype to the created object. `Str.prototype = stringObject` 

4. Make sure your constructor function is set properly. `Str.prototype.constructor = Str`

5. If necessary, get the prototpye of the object created in step 2. `parentPrototype = 
Object.getPrototypeOf(stringObject)`

    This value can then be used to call methods of this module that have been overridden in your
    module. `parentPrototype.encodeHtml.call(this);`

6. When returning a new object representing your string object, use `new this.constructor()`
instead of `new Str()`. Doing so will allow your module to be easily extended.

Example:

```javascript
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['html'],

function (html) {
	function Str (value) { // Constructor
		this.setValue(value);
	}

	stringObject = html.makeString('');
	Str.prototype = stringObject;
	Str.prototype.constructor = Str; // Make sure the constructor function is set properly.
	parentPrototype = Object.getPrototypeOf(stringObject);
	
	Str.prototype.myNewMethod = function () {
		....
	    return new this.constructor(result);
	};

	Str.prototype.extendedMethod = function () { // Extending a method.
		....
	    parentPrototype.extendedMethod.call(this); // Use the parent prototype.
	};
});
```

<a id="TESTING"></a>
Testing
-------
html uses Wakanda's implementation of [YUI Test](http://yuilibrary.com/yui/docs/test/). 

##### To test the client side:

1. In Wakanda Studio, open WebFolder/index/index.html.
2. Click Run. The results should appear in your browser.

##### To test the server side:

1. In Wakanda Studio, open scripts/test.js.
2. Click Run File. The results should appear in your browser.

<a id="CREDITS"></a>
Credits
-------
This module is based heavily on [node-ent](https://github.com/substack/node-ent).

The **stripHtmlTags()** method comes from underscore.string by Esa-Matti Suuronen
<esa-matti@suuronen.org>. 

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you contribute to this library, just modify `WebFolder/scripts/html.js` and 
`WebFolder/scripts/testCases.js` or `Modules/html.js` and `Modules/html.js` and send a pull
request. Please remember to update the markdown if the public interface changes. 

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>.

Portions copyright (c) 2011 Esa-Matti Suuronen <esa-matti@suuronen.org>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
