let socket = io();

socket.on ('connect', () => {
    console.log (`Connected to server. `);
});

socket.on ('disconnect', () => {
    console.log (`Disconnect from server. `);
});

socket.on ('newMsg', (msg) => {
    let formattedTime = moment(msg.createdAt).format('h:mm a');
    let template = jQuery ('#message-template').html();

    let html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on ('newLocationMsg', (msg) => {
    let formattedTime = moment(msg.createdAt).format('h:mm a');
    let template = jQuery ('#location-message-template').html();

    let html = Mustache.render (template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime 
    });

    jQuery('#messages').append(html);
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
