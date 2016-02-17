// https://github.com/seznam/IMA.js-babel6-polyfill - 02.17.2016

(function() {
	var testObject = {};

	if (!(Object.setPrototypeOf || testObject.__proto__)) {
		var nativeGetPrototypeOf = Object.getPrototypeOf;

		Object.getPrototypeOf = function(object) {
			if (object.__proto__) {
				return object.__proto__;
			} else {
				return nativeGetPrototypeOf.call(Object, object);
			}
		}
	}
})();
