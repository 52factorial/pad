var http = require('http'),
    fs = require('fs'),
    port = process.env.PORT || 8000;

fs.readFile('./html/pad.html',
 function (err, html) {
  if (err) {
   throw err;
  }
  http.createServer(function(request, response) {
   response.writeHeader(200, {"Content-Type": "text/html"});
   response.write(html);
   response.end();
  }
 ).listen(port);
});
