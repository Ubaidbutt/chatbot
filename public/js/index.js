let socket = io();

socket.on ('connect', () => {
    console.log (`Connected to server. `);
});

socket.on ('disconnect', () => {
    console.log (`Disconnect from server. `);
});

socket.on ('newMsg', (msg) => {
    console.log (`New message: ${JSON.stringify (msg)}`);
});
