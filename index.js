var http = require('http');
var fs = require('fs');
var url = require('url');

var port = process.env.PORT || 8000;

http.createServer(function(request, response){
    empty = request.url === '/';
    fs.readFile('./html/' + (empty ? 'index.html' : request.url), function(error, data){
        if(!error) {
            var dotoffset = (empty ? '.html' : request.url.lastIndexOf('.'));
            var mimetype = dotoffset == -1 ? 'text/plain' :
                {
                    '.html' : 'text/html',
                    '.css' : 'text/css',
                    '.js' : 'text/javascript'
                }[request.url.substr(dotoffset)];
            response.writeHeader(200, {"Content-type": mimetype});
            response.write(data);
            console.log("Served file: ", request.url, mimetype);
        } else {
            console.log("File not found: " + request.url);
            response.writeHead(404, "Not Found");
        }
        response.end();
    })
}).listen(port);
