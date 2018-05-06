//@ts-check

const { Assert } = require('@hangxingliu/assert');
const { stringify } = require('..');

describe('stringify', () => {
	it('# simple stringify', () => {
		Assert(stringify('GET', '/api/books')).equals('GET /api/books');
		Assert(stringify('get', '/api/books')).equals('GET /api/books');
		Assert(stringify('GET', 'https://test.test/api/books')).equals('GET https://test.test/api/books');
		Assert(stringify('get', 'https://test.test/api/books')).equals('GET https://test.test/api/books');

		Assert(stringify('VERSION-CONTROL', 'https://test.test/api/books'))
			.equals('VERSION-CONTROL https://test.test/api/books');
		
		
		Assert(stringify('GET ', '/api/books')).equals('GET /api/books');
		Assert(stringify(' GET', '/api/books')).equals('GET /api/books');
		Assert(stringify(' GET ', '/api/books')).equals('GET /api/books');
	});
	it('# stringify uri without HTTP verb', () => {
		Assert(stringify(' ', '/api/books')).equals('GET /api/books');
		Assert(stringify('', '/api/books')).equals('GET /api/books');
		Assert(stringify(null, '/api/books')).equals('GET /api/books');
		Assert(stringify(undefined, '/api/books')).equals('GET /api/books');

		Assert(stringify('', '/api/books', {defaultVerb: 'POST'})).equals('POST /api/books');
		Assert(stringify(null, '/api/books', {defaultVerb: null})).equals('/api/books');
		Assert(stringify(undefined, '/api/books', {defaultVerb: ' '})).equals('/api/books');
	});

	it('# set `options.keepCase` as false', () => {
		const options = { keepCase: true };
		Assert(stringify('GET', '/api/books', options)).equals('GET /api/books');
		Assert(stringify('get', '/api/books', options)).equals('get /api/books');

		Assert(stringify('GET', 'https://test.test/api/books', options))
			.equals('GET https://test.test/api/books');
		Assert(stringify('get', 'https://test.test/api/books', options))
			.equals('get https://test.test/api/books');
		
		Assert(stringify('Get ', '/api/books', options)).equals('Get /api/books');
		Assert(stringify(' get', '/api/books', options)).equals('get /api/books');
		Assert(stringify(' GET ', '/api/books', options)).equals('GET /api/books');

		Assert(stringify(' ', '/api/books', options)).equals('GET /api/books');
		Assert(stringify('', '/api/books', options)).equals('GET /api/books');
		Assert(stringify(null, '/api/books', options)).equals('GET /api/books');
		Assert(stringify(undefined, '/api/books', options)).equals('GET /api/books');

		Assert(stringify('', '/api/books', { ...options, defaultVerb: 'post' })).equals('post /api/books');
		Assert(stringify(null, '/api/books', { ...options, defaultVerb: null })).equals('/api/books');
		Assert(stringify(undefined, '/api/books', { ...options, defaultVerb: ' ' })).equals('/api/books');
	});
});