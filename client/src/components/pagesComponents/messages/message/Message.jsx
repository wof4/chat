import React from 'react';
import s from './message.module.css';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import AvatarPhoto from '../../avatar/Avatar';


let prevAutor = null
let currentAutor = null

const Message = ({ id, message, name, index, time }) => {
    if (index !== 0) {
        prevAutor = currentAutor
    }
    currentAutor = message.autorId
    return (
        <div className={message.autorId === id ? s.message_wrapper_left : s.message_wrapper}>
            <div className={message.autorId === id ? s.message_container_left : s.message_container}>
                <p className={s.message_text}>
                    {message.messageText}
                </p>
                <div className={s.message_info}>
                    {!message.progress && <div>{time}</div>}
                    <div className={s.message_progress_container}>
                        <Stack >
                            {message.progress
                                ? <CircularProgress
                                    variant="indeterminate"
                                    sx={{ animationDuration: '300ms', color: '#389b3d' }}
                                    size={10}
                                />
                                : <DoneIcon sx={{ fontSize: 'medium' }} />
                            }
                        </Stack>
                    </div>
                </div>
            </div>
            <div className={message.autorId === prevAutor && index !== 0 ? s.hidden_avatar : s.avatar}>
                <AvatarPhoto name={name} w={56} h={56} />
            </div>

        </div>
    );
};

export default Message;


