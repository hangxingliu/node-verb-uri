//@ts-check

const verbURI = require('..');

console.log(verbURI.parse('POST /api/book')); // { verb: 'POST', uri: '/api/book' }
console.log(verbURI.parse('/api/books')); // { verb: 'GET', uri: '/api/books' }
console.log(verbURI.parse('/api/books', { defaultVerb: 'POST' })); // { verb: 'POST', uri: '/api/books' }

console.log(verbURI.stringify('post', '/api/book')); // 'POST /api/book'
console.log(verbURI.stringify('post', '/api/book', { keepCase: true })); // 'post /api/book'
console.log(verbURI.stringify(null, '/api/books')); // 'GET /api/book'
