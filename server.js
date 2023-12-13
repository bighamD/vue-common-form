// server.js
const httpServer = require('http-server');
const path = require('path');

const publicFolder = path.join(__dirname, 'dist'); // 指定静态文件的目录
const port = 7777; // 指定监听的端口号

const server = httpServer.createServer({ root: publicFolder });

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
