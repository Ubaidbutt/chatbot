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

socket.on ('newLocationMsg', (msg) => {
    let li = jQuery ('<li></li>');
    let a = jQuery ('<a target = "_blank"> My current location</a>');
    li.text (`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery ('#message-form').on ('submit', (e) => {
    e.preventDefault();

    let msgTextbox = jQuery ('[name=message]');

    socket.emit ('createMsg', {
        from: 'User',
        text: msgTextbox.val()
    }, () => {
        msgTextbox.val('');
    });
});

let locationButton = jQuery ('#send-location');
locationButton.on ('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser. ');
    }

    locationButton.attr ('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition ((position) => {
        locationButton.removeAttr ('disabled').text('Send Location');
        socket.emit ('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr ('disabled').text('Send Location');
        alert ('Unable to fetch location. ');
    });
});
