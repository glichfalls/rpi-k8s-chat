"use strict";

$(function() {

    const socket = io();

    const initial_screen = $('.initial_screen');
    const chat_screen = $('.chat-wrapper');
    const message_input = $('#message');

    let username = null;

    $('#connect').on('submit', function(e) {
        e.preventDefault();
        username = $('#username').val();
        if(!username || username.length === 0) {
            return alert('Please enter a username');
        }
        connect();
    });

    $('#message-form').on('submit', function(e) {
         e.preventDefault();
         send_message(message_input.val());
         message_input.val('');
    });

    socket.on('chat message', function(payload) {
        const input = JSON.parse(payload);
        switch (input.role) {
            case 'system': {
                $('#chat').append(`<li class="system"><span class="message">${input.message}</span>`);
                break;
            }
            case 'user': {
                $('#chat').append(`<li><span class="user">${input.username}</span>: <span class="message">${input.message}</span>`);
                break;
            }
        }
    });

    socket.on('disconnect', function() {
        disconnect();
    });

    function connect() {
        chat_screen.fadeIn(500);
        initial_screen.hide();
    }

    function disconnect() {
        chat_screen.hide();
        initial_screen.fadeIn(500)
    }

    function send_message(message) {
        if(message.length > 0) {
            socket.emit('chat message', JSON.stringify({
                username: username,
                message: message
            }));
        }
    }

});

