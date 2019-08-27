const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');

const publicPath = path.join (__dirname, '../public');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer (app);
const io = socketIO (server);


io.on ('connection', (socket) => {
    console.log ('New user connected! ');

    socket.on ('disconnect', () => {
        console.log ('User disconnected! ');
    });

    socket.emit ('newMsg', {
        from: 'Ubaid',
        text: 'Hey, what is going on. ?',
        createdAt: 123
    });

    socket.on ('createMsg', (newEmail) => {
        console.log (`Create msg event: ${JSON.stringify (newEmail)}`);
    });
});

app.use (express.static (publicPath));

server.listen(port, () => console.log (`The server is up and listening at Port ${port}.`));