const http = require('http');

http.createServer(function (request, response) {
    console.log('request name', request.url);
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-cors',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    });
    response.end('123')

}).listen(8887);
console.log('server start at 8887');