
import React from 'react';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import s from './user-card.module.css';
import AvatarPhoto from '../avatar/Avatar';

const UserCard = (props) => {

    const { item, activeId, callback, Icon, isShowLastMesg } = props

    return (
        <div key={item._id} className={activeId === item._id ? s.user_wrapper_active : s.user_wrapper}
            onClick={() => callback(item)} >
            <div className={s.user_info}>
                <AvatarPhoto name={item.name} w={56} h={56} />
                <div className={s.user_text}>
                    <Typography noWrap sx={{fontSize:"14px"}} >{item.name}</Typography>
                    {item.messages && item.messages.length > 0 && isShowLastMesg
                        ? <Typography className={s.user_last_msg} noWrap={true} sx={{fontSize:"12px"}} >
                            {item.messages[item.messages.length - 1].messageText}
                        </Typography>
                        : ''}
                </div>
            </div>
            <div className={s.new_message_count}>
                <Badge color="success" badgeContent={item.newMessagesCount}>
                    <Icon color='primary' fontSize='medium' />
                </Badge>
            </div>
        </div>
    );
};

export default UserCard;
