import { NewMessageData } from "../types";
import socket from "./socket";

const SendSocket = {

    sendNewMessage(messageData: NewMessageData) {
        socket.emit('new-message', messageData)
    },

    sendMySocketId(autorId: String) {
        socket.emit('set_my_socketId_in_db', autorId)
    },
    updateNewMessagesStatus(userId: String, dialogId: string) {
        socket.emit('new-messages-opened', {userId, dialogId})
    },

}

export default SendSocket;