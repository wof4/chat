import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewMessagesStatusTc } from '../../../redux/reducers/communicationReducer';
import { getAuthData } from '../../../selectors';
import Message from './message/Message';



import s from './messageBord.module.css';
import { formatDate, checkСompletedMsg } from './message_utils';


const MessageBoard = (props) => {
    const { selectedUser } = props
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)
    const authData = useSelector(getAuthData)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser.messages?.length, localStorage.length]);

    useEffect(() => {
        checkСompletedMsg(selectedUser)
    }, [selectedUser])

    useEffect(() => {
        if (selectedUser.newMessagesCount > 0) {
            dispatch(updateNewMessagesStatusTc(authData._id, selectedUser.dialogId))
        }
    }, [authData._id, selectedUser])


    return (
        <div className={s.message_list}>
            {selectedUser.messages && selectedUser.messages.map((message, index) => {
                const dayTime = formatDate(message.date)
                return (
                    <Message
                        key={message._id}
                        name={selectedUser.name}
                        id={selectedUser._id}
                        message={message}
                        index={index}
                        time={dayTime[1]} />
                )
            }
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageBoard;
