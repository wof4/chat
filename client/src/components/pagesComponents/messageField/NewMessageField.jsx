import * as React from 'react';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Fab from '@mui/material/Fab';
import s from './messageField.module.css'



export default function NewMessageField({ sendMessage, setCurrentValue, value }) {

    const handleChange = (e) => {
        setCurrentValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            sendMessage(value)
        }
    }
    
    const handleClick = () => {
        sendMessage(value)
    }

    return (
        <Box className={s.wrapper} >
            <TextareaAutosize
                className={s.textarea}
                placeholder="Текст сообщения..."
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={value}
            />
            <Fab onClick={handleClick} size="medium" color="success">
                <SendIcon />
            </Fab>
        </Box>
    );
}
