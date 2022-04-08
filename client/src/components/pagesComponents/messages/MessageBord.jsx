import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateNewMessagesStatusTc } from '../../../redux/reducers/communicationReducer';
import Message from './message/Message';
import { formatDate, checkСompletedMsg } from './message_utils';
import s from './messageBord.module.css';


const MessageBoard = (props) => {
    const { selectedUser, authData } = props
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" })
    }, [selectedUser.messages?.length]);

    useEffect(() => {
        checkСompletedMsg(selectedUser)
    }, [selectedUser])

    useEffect(() => {
        if (selectedUser.newMessagesCount > 0) {
            dispatch(updateNewMessagesStatusTc(authData._id, selectedUser.dialogId))
        }
    }, [authData._id, dispatch, selectedUser])


    return (
        <div className={s.message_list}>
            {selectedUser.messages && selectedUser.messages.map((message, index) => {
                const dayTime = formatDate(message.date)

                return (
                    <Message
                        key={message._id + message.date}
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
