import React from 'react';
import Avatar from '@mui/material/Avatar';


const AvatarPhoto = (props) => {

const {name, w, h} = props
    return (
        <div>
            <Avatar
                sx={{ width: w, height: h, bgcolor: '#1E90FF',zIndex: "200" }}
                alt={name}
                src="/static/images/avatar/1.jpg"
            />
        </div>
    );
};

export default AvatarPhoto;
