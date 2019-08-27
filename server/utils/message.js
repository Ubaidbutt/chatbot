const moment = require ('moment');

let generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createAt: moment().valueOf()
    }
}

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage};