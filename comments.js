// create a web server
// 1. create a server
// 2. create a port
// 3. create a response
// 4. listen to the server

const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    // console.log(req.url);
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to the homepage</h1>');
        res.end();
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to the about page</h1>');
        res.end();
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to the contact page</h1>');
        res.end();
    } else if (req.url === '/comments') {
        fs.readFile('comments.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('Error: File Not Found');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Error: Page Not Found');
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});