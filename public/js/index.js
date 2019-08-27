let socket = io();

socket.on ('connect', () => {
    console.log (`Connected to server. `);
});

socket.on ('disconnect', () => {
    console.log (`Disconnect from server. `);
});

socket.on ('newMsg', (msg) => {
    console.log (`New message: ${JSON.stringify (msg)}`);

    let li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery ('#messages').append(li);
});


jQuery ('#message-form').on ('submit', (e) => {
    e.preventDefault();

    socket.emit ('createMsg', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, () => {

    });
});
