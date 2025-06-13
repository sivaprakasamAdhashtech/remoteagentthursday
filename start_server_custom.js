const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const publicPath = path.join(__dirname, 'angular-inventory-app', 'www');

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  let filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url);
  
  // For Angular routing, serve index.html for routes that don't exist as files
  if (!fs.existsSync(filePath) && !path.extname(req.url)) {
    filePath = path.join(publicPath, 'index.html');
  }
  
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.map': 'application/json'
  };
  
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, serve index.html for Angular routing
        fs.readFile(path.join(publicPath, 'index.html'), (err, indexContent) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`🚀 Angular Inventory Management System is running!`);
  console.log(`📱 Access your app at: http://localhost:${port}`);
  console.log(`📁 Serving files from: ${publicPath}`);
  console.log(`⏹️  Press Ctrl+C to stop the server`);
});
