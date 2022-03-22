const Dialog = require("../models/Dialog");
const Message = require("../models/Message");
const User = require("../models/User");



module.exports = async (data) => {
    try {
        const { myData } = data

        const comUsers = await User.find({ _id: { $in: myData.communicationList } })

        const comList = comUsers.reduce(async (acc, item) => {

            const dialog = myData.dialogs.filter(el => item.dialogs.indexOf(el) > -1)

            if (dialog.length > 0) {
                const messagesLinkArray = await Dialog.findOne({ _id: { $in: dialog } })
                if (!messagesLinkArray) {
                    return
                }
                const messages = await Message.find({ _id: { $in: messagesLinkArray.messages } })
                const newMessages = messagesLinkArray.to.filter((item) => JSON.stringify(item) === JSON.stringify(myData._id))
                const comUser = {
                    _id: item._id,
                    name: item.name,
                    online: item.online,
                    avatar: item.avatar,
                    newMessagesCount: newMessages.length,
                    messages,
                    dialogId: dialog[0] || null,
                }

                const resolveAcc = await acc;
                return [comUser, ...resolveAcc || []]
            } else {
                return
            }
        }, [])

        return await comList
    } catch (error) {
        console.log(error)
    }
};


