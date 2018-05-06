//@ts-check

const { Assert } = require('@hangxingliu/assert');
const { parse } = require('..');

describe('parse', () => {
	it('# simple parse', () => {
		Assert(parse('GET /api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('GET   /api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('  GET   /api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('get /api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });

		Assert(parse('VERSION-CONTROL /path/to'))
			.fieldsEqual({ verb: 'VERSION-CONTROL', uri: '/path/to' });

		Assert(parse('GET https://www.google.com')).fieldsEqual({ verb: 'GET', uri: 'https://www.google.com' });
	});
	it('# parse uri without HTTP verb', () => {
		Assert(parse('/api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('  /api/books')).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('/api/books', { defaultVerb: null })).fieldsEqual({ verb: null, uri: '/api/books' });
		Assert(parse('/api/books', { defaultVerb: 'post' })).fieldsEqual({ verb: 'POST', uri: '/api/books' });
		Assert(parse('http://test.test/api/books')).fieldsEqual({ verb: 'GET', uri: 'http://test.test/api/books' });
	});

	it('# set `options.keepCase` as false', () => {
		const options = { keepCase: true };
		Assert(parse('/api/books', options)).fieldsEqual({ verb: 'GET', uri: '/api/books' });
		Assert(parse('get /api/books', options)).fieldsEqual({ verb: 'get', uri: '/api/books' });
		Assert(parse('GeT /api/books', options)).fieldsEqual({ verb: 'GeT', uri: '/api/books' });

		Assert(parse('http://test.test/api/books', options))
			.fieldsEqual({ verb: 'GET', uri: 'http://test.test/api/books' });

		Assert(parse('http://test.test/api/books', { ...options, defaultVerb: 'post' }))
			.fieldsEqual({ verb: 'post', uri: 'http://test.test/api/books' });
	});

});
