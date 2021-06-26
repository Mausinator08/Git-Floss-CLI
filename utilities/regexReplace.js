'use strict';

const escapeRegExp = require('./escape-regexp.js');

module.exports = function(text, lookup, replacement) {
	return text.replace(new RegExp(escapeRegExp(lookup), "g"), replacement);
};
