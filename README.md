# verb-uri

[![Build Status](https://travis-ci.org/hangxingliu/node-verb-uri.svg?branch=master)](https://travis-ci.org/hangxingliu/node-verb-uri)

A verb URI parse and stringify Node.js module

## Install

``` bash
npm install verb-uri
```

## Example

[example/index.js](example/index.js)

``` javascript

const verbURI = require('verb-uri');

console.log(verbURI.parse('POST /api/book')); // { verb: 'POST', uri: '/api/book' }
console.log(verbURI.parse('/api/books')); // { verb: 'GET', uri: '/api/books' }
console.log(verbURI.parse('/api/books', { defaultVerb: 'POST' })); // { verb: 'POST', uri: '/api/books' }

console.log(verbURI.stringify('post', '/api/book')); // 'POST /api/book'
console.log(verbURI.stringify('post', '/api/book', { keepCase: true })); // 'post /api/book'
console.log(verbURI.stringify(null, '/api/books')); // 'GET /api/book'

```


## Author

[Liu Yue](https://github.com/hangxingliu)

## License

[GPL-3.0](LICENSE)
