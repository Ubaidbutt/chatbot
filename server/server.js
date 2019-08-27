const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');
const {generateMessage, generateLocationMessage} = require ('./utils/message');

const publicPath = path.join (__dirname, '../public');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer (app);
const io = socketIO (server); 


io.on ('connection', (socket) => {
    console.log ('New user connected! ');

    socket.emit ('newMsg', generateMessage ('Admin', 'Welcome to the chat app. '));
    socket.broadcast.emit ('newMsg', generateMessage ('Admin', 'New user joined. '));

    socket.on ('disconnect', () => {
        console.log ('User disconnected! ');
    });

    socket.on ('createMsg', (newMsg, callback) => {
        console.log (`Create msg event: ${JSON.stringify (newMsg)}`);

        io.emit ('newMsg', generateMessage (newMsg.from, newMsg.text));
        callback();

    });

    socket.on ('createLocationMessage', (coords) => {
        io.emit ('newLocationMsg', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

app.use (express.static (publicPath));

server.listen(port, () => console.log (`The server is up and listening at Port ${port}.`));