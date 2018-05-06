/*!
 * verb-uri
 * Copyright(c) 2018-2019 Liu Yue
 * GPL-3.0 Licensed
 */

/*
	HTTP verbs/method reference:

		https://www.iana.org/assignments/http-methods/http-methods.xhtml
*/

//@ts-check
/**
 *
 * @param {string} verbURI
 * @param {{keepCase?: boolean; defaultVerb?: string}} [options]
 * @returns {{verb: string; uri: string}}
 */
function parse(verbURI, options) {
	if (!options)
		options = {};
	options = Object.assign({ keepCase: false, defaultVerb: 'GET' }, options);

	const match = verbURI.match(/([\w\-]+)\s+/);

	if (!match || !match[1]) {
		let verb = options.defaultVerb;
		if (!options.keepCase && typeof verb === 'string')
			verb = verb.toUpperCase();
		return { verb: verb, uri: verbURI.replace(/^\s+/, '') };
	}

	const verb = options.keepCase ? match[1] : match[1].toUpperCase();
	const uri = verbURI.slice(match.index + match[0].length);

	return { verb: verb, uri: uri };
}

/**
 *
 * @param {string} verb
 * @param {string} uri
 * @param {{keepCase?: boolean; defaultVerb?: string}} [options]
 * @returns {string}
 */
function stringify(verb, uri, options) {
	if (!options)
		options = {};
	options = Object.assign({ keepCase: false, defaultVerb: 'GET' }, options);

	uri = uri.replace(/^\s+/, '');

	if (typeof verb === 'string')
		verb = verb.trim();

	if (!verb)
		verb = options.defaultVerb;

	if (typeof verb === 'string') {
		verb = verb.trim();
		if (!options.keepCase)
			verb = verb.toUpperCase();
	}
	return verb ? `${verb} ${uri}` : uri;
}

module.exports = {
	parse: parse,
	stringify: stringify,
};
