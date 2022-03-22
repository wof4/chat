const Dialog = require('../models/Dialog');

module.exports = async ({ userId, dialogId }) => {
    try {
        if (dialogId) {
            await Dialog.updateOne(
                { _id: dialogId },
                { $pull: { to: { $in: userId } } },
            )
            return { statusCode: 200, message: "update-messages-status" }
        }
    } catch (e) {
        return { statusCode: 400, message: "Ошибка при сохранении нового сообщения" }
    }
};