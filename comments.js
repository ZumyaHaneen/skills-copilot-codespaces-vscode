//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.readFile('./index.html', function(err, data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
    }else if(pathname == '/submit'){
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    }else if(pathname == '/getComments'){
        var json = JSON.stringify(comments);
        res.end(json);
    }else{
        fs.exists('.'+pathname, function(exists){
            if(exists){
                fs.readFile('.'+pathname, function(err, data){
                    res.end(data);
                });
            }else{
                res.statusCode = 404;
                res.end('not found');
            }
        });
    }
});
server.listen(8080);