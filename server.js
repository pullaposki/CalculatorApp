import http from 'http';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
};

function getContentType(fileExtension) {
    return mimeTypes[fileExtension] || 'application/octet-stream';
}

const server = http.createServer((request, response) => {
    const filePath = path.join(__dirname, request.url === '/' ? '/index.html' : request.url);
    const fileExtension = String(path.extname(filePath)).toLowerCase();
    const contentType = getContentType(fileExtension);

    fs.readFile(filePath, (error, content) => {
        if (!error) {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf-8');
        } else {
            if (error.code === 'ENOENT') {
                response.writeHead(404);
                response.end(`Page not found: ${request.url}`);
            } else {
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        }
    });
});

server.listen(8080, function (error) {
    if (error) {
        console.log("Something went wrong: ", error);
        return;
    }
    console.log('Server running at http://localhost:8080/');
});

process.on('SIGINT', () => {
    console.log("Caught interrupt signal, server shutting down gracefully...");
    process.exit();
});