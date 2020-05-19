
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/html/index.html`);
});

io.on('connection', socket => {

    console.log('a user connected.');

    io.emit('chat message', JSON.stringify({
        role: 'system',
        message: 'a new user connected.'
    }));

    socket.on('chat message', payload => {
        const input = JSON.parse(payload);
        io.emit('chat message', JSON.stringify({
            role: 'user',
            username: input.username,
            message: input.message
        }));
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected.');
    });

});

http.listen(5000, () => {
    console.log('listening on port 5000');
});