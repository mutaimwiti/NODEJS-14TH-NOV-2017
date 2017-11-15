/*
Importation of modules: http, fs, url
 */
var http = require('http');
var fs = require('fs');
var url = require('url');


/*
Creation of a server
 */
http.createServer(function (request, response) {
    var query = url.parse(request.url, true);
    if( query.pathname === "/asynchronous"){
        /*
        Getting query from url using url module
         */
        var file = query.query.file;
        /*
        Reading a file asynchronously. Then rendering the html
         */
        fs.readFile("file" + file + ".html", function(err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                return response.end("404 Not Found");
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
    else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        /*
        Reading a file synchronously. Then rendering html
         */
        var index = fs.readFileSync('index.html');
        response.end(index);
    }
}).listen(8081);