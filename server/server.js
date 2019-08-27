const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');
const {generateMessage, generateLocationMessage} = require ('./utils/message');
const {isRealString} = require ('./utils/validation');
const {Users} = require ('./utils/users');

const publicPath = path.join (__dirname, '../public');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer (app);
const io = socketIO (server); 
const users = new Users();


io.on ('connection', (socket) => {
    console.log ('New user connected! ');

    socket.on ('join', (params, callback) => {
        if (!isRealString (params.name) || !isRealString (params.room)) {
            return callback('Name and room both are required! ');
        }

        socket.join (params.room);
        users.removeUser(socket.id);
        const newUser = users.addUser (socket.id, params.name, params.room);

        io.to(params.room).emit ('updateUserList', users.getUserList(params.room));

        socket.emit ('newMsg', generateMessage ('Admin', 'Welcome to the chat app. '));
        socket.broadcast.to (params.room).emit ('newMsg', generateMessage ('Admin', 'New user joined. '));
        callback();
    })

    socket.on ('createMsg', (newMsg, callback) => {
        console.log (`Create msg event: ${JSON.stringify (newMsg)}`);

        io.emit ('newMsg', generateMessage (newMsg.from, newMsg.text));
        callback();

    });

    socket.on ('createLocationMessage', (coords) => {
        io.emit ('newLocationMsg', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on ('disconnect', () => {
        console.log ('User disconnected! ');

        let user = users.removeUser (socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMessage ('Admin', `${user.name} has left. `));
        }
    });
});

app.use (express.static (publicPath));

server.listen(port, () => console.log (`The server is up and listening at Port ${port}.`));