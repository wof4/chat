import date from 'date-and-time';
import ru from 'date-and-time/locale/ru';
date.locale(ru);

export const newMessageDataCreator = ({ currentValue, _id, name, selectedUser }) => {
    const result = {
        messageText: currentValue,
        autorId: _id,
        autorName: name,
        to: selectedUser._id,
        dialogId: selectedUser.dialogId,
        sendDate: Date.now(),
        progress: true
    }
    localStorage.setItem(result.sendDate, JSON.stringify({ user: selectedUser._id, message: result }));

    return result;
}

export const formatDate = (currentDate) => date.format(new Date(currentDate), 'dddd, HH:mm').split(',');

export const checkСompletedMsg = (selectedCommunication) => {
    selectedCommunication.messages?.forEach((item) => {
        const itemToprogress = localStorage.getItem(item.sendDate)
        if (itemToprogress !== null) {
            localStorage.removeItem(item.sendDate)
        }
    })
}