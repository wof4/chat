const { Server } = require("socket.io");
const createNewMessage = require("./utils/createNewMessage");
const updateMessagesStatus = require("./utils/updateMessagesStatus");



module.exports = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('connected to server', socket.id);

        // записывает socketId в базу данных для идентификации по id и отправки сообщений
        socket.on('set_my_socketId_in_db', async (autorId) => {
            socket.join(autorId);
        });

        socket.on('new-message', async ({ messageText, autorId, to, dialogId, sendDate }) => {
            createNewMessage({ messageText, autorId, to, dialogId, sendDate }).then(res => {
                if (res.statusCode === 400) {
                    console.log(res);
                    io.sockets.in(autorId).emit('send-error', res.message);
                } else {
                    io.sockets.in(autorId).emit('new-message', autorId);
                    io.sockets.in(to).emit('new-message', to);
                }
            })
        });
        socket.on('new-messages-opened', async ({ userId, dialogId }) => {
            updateMessagesStatus({ userId, dialogId }).then(res => {
                if (res.statusCode === 400) {
                    console.log(res);
                    io.sockets.in(userId).emit('send-error', res.message);
                } else {
                    io.sockets.in(userId).emit(res.message, userId);
                }
            })
        });
    });
}





