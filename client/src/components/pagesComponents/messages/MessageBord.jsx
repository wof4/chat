import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewMessageTc, setSelectedCommunicationTc, updateNewMessagesStatusTc } from '../../../redux/reducers/communicationReducer';
import { getAuthData } from '../../../selectors';
import NewMessageField from '../../pagesComponents/messageField/NewMessageField';
import Message from './message/Message';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';



import s from './messageBord.module.css';
import Day from '../day/Day';
import { formatDate, newMessageCreator, checkСompletedMsg } from './message_utils';


const MessageBoard = (props) => {
    const { selectedCommunication } = props
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)
    const authData = useSelector(getAuthData)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCommunication.messages?.length, localStorage.length]);

    useEffect(() => {
        checkСompletedMsg(selectedCommunication)
    }, [selectedCommunication])

    useEffect(() => {
        if (selectedCommunication.newMessagesCount > 0) {
            dispatch(updateNewMessagesStatusTc(authData._id, selectedCommunication.dialogId))
        }
    }, [authData._id, selectedCommunication])


    return (
        <div className={s.message_list}>
            {selectedCommunication.messages && selectedCommunication.messages.map((message, index) => {
                const dayTime = formatDate(message.date)
                return (
                    <>
                        {/* <Day index day={dayTime[0]} /> */}
                        <Message key={message._id} name={selectedCommunication.name}
                            id={selectedCommunication._id} message={message} index={index} time={dayTime[1]} />
                    </>
                )
            }
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageBoard;
