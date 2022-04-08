import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Fab from '@mui/material/Fab';
import { newMessageDataCreator } from '../../pagesComponents/messages/message_utils';
import { sendNewMessageTc } from '../../../redux/reducers/communicationReducer';


import s from './messageField.module.css'



export default function NewMessageField({addProgressMessage, _id, name, selectedUser }) {
    const dispatch = useDispatch()
    const [currentValue, setCurrentValue] = useState('')

    const sendMessage = () => {
        const messageData = newMessageDataCreator({ currentValue, _id, name, selectedUser })

        addProgressMessage()

        dispatch(sendNewMessageTc(messageData))
        
        setCurrentValue('')
    }


    const handleChange = (e) => {
        setCurrentValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            sendMessage()
        }
    }

    const handleClick = () => {
        sendMessage()
    }

    return (
        <Box className={s.wrapper} >
            <TextareaAutosize
                className={s.textarea}
                placeholder="Текст сообщения..."
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={currentValue}
            />
            <Fab onClick={handleClick} size="medium" color="success">
                <SendIcon />
            </Fab>
        </Box>
    );
}
