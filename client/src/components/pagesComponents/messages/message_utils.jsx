import date from 'date-and-time';
import ru from 'date-and-time/locale/ru';
date.locale(ru);

export const newMessageCreator = ({ currentValue, _id, name, selectedCommunication }) => {
    console.log({ currentValue, _id, name, selectedCommunication });
    const result = {
        messageText: currentValue,
        autorId: _id,
        autorName: name,
        to: selectedCommunication._id,
        dialogId: selectedCommunication.dialogId,
        sendDate: Date.now(),
        progress: true
    }
    localStorage.setItem(result.sendDate, JSON.stringify(result));
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