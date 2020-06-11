let io = require('socket.io');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

// Verifies JWT token for socket endpoint
// @param {object} token the JWT token of the user
// @param {object} socket the socket object

const check = (token, socket) => {
    jwt.verify(token, config.JwtSecret, (err, decoded) => {
        if (err) return
        userID = decoded._id;
        socket.join();
    });
}

const initialize = function (server) {
    io = io.listen(server); //start listening on server

    //new client has opened a connection
    io.on("connection", function (socket) {

        //get request and verify
        const query = socket.handshake.query;
        if (query.token) {
            check(query.token, socket);
        }

        //leave event handler is received
        socket.on('leave', id => {
            socket.leave(id);
        });
    });
};

module.exports = {
    initialize
};