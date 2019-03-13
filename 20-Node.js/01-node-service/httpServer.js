const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request name', request.url);
    const html = fs.readFileSync('test.html', 'utf-8');

    response.writeHead(200, {});

    response.end(html)

}).listen(8888);
console.log('server start at 8888');