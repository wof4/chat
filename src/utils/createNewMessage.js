
const Dialog = require('../models/Dialog');
const Message = require('../models/Message');
const User = require('../models/User');


module.exports = async ({ messageText, autorId, to, dialogId, sendDate }) => {
    try {
        const newMessage = new Message({ autorId, messageText, to, sendDate })
        await newMessage.save()

        if (dialogId) {
            await Dialog.updateOne(
                { _id: dialogId },
                { $push: { to: to, messages: newMessage._id } },
            )
        } else {
            const newDialog = new Dialog({ to: [to], messages: [newMessage._id] })
            await newDialog.save()
            await User.updateOne(
                { _id: to },
                { $push: { dialogs: newDialog._id, communicationList: autorId } }
            )
            await User.updateOne(
                { _id: autorId },
                { $push: { dialogs: newDialog._id, communicationList: to } }
            )
        }

        return await newMessage

    } catch (e) {
        return { statusCode: 400, message: "Ошибка при сохранении нового сообщения" }
    }
};