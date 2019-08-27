let socket = io();

socket.on ('connect', () => {
    console.log (`Connected to server. `);

    socket.emit ('createMsg', {
        to: "Andrew",
        text: 'Test create message'
    });
});

socket.on ('disconnect', () => {
    console.log (`Disconnect from server. `);
});

socket.on ('newMsg', (email) => {
    console.log (`New message: ${JSON.stringify (email)}`);
});
