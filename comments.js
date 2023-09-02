// Create web server
// 1. Create web server
// 2. Read data from file
// 3. Convert string to object
// 4. Add new comment
// 5. Save to file
// 6. Redirect to comments page

const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    if (req.url === '/') {
        // read file
        fs.readFile('comments.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/comments.json') {
        // read file
        fs.readFile('comments.json', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.url === '/comments' && req.method === 'POST') {
        // read data
        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            // convert string to object
            let comment = qs.parse(body);
            // read file
            fs.readFile('comments.json', function (err, data) {
                let comments = JSON.parse(data);
                // add new comment
                comments.push(comment);
                // save to file
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
